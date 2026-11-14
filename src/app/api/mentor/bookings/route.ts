import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { logger, formatError } from '@/lib/logger';

const log = logger('API:Mentor:Bookings');

export async function GET() {
  const start = Date.now();
  try {
    let user = await getCurrentUser();
    if (!user) {
      // Demo fallback to Priya Sharma if not logged in
      const defaultMentor = await prisma.user.findFirst({
        where: { role: 'MENTOR' },
        include: { mentorProfile: true },
      });
      user = defaultMentor as any;
      log.info('Mentor Bookings GET: demo mentor fallback active', { mentorId: user?.id });
    }

    const mentorProfile = await prisma.mentorProfile.findUnique({
      where: { userId: user!.id },
    });

    if (!mentorProfile) {
      log.warn('Mentor profile not found', { userId: user?.id });
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

    log.debug('Mentor bookings fetched', {
      mentorProfileId: mentorProfile.id,
      count: bookings.length,
      duration_ms: Date.now() - start,
    });

    return NextResponse.json({ bookings, mentorProfile });
  } catch (error: any) {
    log.error('Mentor Bookings GET error', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ error: error?.message || 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const start = Date.now();
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      log.warn('Mentor Bookings PATCH: invalid JSON');
      return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
    }

    const { bookingId, status, rejectionReason, mentorFeedback } = body;

    if (!bookingId) {
      log.warn('Mentor Bookings PATCH: missing bookingId');
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
      log.info('Booking cancelled/rejected: slot released', { slotId: booking.slotId, bookingId });
    }

    log.info('Booking updated successfully', {
      bookingId,
      status: status || booking.status,
      duration_ms: Date.now() - start,
    });

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    log.error('Mentor Bookings PATCH error', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ error: error?.message || 'Failed to update booking' }, { status: 500 });
  }
}
