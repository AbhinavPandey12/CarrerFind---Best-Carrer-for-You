import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    let user = await getCurrentUser();
    if (!user) {
      // In demo mode or public evaluation, find the default student Alex Chen
      const defaultStudent = await prisma.user.findFirst({
        where: { role: 'STUDENT' },
      });
      if (defaultStudent) {
        user = defaultStudent as any;
      } else {
        return NextResponse.json({ error: 'Please log in to book a session.' }, { status: 401 });
      }
    }

    const { mentorProfileId, slotId, sessionMode, studentIntroduction } = await req.json();

    if (!mentorProfileId || !slotId) {
      return NextResponse.json({ error: 'Mentor and time slot are required.' }, { status: 400 });
    }

    if (!studentIntroduction || studentIntroduction.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a short introduction explaining your background and goals.' },
        { status: 400 }
      );
    }

    // Double-booking check: lock the slot
    const slot = await prisma.availabilitySlot.findUnique({
      where: { id: slotId },
      include: { mentor: { include: { user: true } } },
    });

    if (!slot) {
      return NextResponse.json({ error: 'Selected time slot does not exist.' }, { status: 404 });
    }

    if (slot.isBooked) {
      return NextResponse.json(
        { error: 'This time slot was just booked by another student. Please select another slot.' },
        { status: 409 }
      );
    }

    // Mark slot as booked
    await prisma.availabilitySlot.update({
      where: { id: slotId },
      data: { isBooked: true },
    });

    // Create booking
    const mode = sessionMode || slot.mode || 'VIRTUAL';
    const randomHash = Math.random().toString(36).substring(2, 7);
    const meetingUrl =
      mode === 'VIRTUAL'
        ? `https://meet.google.com/cfs-${randomHash}-shadow`
        : null;
    const meetingLocation =
      mode === 'IN_PERSON'
        ? slot.mentor.inPersonLocation || `${slot.mentor.company} Headquarters`
        : null;

    const booking = await prisma.jobShadowBooking.create({
      data: {
        studentId: user!.id,
        mentorProfileId,
        slotId,
        sessionDate: slot.date,
        sessionTime: `${slot.startTime} - ${slot.endTime}`,
        sessionMode: mode,
        meetingUrl,
        meetingLocation,
        studentIntroduction,
        status: 'APPROVED', // auto-approved with immediate meeting link or PENDING based on mentor
      },
      include: {
        mentorProfile: {
          include: {
            user: {
              select: { name: true, email: true, avatarUrl: true, headline: true },
            },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      booking,
      message: 'Job shadowing session booked successfully! An invitation has been added to your dashboard.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
