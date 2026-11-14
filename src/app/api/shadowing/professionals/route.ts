import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger, formatError } from '@/lib/logger';

export const dynamic = 'force-dynamic';

const log = logger('API:Shadowing:Professionals');

export async function GET(req: Request) {
  const start = Date.now();
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

    log.debug('Mentors fetched', {
      count: mentors.length,
      industry: industry || 'All',
      mode: mode || 'all',
      duration_ms: Date.now() - start,
    });

    return NextResponse.json({ mentors });
  } catch (error: any) {
    if (error instanceof Error && (error.message?.includes('Dynamic server usage') || (error as any)?.digest === 'DYNAMIC_SERVER_USAGE')) {
      throw error;
    }
    log.error('Mentors GET failed', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ mentors: [], error: error?.message || 'Failed to fetch mentors' }, { status: 500 });
  }
}
