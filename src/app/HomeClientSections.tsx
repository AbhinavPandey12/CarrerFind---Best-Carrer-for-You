'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CareerCard from '@/components/CareerCard';
import VideoModal from '@/components/VideoModal';
import BookingModal from '@/components/BookingModal';
import { track, trackError } from '@/lib/telemetry';
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
  MapPin,
  Clock,
  Layers,
} from 'lucide-react';

interface HomeClientSectionsProps {
  featuredCareers: any[];
  featuredVideos: any[];
  verifiedMentors: any[];
}

export default function HomeClientSections({
  featuredCareers,
  featuredVideos,
  verifiedMentors,
}: HomeClientSectionsProps) {
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<any | null>(null);
  const [savedCareers, setSavedCareers] = useState<string[]>(['ai-ml-engineer']);
  const [bookmarkedVideos, setBookmarkedVideos] = useState<string[]>([]);

  const handleToggleSaveCareer = async (slug: string) => {
    try {
      const res = await fetch('/api/careers/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ careerSlug: slug }),
      });
      const data = await res.json();
      if (data.saved) {
        setSavedCareers((prev) => [...prev, slug]);
        track('career_saved_from_home', { slug });
      } else {
        setSavedCareers((prev) => prev.filter((s) => s !== slug));
        track('career_unsaved_from_home', { slug });
      }
    } catch (e: any) {
      trackError(e, { component: 'HomeClientSections', action: 'toggleSaveCareer', slug });
    }
  };

  const handleToggleBookmarkVideo = async (videoId: string) => {
    try {
      const res = await fetch('/api/videos/bookmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
      });
      const data = await res.json();
      if (data.bookmarked) {
        setBookmarkedVideos((prev) => [...prev, videoId]);
        track('video_bookmarked_from_home', { videoId });
      } else {
        setBookmarkedVideos((prev) => prev.filter((id) => id !== videoId));
        track('video_unbookmarked_from_home', { videoId });
      }
    } catch (e: any) {
      trackError(e, { component: 'HomeClientSections', action: 'toggleBookmarkVideo', videoId });
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* SECTION 1: Popular Career Paths */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Frontier & High-Demand Careers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Popular Career Paths
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
              From Physical AI and Forward Deployed Engineering to Investment Banking and Product Management.
            </p>
          </div>

          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>Browse All 30+ Careers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCareers.map((career) => (
            <CareerCard
              key={career.slug}
              career={career}
              isSaved={savedCareers.includes(career.slug)}
              onToggleSave={handleToggleSaveCareer}
            />
          ))}
        </div>
      </section>

      {/* SECTION 2: Explore Careers by Industry */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-panel p-5 sm:p-8 md:p-12 border border-slate-800 relative overflow-hidden">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-2">
              Domain Exploration
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Explore Careers by Industry Vertical
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Filter roles according to industry ecosystems, compensation dynamics, and lifestyle requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/careers?category=Technology+%26+Engineering"
              className="p-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 hover:border-indigo-500/60 transition-all hover:-translate-y-1 group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-indigo-300">
                Technology & Engineering
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Software, AI/ML, Forward Deployed, Physical Robotics, Cloud Architecture, and CleanTech Grid systems.
              </p>
              <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1">
                Explore Tech Roles <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/careers?category=Business+%26+Management"
              className="p-6 rounded-2xl bg-amber-950/30 border border-amber-500/20 hover:border-amber-500/60 transition-all hover:-translate-y-1 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-amber-300">
                Business & Management
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Management Consulting, Product Management, Investment Banking, Technical Program Management, and Strategy.
              </p>
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                Explore Business Roles <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/careers?category=Emerging+%26+Other+Careers"
              className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 hover:border-emerald-500/60 transition-all hover:-translate-y-1 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-emerald-300">
                Emerging & Frontier
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Startup Entrepreneurship, Venture Capital, Product Design (UI/UX), and Creator Economy Tech Media.
              </p>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                Explore Emerging Roles <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: A Day in the Life – Featured Videos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Video className="w-4 h-4" />
              <span>Authentic Workplace Documentaries</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              &ldquo;A Day in the Life&rdquo; – Video Library
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
              Real professionals show what their workday actually entails—from code reviews and hardware testing to executive meetings.
            </p>
          </div>

          <Link
            href="/videos"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>Open Video Library</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => {
                track('video_opened_from_home', { videoId: video.id, title: video.title });
                setSelectedVideo(video);
              }}
              className="group cursor-pointer rounded-3xl glass-panel border border-slate-800 overflow-hidden hover:border-purple-500/50 transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-indigo-500 transition-all">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                  {video.duration}
                </span>
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-indigo-600/80 text-[10px] font-semibold text-white backdrop-blur-sm">
                  {video.experienceLevel}
                </span>
              </div>

              {/* Video Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 group-hover:text-indigo-300 transition-colors leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {video.creator} • {video.channelName}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{video.location || 'Silicon Valley'}</span>
                  <span className="text-indigo-400 font-medium">Watch Video →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 & 5: Recommended Verified Mentors & Job Shadowing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Users className="w-4 h-4" />
              <span>Job Shadowing Marketplace</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Connect Directly with Verified Industry Mentors
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
              Observe real-world decision making, architecture design, and sprint operations through virtual or in-person shadowing.
            </p>
          </div>

          <Link
            href="/shadowing"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Explore All Mentors</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {verifiedMentors.map((mentor) => {
            const availableSlots = mentor.availabilitySlots || [];
            return (
              <div
                key={mentor.id}
                className="rounded-3xl glass-panel p-5 border border-slate-800 flex flex-col justify-between hover:border-emerald-500/40 transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <img
                      src={mentor.user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
                      alt={mentor.user?.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-700"
                    />
                    <div className="flex flex-col items-end">
                      <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        Verified
                      </span>
                      <div className="flex items-center gap-1 text-xs text-amber-400 font-bold mt-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{mentor.rating.toFixed(1)}</span>
                        <span className="text-slate-500 text-[10px]">({mentor.reviewsCount})</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white">{mentor.user?.name}</h3>
                  <p className="text-xs text-indigo-400 font-semibold">{mentor.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{mentor.company}</p>

                  <p className="text-[11px] text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                    {mentor.aboutDayInLife}
                  </p>

                  {/* Mode Badges */}
                  <div className="flex items-center gap-2 mt-4 text-[10px]">
                    {mentor.offersVirtual && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        Virtual
                      </span>
                    )}
                    {mentor.offersInPerson && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-emerald-300 border border-slate-700">
                        In-Person
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {mentor.isPaid ? `$${mentor.priceAmount}` : 'Free'}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => {
                      track('booking_modal_opened_from_home', { mentorId: mentor.id, mentorName: mentor.user?.name });
                      setSelectedMentor(mentor);
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Shadowing ({availableSlots.length} Slots)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 6: How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-2">
            The 4-Step Methodology
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            How CareerFind Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            A structured path from uncertainty to firsthand clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 relative">
            <span className="w-8 h-8 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center justify-center font-bold text-xs mb-4">
              01
            </span>
            <h3 className="text-base font-bold text-white mb-2">Career Assessment</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete an interactive 9-dimension preference evaluation to identify your top 10 recommended career paths.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-slate-800 relative">
            <span className="w-8 h-8 rounded-full bg-purple-600/30 text-purple-300 border border-purple-500/40 flex items-center justify-center font-bold text-xs mb-4">
              02
            </span>
            <h3 className="text-base font-bold text-white mb-2">Watch Real Workdays</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Watch curated YouTube documentary videos showing authentic day-to-day coding, sprint meetings, and lab work.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-slate-800 relative">
            <span className="w-8 h-8 rounded-full bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 flex items-center justify-center font-bold text-xs mb-4">
              03
            </span>
            <h3 className="text-base font-bold text-white mb-2">Book 1-on-1 Shadowing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Connect with verified mentors from DeepMind, Palantir, Stripe, and Goldman Sachs for virtual or in-person sessions.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-slate-800 relative">
            <span className="w-8 h-8 rounded-full bg-amber-600/30 text-amber-300 border border-amber-500/40 flex items-center justify-center font-bold text-xs mb-4">
              04
            </span>
            <h3 className="text-base font-bold text-white mb-2">Evaluate & Choose</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compare 2-4 professions side by side on compensation, work-life balance, and make informed career commitments.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: Student Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-8 md:p-12 rounded-3xl glass-panel border border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-2">
              Real Student Outcomes
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Loved by Ambitious Students
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-4">
                &ldquo;I spent two years wondering whether I wanted to do pure software engineering or consulting. Shadowing an FDE at Palantir opened my eyes to how engineering meets real frontline operations.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                  alt="Alex"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">Alex Chen</h4>
                  <p className="text-[10px] text-slate-400">CS & CogSci @ UC Berkeley</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-4">
                &ldquo;The career assessment gave me an 89% match for Physical AI. After watching the Boston Dynamics videos and booking a virtual shadowing session, I officially switched my minor to Robotics.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80"
                  alt="Maya"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">Maya Patel</h4>
                  <p className="text-[10px] text-slate-400">Mechanical Eng @ Georgia Tech</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-4">
                &ldquo;College advisors talk about investment banking in generic terms. Being able to shadow Julian at Goldman Sachs showed me the true reality of financial modeling and deal deadlines.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80"
                  alt="Liam"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">Liam Vance</h4>
                  <p className="text-[10px] text-slate-400">Finance & Data Science @ NYU</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: Professional Community CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900/80 border border-indigo-500/30 p-6 sm:p-10 md:p-14 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-5">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Give Back To The Next Generation
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Are You An Industry Leader? Host Job Shadowing.
            </h2>
            <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Help passionate students experience your profession firsthand. Set your own availability, choose virtual or in-person sessions, and shape future talent.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/register?role=MENTOR"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-white text-slate-950 hover:bg-slate-100 transition-all shadow-lg hover:scale-105"
              >
                Become a Verified Mentor
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold glass-panel text-white hover:bg-slate-800/80 border border-slate-700 transition-all"
              >
                Learn About Verification & Safety
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        isBookmarked={selectedVideo ? bookmarkedVideos.includes(selectedVideo.id) : false}
        onToggleBookmark={handleToggleBookmarkVideo}
      />

      <BookingModal
        mentor={selectedMentor}
        isOpen={!!selectedMentor}
        onClose={() => setSelectedMentor(null)}
      />
    </div>
  );
}
