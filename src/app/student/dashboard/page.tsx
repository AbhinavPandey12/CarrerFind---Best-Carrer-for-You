'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  Calendar,
  Bookmark,
  Video,
  BarChart2,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Star,
  Layers,
  Award,
  Video as VideoIcon,
  ChevronRight,
  User,
} from 'lucide-react';
import BookingModal from '@/components/BookingModal';

export default function StudentDashboardPage() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMentor, setSelectedMentor] = useState<any | null>(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/student/dashboard');
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-40 rounded-3xl bg-slate-900/60 border border-slate-800" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 rounded-3xl bg-slate-900/60 border border-slate-800" />
          <div className="h-64 rounded-3xl bg-slate-900/60 border border-slate-800" />
          <div className="h-64 rounded-3xl bg-slate-900/60 border border-slate-800" />
        </div>
      </div>
    );
  }

  const {
    user,
    studentProfile,
    assessmentResult,
    savedCareers = [],
    bookmarkedVideos = [],
    bookings = [],
    featuredMentors = [],
    progressScore = 75,
  } = data || {};

  let recommendedCareersList: any[] = [];
  try {
    if (assessmentResult?.recommendedCareers) {
      recommendedCareersList = JSON.parse(assessmentResult.recommendedCareers);
    }
  } catch (e) {
    recommendedCareersList = [];
  }

  const upcomingBookings = bookings.filter((b: any) => b.status === 'APPROVED' || b.status === 'PENDING');
  const pastBookings = bookings.filter((b: any) => b.status === 'COMPLETED');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Student Welcome Header & Progress Tracker */}
      <div className="rounded-2xl sm:rounded-3xl glass-panel p-5 sm:p-8 md:p-10 border border-slate-800 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80'}
              alt={user?.name}
              className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl object-cover border-2 border-indigo-500/40 shadow-xl"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-3xl font-extrabold text-white">{user?.name}</h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Student Portal
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {user?.headline || 'Junior CS & Cognitive Science Major @ UC Berkeley'}
              </p>
              <p className="text-[11px] text-slate-400">
                Target Graduation: {studentProfile?.targetGraduationYear || 2026} • {studentProfile?.preferredWorkMode || 'Hybrid'}
              </p>
            </div>
          </div>

          {/* Exploration Progress Meter */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 w-full lg:w-auto min-w-0 sm:min-w-[260px] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Exploration Progress
              </span>
              <span className="font-bold text-indigo-400 font-mono">{progressScore}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${progressScore}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 block">
              {progressScore >= 80 ? 'Excellent exploration depth!' : 'Complete your assessment & book a shadow session'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Assessment Matches + Upcoming Sessions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Career Assessment Summary */}
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-400" />
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Assessment Archetype & Recommendations
                </h2>
              </div>
              <Link
                href="/assessment"
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Retake →
              </Link>
            </div>

            {assessmentResult ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-1">
                  <span className="text-xs font-bold text-indigo-300 block">
                    {assessmentResult.archetypeTitle}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {assessmentResult.archetypeSubtitle}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">
                    Top Career Matches
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {recommendedCareersList.slice(0, 4).map((rec: any) => (
                      <Link
                        key={rec.careerSlug}
                        href={`/careers/${rec.careerSlug}`}
                        className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all flex items-center justify-between group"
                      >
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-white group-hover:text-indigo-300">
                            {rec.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 block line-clamp-1">
                            {rec.whyMatch}
                          </span>
                        </div>
                        <span className="text-xs font-extrabold text-indigo-400 ml-2">
                          {rec.compatibilityScore}%
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-3">
                <p className="text-xs text-slate-400">
                  You haven&apos;t taken the career assessment yet.
                </p>
                <Link
                  href="/assessment"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Career Assessment</span>
                </Link>
              </div>
            )}
          </div>

          {/* Upcoming Job Shadowing Sessions */}
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-400" />
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Upcoming & Active Shadowing Sessions
                </h2>
              </div>
              <Link
                href="/shadowing"
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                + Book New Session
              </Link>
            </div>

            {upcomingBookings.length === 0 ? (
              <div className="text-center py-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-2">
                <p className="text-xs text-slate-400">No upcoming shadowing sessions scheduled.</p>
                <Link
                  href="/shadowing"
                  className="inline-block text-xs text-emerald-400 font-semibold hover:underline"
                >
                  Find a mentor to shadow →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingBookings.map((b: any) => (
                  <div
                    key={b.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={b.mentorProfile?.user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                        alt={b.mentorProfile?.user?.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-700"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-white">
                            {b.mentorProfile?.user?.name}
                          </h4>
                          <span
                            className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              b.status === 'APPROVED'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {b.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {b.mentorProfile?.title} @ {b.mentorProfile?.company}
                        </p>
                        <p className="text-[11px] text-indigo-300 font-medium">
                          {b.sessionDate} • {b.sessionTime} ({b.sessionMode})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-stretch sm:self-center justify-end sm:justify-start">
                      {b.meetingUrl ? (
                        <a
                          href={b.meetingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm flex items-center justify-center gap-1.5 w-full sm:w-auto"
                        >
                          <span>Join Meeting</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-slate-400">
                          {b.meetingLocation || 'Location details sent to email'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Completed Experiences & Reviews */}
          {pastBookings.length > 0 && (
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                Completed Shadowing Experiences
              </h2>
              <div className="space-y-3">
                {pastBookings.map((b: any) => (
                  <div key={b.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">
                        {b.mentorProfile?.user?.name} ({b.mentorProfile?.company})
                      </span>
                      <span className="text-slate-400 font-mono">{b.sessionDate}</span>
                    </div>
                    {b.studentFeedback && (
                      <p className="text-xs text-slate-300 italic">&ldquo;{b.studentFeedback}&rdquo;</p>
                    )}
                    {b.mentorFeedback && (
                      <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-[11px] text-indigo-200">
                        <strong>Mentor Note:</strong> {b.mentorFeedback}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (1 Col): Saved Careers, Watchlist & Recommended Mentors */}
        <div className="space-y-8">
          {/* Saved Careers */}
          <div className="rounded-3xl glass-panel p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-indigo-400" />
                Saved Careers ({savedCareers.length})
              </h3>
              <Link href="/careers" className="text-[11px] text-indigo-400 hover:underline">
                Explore more →
              </Link>
            </div>

            {savedCareers.length === 0 ? (
              <p className="text-xs text-slate-400">No saved careers yet.</p>
            ) : (
              <div className="space-y-2">
                {savedCareers.map((c: any) => (
                  <Link
                    key={c.slug}
                    href={`/careers/${c.slug}`}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-indigo-300">
                        {c.title}
                      </h4>
                      <span className="text-[10px] text-slate-400">Up to ${c.seniorSalaryMax}k</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Bookmarked Videos */}
          <div className="rounded-3xl glass-panel p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <VideoIcon className="w-4 h-4 text-purple-400" />
                Bookmarked Videos ({bookmarkedVideos.length})
              </h3>
              <Link href="/videos" className="text-[11px] text-purple-400 hover:underline">
                Video library →
              </Link>
            </div>

            {bookmarkedVideos.length === 0 ? (
              <p className="text-xs text-slate-400">No videos saved to watchlist.</p>
            ) : (
              <div className="space-y-2">
                {bookmarkedVideos.map((v: any) => (
                  <Link
                    key={v.id}
                    href="/videos"
                    className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all flex items-center gap-3 group"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${v.youtubeId}/default.jpg`}
                      alt={v.title}
                      className="w-12 h-8 rounded-lg object-cover"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-white group-hover:text-purple-300 truncate">
                        {v.title}
                      </h4>
                      <span className="text-[10px] text-slate-400">{v.duration}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Recommended Mentors */}
          <div className="rounded-3xl glass-panel p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Recommended Mentors
              </h3>
              <Link href="/shadowing" className="text-[11px] text-emerald-400 hover:underline">
                View all →
              </Link>
            </div>

            <div className="space-y-3">
              {featuredMentors.slice(0, 3).map((m: any) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={m.user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'}
                      alt={m.user?.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{m.user?.name}</h4>
                      <p className="text-[10px] text-slate-400">{m.title} @ {m.company}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedMentor(m)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                  >
                    Shadow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        mentor={selectedMentor}
        isOpen={!!selectedMentor}
        onClose={() => setSelectedMentor(null)}
        onSuccess={fetchDashboard}
      />
    </div>
  );
}
