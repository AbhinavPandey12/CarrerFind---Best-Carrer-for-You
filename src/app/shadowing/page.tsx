'use client';

import React, { useState, useEffect } from 'react';
import BookingModal from '@/components/BookingModal';
import { track, trackError } from '@/lib/telemetry';
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  Star,
  Calendar,
  Clock,
  Video,
  MapPin,
  Sparkles,
  ExternalLink,
  DollarSign,
  Building,
  CheckCircle2,
  X,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function JobShadowingPage() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<any | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [selectedMode, setSelectedMode] = useState<string>('all'); // all, virtual, in_person
  const [selectedPricing, setSelectedPricing] = useState<string>('all'); // all, free, paid

  const industries = [
    'All',
    'Artificial Intelligence',
    'Medicine & Healthcare',
    'Aviation & Maritime',
    'Law & Government',
    'Enterprise Software',
    'Finance & Investment Banking',
    'CleanTech & Energy Systems',
    'Hospitality & Food',
  ];

  const fetchMentors = async () => {
    try {
      setLoading(true);
      setFetchError(null);
      const url = new URL('/api/shadowing/professionals', window.location.origin);
      if (selectedIndustry !== 'All') url.searchParams.set('industry', selectedIndustry);
      if (selectedMode !== 'all') url.searchParams.set('mode', selectedMode);
      if (selectedPricing !== 'all') url.searchParams.set('isPaid', selectedPricing);
      if (searchTerm) url.searchParams.set('search', searchTerm);

      const res = await fetch(url.toString());
      const data = await res.json();
      setMentors(data.mentors || []);
      track('shadowing_filter_applied', {
        industry: selectedIndustry,
        mode: selectedMode,
        pricing: selectedPricing,
        search: searchTerm || undefined,
        mentorCount: data.mentors?.length || 0,
      });
    } catch (e: any) {
      setFetchError('Failed to load mentors. Please try again.');
      trackError(e, { component: 'JobShadowingPage', action: 'fetchMentors' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, [selectedIndustry, selectedMode, selectedPricing, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-4 h-4" />
            <span>Job Shadowing Marketplace</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Shadow Verified Industry Leaders
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Observe real workdays, participate in technical reviews, and experience corporate cultures firsthand through 1-on-1 virtual or in-person sessions.
          </p>
        </div>

        <Link
          href="/auth/register?role=MENTOR"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all self-start md:self-auto"
        >
          <Building className="w-4 h-4" />
          <span>Apply to Host Shadowing</span>
        </Link>
      </div>

      {/* Safety Notice Ribbon */}
      <div className="p-4 rounded-2xl glass-panel border border-emerald-500/30 bg-emerald-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-emerald-300">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            <strong>Trust & Safety Guarantee:</strong> All hosts undergo identity & employer verification. In-person visits require badge registration and honor corporate confidentiality protocols.
          </span>
        </div>
        <Link href="/about#safety" className="text-emerald-400 font-semibold hover:underline shrink-0">
          Read Safety Protocols →
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by mentor name, role, or company (e.g. DeepMind, Palantir, Stripe)..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto">
            <div className="flex-1 sm:flex-none flex items-center justify-between sm:justify-start gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="text-slate-400">Format:</span>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-slate-900">All Modes</option>
                <option value="virtual" className="bg-slate-900">Virtual Only</option>
                <option value="in_person" className="bg-slate-900">In-Person Only</option>
              </select>
            </div>

            <div className="flex-1 sm:flex-none flex items-center justify-between sm:justify-start gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="text-slate-400">Pricing:</span>
              <select
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-slate-900">Free & Paid</option>
                <option value="free" className="bg-slate-900">Free Only</option>
                <option value="paid" className="bg-slate-900">Paid Tier</option>
              </select>
            </div>
          </div>
        </div>

        {/* Industry Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {industries.map((ind) => {
            const isSelected = selectedIndustry === ind;
            return (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'glass-panel text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                {ind}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mentors Grid */}
      {fetchError && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{fetchError}</span>
          </div>
          <button
            onClick={fetchMentors}
            className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-semibold"
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 rounded-3xl bg-slate-900/60 border border-slate-800" />
          ))}
        </div>
      ) : mentors.length === 0 ? (
        <div className="text-center py-20 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <Users className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No mentors found for this filter</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try broadening your industry or format filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => {
            const slots = mentor.availabilitySlots || [];
            return (
              <div
                key={mentor.id}
                className="rounded-3xl glass-panel p-5 sm:p-6 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Top: Avatar + Verification Status */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <img
                      src={mentor.user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=140&auto=format&fit=crop&q=80'}
                      alt={mentor.user?.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shadow-md"
                    />

                    <div className="flex flex-col items-end gap-1">
                      {mentor.isVerified ? (
                        <span className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          Verified Host
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          Pending Review
                        </span>
                      )}

                      <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{mentor.rating.toFixed(1)}</span>
                        <span className="text-slate-500 text-[10px]">({mentor.reviewsCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Mentor Title & Info */}
                  <h3 className="text-base font-bold text-white leading-tight">{mentor.user?.name}</h3>
                  <p className="text-xs text-emerald-400 font-semibold mt-0.5">{mentor.title}</p>
                  <p className="text-xs text-slate-300 font-medium">{mentor.company} • {mentor.experienceYears} yrs exp</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{mentor.user?.location || 'San Francisco, CA'}</span>
                  </p>

                  {/* About Day in Life */}
                  <div className="mt-4 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      What You Will Shadow & Learn:
                    </span>
                    <p className="text-[11px] text-slate-300 line-clamp-3 leading-relaxed">
                      {mentor.aboutDayInLife}
                    </p>
                  </div>

                  {/* Format & Fee Badges */}
                  <div className="flex flex-wrap items-center gap-2 mt-4 text-[10px]">
                    {mentor.offersVirtual && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                        <Video className="w-3 h-3 text-indigo-400" />
                        Virtual Call
                      </span>
                    )}
                    {mentor.offersInPerson && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-emerald-300 border border-slate-700 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        In-Person
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                      {mentor.isPaid ? `$${mentor.priceAmount} / session` : '100% Free'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                      {mentor.sessionDurationMin} mins
                    </span>
                  </div>
                </div>

                {/* Booking Button */}
                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400">
                    <span className="font-bold text-white">{slots.length}</span> slots available
                  </div>

                  <button
                    onClick={() => {
                      track('booking_modal_opened', { mentorId: mentor.id, mentorName: mentor.user?.name });
                      setSelectedMentor(mentor);
                    }}
                    disabled={slots.length === 0}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/20 transition-all flex items-center gap-1.5 disabled:opacity-40"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Session</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        mentor={selectedMentor}
        isOpen={!!selectedMentor}
        onClose={() => setSelectedMentor(null)}
        onSuccess={fetchMentors}
      />
    </div>
  );
}
