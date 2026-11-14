'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import VideoModal from '@/components/VideoModal';
import BookingModal from '@/components/BookingModal';
import { track, trackError } from '@/lib/telemetry';
import {
  Compass,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Brain,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  BarChart3,
  Bookmark,
  Share2,
  Play,
  Briefcase,
  Layers,
  GraduationCap,
  Wrench,
  Globe2,
  AlertTriangle,
  Heart,
  ChevronRight,
  Users,
  Video,
  Star,
  Eye,
  Activity,
  Flame,
  Award,
  BookOpen,
  Send,
  Building,
  Check,
} from 'lucide-react';

interface CareerDetailClientProps {
  career: any;
  relatedVideos: any[];
  relatedMentors: any[];
}

type TabType = 'overview' | 'day-in-life' | 'job-shadowing' | 'skills' | 'compensation';

interface TimelineEvent {
  time: string;
  phase: string;
  description: string;
  iconType: 'morning' | 'midday' | 'afternoon' | 'evening';
}

function parseDayInLifeTimeline(text: string): TimelineEvent[] {
  if (!text) return [];
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  return lines.map((line, index) => {
    const timeMatch = line.match(/^(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)\s*[-:—]\s*(.*)$/i);
    let time = '';
    let description = line;
    if (timeMatch) {
      time = timeMatch[1].trim();
      description = timeMatch[2].trim();
    } else {
      time = index === 0 ? '09:00 AM' : index === 1 ? '11:00 AM' : index === 2 ? '02:00 PM' : '05:00 PM';
    }

    let phase = 'Operational Execution';
    let iconType: 'morning' | 'midday' | 'afternoon' | 'evening' = 'midday';

    const timeLower = time.toLowerCase();
    if (timeLower.includes('am') || index <= 1) {
      iconType = 'morning';
      phase = index === 0 ? 'Morning Kickoff & Standup' : 'Deep Technical / Creative Focus';
    } else if (
      timeLower.includes('pm') &&
      (timeLower.startsWith('12') || timeLower.startsWith('1') || timeLower.startsWith('2'))
    ) {
      iconType = 'midday';
      phase = 'Production Delivery & Core Tasks';
    } else if (timeLower.includes('pm') && (timeLower.startsWith('3') || timeLower.startsWith('4'))) {
      iconType = 'afternoon';
      phase = 'Cross-Functional Strategy & Review';
    } else {
      iconType = 'evening';
      phase = 'Review, Deployments & Handover';
    }

    return { time, phase, description, iconType };
  });
}

