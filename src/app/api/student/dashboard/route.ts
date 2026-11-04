import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    let user = await getCurrentUser();
    if (!user) {
      // Default to Alex Chen for instant demo evaluation
      const defaultStudent = await prisma.user.findFirst({
        where: { role: 'STUDENT' },
      });
      user = defaultStudent as any;
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const [
      studentProfile,
      assessmentResult,
      savedCareers,
      bookmarkedVideos,
      bookings,
      allCareers,
      featuredMentors,
    ] = await Promise.all([
      prisma.studentProfile.findUnique({
        where: { userId: user.id },
      }),
      prisma.assessmentResult.findFirst({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.savedCareer.findMany({
        where: { userId: user.id },
      }),
      prisma.bookmarkedVideo.findMany({
        where: { userId: user.id },
      }),
      prisma.jobShadowBooking.findMany({
        where: { studentId: user.id },
        include: {
          mentorProfile: {
            include: {
              user: {
                select: { name: true, email: true, avatarUrl: true, headline: true, location: true },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.career.findMany({
        select: { slug: true, title: true, category: true, entrySalaryMax: true, seniorSalaryMax: true, iconName: true },
      }),
      prisma.mentorProfile.findMany({
        where: { isVerified: true },
        take: 4,
        include: {
          user: { select: { name: true, avatarUrl: true, headline: true, location: true } },
          availabilitySlots: { where: { isBooked: false } },
        },
      }),
    ]);

    // Map saved careers with career details
    const savedCareerSlugs = savedCareers.map((s) => s.careerSlug);
    const detailedSavedCareers = allCareers.filter((c) => savedCareerSlugs.includes(c.slug));

    // Map bookmarked videos
    const videoIds = bookmarkedVideos.map((b) => b.videoId);
    const detailedVideos = await prisma.video.findMany({
      where: { id: { in: videoIds } },
    });

    // Compute student exploration progress score (out of 100)
    let progressScore = 20; // registered
    if (assessmentResult) progressScore += 30;
    if (savedCareers.length > 0) progressScore += 20;
    if (bookmarkedVideos.length > 0) progressScore += 10;
    if (bookings.length > 0) progressScore += 20;
    progressScore = Math.min(100, progressScore);

    return NextResponse.json({
      user,
      studentProfile,
      assessmentResult,
      savedCareers: detailedSavedCareers,
      bookmarkedVideos: detailedVideos,
      bookings,
      featuredMentors,
      progressScore,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
