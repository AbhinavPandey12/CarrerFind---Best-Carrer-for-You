import React from 'react';
import Link from 'next/link';
import { Compass, ShieldCheck, Heart, Sparkles, Video, Users, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Career<span className="text-indigo-400">Find</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              Bridging the gap between what students study in lecture halls and what world-class professionals actually do in their careers every single day.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider block">
                Platform Philosophy
              </span>
              <p className="text-xs text-slate-300 font-medium">
                &ldquo;Explore. Experience. Evaluate. Choose.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Identity Verified Mentors & Protected In-Person Protocols</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Discovery</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/assessment" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  Career Assessment
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-indigo-400 transition-colors">
                  Explore All Careers
                </Link>
              </li>
              <li>
                <Link href="/student/compare" className="hover:text-indigo-400 transition-colors">
                  Career Comparison Tool
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-purple-400" />
                  Day in the Life Videos
                </Link>
              </li>
            </ul>
          </div>

          {/* Job Shadowing */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Job Shadowing</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/shadowing" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  Find Mentors
                </Link>
              </li>
              <li>
                <Link href="/about#safety" className="hover:text-indigo-400 transition-colors">
                  Safety & Ethics Guidelines
                </Link>
              </li>
              <li>
                <Link href="/auth/register?role=MENTOR" className="hover:text-indigo-400 transition-colors">
                  Become a Professional Mentor
                </Link>
              </li>
              <li>
                <Link href="/student/dashboard" className="hover:text-indigo-400 transition-colors">
                  Student Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Industry Focus */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Featured Domains</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/careers/ai-ml-engineer" className="hover:text-indigo-400 transition-colors">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/careers/forward-deployed-engineer" className="hover:text-indigo-400 transition-colors">
                  Forward Deployed Engineering
                </Link>
              </li>
              <li>
                <Link href="/careers/physical-ai-engineer" className="hover:text-indigo-400 transition-colors">
                  Physical AI & Robotics
                </Link>
              </li>
              <li>
                <Link href="/careers/product-manager" className="hover:text-indigo-400 transition-colors">
                  Product Management
                </Link>
              </li>
              <li>
                <Link href="/careers/investment-banker" className="hover:text-indigo-400 transition-colors">
                  Investment Banking & M&A
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} CareerFind Platform. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <Link href="/about" className="hover:text-slate-300 transition-colors">About</Link>
            <Link href="/about#safety" className="hover:text-slate-300 transition-colors">In-Person Safety</Link>
            <Link href="/about#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
