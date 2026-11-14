import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import CareerDetailClient from './CareerDetailClient';

export const revalidate = 0;

interface CareerPageProps {
  params: { slug: string };
}

export default async function CareerDetailPage({ params }: CareerPageProps) {
  const { slug } = params;

  const career = await prisma.career.findUnique({
    where: { slug },
  });

  if (!career) {
    notFound();
  }

  // Fetch related videos (exact slug first, then category fallback, ensuring every profile has videos)
  let relatedVideos = await prisma.video.findMany({
    where: { professionSlug: slug },
  });

  if (relatedVideos.length === 0) {
    const categoryPrefix = career.category.split('&')[0].trim();
    relatedVideos = await prisma.video.findMany({
      where: {
        OR: [
          { category: career.category },
          { category: { contains: categoryPrefix } },
        ],
      },
      take: 2,
    });
  }

  if (relatedVideos.length === 0) {
    relatedVideos = await prisma.video.findMany({
      where: { isCurated: true },
      take: 2,
    });
  }

  // Fetch verified mentors in this industry or category, ensuring every profile has mentors
  const categoryWord = career.category.split('&')[0].trim();
  const industryWord = career.industry.split(/[,/&]/)[0].trim();

  let relatedMentors = await prisma.mentorProfile.findMany({
    where: {
      isVerified: true,
      OR: [
        { industry: { contains: industryWord } },
        { industry: { contains: categoryWord } },
        { title: { contains: career.title.split(/[\s/]/)[0] } },
      ],
    },
    take: 3,
    include: {
      user: { select: { id: true, name: true, avatarUrl: true, headline: true, location: true } },
      availabilitySlots: { where: { isBooked: false } },
    },
  });

  if (relatedMentors.length === 0) {
    relatedMentors = await prisma.mentorProfile.findMany({
      where: { isVerified: true },
      take: 3,
      include: {
        user: { select: { id: true, name: true, avatarUrl: true, headline: true, location: true } },
        availabilitySlots: { where: { isBooked: false } },
      },
    });
  }

  return (
    <CareerDetailClient
      career={career}
      relatedVideos={relatedVideos}
      relatedMentors={relatedMentors}
    />
  );
}
