import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const industry = searchParams.get('industry');
    const mode = searchParams.get('mode'); // virtual, in_person
    const isPaid = searchParams.get('isPaid'); // free, paid
    const search = searchParams.get('search');

    const where: any = {};

    if (industry && industry !== 'All') {
      where.industry = { contains: industry };
    }

    if (mode === 'virtual') {
      where.offersVirtual = true;
    } else if (mode === 'in_person') {
      where.offersInPerson = true;
    }

    if (isPaid === 'free') {
      where.isPaid = false;
    } else if (isPaid === 'paid') {
      where.isPaid = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { company: { contains: search } },
        { user: { name: { contains: search } } },
      ];
    }

    const mentors = await prisma.mentorProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            headline: true,
            location: true,
            bio: true,
          },
        },
        availabilitySlots: {
          where: { isBooked: false },
          orderBy: { date: 'asc' },
        },
      },
      orderBy: [
        { isVerified: 'desc' },
        { rating: 'desc' },
      ],
    });

    return NextResponse.json({ mentors });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
