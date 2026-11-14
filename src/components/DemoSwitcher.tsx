'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { track, trackError } from '@/lib/telemetry';
import { GraduationCap, Briefcase, ShieldCheck, ChevronDown, Check } from 'lucide-react';

interface DemoSwitcherProps {
  currentRole?: string;
  currentName?: string;
  onRoleChanged?: () => void;
}

export default function DemoSwitcher({ currentRole, onRoleChanged }: DemoSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const personas = [
    {
      roleKey: 'student',
      title: 'Alex Chen',
      subtitle: 'Student @ UC Berkeley',
      badge: 'Student',
      icon: GraduationCap,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      redirect: '/student/dashboard',
    },
    {
      roleKey: 'mentor',
      title: 'Dr. Priya Sharma',
      subtitle: 'Staff AI Engineer @ DeepMind',
      badge: 'Mentor',
      icon: Briefcase,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      redirect: '/mentor/dashboard',
    },
    {
      roleKey: 'admin',
      title: 'Sarah Miller',
      subtitle: 'Platform Director & Oversight',
      badge: 'Admin',
      icon: ShieldCheck,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      redirect: '/admin/dashboard',
    },
  ];

  const handleSwitch = async (persona: (typeof personas)[0]) => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/demo-switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: persona.roleKey }),
      });
      if (res.ok) {
        track('demo_persona_switched', { role: persona.roleKey, title: persona.title });
        setIsOpen(false);
        if (onRoleChanged) onRoleChanged();
        router.push(persona.redirect);
        router.refresh();
      }
    } catch (err: any) {
      trackError(err, { component: 'DemoSwitcher', targetRole: persona.roleKey });
      console.error('Failed to switch persona:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRoleDotColor = () => {
    const r = currentRole?.toUpperCase();
    if (r === 'MENTOR') return 'bg-emerald-400';
    if (r === 'ADMIN') return 'bg-amber-400';
    return 'bg-indigo-400';
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all"
        title="Switch demo persona (Student / Mentor / Admin)"
      >
        <span className={`w-1.5 h-1.5 rounded-full ${getRoleDotColor()}`} />
        <span className="text-slate-400 font-normal">Role:</span>
        <span className="font-semibold text-white capitalize">{currentRole?.toLowerCase() || 'student'}</span>
        <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 rounded-xl glass-panel p-1.5 shadow-2xl z-50 border border-slate-700/80 bg-slate-900/95 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-100">
            <div className="px-2.5 py-1.5 border-b border-white/[0.06] mb-1">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Switch Persona</p>
            </div>
            <div className="space-y-0.5">
              {personas.map((p) => {
                const Icon = p.icon;
                const isCurrent = currentRole?.toUpperCase() === p.badge.toUpperCase();
                return (
                  <button
                    key={p.roleKey}
                    onClick={() => handleSwitch(p)}
                    disabled={loading}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all ${
                      isCurrent
                        ? 'bg-indigo-600/20 text-white font-medium'
                        : 'hover:bg-white/[0.05] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded-md border ${p.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white leading-tight">{p.title}</p>
                        <p className="text-[10px] text-slate-400 truncate max-w-[140px]">{p.subtitle}</p>
                      </div>
                    </div>
                    {isCurrent && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
