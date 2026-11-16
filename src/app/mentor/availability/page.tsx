'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { track, trackError } from '@/lib/telemetry';
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  Video,
  MapPin,
  Users,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export default function MentorAvailabilityPage() {
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Slot Form State
  const [date, setDate] = useState('2026-11-28');
  const [startTime, setStartTime] = useState('14:00');
  const [endTime, setEndTime] = useState('15:00');
  const [sessionFormat, setSessionFormat] = useState<'VIRTUAL' | 'IN_PERSON' | 'WEBINAR' | 'SEMINAR'>('VIRTUAL');
  const [maxStudents, setMaxStudents] = useState<number>(50);
  const [location, setLocation] = useState<string>('Virtual');
  const [meetingLink, setMeetingLink] = useState<string>('https://meet.google.com/abc-defg-hij');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const isVirtual = sessionFormat === 'VIRTUAL' || sessionFormat === 'WEBINAR';
  const isGroup = sessionFormat === 'WEBINAR' || sessionFormat === 'SEMINAR';

  // Automatically update location default when format changes
  const handleFormatChange = (newFormat: 'VIRTUAL' | 'IN_PERSON' | 'WEBINAR' | 'SEMINAR') => {
    setSessionFormat(newFormat);
    setFormError(null);
    if (newFormat === 'VIRTUAL' || newFormat === 'WEBINAR') {
      if (location === 'In-Person / Offline' || !location.trim()) {
        setLocation('Virtual');
      }
      if (!meetingLink.trim()) {
        setMeetingLink('https://meet.google.com/abc-defg-hij');
      }
    } else {
      if (location === 'Virtual') {
        setLocation('In-Person / Offline');
      }
    }
  };

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/mentor/slots');
      const json = await res.json();
      setSlots(json.slots || []);
    } catch (e: any) {
      trackError(e, { component: 'MentorAvailabilityPage', action: 'fetchSlots' });
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
    setFormError(null);

    // Validation for virtual sessions
    if (isVirtual && (!meetingLink || !meetingLink.trim())) {
      setFormError('A Google Meet link or meeting ID is required for virtual sessions.');
      return;
    }

    // Validation for group session student count
    if (isGroup && (maxStudents < 1 || maxStudents > 50)) {
      setFormError('Webinar and seminar sessions allow a maximum of 50 students.');
      return;
    }

    try {
      setSaving(true);
      const mode = isVirtual ? 'VIRTUAL' : 'IN_PERSON';
      const sessionType = isGroup ? sessionFormat : 'ONE_ON_ONE';

      const res = await fetch('/api/mentor/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date,
          startTime,
          endTime,
          mode,
          sessionType,
          location: location.trim(),
          meetingLink: isVirtual ? meetingLink.trim() : null,
          maxStudents: isGroup ? Math.min(50, Math.max(1, maxStudents)) : 1,
        }),
      });

      const resJson = await res.json();
      if (!res.ok) {
        throw new Error(resJson.error || 'Failed to publish time slot');
      }

      track('mentor_slot_created', { date, startTime, endTime, mode, sessionType });
      fetchSlots();
    } catch (e: any) {
      setFormError(e.message || 'Failed to create slot');
      trackError(e, { component: 'MentorAvailabilityPage', action: 'handleCreateSlot' });
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSlot = async (id: string) => {
    try {
      await fetch(`/api/mentor/slots?id=${id}`, { method: 'DELETE' });
      track('mentor_slot_deleted', { slotId: id });
      fetchSlots();
    } catch (e: any) {
      trackError(e, { component: 'MentorAvailabilityPage', action: 'handleDeleteSlot', slotId: id });
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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Manage Availability & Sessions</h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish time slots, webinars, and seminars for students to shadow your workday.
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
            Create Session Slot
          </h2>

          {formError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{formError}</span>
            </div>
          )}

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
              <label className="text-xs text-slate-300 font-semibold block mb-1">Session Type & Format</label>
              <select
                value={sessionFormat}
                onChange={(e) => handleFormatChange(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="VIRTUAL">Virtual 1-on-1 Shadowing</option>
                <option value="IN_PERSON">In-Person 1-on-1 Shadowing</option>
                <option value="WEBINAR">Webinar (Virtual • Up to 50 Students)</option>
                <option value="SEMINAR">Seminar (In-Person / Offline • Up to 50 Students)</option>
              </select>
            </div>

            {/* Max Students (Shown for Webinar or Seminar) */}
            {isGroup && (
              <div className="p-3 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-indigo-300 font-semibold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Maximum Students (Max 50)</span>
                  </label>
                  <span className="text-[10px] text-indigo-400 font-mono font-bold">1 - 50</span>
                </div>
                <input
                  type="number"
                  min={1}
                  max={50}
                  required
                  value={maxStudents}
                  onChange={(e) => setMaxStudents(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter capacity (max 50)"
                />
                <p className="text-[10px] text-slate-400">
                  Allow up to 50 students to join this {sessionFormat === 'WEBINAR' ? 'webinar' : 'seminar'}.
                </p>
              </div>
            )}

            {/* Location Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Location</span>
                </label>
                <span className="text-[10px] text-slate-400">Physical place, Virtual, or Offline</span>
              </div>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={isVirtual ? 'Virtual' : 'e.g., Campus Center Rm 302, or Offline'}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="flex items-center gap-1.5 mt-1.5">
                <button
                  type="button"
                  onClick={() => setLocation('Virtual')}
                  className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                >
                  Virtual
                </button>
                <button
                  type="button"
                  onClick={() => setLocation('Offline')}
                  className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                >
                  Offline
                </button>
                <button
                  type="button"
                  onClick={() => setLocation('In-Person Office / Campus')}
                  className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                >
                  In-Person Campus
                </button>
              </div>
            </div>

            {/* Required Google Meet Link / Meeting ID for Virtual Sessions */}
            {isVirtual && (
              <div className="space-y-1.5 animate-in fade-in duration-150">
                <label className="text-xs text-slate-300 font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Google Meet Link or Meeting ID</span>
                  </span>
                  <span className="text-[10px] text-rose-400 font-semibold">* Required</span>
                </label>
                <input
                  type="text"
                  required
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="https://meet.google.com/xxx-yyyy-zzz or meeting ID"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-indigo-500/50 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-[10px] text-slate-400">
                  Required for virtual shadowing & webinars so students receive joining credentials.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{saving ? 'Publishing...' : 'Publish Session Slot'}</span>
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
              {slots.map((slot) => {
                const isSlotGroup = slot.sessionType === 'WEBINAR' || slot.sessionType === 'SEMINAR';
                return (
                  <div
                    key={slot.id}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-3 h-3 rounded-full shrink-0 mt-1 ${
                          slot.isBooked ? 'bg-amber-400' : 'bg-emerald-400'
                        }`}
                      />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-white">{slot.date}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {slot.startTime} - {slot.endTime}
                          </span>

                          {/* Session Type Badge */}
                          <span
                            className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              slot.sessionType === 'WEBINAR'
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : slot.sessionType === 'SEMINAR'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : slot.mode === 'IN_PERSON'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            }`}
                          >
                            {slot.sessionType === 'WEBINAR'
                              ? 'Webinar'
                              : slot.sessionType === 'SEMINAR'
                              ? 'Seminar'
                              : slot.mode === 'IN_PERSON'
                              ? 'In-Person'
                              : 'Virtual'}
                          </span>

                          {isSlotGroup && (
                            <span className="text-[10px] text-slate-300 font-medium flex items-center gap-1">
                              <Users className="w-3 h-3 text-slate-400" />
                              <span>Max {slot.maxStudents || 50}</span>
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            <span>{slot.location || (slot.mode === 'IN_PERSON' ? 'In-Person' : 'Virtual')}</span>
                          </span>

                          {slot.meetingLink && (
                            <a
                              href={slot.meetingLink.startsWith('http') ? slot.meetingLink : `https://${slot.meetingLink}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-400 hover:underline flex items-center gap-1"
                            >
                              <Video className="w-3 h-3" />
                              <span className="truncate max-w-[150px]">{slot.meetingLink}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}

                          <span className={slot.isBooked ? 'text-amber-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                            {slot.isBooked ? 'Booked' : 'Available'}
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
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
