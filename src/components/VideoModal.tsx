'use client';

import React, { useEffect } from 'react';
import { track } from '@/lib/telemetry';
import { X, ExternalLink, Bookmark, CheckCircle2, User, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

interface VideoModalProps {
  video: any | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (videoId: string) => void;
}

export default function VideoModal({
  video,
  isOpen,
  onClose,
  isBookmarked = false,
  onToggleBookmark,
}: VideoModalProps) {
  useEffect(() => {
    if (isOpen && video) {
      track('video_watched', { videoId: video.id, title: video.title, duration: video.duration });
    }
  }, [isOpen, video]);

  if (!isOpen || !video) return null;

  let takeaways: string[] = [];
  try {
    takeaways = typeof video.keyTakeaways === 'string' ? JSON.parse(video.keyTakeaways) : video.keyTakeaways || [];
  } catch (e) {
    takeaways = ['Understand real-life daily workflows', 'Explore practical trade-offs'];
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl glass-panel border border-slate-700 bg-slate-900/95 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between gap-3 p-3.5 sm:p-5 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 sm:py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {video.category || 'Day in the Life'}
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{video.duration}</span>
              {video.location && (
                <>
                  <span>•</span>
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{video.location}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {onToggleBookmark && (
              <button
                onClick={() => onToggleBookmark(video.id)}
                className={`p-1.5 sm:p-2 rounded-xl border transition-all ${
                  isBookmarked
                    ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                }`}
                title={isBookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
              >
                <Bookmark className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isBookmarked ? 'fill-indigo-400' : ''}`} />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Video Embed Player */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Details & Key Takeaways */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div>
            <h3 className="text-base sm:text-xl font-bold text-white leading-snug">{video.title}</h3>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 font-medium text-slate-300">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                <span>{video.creator}</span>
                <span className="text-slate-500">({video.channelName})</span>
              </div>
              <span>•</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[10px] sm:text-xs">
                Level: {video.experienceLevel}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{video.description}</p>

          {/* Takeaways */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
            <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              What You Will Learn From This Video
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {takeaways.map((point: string, i: number) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-indigo-400 mt-0.5">•</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
            {video.professionSlug && (
              <Link
                href={`/careers/${video.professionSlug}`}
                onClick={onClose}
                className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 py-1"
              >
                <span>View Full Career Profile & Roadmap</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}
            <Link
              href="/shadowing"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all text-center"
            >
              Shadow Professionals In This Field
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
