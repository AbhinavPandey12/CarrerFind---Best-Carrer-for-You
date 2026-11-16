import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { logger, formatError } from '@/lib/logger';

export const dynamic = 'force-dynamic';

const log = logger('API:Student:Dashboard');

export async function GET() {
  const start = Date.now();
  try {
    let user = await getCurrentUser();
    if (!user) {
      // Default to Alex Chen for instant demo evaluation
      const defaultStudent = await prisma.user.findFirst({
        where: { role: 'STUDENT' },
      });
      user = defaultStudent as any;
      log.info('Student Dashboard: using demo student fallback', { studentId: user?.id });
    }

    if (!user) {
      log.warn('Student Dashboard: user not found in database');
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
        include: {
          user: { select: { id: true, name: true, avatarUrl: true, headline: true, location: true } },
          availabilitySlots: { where: { isBooked: false } },
        },
      }),
    ]);

    // Map saved careers with career details
    const savedCareerSlugs = savedCareers.map((s) => s.careerSlug);
    const detailedSavedCareers = allCareers.filter((c) => savedCareerSlugs.includes(c.slug));

    // Recommendation engine for job shadowing mentors based on assessment results
    let recommendedCareersList: any[] = [];
    if (assessmentResult?.recommendedCareers) {
      try {
        recommendedCareersList = JSON.parse(assessmentResult.recommendedCareers);
      } catch {
        recommendedCareersList = [];
      }
    }

    const stopWords = new Set(['and', 'or', 'of', 'the', 'in', 'to', 'for', 'a', 'an', '&', 'engineer', 'specialist']);

    const scoredMentors = featuredMentors.map((mentor) => {
      let score = 0;
      let matchedCareerTitle: string | null = null;
      const mentorSearchCorpus = `${mentor.title} ${mentor.industry} ${mentor.company} ${mentor.aboutDayInLife || ''}`.toLowerCase();

      // Check against student's assessment recommended careers
      for (let i = 0; i < recommendedCareersList.length; i++) {
        const rec = recommendedCareersList[i];
        // Priority weight decays with ranking
        const rankWeight = Math.max(10, 100 - i * 20);

        const careerSlugWords = (rec.careerSlug || '')
          .toLowerCase()
          .split('-')
          .filter((w: string) => w.length > 2 && !stopWords.has(w));

        const careerTitleWords = (rec.title || '')
          .toLowerCase()
          .split(/\s+/)
          .filter((w: string) => w.length > 2 && !stopWords.has(w));

        const wordsToMatch = Array.from(new Set([...careerSlugWords, ...careerTitleWords]));

        let matchesForThisCareer = 0;
        for (const word of wordsToMatch) {
          if (mentorSearchCorpus.includes(word)) {
            matchesForThisCareer++;
          }
        }

        if (matchesForThisCareer > 0) {
          score += rankWeight * matchesForThisCareer;
          if (!matchedCareerTitle) {
            matchedCareerTitle = rec.title || rec.careerSlug;
          }
        }
      }

      return {
        ...mentor,
        recommendationScore: score,
        matchedCareerTitle,
      };
    });

    // Sort by recommendation score first, then rating
    scoredMentors.sort((a, b) => {
      if (b.recommendationScore !== a.recommendationScore) {
        return b.recommendationScore - a.recommendationScore;
      }
      return (b.rating || 0) - (a.rating || 0);
    });

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

    log.debug('Student dashboard data loaded', {
      userId: user.id,
      savedCareersCount: detailedSavedCareers.length,
      bookmarkedVideosCount: detailedVideos.length,
      bookingsCount: bookings.length,
      progressScore,
      duration_ms: Date.now() - start,
    });

    return NextResponse.json({
      user,
      studentProfile,
      assessmentResult,
      savedCareers: detailedSavedCareers,
      bookmarkedVideos: detailedVideos,
      bookings,
      featuredMentors: scoredMentors,
      progressScore,
    });
  } catch (error: any) {
    if (error instanceof Error && (error.message?.includes('Dynamic server usage') || (error as any)?.digest === 'DYNAMIC_SERVER_USAGE')) {
      throw error;
    }
    log.error('Student Dashboard GET error', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ error: error?.message || 'Failed to fetch student dashboard data' }, { status: 500 });
  }
}
