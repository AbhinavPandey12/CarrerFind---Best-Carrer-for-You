import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import CareerCard from '@/components/CareerCard';
import HomeClientSections from './HomeClientSections';
import {
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Video,
  Users,
  Play,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  Building,
  Star,
} from 'lucide-react';

export const revalidate = 0;

export default async function HomePage() {
  const [featuredCareers, featuredVideos, verifiedMentors] = await Promise.all([
    prisma.career.findMany({
      where: { featured: true },
      take: 6,
    }),
    prisma.video.findMany({
      where: { isCurated: true },
      take: 4,
      orderBy: { viewCount: 'desc' },
    }),
    prisma.mentorProfile.findMany({
      where: { isVerified: true },
      take: 4,
      include: {
        user: {
          select: { name: true, avatarUrl: true, headline: true, location: true },
        },
        availabilitySlots: {
          where: { isBooked: false },
        },
      },
    }),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Glow Background blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 animate-in fade-in duration-500 shadow-lg shadow-indigo-500/10">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
            Next-Gen Career Discovery & Job Shadowing Platform
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
            Don&apos;t Just Choose a Career.{' '}
            <span className="gradient-text block mt-1">
              Experience It Before You Commit.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Discover careers that match your ambitions, see what professionals actually do throughout their working day, and connect directly with industry experts to shadow their real work.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/assessment"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm sm:text-base font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-purple-600 text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-5 h-5 text-indigo-200" />
              <span>Discover Your Career</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/shadowing"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm sm:text-base font-bold glass-panel hover:bg-slate-800/80 text-white border border-slate-700 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5 text-emerald-400" />
              <span>Explore Job Shadowing</span>
            </Link>
          </div>

          {/* Value Stats Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80 text-left">
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl glass-panel border border-slate-800">
              <span className="text-xl sm:text-3xl font-extrabold text-white block">100%</span>
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Verified Mentors & Hosts</span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl glass-panel border border-slate-800">
              <span className="text-xl sm:text-3xl font-extrabold text-indigo-400 block">30+</span>
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">High-Demand Profiles</span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl glass-panel border border-slate-800">
              <span className="text-xl sm:text-3xl font-extrabold text-purple-400 block">Real</span>
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Day-in-Life Video Docs</span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl glass-panel border border-slate-800">
              <span className="text-xl sm:text-3xl font-extrabold text-emerald-400 block">1-on-1</span>
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Virtual & In-Person</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Client Sections (Video player modal, booking modal, filters) */}
      <HomeClientSections
        featuredCareers={featuredCareers}
        featuredVideos={featuredVideos}
        verifiedMentors={verifiedMentors}
      />
    </div>
  );
}
