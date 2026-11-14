import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { logger, formatError } from '@/lib/logger';

const log = logger('API:Careers:Save');

export async function POST(req: Request) {
  const start = Date.now();
  try {
    const user = await getCurrentUser();
    if (!user) {
      log.warn('Career save attempt without authentication');
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      log.warn('Career save: invalid JSON');
      return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
    }

    const { careerSlug } = body;
    if (!careerSlug) {
      log.warn('Career save: missing careerSlug');
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
      log.info('Career unsaved', { userId: user.id, careerSlug, duration_ms: Date.now() - start });
      return NextResponse.json({ saved: false });
    } else {
      await prisma.savedCareer.create({
        data: {
          userId: user.id,
          careerSlug,
        },
      });
      log.info('Career saved', { userId: user.id, careerSlug, duration_ms: Date.now() - start });
      return NextResponse.json({ saved: true });
    }
  } catch (error: any) {
    log.error('Career save/unsave error', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ error: error?.message || 'Failed to toggle save status' }, { status: 500 });
  }
}
