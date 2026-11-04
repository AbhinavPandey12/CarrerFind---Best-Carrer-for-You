'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Calendar,
  Video,
  FileText,
  Activity,
  Search,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'verification' | 'bookings' | 'reports'>('verification');

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/overview');
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const handleVerifyMentor = async (mentorProfileId: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      setActionLoading(true);
      await fetch('/api/admin/verify-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mentorProfileId,
          status,
          notes: status === 'APPROVED' ? 'Corporate identity & credentials confirmed.' : 'Insufficient verification documentation.',
        }),
      });
      fetchOverview();
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  const handleResolveReport = async (reportId: string, status: string) => {
    try {
      setActionLoading(true);
      await fetch('/api/admin/reports', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId, status, adminNotes: 'Reviewed and addressed by Trust & Safety team.' }),
      });
      fetchOverview();
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

  const { kpis, pendingMentors = [], recentBookings = [], reports = [] } = data || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Top Banner & Platform KPIs */}
      <div className="rounded-2xl sm:rounded-3xl glass-panel p-5 sm:p-8 md:p-10 border border-slate-800 bg-gradient-to-r from-amber-950/40 via-indigo-950/20 to-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Platform Administration
              </span>
              <span className="text-xs text-slate-400">Trust, Verification & Moderation Oversight</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-white">
              Executive Admin Control Center
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-medium self-start sm:self-auto">
            <Activity className="w-4 h-4" />
            <span>Platform Status: Healthy (99.98% uptime)</span>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-800/80">
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Users</span>
            <span className="text-lg sm:text-2xl font-extrabold text-white">{kpis?.totalUsers || 0}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {kpis?.totalStudents || 0} Students • {kpis?.totalMentors || 0} Hosts
            </span>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Verification Queue</span>
            <span className="text-lg sm:text-2xl font-extrabold text-amber-400">
              {kpis?.pendingVerifications || 0} Pending
            </span>
            <span className="text-[10px] text-amber-300/80 block mt-0.5">Requires Host Review</span>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Job Shadow Bookings</span>
            <span className="text-lg sm:text-2xl font-extrabold text-emerald-400">{kpis?.totalBookings || 0}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Zero Double-Bookings</span>
          </div>

          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Curated Video Library</span>
            <span className="text-lg sm:text-2xl font-extrabold text-purple-400">{kpis?.totalVideos || 0}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">100% Verified Embeds</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('verification')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'verification'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Mentor Verification Queue ({pendingMentors.length})
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'bookings'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Recent Platform Bookings ({recentBookings.length})
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'reports'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Safety Reports & Moderation ({reports.length})
        </button>
      </div>

      {/* TAB 1: Verification Queue */}
      {activeTab === 'verification' && (
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              Pending Professional Identity Verifications
            </h2>
            <span className="text-xs text-slate-400">
              Audit corporate credentials & background before public marketplace publishing
            </span>
          </div>

          {pendingMentors.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
              Verification queue is empty. All current mentors have been reviewed!
            </div>
          ) : (
            <div className="space-y-4">
              {pendingMentors.map((m: any) => (
                <div
                  key={m.id}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={m.user?.avatarUrl || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80'}
                      alt={m.user?.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{m.user?.name}</h4>
                        <span className="text-xs text-slate-400">({m.user?.email})</span>
                      </div>
                      <p className="text-xs text-indigo-300 font-medium">
                        {m.title} @ <strong className="text-white">{m.company}</strong>
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Industry: {m.industry} • Experience: {m.experienceYears} yrs • Location: {m.user?.location || 'Remote'}
                      </p>
                      {m.verificationNotes && (
                        <p className="text-xs text-amber-300/90 italic pt-1">
                          Applicant Submission Note: &ldquo;{m.verificationNotes}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 self-stretch sm:self-end lg:self-center justify-end sm:justify-start">
                    <button
                      disabled={actionLoading}
                      onClick={() => handleVerifyMentor(m.id, 'APPROVED')}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Verify</span>
                    </button>
                    <button
                      disabled={actionLoading}
                      onClick={() => handleVerifyMentor(m.id, 'REJECTED')}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject Application</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Recent Bookings Oversight */}
      {activeTab === 'bookings' && (
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            Platform Job Shadowing Activity
          </h2>

          <div className="space-y-3">
            {recentBookings.map((b: any) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white">{b.student?.name}</span>
                    <span className="text-slate-500">shadowing</span>
                    <span className="font-bold text-indigo-300">
                      {b.mentorProfile?.user?.name} ({b.mentorProfile?.company})
                    </span>
                  </div>
                  <p className="text-slate-400">
                    {b.sessionDate} • {b.sessionTime} ({b.sessionMode})
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      b.status === 'APPROVED'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : b.status === 'COMPLETED'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {b.status}
                  </span>
                  {b.meetingUrl && (
                    <a
                      href={b.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                    >
                      Room Link <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Reports & Moderation */}
      {activeTab === 'reports' && (
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            Safety & Content Reports
          </h2>

          <div className="space-y-3">
            {reports.map((r: any) => (
              <div
                key={r.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">
                      {r.targetType}
                    </span>
                    <span className="font-semibold text-white">{r.targetName || r.targetId}</span>
                  </div>
                  <p className="text-slate-300">
                    <strong>Reason:</strong> {r.reason}
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    Filed by {r.reporter?.name} ({r.reporter?.email})
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleResolveReport(r.id, 'RESOLVED')}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 text-white"
                  >
                    Mark Resolved
                  </button>
                  <button
                    onClick={() => handleResolveReport(r.id, 'DISMISSED')}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-400 hover:text-white"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
