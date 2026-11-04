'use client';

import React from 'react';
import Link from 'next/link';
import {
  X,
  Plus,
  Brain,
  Globe2,
  TrendingUp,
} from 'lucide-react';

interface CareerComparisonVisualizerProps {
  careers: any[];
  allAvailableCareers?: any[];
  onRemoveCareer?: (slug: string) => void;
  onAddCareer?: (slug: string) => void;
}

export default function CareerComparisonVisualizer({
  careers,
  allAvailableCareers = [],
  onRemoveCareer,
  onAddCareer,
}: CareerComparisonVisualizerProps) {
  const [selectedToAdd, setSelectedToAdd] = React.useState('');

  const handleAdd = () => {
    if (selectedToAdd && onAddCareer) {
      onAddCareer(selectedToAdd);
      setSelectedToAdd('');
    }
  };

  const remainingCareers = allAvailableCareers.filter(
    (c) => !careers.some((current) => current.slug === c.slug)
  );

  const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b'];

  const metrics = [
    { label: 'Technical Complexity', key: 'technicalComplexity', max: 10, unit: '/10' },
    { label: 'Math Requirements', key: 'mathRequirements', max: 10, unit: '/10' },
    { label: 'Learning Curve Difficulty', key: 'learningDifficulty', max: 10, unit: '/10' },
    { label: 'First Job Difficulty', key: 'entryJobDifficulty', max: 10, unit: '/10' },
    { label: 'Work Pressure', key: 'workPressure', max: 10, unit: '/10' },
    { label: 'Work-Life Balance', key: 'workLifeBalance', max: 10, unit: '/10' },
    { label: 'Remote Flexibility', key: 'remoteOpportunities', max: 10, unit: '/10' },
    { label: 'Future Demand Score', key: 'futureDemandScore', max: 10, unit: '/10' },
  ];

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[Math.min(careers.length, 4)] || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Selector Header Bar */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-panel border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span>Side-by-Side Comparison</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Comparing {careers.length} of up to 4 selected professions simultaneously.
          </p>
        </div>

        {careers.length < 4 && remainingCareers.length > 0 && onAddCareer && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedToAdd}
              onChange={(e) => setSelectedToAdd(e.target.value)}
              className="flex-1 sm:w-60 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">+ Add profession to compare...</option>
              {remainingCareers.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title} ({c.category})
                </option>
              ))}
            </select>
            <button
              onClick={handleAdd}
              disabled={!selectedToAdd}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 transition-all flex items-center gap-1 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        )}
      </div>

      {/* Comparison Grid Header */}
      <div className={`grid ${gridColsClass} gap-4`}>
        {careers.map((career, idx) => (
          <div
            key={career.slug}
            className="rounded-2xl sm:rounded-3xl glass-panel p-4 sm:p-5 border border-slate-800 relative hover:border-slate-700 transition-all flex flex-col justify-between"
            style={{ borderTop: `4px solid ${colors[idx % colors.length]}` }}
          >
            {onRemoveCareer && careers.length > 2 && (
              <button
                onClick={() => onRemoveCareer(career.slug)}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                title="Remove from comparison"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <div>
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-2"
                style={{
                  backgroundColor: `${colors[idx % colors.length]}20`,
                  color: colors[idx % colors.length],
                }}
              >
                Profession {idx + 1}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white leading-tight">{career.title}</h4>
              <p className="text-xs text-slate-400 mt-1">{career.industry}</p>

              {/* Salary Summary Pill */}
              <div className="mt-3 sm:mt-4 p-3 rounded-xl sm:rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                  Salary Spectrum
                </span>
                <p className="text-xs sm:text-sm font-bold text-white">
                  ${career.entrySalaryMin}k <span className="text-slate-500 font-normal">to</span> ${career.seniorSalaryMax}k+
                </p>
                <span className="text-[10px] text-indigo-300 block">Mid-Career: ~${career.midSalaryMin}k - ${career.midSalaryMax}k</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <Link
                href={`/careers/${career.slug}`}
                className="text-xs font-semibold text-indigo-400 hover:underline flex items-center justify-between"
              >
                <span>Full Career Profile</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Numerical & Graphical Matrix */}
      <div className="rounded-2xl sm:rounded-3xl glass-panel border border-slate-800 p-4 sm:p-6 overflow-hidden">
        <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4 sm:mb-6 flex items-center gap-2">
          <Brain className="w-4 h-4 text-indigo-400" />
          <span>Dimension Breakdown</span>
        </h4>

        <div className="space-y-5 sm:space-y-6">
          {metrics.map((metric) => (
            <div key={metric.key} className="space-y-2 pb-4 sm:pb-5 border-b border-slate-800/80 last:border-0 last:pb-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">{metric.label}</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400">Scale 1-10</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                {careers.map((career, idx) => {
                  const val = career[metric.key] || 5;
                  const pct = (val / metric.max) * 100;
                  return (
                    <div key={career.slug} className="p-2 sm:p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-slate-400 truncate max-w-[130px]">{career.title}</span>
                        <span className="font-bold text-white" style={{ color: colors[idx % colors.length] }}>
                          {val}
                          {metric.unit}
                        </span>
                      </div>
                      <div className="w-full h-1.5 sm:h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: colors[idx % colors.length],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side-by-Side Deep Qualitative Matrix with Horizontal Scroll on Mobile */}
      <div className="rounded-2xl sm:rounded-3xl glass-panel border border-slate-800 p-4 sm:p-6 overflow-hidden">
        <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-purple-400" />
          <span>Qualitative Environment & Opportunities</span>
        </h4>

        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full min-w-[550px] text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 sm:py-3 px-3 sm:px-4 font-semibold w-1/4">Parameter</th>
                {careers.map((c, idx) => (
                  <th key={c.slug} className="py-2.5 sm:py-3 px-3 sm:px-4 font-bold text-white" style={{ color: colors[idx % colors.length] }}>
                    {c.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              <tr>
                <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-medium text-slate-300">Typical Work Mode</td>
                {careers.map((c) => (
                  <td key={c.slug} className="py-2.5 sm:py-3 px-3 sm:px-4 text-slate-200">
                    {c.typicalWorkEnvironment}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-medium text-slate-300">Required Education</td>
                {careers.map((c) => (
                  <td key={c.slug} className="py-2.5 sm:py-3 px-3 sm:px-4 text-slate-300">
                    {c.requiredEducation}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-medium text-slate-300">Future Demand Growth</td>
                {careers.map((c) => (
                  <td key={c.slug} className="py-2.5 sm:py-3 px-3 sm:px-4 text-indigo-300 font-medium">
                    {c.futureDemandOutlook}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-medium text-slate-300">International Mobility</td>
                {careers.map((c) => (
                  <td key={c.slug} className="py-2.5 sm:py-3 px-3 sm:px-4 text-slate-300 leading-relaxed">
                    {c.internationalOpportunities}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
