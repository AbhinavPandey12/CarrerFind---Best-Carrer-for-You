import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: Request) {
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

    return NextResponse.json({
      careers,
      savedSlugs,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
