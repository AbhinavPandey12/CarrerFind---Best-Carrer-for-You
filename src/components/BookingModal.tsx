'use client';

import React, { useState } from 'react';
import { track, trackError } from '@/lib/telemetry';
import {
  X,
  Calendar,
  Clock,
  Video,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

interface BookingModalProps {
  mentor: any | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function BookingModal({ mentor, isOpen, onClose, onSuccess }: BookingModalProps) {
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [sessionMode, setSessionMode] = useState<'VIRTUAL' | 'IN_PERSON'>('VIRTUAL');
  const [studentIntroduction, setStudentIntroduction] = useState<string>('');
  const [agreedSafety, setAgreedSafety] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmationData, setConfirmationData] = useState<any | null>(null);

  if (!isOpen || !mentor) return null;

  const slots = mentor.availabilitySlots || [];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!selectedSlotId) {
      setErrorMsg('Please select an available date and time slot.');
      return;
    }

    if (!studentIntroduction.trim() || studentIntroduction.trim().length < 15) {
      setErrorMsg('Please write at least 2-3 sentences introducing yourself and what you hope to observe.');
      return;
    }

    if (!agreedSafety) {
      setErrorMsg('Please review and accept the job shadowing safety and professionalism guidelines.');
      return;
    }

    try {
      setLoading(true);
      track('booking_submitted', { mentorId: mentor.id, sessionMode, slotId: selectedSlotId });
      const res = await fetch('/api/shadowing/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mentorProfileId: mentor.id,
          slotId: selectedSlotId,
          sessionMode,
          studentIntroduction,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to book session');
      }

      setConfirmationData(data.booking);
      track('booking_confirmed', {
        mentorId: mentor.id,
        bookingId: data.booking?.id,
        sessionMode,
      });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message);
      trackError(err, { component: 'BookingModal', mentorId: mentor?.id, slotId: selectedSlotId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl glass-panel border border-slate-700 bg-slate-900/95 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={mentor.user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
              alt={mentor.user?.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl object-cover border border-slate-700"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">{mentor.user?.name}</h3>
                {mentor.isVerified && (
                  <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Verified
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 font-medium">
                {mentor.title} • <span className="text-indigo-400">{mentor.company}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6">
          {confirmationData ? (
            /* Confirmation State */
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-white">Job Shadowing Session Confirmed!</h4>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                  Your session with <strong className="text-slate-200">{mentor.user?.name}</strong> has been booked and scheduled.
                </p>
              </div>

              {/* Booking Info Box */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-700/60">
                  <span className="text-slate-400">Date & Time:</span>
                  <span className="font-semibold text-white">
                    {confirmationData.sessionDate} ({confirmationData.sessionTime})
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/60">
                  <span className="text-slate-400">Format:</span>
                  <span className="font-semibold text-indigo-300">
                    {confirmationData.sessionMode === 'VIRTUAL' ? 'Virtual (Video Call)' : 'In-Person Shadowing'}
                  </span>
                </div>
                {confirmationData.meetingUrl && (
                  <div className="flex justify-between py-1 items-center">
                    <span className="text-slate-400">Meeting Room:</span>
                    <a
                      href={confirmationData.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline font-mono text-[11px] flex items-center gap-1"
                    >
                      Join Link <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                {confirmationData.meetingLocation && (
                  <div className="flex justify-between py-1 items-center">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-medium text-slate-200">{confirmationData.meetingLocation}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700"
                >
                  Close
                </button>
                <Link
                  href="/student/dashboard"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm text-center"
                >
                  View in My Dashboard
                </Link>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Mode Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                  Session Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    disabled={!mentor.offersVirtual}
                    onClick={() => setSessionMode('VIRTUAL')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      sessionMode === 'VIRTUAL'
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm shadow-indigo-500/10'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                    } ${!mentor.offersVirtual ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-2 font-semibold text-xs mb-1">
                      <Video className="w-4 h-4 text-indigo-400" />
                      <span>Virtual Shadowing</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Join screen-sharing, code reviews, or team sprints remotely.
                    </p>
                  </button>

                  <button
                    type="button"
                    disabled={!mentor.offersInPerson}
                    onClick={() => setSessionMode('IN_PERSON')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      sessionMode === 'IN_PERSON'
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm shadow-indigo-500/10'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                    } ${!mentor.offersInPerson ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-2 font-semibold text-xs mb-1">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <span>In-Person Shadowing</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {mentor.inPersonLocation ? mentor.inPersonLocation : 'Corporate campus / lab visit'}
                    </p>
                  </button>
                </div>
              </div>

              {/* Slot Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                  Select Available Time Slot
                </label>
                {slots.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-center text-xs text-slate-400">
                    No available time slots listed right now. Check back soon or request a new slot.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-1">
                    {slots.map((slot: any) => {
                      const isSelected = selectedSlotId === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedSlotId(slot.id)}
                          className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-indigo-600/30 border-indigo-400 text-white ring-1 ring-indigo-400'
                              : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                              <span>{slot.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-slate-400">
                              <Clock className="w-3 h-3" />
                              <span>
                                {slot.startTime} - {slot.endTime}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                            {slot.mode}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Student Introduction */}
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                  Why do you want to shadow {mentor.user?.name}?
                </label>
                <p className="text-[11px] text-slate-400 mb-2">
                  Share your academic background, current interests, and 2-3 specific questions you want to ask.
                </p>
                <textarea
                  rows={3}
                  required
                  value={studentIntroduction}
                  onChange={(e) => setStudentIntroduction(e.target.value)}
                  placeholder="e.g. I am a 3rd-year CS student passionate about distributed systems. I would love to observe how you triage production incidents and design data architectures..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Safety & Honor Code */}
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="safetyCheck"
                  checked={agreedSafety}
                  onChange={(e) => setAgreedSafety(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="safetyCheck" className="text-[11px] text-slate-300 leading-relaxed cursor-pointer">
                  I agree to adhere to the{' '}
                  <Link href="/about#safety" target="_blank" className="text-indigo-400 underline">
                    Professional Job Shadowing Code of Conduct
                  </Link>
                  . I will be punctual, respect corporate confidentiality, and maintain professional etiquette.
                </label>
              </div>

              {/* Submit */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || slots.length === 0}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    'Securing Booking...'
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Confirm & Book Job Shadow</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
