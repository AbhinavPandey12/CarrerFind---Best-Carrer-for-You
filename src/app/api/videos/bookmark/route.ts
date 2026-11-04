import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { videoId } = await req.json();
    if (!videoId) {
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
      return NextResponse.json({ bookmarked: false });
    } else {
      await prisma.bookmarkedVideo.create({
        data: {
          userId: user.id,
          videoId,
        },
      });
      return NextResponse.json({ bookmarked: true });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
