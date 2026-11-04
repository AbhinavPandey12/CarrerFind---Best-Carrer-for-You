import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    let user = await getCurrentUser();
    if (!user) {
      // Demo fallback to Priya Sharma if not logged in
      const defaultMentor = await prisma.user.findFirst({
        where: { role: 'MENTOR' },
        include: { mentorProfile: true },
      });
      user = defaultMentor as any;
    }

    const mentorProfile = await prisma.mentorProfile.findUnique({
      where: { userId: user!.id },
    });

    if (!mentorProfile) {
      return NextResponse.json({ error: 'Mentor profile not found' }, { status: 404 });
    }

    const bookings = await prisma.jobShadowBooking.findMany({
      where: { mentorProfileId: mentorProfile.id },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            headline: true,
            studentProfile: true,
          },
        },
        slot: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ bookings, mentorProfile });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { bookingId, status, rejectionReason, mentorFeedback } = await req.json();

    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (rejectionReason) updateData.rejectionReason = rejectionReason;
    if (mentorFeedback) updateData.mentorFeedback = mentorFeedback;

    const booking = await prisma.jobShadowBooking.update({
      where: { id: bookingId },
      data: updateData,
      include: {
        student: { select: { name: true, email: true } },
      },
    });

    // If cancelled or rejected, release the slot if present
    if ((status === 'REJECTED' || status === 'CANCELLED') && booking.slotId) {
      await prisma.availabilitySlot.update({
        where: { id: booking.slotId },
        data: { isBooked: false },
      });
    }

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
