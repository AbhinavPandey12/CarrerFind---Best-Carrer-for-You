import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
