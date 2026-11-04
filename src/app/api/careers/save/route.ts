import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { careerSlug } = await req.json();
    if (!careerSlug) {
      return NextResponse.json({ error: 'Career slug is required' }, { status: 400 });
    }

    const existing = await prisma.savedCareer.findUnique({
      where: {
        userId_careerSlug: {
          userId: user.id,
          careerSlug,
        },
      },
    });

    if (existing) {
      await prisma.savedCareer.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ saved: false });
    } else {
      await prisma.savedCareer.create({
        data: {
          userId: user.id,
          careerSlug,
        },
      });
      return NextResponse.json({ saved: true });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
