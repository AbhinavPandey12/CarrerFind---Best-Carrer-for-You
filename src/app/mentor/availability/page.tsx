'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  Video,
  MapPin,
} from 'lucide-react';

export default function MentorAvailabilityPage() {
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Slot Form State
  const [date, setDate] = useState('2026-11-28');
  const [startTime, setStartTime] = useState('14:00');
  const [endTime, setEndTime] = useState('15:00');
  const [mode, setMode] = useState<'VIRTUAL' | 'IN_PERSON'>('VIRTUAL');
  const [saving, setSaving] = useState(false);

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/mentor/slots');
      const json = await res.json();
      setSlots(json.slots || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch('/api/mentor/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, startTime, endTime, mode }),
      });
      if (res.ok) {
        fetchSlots();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSlot = async (id: string) => {
    try {
      await fetch(`/api/mentor/slots?id=${id}`, { method: 'DELETE' });
      fetchSlots();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Calendar className="w-4 h-4" />
            <span>Schedule Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Manage Availability Slots</h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish time slots when students can observe your work virtually or in your office.
          </p>
        </div>

        <Link
          href="/mentor/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Slot Creation Form (1 Col) */}
        <div className="rounded-3xl glass-panel p-6 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-400" />
            Add New Time Slot
          </h2>

          <form onSubmit={handleCreateSlot} className="space-y-4">
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Session Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Start Time</label>
                <input
                  type="time"
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">End Time</label>
                <input
                  type="time"
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Session Format</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="VIRTUAL">Virtual Call (Google Meet)</option>
                <option value="IN_PERSON">In-Person Campus / Office Visit</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{saving ? 'Publishing...' : 'Publish Time Slot'}</span>
            </button>
          </form>
        </div>

        {/* Existing Slots List (2 Cols) */}
        <div className="lg:col-span-2 rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            Existing Availability Slots ({slots.length})
          </h2>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-2xl bg-slate-900/60 animate-pulse" />
              ))}
            </div>
          ) : slots.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">No availability slots published yet.</p>
          ) : (
            <div className="space-y-3">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full shrink-0 ${
                        slot.isBooked ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-white">{slot.date}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {slot.startTime} - {slot.endTime}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span className="capitalize">{slot.mode.toLowerCase()}</span>
                        <span>•</span>
                        <span className={slot.isBooked ? 'text-amber-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                          {slot.isBooked ? 'Booked by Student' : 'Available for Booking'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {!slot.isBooked && (
                    <button
                      onClick={() => handleDeleteSlot(slot.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors self-end sm:self-auto"
                      title="Remove Slot"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
