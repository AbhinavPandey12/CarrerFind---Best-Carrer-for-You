import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building,
  Lock,
  HeartHandshake,
  AlertCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Compass className="w-4 h-4 text-indigo-400" />
          <span>Our Mission & Safety Standards</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Bridging What Students Study and What Professionals Actually Do
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Higher education teaches theoretical foundations. But students rarely witness what a software engineer, forward deployed engineer, product manager, or investment banker does from 9 AM to 5 PM.
        </p>
      </div>

      {/* Core Philosophy Banner */}
      <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-slate-800 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 block">
          Platform North Star
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
          &ldquo;Explore. Experience. Evaluate. Choose.&rdquo;
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Don&apos;t spend 4 years and thousands of tuition dollars guessing whether a career fits your temperament. Experience it firsthand before you commit.
        </p>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">1. Intelligent Career Discovery</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Multi-dimensional assessment evaluating technical appetite, work pressure tolerance, financial upside, mathematical rigor, and work-life balance preferences.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">2. Authentic Day-in-the-Life Documentaries</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Unfiltered YouTube documentary video embeddings that illustrate real software bugs, client steering decks, robotics simulations, and high-stakes M&A deadlines.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">3. Direct 1-on-1 Job Shadowing</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Verified industry professionals dedicate time slots for students to shadow team standups, review code architectures, and ask candid career questions.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
            <Building className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">4. Objective Career Comparison</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Direct side-by-side matrices comparing 2 to 4 professions across compensation ceilings, learning hurdles, remote availability, and future AI demand.
          </p>
        </div>
      </div>

      {/* Trust & Safety Section */}
      <div id="safety" className="rounded-3xl glass-panel p-8 sm:p-12 border border-slate-800 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Safety, Trust & Ethics Framework</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            How We Protect Students & Professional Hosts
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Trust is the bedrock of CareerFind. Both virtual and in-person shadowing adhere to strict community standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">Professional Verification</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every mentor undergoes identity and employer domain verification by our Trust & Safety administrators before publishing shadowing availability.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
            <Building className="w-6 h-6 text-indigo-400" />
            <h4 className="text-sm font-bold text-white">In-Person Campus Protocols</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              In-person sessions take place solely in verified corporate offices, tech labs, or public coworking facilities with guest badge security.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
            <Lock className="w-6 h-6 text-purple-400" />
            <h4 className="text-sm font-bold text-white">Confidentiality & Etiquette</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Students sign a standard non-disclosure code of conduct respecting intellectual property and confidential client data during sessions.
            </p>
          </div>
        </div>

        {/* Reporting Callout */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Encountered an issue or policy breach? Our admin moderation team resolves tickets within 24 hours.</span>
          </div>
          <Link href="/admin/dashboard" className="text-indigo-400 font-semibold hover:underline shrink-0">
            Trust Center →
          </Link>
        </div>
      </div>
    </div>
  );
}
