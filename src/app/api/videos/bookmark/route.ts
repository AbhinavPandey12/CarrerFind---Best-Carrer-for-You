import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { logger, formatError } from '@/lib/logger';

const log = logger('API:Videos:Bookmark');

export async function POST(req: Request) {
  const start = Date.now();
  try {
    const user = await getCurrentUser();
    if (!user) {
      log.warn('Video bookmark attempt without authentication');
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      log.warn('Video bookmark: invalid JSON');
      return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
    }

    const { videoId } = body;
    if (!videoId) {
      log.warn('Video bookmark: missing videoId');
      return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
    }

    const existing = await prisma.bookmarkedVideo.findUnique({
      where: {
        userId_videoId: {
          userId: user.id,
          videoId,
        },
      },
    });

    if (existing) {
      await prisma.bookmarkedVideo.delete({
        where: { id: existing.id },
      });
      log.info('Video unbookmarked', { userId: user.id, videoId, duration_ms: Date.now() - start });
      return NextResponse.json({ bookmarked: false });
    } else {
      await prisma.bookmarkedVideo.create({
        data: {
          userId: user.id,
          videoId,
        },
      });
      log.info('Video bookmarked', { userId: user.id, videoId, duration_ms: Date.now() - start });
      return NextResponse.json({ bookmarked: true });
    }
  } catch (error: any) {
    log.error('Video bookmark error', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ error: error?.message || 'Failed to toggle bookmark' }, { status: 500 });
  }
}
