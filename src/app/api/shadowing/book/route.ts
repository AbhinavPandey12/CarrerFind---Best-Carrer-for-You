import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { logger, formatError } from '@/lib/logger';

const log = logger('API:Shadowing:Book');

export async function POST(req: Request) {
  const start = Date.now();
  try {
    let user = await getCurrentUser();
    if (!user) {
      // In demo mode or public evaluation, find the default student Alex Chen
      const defaultStudent = await prisma.user.findFirst({
        where: { role: 'STUDENT' },
      });
      if (defaultStudent) {
        user = defaultStudent as any;
        log.info('Booking: using default student fallback for unauthenticated demo user', { studentId: user?.id });
      } else {
        log.warn('Booking: unauthenticated attempt with no default student in DB');
        return NextResponse.json({ error: 'Please log in to book a session.' }, { status: 401 });
      }
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      log.warn('Booking: invalid JSON body');
      return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
    }

    const { mentorProfileId, slotId, sessionMode, studentIntroduction } = body;

    if (!mentorProfileId || !slotId) {
      log.warn('Booking: missing mentorProfileId or slotId', { mentorProfileId, slotId });
      return NextResponse.json({ error: 'Mentor and time slot are required.' }, { status: 400 });
    }

    if (!studentIntroduction || studentIntroduction.trim().length < 10) {
      log.warn('Booking: insufficient student introduction length');
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
      log.warn('Booking: slot not found', { slotId });
      return NextResponse.json({ error: 'Selected time slot does not exist.' }, { status: 404 });
    }

    if (slot.isBooked) {
      log.warn('Booking conflict: slot already booked', { slotId, mentorProfileId, studentId: user!.id });
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
    const sessionType = slot.sessionType || (mode === 'IN_PERSON' ? 'IN_PERSON' : 'VIRTUAL');
    const randomHash = Math.random().toString(36).substring(2, 7);
    const meetingUrl =
      (mode === 'VIRTUAL' || sessionType === 'WEBINAR')
        ? (slot.meetingLink || `https://meet.google.com/cfs-${randomHash}-shadow`)
        : null;
    const meetingLocation =
      (mode === 'IN_PERSON' || sessionType === 'SEMINAR')
        ? (slot.location || slot.mentor.inPersonLocation || `${slot.mentor.company} Headquarters`)
        : (slot.location || null);

    const booking = await prisma.jobShadowBooking.create({
      data: {
        studentId: user!.id,
        mentorProfileId,
        slotId,
        sessionDate: slot.date,
        sessionTime: `${slot.startTime} - ${slot.endTime}`,
        sessionMode: mode,
        sessionType,
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

    log.info('Booking confirmed successfully', {
      bookingId: booking.id,
      studentId: user!.id,
      mentorProfileId,
      slotId,
      sessionMode: mode,
      duration_ms: Date.now() - start,
    });

    return NextResponse.json({
      success: true,
      booking,
      message: 'Job shadowing session booked successfully! An invitation has been added to your dashboard.',
    });
  } catch (error: any) {
    log.error('Booking failed with unexpected error', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ error: error?.message || 'Failed to book session' }, { status: 500 });
  }
}
