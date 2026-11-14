import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { logger, formatError } from '@/lib/logger';

export const dynamic = 'force-dynamic';

const log = logger('API:Careers');

export async function GET(req: Request) {
  const start = Date.now();
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    const where: any = {};

    if (category && category !== 'All') {
      where.category = category;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { shortDescription: { contains: search } },
        { industry: { contains: search } },
      ];
    }

    const careers = await prisma.career.findMany({
      where,
      orderBy: { title: 'asc' },
    });

    const user = await getCurrentUser();
    let savedSlugs: string[] = [];
    if (user) {
      const saved = await prisma.savedCareer.findMany({
        where: { userId: user.id },
        select: { careerSlug: true },
      });
      savedSlugs = saved.map((s) => s.careerSlug);
    }

    log.debug('Careers fetched', {
      count: careers.length,
      category: category || 'All',
      search: search || null,
      savedCount: savedSlugs.length,
      duration_ms: Date.now() - start,
    });

    return NextResponse.json({
      careers,
      savedSlugs,
    });
  } catch (error: any) {
    if (error instanceof Error && (error.message?.includes('Dynamic server usage') || (error as any)?.digest === 'DYNAMIC_SERVER_USAGE')) {
      throw error;
    }
    log.error('Careers GET failed', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ careers: [], savedSlugs: [], error: error?.message || 'Failed to fetch careers' }, { status: 500 });
  }
}
