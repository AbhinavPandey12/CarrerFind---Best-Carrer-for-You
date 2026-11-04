'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Compass,
  Lock,
  Mail,
  ArrowRight,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      setLoading(true);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.user?.role === 'MENTOR') {
        router.push('/mentor/dashboard');
      } else if (data.user?.role === 'ADMIN') {
        router.push('/admin/dashboard');
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

  const handleQuickDemo = async (roleKey: string) => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/demo-switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: roleKey }),
      });
      const data = await res.json();
      if (data.success) {
        if (roleKey === 'mentor') router.push('/mentor/dashboard');
        else if (roleKey === 'admin') router.push('/admin/dashboard');
        else router.push('/student/dashboard');
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-lg">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">CareerFind</span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-xs text-slate-400">Sign in to your student or mentor workspace</p>
        </div>

        {/* 1-Click Quick Demo Login Shortcuts */}
        <div className="p-4 rounded-2xl glass-panel border border-indigo-500/30 bg-indigo-950/20 space-y-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 block text-center">
            Instant 1-Click Evaluator Demo Logins
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('student')}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500 text-center transition-all group"
            >
              <GraduationCap className="w-4 h-4 text-indigo-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold text-white block">Student</span>
              <span className="text-[9px] text-slate-400 block">Alex Chen</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('mentor')}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 text-center transition-all group"
            >
              <Briefcase className="w-4 h-4 text-emerald-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold text-white block">Mentor</span>
              <span className="text-[9px] text-slate-400 block">Dr. Priya</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500 text-center transition-all group"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold text-white block">Admin</span>
              <span className="text-[9px] text-slate-400 block">Sarah Miller</span>
            </button>
          </div>
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
              <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.chen@university.edu"
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
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-1.5"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-slate-400">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-indigo-400 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
