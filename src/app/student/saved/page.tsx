'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CareerCard from '@/components/CareerCard';
import VideoModal from '@/components/VideoModal';
import { Bookmark, Video, Compass, ArrowLeft } from 'lucide-react';

export default function StudentSavedPage() {
  const [savedCareers, setSavedCareers] = useState<any[]>([]);
  const [bookmarkedVideos, setBookmarkedVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/student/dashboard');
        const json = await res.json();
        setSavedCareers(json.savedCareers || []);
        setBookmarkedVideos(json.bookmarkedVideos || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Bookmark className="w-4 h-4" />
            <span>Saved Portfolio</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Saved Careers & Watchlist</h1>
        </div>

        <Link
          href="/student/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
      </div>

      {/* Saved Careers Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Compass className="w-5 h-5 text-indigo-400" />
          Saved Career Paths ({savedCareers.length})
        </h2>

        {savedCareers.length === 0 ? (
          <div className="p-8 rounded-3xl glass-panel border border-slate-800 text-center text-xs text-slate-400">
            No careers bookmarked yet.{' '}
            <Link href="/careers" className="text-indigo-400 underline font-semibold">
              Browse careers to save
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCareers.map((c) => (
              <CareerCard key={c.slug} career={c} isSaved={true} />
            ))}
          </div>
        )}
      </div>

      {/* Bookmarked Videos Section */}
      <div className="space-y-4 pt-6 border-t border-slate-800">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Video className="w-5 h-5 text-purple-400" />
          Watchlist Videos ({bookmarkedVideos.length})
        </h2>

        {bookmarkedVideos.length === 0 ? (
          <div className="p-8 rounded-3xl glass-panel border border-slate-800 text-center text-xs text-slate-400">
            No videos in your watchlist.{' '}
            <Link href="/videos" className="text-purple-400 underline font-semibold">
              Explore Day in the Life videos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedVideos.map((v) => (
              <div
                key={v.id}
                onClick={() => setSelectedVideo(v)}
                className="group cursor-pointer rounded-2xl glass-panel border border-slate-800 overflow-hidden hover:border-purple-500/50 transition-all"
              >
                <div className="relative aspect-video w-full bg-slate-950">
                  <img
                    src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-white">
                    {v.duration}
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-xs font-bold text-white group-hover:text-purple-300 line-clamp-1">
                    {v.title}
                  </h3>
                  <p className="text-[11px] text-slate-400">{v.creator}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
