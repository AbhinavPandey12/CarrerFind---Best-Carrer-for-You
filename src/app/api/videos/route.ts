import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { logger, formatError } from '@/lib/logger';

export const dynamic = 'force-dynamic';

const log = logger('API:Videos');

export async function GET(req: Request) {
  const start = Date.now();
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const professionSlug = searchParams.get('professionSlug');
    const experienceLevel = searchParams.get('experienceLevel');
    const search = searchParams.get('search');

    const where: any = {};
    if (category && category !== 'All') {
      where.category = { contains: category };
    }
    if (professionSlug && professionSlug !== 'All') {
      where.professionSlug = professionSlug;
    }
    if (experienceLevel && experienceLevel !== 'All') {
      where.experienceLevel = experienceLevel;
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { creator: { contains: search } },
      ];
    }

    const videos = await prisma.video.findMany({
      where,
      orderBy: { viewCount: 'desc' },
    });

    const user = await getCurrentUser();
    let bookmarkedIds: string[] = [];
    if (user) {
      const bookmarks = await prisma.bookmarkedVideo.findMany({
        where: { userId: user.id },
        select: { videoId: true },
      });
      bookmarkedIds = bookmarks.map((b) => b.videoId);
    }

    log.debug('Videos fetched', {
      count: videos.length,
      category: category || 'All',
      search: search || null,
      bookmarkedCount: bookmarkedIds.length,
      duration_ms: Date.now() - start,
    });

    return NextResponse.json({ videos, bookmarkedIds });
  } catch (error: any) {
    if (error instanceof Error && (error.message?.includes('Dynamic server usage') || (error as any)?.digest === 'DYNAMIC_SERVER_USAGE')) {
      throw error;
    }
    log.error('Videos GET failed', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ videos: [], bookmarkedIds: [], error: error?.message || 'Failed to fetch videos' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const start = Date.now();
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      log.warn('Video suggest: invalid JSON body');
      return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
    }

    const { title, youtubeUrl, creator, professionSlug, category, experienceLevel, description } = body;

    if (!title || !youtubeUrl) {
      log.warn('Video suggest: missing title or youtubeUrl');
      return NextResponse.json({ error: 'Title and YouTube URL are required' }, { status: 400 });
    }

    // Extract YouTube ID
    let youtubeId = '';
    const match = youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      youtubeId = match[1];
    } else {
      youtubeId = 'dQw4w9WgXcQ'; // safe fallback
      log.warn('Video suggest: failed to extract YouTube ID from URL, using fallback', { youtubeUrl });
    }

    const video = await prisma.video.create({
      data: {
        title,
        youtubeId,
        youtubeUrl,
        creator: creator || 'Community Contributor',
        channelName: creator || 'Tech Channel',
        duration: '12:00',
        professionSlug: professionSlug || 'ai-ml-engineer',
        category: category || 'Technology & Engineering',
        experienceLevel: experienceLevel || 'Mid-Level',
        location: 'Global',
        keyTakeaways: JSON.stringify(['Real world daily responsibilities', 'Key engineering tradeoffs', 'Advice for students']),
        description: description || 'Community submitted video showcasing a day in the life.',
      },
    });

    log.info('Video created/suggested successfully', { videoId: video.id, title: video.title, duration_ms: Date.now() - start });

    return NextResponse.json({ success: true, video });
  } catch (error: any) {
    log.error('Video suggest POST failed', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ error: error?.message || 'Failed to submit video' }, { status: 500 });
  }
}
