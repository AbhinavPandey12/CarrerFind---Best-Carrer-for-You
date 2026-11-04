'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  ShieldCheck,
  Calendar,
  Clock,
  Video,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Star,
  Users,
  ExternalLink,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';

export default function MentorDashboardPage() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [feedbackBookingId, setFeedbackBookingId] = useState<string | null>(null);
  const [mentorFeedbackText, setMentorFeedbackText] = useState<string>('');

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/mentor/bookings');
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (bookingId: string, status: string, rejectionReason?: string) => {
    try {
      setActionLoading(true);
      await fetch('/api/mentor/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status, rejectionReason }),
      });
      fetchBookings();
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSubmitFeedback = async (bookingId: string) => {
    try {
      setActionLoading(true);
      await fetch('/api/mentor/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          status: 'COMPLETED',
          mentorFeedback: mentorFeedbackText,
        }),
      });
      setFeedbackBookingId(null);
      setMentorFeedbackText('');
      fetchBookings();
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-44 rounded-3xl bg-slate-900/60 border border-slate-800" />
        <div className="h-80 rounded-3xl bg-slate-900/60 border border-slate-800" />
      </div>
    );
  }

  const { bookings = [], mentorProfile } = data || {};
  const pendingRequests = bookings.filter((b: any) => b.status === 'PENDING');
  const approvedSessions = bookings.filter((b: any) => b.status === 'APPROVED');
  const completedSessions = bookings.filter((b: any) => b.status === 'COMPLETED');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Mentor Header & Stats Banner */}
      <div className="rounded-2xl sm:rounded-3xl glass-panel p-5 sm:p-8 md:p-10 border border-slate-800 bg-gradient-to-r from-emerald-950/40 via-indigo-950/20 to-slate-900">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Mentor Command Center
              </span>
              {mentorProfile?.isVerified ? (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Mentor
                </span>
              ) : (
                <span className="text-[10px] text-amber-400 font-semibold">
                  Verification Pending
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-3xl font-extrabold text-white">
              {mentorProfile?.title} @ {mentorProfile?.company}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {mentorProfile?.industry} • {mentorProfile?.experienceYears} years industry experience
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/mentor/availability"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Manage Availability Slots</span>
            </Link>
          </div>
        </div>

        {/* Quick Performance Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Host Rating</span>
            <span className="text-xl font-bold text-amber-400 flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400" />
              {mentorProfile?.rating.toFixed(1) || '5.0'}
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Pending Requests</span>
            <span className="text-xl font-bold text-white">{pendingRequests.length}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Upcoming Sessions</span>
            <span className="text-xl font-bold text-emerald-400">{approvedSessions.length}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Completed</span>
            <span className="text-xl font-bold text-indigo-400">{completedSessions.length}</span>
          </div>
        </div>
      </div>

      {/* SECTION: Pending Booking Requests */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            Booking Requests Awaiting Your Approval ({pendingRequests.length})
          </h2>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
            No pending booking requests right now. All caught up!
          </div>
        ) : (
          <div className="space-y-3">
            {pendingRequests.map((b: any) => (
              <div
                key={b.id}
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 max-w-2xl">
                  <img
                    src={b.student?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={b.student?.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-700 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{b.student?.name}</h4>
                      <span className="text-[10px] text-slate-400">({b.student?.email})</span>
                    </div>
                    <p className="text-xs text-indigo-300 font-medium">
                      Requested: {b.sessionDate} • {b.sessionTime} ({b.sessionMode})
                    </p>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 italic">
                      &ldquo;{b.studentIntroduction}&rdquo;
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 self-stretch sm:self-end lg:self-center justify-end sm:justify-start">
                  <button
                    disabled={actionLoading}
                    onClick={() => handleUpdateStatus(b.id, 'APPROVED')}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Session</span>
                  </button>
                  <button
                    disabled={actionLoading}
                    onClick={() => handleUpdateStatus(b.id, 'REJECTED', 'Schedule conflict')}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 flex items-center justify-center gap-1.5"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION: Upcoming Approved Sessions */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          Scheduled Job Shadowing Sessions ({approvedSessions.length})
        </h2>

        {approvedSessions.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
            No upcoming approved sessions.
          </div>
        ) : (
          <div className="space-y-3">
            {approvedSessions.map((b: any) => (
              <div
                key={b.id}
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={b.student?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={b.student?.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-700"
                  />
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-white">{b.student?.name}</h4>
                    <p className="text-xs text-indigo-300 font-medium">
                      {b.sessionDate} • {b.sessionTime} ({b.sessionMode})
                    </p>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      Intro: {b.studentIntroduction}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  {b.meetingUrl && (
                    <a
                      href={b.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm flex items-center gap-1.5"
                    >
                      <span>Join Room</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => setFeedbackBookingId(b.id)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                  >
                    Complete & Feedback
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      {feedbackBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl glass-panel border border-slate-700 bg-slate-900 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Provide Feedback to Student</h3>
            <p className="text-xs text-slate-400">
              Share constructive observations on the student’s questions, curiosity, and strengths.
            </p>
            <textarea
              rows={4}
              value={mentorFeedbackText}
              onChange={(e) => setMentorFeedbackText(e.target.value)}
              placeholder="e.g. Alex demonstrated great curiosity about our tensor parallelism stack and asked thoughtful questions..."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setFeedbackBookingId(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmitFeedback(feedbackBookingId)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Submit & Close Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
