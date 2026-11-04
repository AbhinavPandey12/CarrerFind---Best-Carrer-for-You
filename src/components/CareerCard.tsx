'use client';

import React from 'react';
import Link from 'next/link';
import {
  Cpu,
  Compass,
  Bot,
  LayoutGrid,
  Briefcase,
  TrendingUp,
  Sun,
  Code,
  Shield,
  Rocket,
  BadgeDollarSign,
  Palette,
  Video,
  ArrowRight,
  Bookmark,
  Sparkles,
  BarChart2,
  Database,
  Binary,
  Server,
  GitPullRequest,
  Users,
  Layers,
  Megaphone,
  Landmark,
  Calculator,
  Building,
  Building2,
  Truck,
  HardHat,
  Plane,
  Radar,
  Flame,
  Ship,
  Globe,
  Wrench,
  Zap,
  Stethoscope,
  Activity,
  HeartPulse,
  Pill,
  Dog,
  Brain,
  Scale,
  ShieldAlert,
  Award,
  GraduationCap,
  Microscope,
  Paintbrush,
  Newspaper,
  Clapperboard,
  Music,
  Camera,
  UserCheck,
  Calendar,
  Utensils,
  Trophy,
  Target,
  Dumbbell,
} from 'lucide-react';

interface CareerCardProps {
  career: any;
  isSaved?: boolean;
  onToggleSave?: (slug: string) => void;
}

const iconMap: Record<string, any> = {
  Cpu,
  Compass,
  Bot,
  LayoutGrid,
  Briefcase,
  TrendingUp,
  Sun,
  Code,
  Shield,
  Rocket,
  BadgeDollarSign,
  Palette,
  Video,
  Database,
  Binary,
  Server,
  GitPullRequest,
  Users,
  Layers,
  Megaphone,
  Landmark,
  Calculator,
  Building,
  Building2,
  Truck,
  HardHat,
  Plane,
  Radar,
  Flame,
  Ship,
  Globe,
  Wrench,
  Zap,
  Stethoscope,
  Activity,
  HeartPulse,
  Pill,
  Dog,
  Brain,
  Scale,
  ShieldAlert,
  Award,
  GraduationCap,
  Microscope,
  Paintbrush,
  Newspaper,
  Clapperboard,
  Music,
  Camera,
  UserCheck,
  Calendar,
  Utensils,
  Trophy,
  Target,
  Dumbbell,
};

export default function CareerCard({ career, isSaved = false, onToggleSave }: CareerCardProps) {
  const IconComponent = iconMap[career.iconName] || Briefcase;

  const getCategoryColor = (cat: string) => {
    if (!cat) return 'badge-emerging';
    if (cat.includes('Technology')) return 'badge-tech';
    if (cat.includes('Business')) return 'badge-business';
    if (cat.includes('Medicine') || cat.includes('Health')) return 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30';
    if (cat.includes('Finance') || cat.includes('Banking')) return 'bg-amber-500/15 text-amber-300 border border-amber-500/30';
    if (cat.includes('Law') || cat.includes('Government')) return 'bg-rose-500/15 text-rose-300 border border-rose-500/30';
    if (cat.includes('Education') || cat.includes('Research')) return 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30';
    if (cat.includes('Engineering') || cat.includes('Environment')) return 'bg-blue-500/15 text-blue-300 border border-blue-500/30';
    if (cat.includes('Creative') || cat.includes('Media')) return 'bg-purple-500/15 text-purple-300 border border-purple-500/30';
    if (cat.includes('Aviation') || cat.includes('Maritime')) return 'bg-sky-500/15 text-sky-300 border border-sky-500/30';
    if (cat.includes('Hospitality') || cat.includes('Food')) return 'bg-orange-500/15 text-orange-300 border border-orange-500/30';
    if (cat.includes('Sports') || cat.includes('Fitness')) return 'bg-teal-500/15 text-teal-300 border border-teal-500/30';
    return 'badge-emerging';
  };

  return (
    <div className="group relative rounded-2xl sm:rounded-3xl glass-panel p-5 sm:p-6 border border-slate-800/90 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
      <div>
        {/* Top bar: Category + Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${getCategoryColor(career.category)}`}>
            {career.category}
          </span>

          <div className="flex items-center gap-1.5">
            {onToggleSave && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleSave(career.slug);
                }}
                className={`p-2 rounded-xl border transition-all ${
                  isSaved
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-white'
                }`}
                title={isSaved ? 'Remove from Saved' : 'Save Career'}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-indigo-400' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Title & Icon */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-950/60 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 group-hover:border-indigo-500/50 transition-all shrink-0">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
              {career.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{career.industry}</p>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {career.shortDescription}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 mb-4 text-[11px]">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Compensation</span>
            <span className="font-bold text-slate-100">
              ${career.entrySalaryMin}k - ${career.seniorSalaryMax}k
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Work-Life Balance</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-400"
                  style={{ width: `${(career.workLifeBalance / 10) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-300 font-medium">{career.workLifeBalance}/10</span>
            </div>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Tech Depth</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-400"
                  style={{ width: `${(career.technicalComplexity / 10) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-300 font-medium">{career.technicalComplexity}/10</span>
            </div>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Future Demand</span>
            <span className="font-bold text-indigo-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              {career.futureDemandScore >= 9 ? 'Very High' : 'High'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <Link
          href={`/student/compare?add=${career.slug}`}
          className="text-[11px] font-medium text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1"
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>Compare</span>
        </Link>

        <Link
          href={`/careers/${career.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors"
        >
          <span>Explore Profile</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
