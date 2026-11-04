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

  // Fetch related videos
  const relatedVideos = await prisma.video.findMany({
    where: { professionSlug: slug },
  });

  // Fetch verified mentors in this industry or matching title
  const relatedMentors = await prisma.mentorProfile.findMany({
    where: {
      OR: [
        { industry: { contains: career.industry } },
        { title: { contains: career.title } },
        { isVerified: true },
      ],
    },
    take: 3,
    include: {
      user: { select: { id: true, name: true, avatarUrl: true, headline: true, location: true } },
      availabilitySlots: { where: { isBooked: false } },
    },
  });

  return (
    <CareerDetailClient
      career={career}
      relatedVideos={relatedVideos}
      relatedMentors={relatedMentors}
    />
  );
}
