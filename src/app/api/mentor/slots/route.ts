import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
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
      return NextResponse.json({ error: 'Mentor profile not found' }, { status: 404 });
    }

    const slots = await prisma.availabilitySlot.findMany({
      where: { mentorProfileId: mentorProfile.id },
      orderBy: { date: 'asc' },
    });

    return NextResponse.json({ slots });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
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
      return NextResponse.json({ error: 'Mentor profile not found' }, { status: 404 });
    }

    const { date, startTime, endTime, mode } = await req.json();

    if (!date || !startTime || !endTime) {
      return NextResponse.json({ error: 'Date, start time, and end time are required' }, { status: 400 });
    }

    const newSlot = await prisma.availabilitySlot.create({
      data: {
        mentorProfileId: mentorProfile.id,
        date,
        startTime,
        endTime,
        mode: mode || 'VIRTUAL',
        isBooked: false,
      },
    });

    return NextResponse.json({ success: true, slot: newSlot });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slotId = searchParams.get('id');

    if (!slotId) {
      return NextResponse.json({ error: 'Slot ID is required' }, { status: 400 });
    }

    await prisma.availabilitySlot.delete({
      where: { id: slotId },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
