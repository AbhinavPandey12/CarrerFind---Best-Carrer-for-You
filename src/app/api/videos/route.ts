import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: Request) {
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

    return NextResponse.json({ videos, bookmarkedIds });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, youtubeUrl, creator, professionSlug, category, experienceLevel, description } = body;

    if (!title || !youtubeUrl) {
      return NextResponse.json({ error: 'Title and YouTube URL are required' }, { status: 400 });
    }

    // Extract YouTube ID
    let youtubeId = '';
    const match = youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      youtubeId = match[1];
    } else {
      youtubeId = 'dQw4w9WgXcQ'; // safe fallback
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

    return NextResponse.json({ success: true, video });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
