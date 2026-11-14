import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger, formatError } from '@/lib/logger';

const log = logger('API:Admin:Overview');

export async function GET() {
  const start = Date.now();
  try {
    const [
      totalUsers,
      totalStudents,
      totalMentors,
      pendingVerifications,
      totalBookings,
      totalVideos,
      pendingMentorsList,
      recentBookings,
      reports,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.user.count({ where: { role: 'MENTOR' } }),
      prisma.mentorProfile.count({ where: { verificationStatus: 'PENDING' } }),
      prisma.jobShadowBooking.count(),
      prisma.video.count(),
      prisma.mentorProfile.findMany({
        where: { verificationStatus: 'PENDING' },
        include: {
          user: {
            select: { id: true, name: true, email: true, avatarUrl: true, headline: true, location: true },
          },
        },
      }),
      prisma.jobShadowBooking.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          student: { select: { name: true, email: true, avatarUrl: true } },
          mentorProfile: {
            include: {
              user: { select: { name: true, email: true, avatarUrl: true } },
            },
          },
        },
      }),
      prisma.platformReport.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          reporter: { select: { name: true, email: true } },
        },
      }),
    ]);

    log.debug('Admin overview loaded', {
      totalUsers,
      pendingVerifications,
      totalBookings,
      duration_ms: Date.now() - start,
    });

    return NextResponse.json({
      kpis: {
        totalUsers,
        totalStudents,
        totalMentors,
        pendingVerifications,
        totalBookings,
        totalVideos,
        activeRate: '94.2%',
      },
      pendingMentors: pendingMentorsList,
      recentBookings,
      reports,
    });
  } catch (error: any) {
    log.error('Admin Overview GET error', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ error: error?.message || 'Failed to fetch admin overview' }, { status: 500 });
  }
}
