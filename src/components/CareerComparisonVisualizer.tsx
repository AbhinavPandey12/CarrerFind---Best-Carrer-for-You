'use client';

import React from 'react';
import Link from 'next/link';
import {
  X,
  Plus,
  Brain,
  Globe2,
  TrendingUp,
  DollarSign,
  Code2,
  Users,
  ArrowLeftRight,
  ChevronDown,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';

interface CareerComparisonVisualizerProps {
  careers: any[];
  allAvailableCareers?: any[];
  onRemoveCareer?: (slug: string) => void;
  onAddCareer?: (slug: string) => void;
  onReplaceCareer?: (oldSlug: string, newSlug: string) => void;
}

export default function CareerComparisonVisualizer({
  careers,
  allAvailableCareers = [],
  onRemoveCareer,
  onAddCareer,
  onReplaceCareer,
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

  if (careers.length === 0) {
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
              Select 2 to 4 professions from the selector to begin comparing.
            </p>
          </div>

          {remainingCareers.length > 0 && onAddCareer && (
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

        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-slate-800 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
            <TrendingUp className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-bold text-white">No Professions Currently Selected</h4>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Choose careers from the selector above or browse our career library to begin comparing.
          </p>
          <div className="pt-2">
            <Link
              href="/careers"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all"
            >
              <span>Explore All Careers</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            {/* Top row: Profession badge + Replace dropdown + Remove button */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block"
                style={{
                  backgroundColor: `${colors[idx % colors.length]}20`,
                  color: colors[idx % colors.length],
                }}
              >
                Profession {idx + 1}
              </span>

              <div className="flex items-center gap-1.5">
                {/* Replace selector — works on Profession 1, 2, 3, and 4 */}
                {onReplaceCareer && remainingCareers.length > 0 && (
                  <div className="relative inline-flex items-center" title={`Replace ${career.title} with another profession`}>
                    <select
                      aria-label={`Replace ${career.title}`}
                      value=""
                      onChange={(e) => {
                        if (e.target.value) {
                          onReplaceCareer(career.slug, e.target.value);
                        }
                      }}
                      className="appearance-none pl-6 pr-5 py-1 rounded-lg text-[10px] font-semibold glass-panel border border-slate-700/80 hover:border-indigo-500/50 text-slate-300 hover:text-white bg-slate-800/80 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all max-w-[105px] truncate"
                    >
                      <option value="" disabled>Replace...</option>
                      {remainingCareers.map((c) => (
                        <option key={c.slug} value={c.slug} className="bg-slate-900 text-white">
                          {c.title} ({c.category})
                        </option>
                      ))}
                    </select>
                    <ArrowLeftRight className="w-3 h-3 text-indigo-400 absolute left-2 pointer-events-none" />
                    <ChevronDown className="w-2.5 h-2.5 text-slate-400 absolute right-1.5 pointer-events-none" />
                  </div>
                )}

                {/* Remove button — works on Profession 1, 2, 3, and 4 */}
                {onRemoveCareer && (
                  <button
                    type="button"
                    onClick={() => onRemoveCareer(career.slug)}
                    className="p-1 sm:p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                    title={`Remove ${career.title} from comparison`}
                    aria-label={`Remove ${career.title}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-bold text-white leading-tight">{career.title}</h4>
              <p className="text-xs text-slate-400 mt-1">{career.industry}</p>

              {/* Salary Ranges — Entry / Mid / Senior */}
              <div className="mt-3 sm:mt-4 rounded-xl sm:rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
                <div className="px-3 py-2 border-b border-slate-800/80 flex items-center gap-1.5">
                  <DollarSign className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Salary Ranges</span>
                </div>
                <div className="divide-y divide-slate-800/60">
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" /> Entry Level
                    </span>
                    <span className="text-[11px] font-bold text-indigo-300">
                      ${career.entrySalaryMin}k – ${career.entrySalaryMax}k
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" /> Mid Level
                    </span>
                    <span className="text-[11px] font-bold text-purple-300">
                      ${career.midSalaryMin}k – ${career.midSalaryMax}k
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" /> Senior Level
                    </span>
                    <span className="text-[11px] font-bold text-amber-300">
                      ${career.seniorSalaryMin}k – ${career.seniorSalaryMax}k+
                    </span>
                  </div>
                </div>
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

        {/* Career Growth Progression */}
        <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Career Growth Progression</span>
            <span className="text-[10px] text-slate-500 font-normal">— positions you can advance to over time</span>
          </div>
          <div className={`grid gap-4 ${
            careers.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
            careers.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          }`}>
            {careers.map((career, idx) => {
              let stages: string[] = [];
              try { stages = JSON.parse(career.careerProgressionRoadmap || '[]'); } catch {}
              const color = colors[idx % colors.length];
              return (
                <div key={career.slug} className="space-y-2">
                  <h5
                    className="text-[11px] font-bold truncate"
                    style={{ color }}
                  >
                    {career.title}
                  </h5>
                  <div className="relative pl-3">
                    {/* vertical track line */}
                    <div
                      className="absolute left-[5px] top-2 bottom-2 w-px"
                      style={{ backgroundColor: `${color}40` }}
                    />
                    <div className="space-y-3">
                      {stages.length > 0 ? stages.map((stage, i) => {
                        // Split "Title (yrs) — Description" into parts
                        const dashIdx = stage.indexOf(' — ');
                        const titlePart = dashIdx !== -1 ? stage.slice(0, dashIdx) : stage;
                        const descPart  = dashIdx !== -1 ? stage.slice(dashIdx + 3) : '';
                        return (
                          <div key={i} className="flex items-start gap-2 relative">
                            <div
                              className="w-2.5 h-2.5 rounded-full border-2 shrink-0 mt-0.5 z-10 bg-slate-950"
                              style={{ borderColor: color }}
                            />
                            <div className="min-w-0">
                              <p
                                className="text-[11px] font-semibold leading-tight"
                                style={{ color: i === 0 ? '#94a3b8' : i === stages.length - 1 ? color : '#cbd5e1' }}
                              >
                                {titlePart}
                              </p>
                              {descPart && (
                                <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{descPart}</p>
                              )}
                            </div>
                          </div>
                        );
                      }) : (
                        <p className="text-[10px] text-slate-500 italic pl-5">No progression data available</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          SALARY BANDS COMPARISON CHART
      ═══════════════════════════════════════════════════ */}
      <div className="rounded-2xl sm:rounded-3xl glass-panel border border-slate-800 p-4 sm:p-6 overflow-hidden">
        <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-amber-400" />
          <span>Salary Bands Comparison</span>
        </h4>
        <p className="text-[11px] text-slate-400 mb-5">Average annual compensation ($k) across career stages for each profession</p>

        {(() => {
          const salaryData = [
            {
              stage: 'Entry Level',
              ...Object.fromEntries(careers.map((c) => [c.title, Math.round((c.entrySalaryMin + c.entrySalaryMax) / 2)])),
            },
            {
              stage: 'Mid Career',
              ...Object.fromEntries(careers.map((c) => [c.title, Math.round((c.midSalaryMin + c.midSalaryMax) / 2)])),
            },
            {
              stage: 'Senior Level',
              ...Object.fromEntries(careers.map((c) => [c.title, Math.round((c.seniorSalaryMin + c.seniorSalaryMax) / 2)])),
            },
          ];

          const SalaryTooltip = ({ active, payload, label }: any) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs shadow-xl">
                  <p className="text-white font-bold mb-1.5">{label}</p>
                  {payload.map((p: any, i: number) => (
                    <p key={i} style={{ color: p.color }} className="font-semibold">
                      {p.name.length > 24 ? p.name.slice(0, 22) + '…' : p.name}: ~${p.value}k/yr
                    </p>
                  ))}
                </div>
              );
            }
            return null;
          };

          return (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={salaryData} margin={{ top: 4, right: 10, left: -12, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="stage" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} unit="k" />
                <Tooltip content={<SalaryTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                  formatter={(val) => (
                    <span style={{ color: '#cbd5e1' }}>{val.length > 22 ? val.slice(0, 20) + '…' : val}</span>
                  )}
                />
                {careers.map((career, idx) => (
                  <Bar
                    key={career.slug}
                    dataKey={career.title}
                    fill={colors[idx % colors.length]}
                    radius={[5, 5, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          );
        })()}
      </div>

      {/* ═══════════════════════════════════════════════════
          TOP SKILLS NEEDED — TECHNICAL + INTERPERSONAL
      ═══════════════════════════════════════════════════ */}
      <div className="rounded-2xl sm:rounded-3xl glass-panel border border-slate-800 p-4 sm:p-6 space-y-6 overflow-hidden">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-1">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>Top Skills Needed — All Compared Careers</span>
          </h4>
          <p className="text-[11px] text-slate-400">Technical and interpersonal skills required across selected professions</p>
        </div>

        {/* Per-career skills breakdown */}
        <div className={`grid gap-5 ${
          careers.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
          careers.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        }`}>
          {careers.map((career, idx) => {
            let techSkills: string[] = [];
            let softSkills: string[] = [];
            try { techSkills = JSON.parse(career.essentialTechSkills || '[]'); } catch {}
            try { softSkills = JSON.parse(career.essentialSoftSkills || '[]'); } catch {}

            const color = colors[idx % colors.length];

            return (
              <div
                key={career.slug}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 space-y-4"
                style={{ borderTop: `3px solid ${color}` }}
              >
                <h5 className="text-xs font-bold text-white truncate" style={{ color }}>
                  {career.title}
                </h5>

                {/* Technical Skills */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    <Code2 className="w-3 h-3" /> Technical Skills
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {techSkills.slice(0, 8).map((skill, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium border"
                        style={{
                          backgroundColor: `${color}18`,
                          borderColor: `${color}40`,
                          color: color,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                    {techSkills.length === 0 && (
                      <span className="text-[10px] text-slate-500 italic">No data</span>
                    )}
                  </div>
                </div>

                {/* Interpersonal / Soft Skills */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-400">
                    <Users className="w-3 h-3" /> Interpersonal Skills
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {softSkills.slice(0, 8).map((skill, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-rose-950/30 border border-rose-500/25 text-rose-300"
                      >
                        {skill}
                      </span>
                    ))}
                    {softSkills.length === 0 && (
                      <span className="text-[10px] text-slate-500 italic">No data</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Skill Frequency Chart — Technical */}
        {(() => {
          const techFreq: Record<string, number> = {};
          careers.forEach((c) => {
            let skills: string[] = [];
            try { skills = JSON.parse(c.essentialTechSkills || '[]'); } catch {}
            skills.forEach((s) => { techFreq[s] = (techFreq[s] || 0) + 1; });
          });

          const softFreq: Record<string, number> = {};
          careers.forEach((c) => {
            let skills: string[] = [];
            try { skills = JSON.parse(c.essentialSoftSkills || '[]'); } catch {}
            skills.forEach((s) => { softFreq[s] = (softFreq[s] || 0) + 1; });
          });

          const techBarData = Object.entries(techFreq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([skill, count]) => ({ skill: skill.length > 20 ? skill.slice(0, 18) + '…' : skill, count }));

          const softBarData = Object.entries(softFreq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([skill, count]) => ({ skill: skill.length > 20 ? skill.slice(0, 18) + '…' : skill, count }));

          if (techBarData.length === 0 && softBarData.length === 0) return null;

          const SkillTooltip = ({ active, payload, label }: any) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs shadow-xl">
                  <p className="text-white font-bold">{label}</p>
                  <p className="text-indigo-300 font-semibold mt-0.5">
                    Required in {payload[0]?.value} of {careers.length} careers
                  </p>
                </div>
              );
            }
            return null;
          };

          return (
            <div className="pt-2 border-t border-slate-800 space-y-5">
              <h5 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                Most Common Skills Across Compared Careers
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {techBarData.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      <Code2 className="w-3 h-3" /> Technical Skills Frequency
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={techBarData} layout="vertical" margin={{ top: 2, right: 30, left: 10, bottom: 2 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                        <XAxis type="number" domain={[0, careers.length]} tick={{ fill: '#64748b', fontSize: 10 }} allowDecimals={false} />
                        <YAxis type="category" dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 10 }} width={110} />
                        <Tooltip content={<SkillTooltip />} cursor={{ fill: 'rgba(6,182,212,0.07)' }} />
                        <Bar dataKey="count" radius={[0, 5, 5, 0]}>
                          {techBarData.map((_, i) => (
                            <Cell key={i} fill={i === 0 ? '#06b6d4' : i < 3 ? '#22d3ee' : '#67e8f9'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
                {softBarData.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-400">
                      <Users className="w-3 h-3" /> Interpersonal Skills Frequency
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={softBarData} layout="vertical" margin={{ top: 2, right: 30, left: 10, bottom: 2 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                        <XAxis type="number" domain={[0, careers.length]} tick={{ fill: '#64748b', fontSize: 10 }} allowDecimals={false} />
                        <YAxis type="category" dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 10 }} width={110} />
                        <Tooltip content={<SkillTooltip />} cursor={{ fill: 'rgba(244,63,94,0.07)' }} />
                        <Bar dataKey="count" radius={[0, 5, 5, 0]}>
                          {softBarData.map((_, i) => (
                            <Cell key={i} fill={i === 0 ? '#f43f5e' : i < 3 ? '#fb7185' : '#fda4af'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          );
        })()}
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
