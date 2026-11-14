import React from 'react';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse space-y-8">
      <div className="h-10 w-64 bg-slate-800/60 rounded-xl" />
      <div className="h-4 w-96 bg-slate-800/40 rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="h-72 rounded-3xl bg-slate-900/60 border border-slate-800" />
        <div className="h-72 rounded-3xl bg-slate-900/60 border border-slate-800" />
        <div className="h-72 rounded-3xl bg-slate-900/60 border border-slate-800" />
      </div>
    </div>
  );
}
