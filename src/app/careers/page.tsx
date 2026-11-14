'use client';

import React, { useState, useEffect, Suspense } from 'react';
import CareerCard from '@/components/CareerCard';
import { track, trackError } from '@/lib/telemetry';
import {
  Compass,
  Search,
  Filter,
  Sparkles,
  Layers,
  Building,
  Rocket,
  SlidersHorizontal,
  DollarSign,
  Heart,
  BarChart2,
  X,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function CareersContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [careers, setCareers] = useState<any[]>([]);
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [minSalary, setMinSalary] = useState<number>(0);
  const [minWorkLife, setMinWorkLife] = useState<number>(0);

  const categories = [
    'All',
    'Technology & Engineering',
    'Business & Management',
    'Medicine & Healthcare',
    'Law & Government',
    'Finance & Banking',
    'Education & Research',
    'Engineering & Built Environment',
    'Creative & Media',
    'Aviation & Maritime Operations',
    'Hospitality & Food',
    'Sports & Fitness',
    'Emerging & Other Careers',
  ];

  const fetchCareers = async () => {
    try {
      setLoading(true);
      setFetchError(null);
      const url = new URL('/api/careers', window.location.origin);
      if (selectedCategory !== 'All') {
        url.searchParams.set('category', selectedCategory);
      }
      if (searchTerm) {
        url.searchParams.set('search', searchTerm);
      }

      const res = await fetch(url.toString());
      const data = await res.json();
      setCareers(data.careers || []);
      setSavedSlugs(data.savedSlugs || []);
      track('careers_filter_applied', {
        category: selectedCategory,
        search: searchTerm || undefined,
        minSalary,
        minWorkLife,
        resultCount: data.careers?.length || 0,
      });
    } catch (e: any) {
      setFetchError('Failed to load careers. Please refresh or try again.');
      trackError(e, { component: 'CareersPage', action: 'fetchCareers' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, [selectedCategory, searchTerm]);

  const handleToggleSave = async (slug: string) => {
    try {
      const res = await fetch('/api/careers/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ careerSlug: slug }),
      });
      const data = await res.json();
      if (data.saved) {
        setSavedSlugs((prev) => [...prev, slug]);
        track('career_saved', { slug });
      } else {
        setSavedSlugs((prev) => prev.filter((s) => s !== slug));
        track('career_unsaved', { slug });
      }
    } catch (e: any) {
      trackError(e, { component: 'CareersPage', action: 'handleToggleSave', slug });
    }
  };

  const filteredCareers = careers.filter((c) => {
    if (minSalary > 0 && c.seniorSalaryMax < minSalary) return false;
    if (minWorkLife > 0 && c.workLifeBalance < minWorkLife) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4" />
            <span>Career Exploration Library</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore 70+ Modern Professions across All Fields
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Unpack real daily responsibilities, salary spectrums, technical requirements, work-life balance ratings, and connect directly with mentors working in these roles.
          </p>
        </div>

        <Link
          href="/student/compare"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 transition-all shadow-sm"
        >
          <BarChart2 className="w-4 h-4" />
          <span>Launch Comparison Tool</span>
        </Link>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by role title, technology, or industry keywords (e.g. AI, Palantir, Banking)..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
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
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Min Pay:</span>
              </div>
              <select
                value={minSalary}
                onChange={(e) => setMinSalary(Number(e.target.value))}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
              >
                <option value={0} className="bg-slate-900">Any</option>
                <option value={200} className="bg-slate-900">$200k+</option>
                <option value={300} className="bg-slate-900">$300k+</option>
                <option value={400} className="bg-slate-900">$400k+</option>
              </select>
            </div>

            <div className="flex-1 sm:flex-none flex items-center justify-between sm:justify-start gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Work-Life:</span>
              </div>
              <select
                value={minWorkLife}
                onChange={(e) => setMinWorkLife(Number(e.target.value))}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
              >
                <option value={0} className="bg-slate-900">Any</option>
                <option value={6} className="bg-slate-900">6+/10</option>
                <option value={8} className="bg-slate-900">8+/10 (High)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'glass-panel text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Careers Grid */}
      {fetchError && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{fetchError}</span>
          </div>
          <button
            onClick={fetchCareers}
            className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-semibold"
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 rounded-3xl bg-slate-900/60 border border-slate-800" />
          ))}
        </div>
      ) : filteredCareers.length === 0 ? (
        <div className="text-center py-20 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <SlidersHorizontal className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No careers match your search criteria</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search terms or clearing the salary and work-life balance filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setMinSalary(0);
              setMinWorkLife(0);
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career) => (
            <CareerCard
              key={career.slug}
              career={career}
              isSaved={savedSlugs.includes(career.slug)}
              onToggleSave={handleToggleSave}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CareersPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 animate-pulse text-center text-slate-400">Loading career exploration library...</div>}>
      <CareersContent />
    </Suspense>
  );
}
