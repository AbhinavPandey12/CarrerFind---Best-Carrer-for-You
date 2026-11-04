'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Compass,
  Menu,
  X,
  User,
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

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setCurrentUser(data.user);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setCurrentUser(null);
    setUserDropdownOpen(false);
    router.push('/');
    router.refresh();
  };

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0b0f19]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Logo & Desktop Navigation */}
          <div className="flex items-center gap-8">
            <NextLink href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold tracking-tight text-white group-hover:text-slate-200 transition-colors">
                Career<span className="text-indigo-400">Find</span>
              </span>
            </NextLink>

            {/* Clean Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href + '/'));
                return (
                  <NextLink
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                      isActive
                        ? 'text-white bg-white/[0.08]'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {link.name}
                  </NextLink>
                );
              })}
            </nav>
          </div>

          {/* Right: Actions, Demo Switcher & Profile */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Demo Switcher */}
            <DemoSwitcher
              currentRole={currentUser?.role}
              currentName={currentUser?.name}
              onRoleChanged={fetchUser}
            />

            <div className="h-4 w-px bg-white/[0.1]" />

            {/* User Profile or Sign In */}
            {currentUser ? (
              <div className="flex items-center gap-2.5">
                {/* Direct Dashboard Link */}
                <NextLink
                  href={getDashboardLink()}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 transition-all flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>{getDashboardLabel()}</span>
                </NextLink>

                {/* Profile Avatar with Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-white/20 transition-all"
                    title={currentUser.name}
                  >
                    <img
                      src={
                        currentUser.avatarUrl ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
                      }
                      alt={currentUser.name}
                      className="w-7 h-7 rounded-full object-cover border border-white/20"
                    />
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setUserDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 rounded-xl glass-panel p-1.5 shadow-2xl z-50 border border-slate-700/80 bg-slate-900/95 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-100">
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

                        <div className="py-1">
                          <NextLink
                            href={getDashboardLink()}
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                          >
                            <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                            <span>{getDashboardLabel()}</span>
                          </NextLink>

                          {currentUser.role === 'STUDENT' && (
                            <NextLink
                              href="/student/saved"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                            >
                              <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                              <span>Saved Careers & Watchlist</span>
                            </NextLink>
                          )}
                        </div>

                        <div className="border-t border-white/[0.06] pt-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                          >
                            <LogOut className="w-3.5 h-3.5" />
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
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Log In
                </NextLink>
                <NextLink
                  href="/auth/register"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-white text-slate-950 hover:bg-slate-200 transition-colors shadow-sm"
                >
                  Sign Up
                </NextLink>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex items-center gap-2 md:hidden">
            <DemoSwitcher
              currentRole={currentUser?.role}
              currentName={currentUser?.name}
              onRoleChanged={fetchUser}
            />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          {currentUser && (
            <NextLink
              href={getDashboardLink()}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-indigo-600/15 border border-indigo-500/30 text-white font-medium text-xs"
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                <span>Go to {getDashboardLabel()}</span>
              </div>
              <span className="text-[10px] text-indigo-300 font-mono">→</span>
            </NextLink>
          )}

          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <NextLink
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-white/[0.08]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.name}
                </NextLink>
              );
            })}
            <NextLink
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.04]"
            >
              About & Safety Policies
            </NextLink>
          </div>

          <div className="border-t border-white/[0.06] pt-3">
            {currentUser ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={
                      currentUser.avatarUrl ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'
                    }
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-medium text-white">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-400 capitalize">{currentUser.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NextLink
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-medium text-slate-300 rounded-lg bg-white/[0.05] border border-white/[0.08]"
                >
                  Log In
                </NextLink>
                <NextLink
                  href="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-medium text-slate-950 rounded-lg bg-white hover:bg-slate-200"
                >
                  Sign Up
                </NextLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
