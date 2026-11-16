import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { logger, formatError } from '@/lib/logger';

const log = logger('API:Student:Bookings');

export async function DELETE(req: Request) {
  const start = Date.now();
  try {
    let user = await getCurrentUser();
    if (!user) {
      const defaultStudent = await prisma.user.findFirst({
        where: { role: 'STUDENT' },
      });
      user = defaultStudent as any;
    }

    if (!user) {
      log.warn('Student Bookings DELETE: unauthorized');
      return NextResponse.json({ error: 'Please log in to manage your bookings.' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const bookingId = searchParams.get('id');

    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }

    const booking = await prisma.jobShadowBooking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.studentId !== user.id) {
      return NextResponse.json({ error: 'You do not have permission to delete this booking' }, { status: 403 });
    }

    // 3-Day Cancellation Restriction
    // Deletion is allowed only up to 3 days before the session date (webinar, seminar, in-person, or virtual).
    // Once the session is within 3 days, deletion is rejected.
    const [year, month, day] = booking.sessionDate.split('-').map(Number);
    let hours = 0;
    let minutes = 0;
    if (booking.sessionTime) {
      const match = booking.sessionTime.match(/(\d{1,2}):(\d{2})/);
      if (match) {
        hours = parseInt(match[1], 10);
        minutes = parseInt(match[2], 10);
      }
    }
    const sessionDateTime = new Date(year, month - 1, day, hours, minutes);
    const now = new Date();
    const diffMs = sessionDateTime.getTime() - now.getTime();
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;

    if (diffMs <= threeDaysMs) {
      log.warn('Student Bookings DELETE rejected: within 3 days of session', {
        bookingId,
        sessionDate: booking.sessionDate,
        diffDays: diffMs / (24 * 60 * 60 * 1000),
      });
      return NextResponse.json(
        { error: 'Cancellation is only allowed up to 3 days before the session date.' },
        { status: 400 }
      );
    }

    // Release the availability slot if linked
    if (booking.slotId) {
      await prisma.availabilitySlot.update({
        where: { id: booking.slotId },
        data: { isBooked: false },
      });
      log.info('Slot released upon student booking deletion', { slotId: booking.slotId, bookingId });
    }

    // Delete the booking
    await prisma.jobShadowBooking.delete({
      where: { id: bookingId },
    });

    log.info('Student booking deleted successfully', { bookingId, studentId: user.id, duration_ms: Date.now() - start });

    return NextResponse.json({
      success: true,
      message: 'Job shadowing session has been cancelled and deleted.',
    });
  } catch (error: any) {
    log.error('Student Bookings DELETE error', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ error: error?.message || 'Failed to cancel session' }, { status: 500 });
  }
}
