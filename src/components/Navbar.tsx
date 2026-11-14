'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { track, trackError } from '@/lib/telemetry';
import {
  Compass,
  Menu,
  X,
  LogOut,
  Bookmark,
  ChevronDown,
  LayoutDashboard,
} from 'lucide-react';
import DemoSwitcher from './DemoSwitcher';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarBtnRef = useRef<HTMLButtonElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  /* ─── Data Fetching ─────────────────────────────────────────── */
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setCurrentUser(data.user ?? null);
    } catch (e: any) {
      trackError(e, { component: 'Navbar', action: 'fetchUser' });
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [pathname, fetchUser]);

  /* ─── Close menus on route change ──────────────────────────── */
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  /* ─── Auto-close mobile drawer when resizing to desktop ────── */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ─── Keyboard & outside-click accessibility ────────────────── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (userDropdownOpen) {
          setUserDropdownOpen(false);
          avatarBtnRef.current?.focus();
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          hamburgerRef.current?.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [userDropdownOpen, mobileMenuOpen]);

  /* Lock body scroll when mobile drawer is open */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  /* ─── Logout handler ────────────────────────────────────────── */
  const handleLogout = async () => {
    track('user_logged_out', { userId: currentUser?.id, role: currentUser?.role });
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e: any) {
      trackError(e, { component: 'Navbar', action: 'handleLogout' });
    }
    setCurrentUser(null);
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  /* ─── Navigation links ──────────────────────────────────────── */
  const navLinks = [
    { name: 'Explore Careers', href: '/careers' },
    { name: 'Assessment', href: '/assessment' },
    { name: 'Day in the Life', href: '/videos' },
    { name: 'Job Shadowing', href: '/shadowing' },
    { name: 'Compare', href: '/student/compare' },
  ];

  const getDashboardLink = () => {
    if (!currentUser) return '/student/dashboard';
    if (currentUser.role === 'MENTOR') return '/mentor/dashboard';
    if (currentUser.role === 'ADMIN') return '/admin/dashboard';
    return '/student/dashboard';
  };

  const getDashboardLabel = () => {
    if (!currentUser) return 'Dashboard';
    if (currentUser.role === 'MENTOR') return 'Mentor Portal';
    if (currentUser.role === 'ADMIN') return 'Admin Portal';
    return 'Dashboard';
  };

  /** Exact match for single-segment roots, prefix match for sub-pages */
  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header role="banner" className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0b0f19]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Main Navigation Bar ─────────────────────────────── */}
        <div className="flex items-center justify-between h-16">

          {/* LEFT: Brand Logo + Desktop Nav Links */}
          <div className="flex items-center gap-7 xl:gap-8 min-w-0">
            {/* Brand Logo */}
            <NextLink
              href="/"
              className="flex items-center gap-2.5 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-0.5"
              aria-label="CareerFind Home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold tracking-tight text-white group-hover:text-slate-200 transition-colors">
                Career<span className="text-indigo-400">Find</span>
              </span>
            </NextLink>

            {/* Desktop Navigation Links (visible at 100% zoom on desktop/laptop) */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <NextLink
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`px-3 py-1.5 rounded-lg text-[13px] font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                      active
                        ? 'text-white bg-white/[0.08] font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {link.name}
                  </NextLink>
                );
              })}
            </nav>
          </div>

          {/* RIGHT: Desktop Actions (Demo Switcher, Dashboard, Profile/Auth) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Quick Demo Persona Switcher */}
            <DemoSwitcher
              currentRole={currentUser?.role}
              currentName={currentUser?.name}
              onRoleChanged={fetchUser}
            />

            <div className="h-4 w-px bg-white/[0.1]" aria-hidden="true" />

            {/* User Profile or Sign In / Sign Up */}
            {currentUser ? (
              <div className="flex items-center gap-2.5">
                {/* Direct Dashboard Link */}
                <NextLink
                  href={getDashboardLink()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>{getDashboardLabel()}</span>
                </NextLink>

                {/* Profile Avatar with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    ref={avatarBtnRef}
                    onClick={() => setUserDropdownOpen((v) => !v)}
                    aria-haspopup="menu"
                    aria-expanded={userDropdownOpen}
                    aria-label={`Account menu for ${currentUser.name}`}
                    className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all"
                  >
                    <img
                      src={
                        currentUser.avatarUrl ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
                      }
                      alt={currentUser.name}
                      width={28}
                      height={28}
                      className="w-7 h-7 rounded-full object-cover border border-white/20"
                    />
                    <ChevronDown
                      className={`w-3 h-3 text-slate-400 transition-transform duration-150 ${
                        userDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown menu */}
                  {userDropdownOpen && (
                    <>
                      {/* Transparent backdrop for outside-click dismissal */}
                      <div
                        className="fixed inset-0 z-40"
                        aria-hidden="true"
                        onClick={() => setUserDropdownOpen(false)}
                      />
                      <div
                        role="menu"
                        aria-label="User account menu"
                        className="absolute right-0 top-full mt-2 w-56 rounded-xl glass-panel p-1.5 shadow-2xl z-50 border border-slate-700/80 bg-slate-900/95 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-100"
                      >
                        {/* User Identity Header */}
                        <div className="px-3 py-2 border-b border-white/[0.06]">
                          <p className="text-xs font-semibold text-white truncate">
                            {currentUser.name}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            {currentUser.email}
                          </p>
                          <span className="mt-1 inline-block text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                            {currentUser.role}
                          </span>
                        </div>

                        {/* Navigation Links inside Dropdown */}
                        <div className="py-1">
                          <NextLink
                            href={getDashboardLink()}
                            role="menuitem"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                          >
                            <LayoutDashboard className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{getDashboardLabel()}</span>
                          </NextLink>

                          {currentUser.role === 'STUDENT' && (
                            <NextLink
                              href="/student/saved"
                              role="menuitem"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                            >
                              <Bookmark className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>Saved Careers & Watchlist</span>
                            </NextLink>
                          )}
                        </div>

                        {/* Sign Out Action */}
                        <div className="border-t border-white/[0.06] pt-1">
                          <button
                            role="menuitem"
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                          >
                            <LogOut className="w-3.5 h-3.5 shrink-0" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NextLink
                  href="/auth/login"
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/[0.05]"
                >
                  Log In
                </NextLink>
                <NextLink
                  href="/auth/register"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-950 hover:bg-slate-200 transition-colors shadow-sm whitespace-nowrap"
                >
                  Sign Up
                </NextLink>
              </div>
            )}
          </div>

          {/* RIGHT: Mobile Controls (< 1024px) */}
          <div className="flex items-center gap-2 lg:hidden">
            <DemoSwitcher
              currentRole={currentUser?.role}
              currentName={currentUser?.name}
              onRoleChanged={fetchUser}
            />
            <button
              ref={hamburgerRef}
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Navigation Drawer ─────────────────────────── */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 z-30 lg:hidden bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-down Drawer Menu */}
          <nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="relative z-40 lg:hidden border-b border-white/[0.08] bg-slate-950/98 backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200"
          >
            <div className="max-w-7xl mx-auto px-4 pt-3 pb-6 space-y-3">

              {/* Direct Dashboard Link (when authenticated) */}
              {currentUser && (
                <NextLink
                  href={getDashboardLink()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-indigo-600/15 border border-indigo-500/30 text-white font-medium text-xs hover:bg-indigo-600/25 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Go to {getDashboardLabel()}</span>
                  </div>
                  <span className="text-[10px] text-indigo-300 font-mono" aria-hidden="true">→</span>
                </NextLink>
              )}

              {/* Main Nav Links */}
              <div className="space-y-1" role="list">
                {navLinks.map((link) => {
                  const active = isLinkActive(link.href);
                  return (
                    <NextLink
                      key={link.href}
                      href={link.href}
                      role="listitem"
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        active
                          ? 'text-white bg-white/[0.08] font-semibold'
                          : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      {link.name}
                    </NextLink>
                  );
                })}

                <NextLink
                  href="/about"
                  role="listitem"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  About & Safety Policies
                </NextLink>
              </div>

              {/* Mobile Drawer Auth Footer */}
              <div className="border-t border-white/[0.07] pt-3">
                {currentUser ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={
                          currentUser.avatarUrl ||
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'
                        }
                        alt={currentUser.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{currentUser.name}</p>
                        <p className="text-[10px] text-slate-400 capitalize">{currentUser.role?.toLowerCase()}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors shrink-0"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <NextLink
                      href="/auth/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 text-center py-2.5 text-sm font-medium text-slate-200 rounded-xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] transition-colors"
                    >
                      Log In
                    </NextLink>
                    <NextLink
                      href="/auth/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 text-center py-2.5 text-sm font-semibold text-slate-950 rounded-xl bg-white hover:bg-slate-100 transition-colors"
                    >
                      Sign Up
                    </NextLink>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
