import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { logger, formatError } from '@/lib/logger';

const log = logger('API:Mentor:Slots');

export async function GET() {
  const start = Date.now();
  try {
    let user = await getCurrentUser();
    if (!user) {
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
      log.warn('Slots GET: mentor profile not found', { userId: user?.id });
      return NextResponse.json({ error: 'Mentor profile not found' }, { status: 404 });
    }

    const slots = await prisma.availabilitySlot.findMany({
      where: { mentorProfileId: mentorProfile.id },
      orderBy: { date: 'asc' },
    });

    log.debug('Slots fetched', { mentorProfileId: mentorProfile.id, count: slots.length, duration_ms: Date.now() - start });

    return NextResponse.json({ slots });
  } catch (error: any) {
    log.error('Slots GET error', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ error: error?.message || 'Failed to fetch slots' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const start = Date.now();
  try {
    let user = await getCurrentUser();
    if (!user) {
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
      log.warn('Slots POST: mentor profile not found', { userId: user?.id });
      return NextResponse.json({ error: 'Mentor profile not found' }, { status: 404 });
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      log.warn('Slots POST: invalid JSON');
      return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
    }

    const { date, startTime, endTime, mode, sessionType, location, meetingLink, maxStudents } = body;

    if (!date || !startTime || !endTime) {
      log.warn('Slots POST: missing required fields', { hasDate: !!date, hasStartTime: !!startTime, hasEndTime: !!endTime });
      return NextResponse.json({ error: 'Date, start time, and end time are required' }, { status: 400 });
    }

    const effectiveType = sessionType === 'WEBINAR' || sessionType === 'SEMINAR' ? sessionType : 'ONE_ON_ONE';
    const effectiveMode = (sessionType === 'WEBINAR' ? 'VIRTUAL' : sessionType === 'SEMINAR' ? 'IN_PERSON' : mode || 'VIRTUAL').toUpperCase();

    // If session is virtual, require Google Meet link or meeting ID
    if (effectiveMode === 'VIRTUAL' || effectiveType === 'WEBINAR') {
      if (!meetingLink || typeof meetingLink !== 'string' || !meetingLink.trim()) {
        log.warn('Slots POST: missing required Google Meet link or meeting ID for virtual session');
        return NextResponse.json({ error: 'Google Meet link or meeting ID is required for virtual sessions' }, { status: 400 });
      }
    }

    // Max students (up to 50 for webinar / seminar)
    let parsedMaxStudents = 1;
    if (effectiveType === 'WEBINAR' || effectiveType === 'SEMINAR') {
      parsedMaxStudents = Math.min(50, Math.max(1, parseInt(maxStudents, 10) || 50));
    }

    const effectiveLocation = location && location.trim()
      ? location.trim()
      : (effectiveMode === 'VIRTUAL' ? 'Virtual' : 'In-Person / Offline');

    const newSlot = await prisma.availabilitySlot.create({
      data: {
        mentorProfileId: mentorProfile.id,
        date,
        startTime,
        endTime,
        mode: effectiveMode,
        sessionType: effectiveType,
        location: effectiveLocation,
        meetingLink: meetingLink ? meetingLink.trim() : null,
        maxStudents: parsedMaxStudents,
        isBooked: false,
      },
    });

    log.info('Slot created successfully', {
      slotId: newSlot.id,
      mentorProfileId: mentorProfile.id,
      date,
      duration_ms: Date.now() - start,
    });

    return NextResponse.json({ success: true, slot: newSlot });
  } catch (error: any) {
    log.error('Slots POST error', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ error: error?.message || 'Failed to create slot' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const start = Date.now();
  try {
    const { searchParams } = new URL(req.url);
    const slotId = searchParams.get('id');

    if (!slotId) {
      log.warn('Slots DELETE: missing slotId');
      return NextResponse.json({ error: 'Slot ID is required' }, { status: 400 });
    }

    await prisma.availabilitySlot.delete({
      where: { id: slotId },
    });

    log.info('Slot deleted successfully', { slotId, duration_ms: Date.now() - start });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    log.error('Slots DELETE error', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ error: error?.message || 'Failed to delete slot' }, { status: 500 });
  }
}
