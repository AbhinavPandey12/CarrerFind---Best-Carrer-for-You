'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import VideoModal from '@/components/VideoModal';
import BookingModal from '@/components/BookingModal';
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
} from 'lucide-react';

interface CareerDetailClientProps {
  career: any;
  relatedVideos: any[];
  relatedMentors: any[];
}

export default function CareerDetailClient({
  career,
  relatedVideos,
  relatedMentors,
}: CareerDetailClientProps) {
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<any | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

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

  const handleToggleSave = async () => {
    try {
      const res = await fetch('/api/careers/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ careerSlug: career.slug }),
      });
      const data = await res.json();
      setIsSaved(data.saved);
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
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
            <Link
              href={`/student/compare?add=${career.slug}`}
              className="px-5 py-3 rounded-2xl text-xs font-semibold glass-panel hover:bg-slate-800 text-white border border-slate-700 flex items-center justify-center gap-2 transition-all"
            >
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>Compare with Other Roles</span>
            </Link>

            <a
              href="#mentors"
              className="px-5 py-3 rounded-2xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Shadow a Professional</span>
            </a>
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

      {/* SECTION 2 & 3: Daily Responsibilities & A Day in the Life Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SECTION 2: Daily Responsibilities */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            2. Daily Responsibilities
          </h2>
          <p className="text-xs text-slate-400">
            What you actually spend your time executing on a daily basis:
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

        {/* SECTION 3: A Day in the Life Narrative */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            3. A Day in the Life
          </h2>
          <p className="text-xs text-slate-400">
            A realistic hour-by-hour timeline through a typical working day:
          </p>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 whitespace-pre-line text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            {career.dayInLife}
          </div>
        </div>
      </div>

      {/* SECTION 4 & 5: Work Environment & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* SECTION 4: Typical Work Environment */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            4. Typical Work Environment
          </h2>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-sm font-bold text-indigo-300">{career.typicalWorkEnvironment}</span>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div>
                <span className="block font-semibold text-white">{career.remoteOpportunities}/10</span>
                <span>Remote Friendly</span>
              </div>
              <div className="hidden sm:block h-6 w-px bg-slate-800" />
              <div>
                <span className="block font-semibold text-white">{career.workPressure}/10</span>
                <span>Work Pressure</span>
              </div>
              <div className="hidden sm:block h-6 w-px bg-slate-800" />
              <div>
                <span className="block font-semibold text-white">{career.careerStability}/10</span>
                <span>Career Stability</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: Required Education */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            5. Required Education & Qualifications
          </h2>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {career.requiredEducation}
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div>
                <span className="block font-semibold text-white">{career.learningDifficulty}/10</span>
                <span>Learning Curve</span>
              </div>
              <div className="hidden sm:block h-6 w-px bg-slate-800" />
              <div>
                <span className="block font-semibold text-white">{career.entryJobDifficulty}/10</span>
                <span>Entry Hiring Bar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 6 & 7: Skills & Tools Stack */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-6">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <Wrench className="w-5 h-5 text-indigo-400" />
          6 & 7. Essential Skills & Technology Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tech Skills */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Essential Technical Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {techSkills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Essential Soft Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools & Tech */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Tools & Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-medium shadow-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 8: Salary Progression */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              8. Compensation & Salary Progression
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Estimated total compensation in USD thousands (base salary + standard bonus & equity).
            </p>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 self-start sm:self-auto">
            Top Tier Compensation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Entry Level */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">
              Entry-Level (0-2 Years)
            </span>
            <div className="text-2xl font-extrabold text-white">
              ${career.entrySalaryMin}k - ${career.entrySalaryMax}k
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-400"
                style={{ width: `${(career.entrySalaryMax / 400) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Standard compensation for university graduates or junior recruits.
            </p>
          </div>

          {/* Mid Level */}
          <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-3">
            <span className="text-[10px] font-bold uppercase text-indigo-300 block">
              Mid-Career (3-5 Years)
            </span>
            <div className="text-2xl font-extrabold text-indigo-300">
              ${career.midSalaryMin}k - ${career.midSalaryMax}k
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-500"
                style={{ width: `${(career.midSalaryMax / 400) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Independent contributor owning core technical or client workstreams.
            </p>
          </div>

          {/* Senior Level */}
          <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-3">
            <span className="text-[10px] font-bold uppercase text-purple-300 block">
              Senior / Principal (6-10+ Years)
            </span>
            <div className="text-2xl font-extrabold text-purple-300">
              ${career.seniorSalaryMin}k - ${career.seniorSalaryMax}k+
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-purple-500"
                style={{ width: '100%' }}
              />
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Organizational leadership, strategic systems design, and equity upside.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 9: Career Progression Roadmap */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-6">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          9. Career Progression Roadmap
        </h2>
        <p className="text-xs text-slate-400">
          How responsibilities and seniority scale over a 10-year horizon:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {roadmapStages.map((stage, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 relative space-y-2">
              <span className="text-[10px] font-bold uppercase text-indigo-400 block">
                Stage {i + 1}
              </span>
              <p className="text-xs font-semibold text-white leading-snug">{stage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 10: Job Market Demand & Future Outlook */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          10. Job Market Demand & Future Outlook
        </h2>
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 to-slate-900 border border-purple-500/20 space-y-2">
          <span className="text-sm font-bold text-purple-300">
            {career.futureDemandOutlook}
          </span>
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            Industry analysts project robust global expansion driven by digital infrastructure scale, automated systems, and enterprise efficiency mandates.
          </p>
        </div>
      </div>

      {/* SECTION 11: Advantages and Disadvantages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pros */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            11. Key Advantages & Pros
          </h2>
          <div className="space-y-2.5">
            {advantages.map((adv, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-200">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{adv}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cons */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Potential Challenges & Disadvantages
          </h2>
          <div className="space-y-2.5">
            {disadvantages.map((dis, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-xs text-slate-200">
                <span className="text-rose-400 font-bold">•</span>
                <span>{dis}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 12 & 13: Work-Life Balance & International Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* SECTION 12 */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400" />
            12. Work-Life Balance & Pressure
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Rated {career.workLifeBalance}/10 on lifestyle sustainability with typical work pressure at {career.workPressure}/10. Roles with high compensation ceilings often require focused sprint cycles around major deliverables or incident triage.
          </p>
        </div>

        {/* SECTION 13 */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-indigo-400" />
            13. International Career Opportunities
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            {career.internationalOpportunities}
          </p>
        </div>
      </div>

      {/* Related Day in the Life Videos */}
      {relatedVideos.length > 0 && (
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Play className="w-5 h-5 text-purple-400" />
              Watch A Day in the Life of a {career.title}
            </h2>
            <Link href="/videos" className="text-xs text-purple-400 hover:underline">
              View all videos →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group cursor-pointer rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden hover:border-purple-500/50 transition-all"
              >
                <div className="relative aspect-video w-full bg-slate-950">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-white">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-xs font-bold text-white group-hover:text-indigo-300 line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-[11px] text-slate-400">{video.creator}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 14: Real Professionals Working in this Field (Mentors) */}
      <div id="mentors" className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              14. Real Professionals Working in this Field
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Connect directly with verified experts to shadow their workday, inspect codebases, or review strategy.
            </p>
          </div>
          <Link href="/shadowing" className="text-xs text-emerald-400 hover:underline">
            Browse all marketplace mentors →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={mentor.user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={mentor.user?.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{mentor.user?.name}</h4>
                    <p className="text-[11px] text-indigo-400 font-medium">{mentor.title}</p>
                    <p className="text-[10px] text-slate-400">{mentor.company}</p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-300 line-clamp-3 leading-relaxed">
                  {mentor.aboutDayInLife}
                </p>
              </div>

              <button
                onClick={() => setSelectedMentor(mentor)}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Job Shadowing</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      <BookingModal
        mentor={selectedMentor}
        isOpen={!!selectedMentor}
        onClose={() => setSelectedMentor(null)}
      />
    </div>
  );
}
