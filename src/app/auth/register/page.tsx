'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Compass,
  Lock,
  Mail,
  User,
  GraduationCap,
  Briefcase,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') === 'MENTOR' ? 'MENTOR' : 'STUDENT';

  const [role, setRole] = useState<'STUDENT' | 'MENTOR'>(defaultRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [headline, setHeadline] = useState('');
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState('Technology & Engineering');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      setLoading(true);
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          headline,
          company,
          title,
          industry,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      if (role === 'MENTOR') {
        router.push('/mentor/dashboard');
      } else {
        router.push('/student/dashboard');
      }
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <Link href="/" className="inline-flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-lg">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">CareerFind</span>
        </Link>
        <h1 className="text-2xl font-bold text-white tracking-tight">Create Your Account</h1>
        <p className="text-xs text-slate-400">Join students and industry mentors worldwide</p>
      </div>

      {/* Role Selector Tabs */}
      <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl glass-panel border border-slate-800">
        <button
          type="button"
          onClick={() => setRole('STUDENT')}
          className={`py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            role === 'STUDENT'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>I am a Student</span>
        </button>

        <button
          type="button"
          onClick={() => setRole('MENTOR')}
          className={`py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            role === 'MENTOR'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>I am a Mentor</span>
        </button>
      </div>

      {/* Form Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-5">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maya Patel"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Mentor Specific Fields */}
          {role === 'MENTOR' ? (
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Company / Org</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Stripe"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Staff Engineer"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Technology & Engineering">Technology & Engineering</option>
                  <option value="Business & Management">Business & Management</option>
                  <option value="Artificial Intelligence & Deep Tech">Artificial Intelligence & Deep Tech</option>
                  <option value="Finance & Investment Banking">Finance & Investment Banking</option>
                  <option value="Emerging & Other Careers">Emerging & Other Careers</option>
                </select>
              </div>
            </div>
          ) : (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Academic Headline / Major</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. 2nd Year Computer Science @ UT Austin"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all flex items-center justify-center gap-1.5 ${
              role === 'MENTOR'
                ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'
                : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
            }`}
          >
            <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-indigo-400 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-center text-slate-400">Loading registration...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