export default function CareerDetailClient({
  career,
  relatedVideos,
  relatedMentors,
}: CareerDetailClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<any | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [customHostRequested, setCustomHostRequested] = useState<boolean>(false);

  // Check URL parameters for active tab
  useEffect(() => {
    track('career_profile_viewed', { slug: career.slug, title: career.title, category: career.category });
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam === 'day-in-life' || tabParam === 'dayinlife') {
        setActiveTab('day-in-life');
      } else if (tabParam === 'shadowing' || tabParam === 'job-shadowing') {
        setActiveTab('job-shadowing');
      } else if (tabParam === 'skills') {
        setActiveTab('skills');
      } else if (tabParam === 'compensation') {
        setActiveTab('compensation');
      } else if (window.location.hash === '#mentors' || window.location.hash === '#shadowing') {
        setActiveTab('job-shadowing');
      } else if (window.location.hash === '#day-in-life') {
        setActiveTab('day-in-life');
      }
    }
  }, [career.slug]);

  // Safe parsing helper
  const parseJsonArray = (data: any, fallback: string[] = []): string[] => {
    if (!data) return fallback;
    if (Array.isArray(data)) return data;
    try {
      return JSON.parse(data);
    } catch (e) {
      return fallback;
    }
  };

  const responsibilities = parseJsonArray(career.dailyResponsibilities, [
    'Design and implement robust architectural solutions',
    'Collaborate with cross-functional team members',
  ]);
  const techSkills = parseJsonArray(career.essentialTechSkills, ['Technical Foundations']);
  const softSkills = parseJsonArray(career.essentialSoftSkills, ['Communication', 'Critical Thinking']);
  const tools = parseJsonArray(career.toolsAndTechnologies, ['Industry Standard Tools']);
  const advantages = parseJsonArray(career.advantages, ['High intellectual engagement']);
  const disadvantages = parseJsonArray(career.disadvantages, ['Demanding continuous learning']);
  const roadmapStages = parseJsonArray(career.careerProgressionRoadmap, [
    'Junior Role (1-2 yrs)',
    'Mid-Level (3-5 yrs)',
    'Senior (5-8 yrs)',
    'Leadership / Staff (8+ yrs)',
  ]);

  const timelineEvents = parseDayInLifeTimeline(career.dayInLife);

  const handleToggleSave = async () => {
    try {
      const res = await fetch('/api/careers/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ careerSlug: career.slug }),
      });
      const data = await res.json();
      setIsSaved(data.saved);
      track(data.saved ? 'career_saved' : 'career_unsaved', { slug: career.slug });
    } catch (e: any) {
      trackError(e, { component: 'CareerDetailClient', action: 'handleToggleSave', slug: career.slug });
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      track('career_link_shared', { slug: career.slug });
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleSwitchTab = (tab: TabType) => {
    setActiveTab(tab);
    track('career_tab_switched', { slug: career.slug, tab });
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      window.history.replaceState({}, '', url.toString());
      const tabElement = document.getElementById('career-tabs-anchor');
      if (tabElement) {
        tabElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Careers</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl glass-panel border border-slate-800 text-slate-400 hover:text-white text-xs flex items-center gap-1.5 transition-all"
            title="Copy share link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
          <button
            onClick={handleToggleSave}
            className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
              isSaved
                ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                : 'glass-panel border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-indigo-400' : ''}`} />
            <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save Career'}</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: Career Overview Hero Header */}
      <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full badge-tech">
                {career.category}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-300 font-medium">{career.industry}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {career.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {career.overview}
            </p>
          </div>

          {/* Quick CTA Box */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => handleSwitchTab('day-in-life')}
              className="px-5 py-3 rounded-2xl text-xs font-semibold bg-purple-600/90 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 transition-all"
            >
              <Clock className="w-4 h-4" />
              <span>A Day in the Life</span>
            </button>

            <button
              onClick={() => handleSwitchTab('job-shadowing')}
              className="px-5 py-3 rounded-2xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Job Shadowing</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-800/80">
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Entry Salary</span>
            <span className="text-base sm:text-lg font-bold text-emerald-400">
              ${career.entrySalaryMin}k - ${career.entrySalaryMax}k
            </span>
          </div>
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Senior Compensation</span>
            <span className="text-base sm:text-lg font-bold text-indigo-400">
              ${career.seniorSalaryMin}k - ${career.seniorSalaryMax}k+
            </span>
          </div>
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Work-Life Balance</span>
            <span className="text-base sm:text-lg font-bold text-white">{career.workLifeBalance}/10</span>
          </div>
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Future Demand</span>
            <span className="text-base sm:text-lg font-bold text-purple-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {career.futureDemandScore >= 9 ? 'Tier 1 Surge' : 'High Growth'}
            </span>
          </div>
        </div>
      </div>

      {/* ANCHOR & TAB NAVIGATION BAR */}
      <div id="career-tabs-anchor" className="pt-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
          <button
            onClick={() => handleSwitchTab('overview')}
            className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-panel text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Overview & Dossier</span>
          </button>

          <button
            onClick={() => handleSwitchTab('day-in-life')}
            className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'day-in-life'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                : 'glass-panel text-purple-300 hover:text-white hover:bg-slate-800/60 border border-purple-500/30'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>A Day in the Life</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-950/80 text-purple-200 border border-purple-500/30 font-bold">
              Timeline & Video
            </span>
          </button>

          <button
            onClick={() => handleSwitchTab('job-shadowing')}
            className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'job-shadowing'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                : 'glass-panel text-emerald-300 hover:text-white hover:bg-slate-800/60 border border-emerald-500/30'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Job Shadowing</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-200 border border-emerald-500/30 font-bold">
              {relatedMentors.length} Hosts
            </span>
          </button>

          <button
            onClick={() => handleSwitchTab('skills')}
            className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'skills'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-panel text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Skills & Roadmap</span>
          </button>

          <button
            onClick={() => handleSwitchTab('compensation')}
            className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'compensation'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'glass-panel text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Compensation & Culture</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: OVERVIEW & FULL DOSSIER                                            */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          {/* Quick Tab Promotion Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              onClick={() => handleSwitchTab('day-in-life')}
              className="cursor-pointer group p-6 rounded-3xl glass-panel border border-purple-500/30 bg-purple-950/15 hover:border-purple-400 hover:bg-purple-950/25 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  Explore Hour-by-Hour Workday
                </span>
                <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                Open &ldquo;A Day in the Life&rdquo; Tab →
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Walk through an authentic chronological timeline of {career.title}, from morning kickoff to evening deliverables, with video documentaries.
              </p>
            </div>

            <div
              onClick={() => handleSwitchTab('job-shadowing')}
              className="cursor-pointer group p-6 rounded-3xl glass-panel border border-emerald-500/30 bg-emerald-950/15 hover:border-emerald-400 hover:bg-emerald-950/25 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Direct 1-on-1 Observation
                </span>
                <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                Open &ldquo;Job Shadowing&rdquo; Tab →
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Connect directly with verified experts in {career.industry} to shadow live meetings, inspect codebases, or review real work.
              </p>
            </div>
          </div>

          {/* SECTION 2 & 4: Daily Responsibilities & Work Environment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                Daily Responsibilities
              </h2>
              <p className="text-xs text-slate-400">
                Core activities you execute on a daily basis in this profession:
              </p>
              <div className="space-y-3 pt-2">
                {responsibilities.map((resp, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 leading-relaxed">{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                Typical Work Environment
              </h2>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-sm font-bold text-indigo-300">{career.typicalWorkEnvironment}</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Remote work opportunity rating: <span className="text-white font-semibold">{career.remoteOpportunities}/10</span>.
                  Operational rhythm balances focus blocks with collaborative reviews.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  Education & Baseline Credentials
                </h3>
                <span className="text-xs font-semibold text-slate-200 block">{career.entryEducationRequirements}</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Recommended Certifications: <span className="text-slate-300">{career.certificationsOrDegrees}</span>
                </p>
              </div>
            </div>
          </div>

          {/* SECTION: Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Career Advantages & Strengths
              </h2>
              <div className="space-y-3">
                {advantages.map((adv, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200">{adv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Challenges & Realistic Trade-offs
              </h2>
              <div className="space-y-3">
                {disadvantages.map((dis, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-rose-950/20 border border-rose-500/20">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200">{dis}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: A DAY IN THE LIFE (SUPERCHARGED TIMELINE & WORKDAY REALITY)       */}
      {/* ========================================================================= */}
      {activeTab === 'day-in-life' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          {/* Header Banner */}
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-purple-500/30 bg-purple-950/15 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] font-bold uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Workday Chronology & Operation</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  A Day in the Life of a {career.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Real careers are defined by their daily problem-solving cadence, cognitive shifts, and unexpected triage. Walk through an authentic hour-by-hour workday schedule.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/30 flex items-center gap-4 shrink-0">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Work Pressure</span>
                  <span className="text-lg font-bold text-purple-300">{career.workPressure}/10</span>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Typical Schedule</span>
                  <span className="text-xs font-semibold text-slate-200 block">8:30 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            {/* Daily Execution Rhythm Allocation Bar */}
            <div className="mt-6 pt-6 border-t border-purple-500/20">
              <span className="text-xs font-bold text-white block mb-2">Estimated Daily Time Allocation:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-indigo-400 font-bold block text-sm">45%</span>
                  <span className="text-[11px] text-slate-300 font-medium">Core Deep Execution</span>
                  <span className="text-[10px] text-slate-500 block">Heads-down craft & production</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-purple-400 font-bold block text-sm">25%</span>
                  <span className="text-[11px] text-slate-300 font-medium">Team Syncs & Reviews</span>
                  <span className="text-[10px] text-slate-500 block">Standups, planning & feedback</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-amber-400 font-bold block text-sm">15%</span>
                  <span className="text-[11px] text-slate-300 font-medium">Problem Triage</span>
                  <span className="text-[10px] text-slate-500 block">Unblocking bugs & anomalies</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-emerald-400 font-bold block text-sm">15%</span>
                  <span className="text-[11px] text-slate-300 font-medium">Strategy & Learning</span>
                  <span className="text-[10px] text-slate-500 block">Reading docs, skills & roadmap</span>
                </div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE HOUR-BY-HOUR WORKDAY TIMELINE */}
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                Chronological Hour-by-Hour Workday Breakdown
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                From morning systems check to end-of-day sign-off:
              </p>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-6 border-l-2 border-purple-500/30">
              {timelineEvents.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node Badge */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-purple-500 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
                    <span className="text-[10px] font-bold">{idx + 1}</span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 transition-all space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold font-mono">
                          {item.time}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {item.phase}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                        {item.iconType} cycle
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Workday Narrative Context */}
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Full Workday Narrative Description
            </h3>
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 whitespace-pre-line text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              {career.dayInLife}
            </div>
          </div>

          {/* CURATED WORKDAY DOCUMENTARY VIDEOS */}
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Play className="w-5 h-5 text-purple-400" />
                  Watch &ldquo;A Day in the Life&rdquo; Video Documentaries
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Authentic workday captures showing real screens, client debates, and physical environments:
                </p>
              </div>
              <Link href="/videos" className="text-xs text-purple-400 hover:underline">
                Explore all platform videos →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="group cursor-pointer rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 flex items-center justify-center transition-colors">
                        <div className="w-12 h-12 rounded-full bg-purple-600/90 group-hover:bg-purple-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-sm text-[10px] font-semibold text-white">
                        {video.duration}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                        {video.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        By {video.creator} ({video.channelName})
                      </p>
                      <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-1">
                    <span className="text-[11px] font-semibold text-purple-400 group-hover:underline flex items-center gap-1">
                      <span>Click to watch documentary</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: JOB SHADOWING (1-ON-1 SESSIONS WITH VERIFIED MENTORS)             */}
      {/* ========================================================================= */}
      {activeTab === 'job-shadowing' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          {/* Header Banner */}
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-emerald-500/30 bg-emerald-950/15 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>1-on-1 Workplace Observation</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Job Shadowing in {career.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Don&rsquo;t commit years of tuition and career pivots based on assumptions. Shadow verified practitioners in real corporate, clinical, field, and studio environments.
                </p>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <Link
                  href="/shadowing"
                  className="px-5 py-3 rounded-2xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all"
                >
                  <Users className="w-4 h-4" />
                  <span>Browse Full Marketplace</span>
                </Link>
                <span className="text-[10px] text-center text-slate-400">
                  100% Free Educational Tier
                </span>
              </div>
            </div>

            {/* 4 LEARNING PILLARS (WHAT YOU WILL EXPERIENCE) */}
            <div className="mt-8 pt-8 border-t border-emerald-500/20">
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-4">
                What You Experience During a Job Shadowing Session:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs mb-2">
                    1
                  </div>
                  <h4 className="font-bold text-white">Live Workday Observation</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Sit in on authentic client calls, code reviews, design critiques, or shift handoffs.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs mb-2">
                    2
                  </div>
                  <h4 className="font-bold text-white">Production Tool Inspection</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    See internal repositories, CAD models, telemetry dashboards, and proprietary pipelines.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs mb-2">
                    3
                  </div>
                  <h4 className="font-bold text-white">Unfiltered Q&A Reality Check</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Ask candid questions regarding hours, stress levels, compensation, and office culture.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs mb-2">
                    4
                  </div>
                  <h4 className="font-bold text-white">Resume & Portfolio Audit</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Get actionable feedback from someone who actually hires and interviews for this exact title.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* VERIFIED MENTORS & HOST CARDS */}
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  Verified Industry Professionals Available to Shadow
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Connect with practitioners working in {career.industry} and related disciplines:
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Instant Scheduling Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={
                          mentor.user?.avatarUrl ||
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
                        }
                        alt={mentor.user?.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-white">{mentor.user?.name}</h4>
                          {mentor.isVerified && (
                            <span title="Verified Host">
                              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-emerald-400 font-semibold line-clamp-1">{mentor.title}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{mentor.company}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-400 py-1 border-y border-slate-800">
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {mentor.rating || 4.9}
                      </span>
                      <span>•</span>
                      <span>{mentor.reviewsCount || 18} reviews</span>
                      <span>•</span>
                      <span>{mentor.experienceYears}+ yrs exp</span>
                    </div>

                    <p className="text-[11px] text-slate-300 line-clamp-3 leading-relaxed">
                      &ldquo;{mentor.aboutDayInLife}&rdquo;
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Format: Virtual / In-Person</span>
                      <span className="text-emerald-400 font-semibold">{mentor.sessionDurationMin || 45} mins</span>
                    </div>

                    <button
                      onClick={() => setSelectedMentor(mentor)}
                      className="w-full py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Job Shadowing</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Host Request Box */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Looking for a host in a specific niche of {career.title}?
                </h4>
                <p className="text-xs text-slate-400">
                  Our academic partnership team matches university students with practitioners in specialized sub-disciplines.
                </p>
              </div>

              <button
                onClick={() => setCustomHostRequested(true)}
                disabled={customHostRequested}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  customHostRequested
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                    : 'glass-panel hover:bg-slate-800 text-white border border-slate-700'
                }`}
              >
                {customHostRequested ? (
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Request Logged!
                  </span>
                ) : (
                  <span>Request Custom Host Match</span>
                )}
              </button>
            </div>
          </div>

          {/* Safety & Trust Protocols */}
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Safety, Privacy & Institutional Verification Standards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200 block">Verified Corporate Domains</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Every host must verify their institutional email, active employment tier, and LinkedIn profile before hosting students.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200 block">Non-Disclosure Protocol</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Sessions are strictly educational observation. Students agree not to share proprietary code, patient data, or trade secrets.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200 block">Zero-Cost Guarantee</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  All educational student shadowing tiers are sponsored by university career networks and corporate outreach programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: SKILLS & PROGRESSION ROADMAP                                       */}
      {/* ========================================================================= */}
      {activeTab === 'skills' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          {/* SECTION 6 & 7: Essential Technical & Soft Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-400" />
                Technical Foundations & Hard Skills
              </h2>
              <div className="flex flex-wrap gap-2 pt-2">
                {techSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs font-semibold text-indigo-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-400" />
                Interpersonal & Soft Skills
              </h2>
              <div className="flex flex-wrap gap-2 pt-2">
                {softSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs font-semibold text-purple-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 8 & 9: Tools & Career Roadmap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-400" />
                Industry Tools & Technology Stack
              </h2>
              <div className="flex flex-wrap gap-2 pt-2">
                {tools.map((tool, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Career Progression Ladder
              </h2>
              <div className="space-y-3 pt-2">
                {roadmapStages.map((stage, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-xs text-slate-200 font-medium">{stage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: COMPENSATION & CULTURE                                             */}
      {/* ========================================================================= */}
      {activeTab === 'compensation' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              Compensation Bands & Growth Trajectory
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Entry Level (0-2 Yrs)</span>
                <span className="text-2xl font-extrabold text-white block">
                  ${career.entrySalaryMin}k - ${career.entrySalaryMax}k
                </span>
                <p className="text-[11px] text-slate-400">Baseline entry pay with direct mentorship.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Mid-Level (3-5 Yrs)</span>
                <span className="text-2xl font-extrabold text-indigo-400 block">
                  ${career.midSalaryMin}k - ${career.midSalaryMax}k
                </span>
                <p className="text-[11px] text-slate-400">Independent contributor running major deliverables.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Senior / Executive (5+ Yrs)</span>
                <span className="text-2xl font-extrabold text-emerald-400 block">
                  ${career.seniorSalaryMin}k - ${career.seniorSalaryMax}k+
                </span>
                <p className="text-[11px] text-slate-400">Strategic direction, equity, or sovereign grade perks.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400" />
                Work-Life Balance & Stress Drivers
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rated <strong className="text-white">{career.workLifeBalance}/10</strong> on lifestyle sustainability with typical work pressure at <strong className="text-white">{career.workPressure}/10</strong>.
              </p>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                <span className="font-semibold text-rose-300 block">Stress & Deadline Cadence:</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Demands are highest around delivery milestones, live incidents, client presentations, or regulatory audits.
                </p>
              </div>
            </div>

            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-indigo-400" />
                International Mobility & Demand
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {career.internationalOpportunities}
              </p>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                <span className="font-semibold text-purple-300 block">Future Decade Outlook:</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {career.futureDemandOutlook}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      {/* Booking Modal */}
      <BookingModal
        mentor={selectedMentor}
        isOpen={!!selectedMentor}
        onClose={() => setSelectedMentor(null)}
      />
    </div>
  );
}
