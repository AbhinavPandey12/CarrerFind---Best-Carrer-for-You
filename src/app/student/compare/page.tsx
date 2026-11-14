'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CareerComparisonVisualizer from '@/components/CareerComparisonVisualizer';
import { track, trackError } from '@/lib/telemetry';
import { BarChart3, Compass } from 'lucide-react';
import Link from 'next/link';

function CompareContent() {
  const searchParams = useSearchParams();

  const [allCareers, setAllCareers] = useState<any[]>([]);
  const [comparedCareers, setComparedCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/careers');
        const data = await res.json();
        const list = data.careers || [];
        setAllCareers(list);

        const addSlug = searchParams.get('add');
        const slugsToCompare = ['ai-ml-engineer', 'forward-deployed-engineer', 'product-manager'];

        if (addSlug && !slugsToCompare.includes(addSlug)) {
          slugsToCompare.unshift(addSlug);
        }

        const selected = list.filter((c: any) => slugsToCompare.slice(0, 4).includes(c.slug));
        setComparedCareers(selected.length >= 2 ? selected : list.slice(0, 3));
        track('compare_viewed', { initialCount: selected.length });
      } catch (e: any) {
        trackError(e, { component: 'ComparePage', action: 'fetchCareers' });
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, [searchParams]);

  const handleAddCareer = (slug: string) => {
    if (comparedCareers.length >= 4) return;
    const target = allCareers.find((c) => c.slug === slug);
    if (target && !comparedCareers.some((c) => c.slug === slug)) {
      track('compare_career_added', { slug });
      setComparedCareers([...comparedCareers, target]);
    }
  };

  const handleRemoveCareer = (slug: string) => {
    if (comparedCareers.length <= 2) return;
    track('compare_career_removed', { slug });
    setComparedCareers(comparedCareers.filter((c) => c.slug !== slug));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <BarChart3 className="w-4 h-4" />
            <span>Multi-Parameter Evaluation Tool</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Compare Careers Side by Side
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Evaluate 2 to 4 professions across compensation trajectories, learning difficulty, entry hiring barriers, mathematical rigor, and work-life balance.
          </p>
        </div>

        <Link
          href="/careers"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold glass-panel text-slate-300 hover:text-white border border-slate-700 transition-all self-start md:self-auto"
        >
          <Compass className="w-4 h-4" />
          <span>Browse Career Library</span>
        </Link>
      </div>

      {loading ? (
        <div className="h-96 rounded-3xl glass-panel animate-pulse bg-slate-900/60 border border-slate-800" />
      ) : (
        <CareerComparisonVisualizer
          careers={comparedCareers}
          allAvailableCareers={allCareers}
          onAddCareer={handleAddCareer}
          onRemoveCareer={handleRemoveCareer}
        />
      )}
    </div>
  );
}

export default function CareerComparePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">Loading career comparison tool...</div>}>
      <CompareContent />
    </Suspense>
  );
}
