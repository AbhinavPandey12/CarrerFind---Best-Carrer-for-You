'use client';

import React, { useState, useEffect } from 'react';
import VideoModal from '@/components/VideoModal';
import { track, trackError } from '@/lib/telemetry';
import {
  Video,
  Play,
  Search,
  Filter,
  PlusCircle,
  Bookmark,
  Sparkles,
  User,
  Clock,
  MapPin,
  CheckCircle2,
  X,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function VideosPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('all');

  // Submit Modal
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [submitTitle, setSubmitTitle] = useState<string>('');
  const [submitUrl, setSubmitUrl] = useState<string>('');
  const [submitCreator, setSubmitCreator] = useState<string>('');
  const [submitRole, setSubmitRole] = useState<string>('ai-ml-engineer');
  const [submitDesc, setSubmitDesc] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const categories = [
    'All',
    'Technology & Engineering',
    'Medicine & Healthcare',
    'Aviation & Maritime Operations',
    'Law & Government',
    'Finance & Banking',
    'Business & Management',
    'Engineering & Built Environment',
    'Hospitality & Food',
    'Sports & Fitness',
  ];
  const levels = ['All', 'Junior', 'Mid-Level', 'Senior', 'Founder'];

  const playlists = [
    { id: 'all', title: 'All Documentaries' },
    { id: 'ai-ml-engineer', title: 'AI & Machine Learning' },
    { id: 'industrial-automation-controls-engineer', title: 'Industrial Automation & Controls' },
    { id: 'forward-deployed-ai-robotics-engineer', title: 'Forward Deployed AI & Robotics' },
    { id: 'renewable-energy-project-developer', title: 'Renewable Energy Development' },
    { id: 'medical-technology-application-specialist', title: 'MedTech Application Specialist' },
    { id: 'smart-buildings-energy-automation-consultant', title: 'Smart Buildings & Energy' },
    { id: 'ai-product-manager', title: 'AI Product Management' },
    { id: 'forward-deployed-engineer', title: 'Forward Deployed Engineer (FDE)' },
    { id: 'doctor-physician', title: 'Inpatient Medicine' },
    { id: 'surgeon', title: 'Trauma & General Surgery' },
    { id: 'airline-pilot', title: 'Commercial Airline Cockpit' },
    { id: 'lawyer-advocate', title: 'Courtroom Trial Advocacy' },
    { id: 'diplomat-ifs', title: 'Foreign Service & Diplomacy' },
    { id: 'investment-banker', title: 'Wall Street & M&A Banking' },
    { id: 'enterprise-sales-account-manager', title: 'Enterprise Software Sales' },
    { id: 'civil-engineer', title: 'Civil & Structural Engineering' },
    { id: 'chef', title: 'Michelin Culinary Gastronomy' },
    { id: 'professional-athlete', title: 'Pro Athlete Performance' },
    { id: 'air-traffic-controller', title: 'Air Traffic Control (ATC)' },
  ];

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setFetchError(null);
      const url = new URL('/api/videos', window.location.origin);
      if (selectedCategory !== 'All') url.searchParams.set('category', selectedCategory);
      if (selectedLevel !== 'All') url.searchParams.set('experienceLevel', selectedLevel);
      if (selectedPlaylist !== 'all') url.searchParams.set('professionSlug', selectedPlaylist);
      if (searchTerm) url.searchParams.set('search', searchTerm);

      const res = await fetch(url.toString());
      const data = await res.json();
      setVideos(data.videos || []);
      setBookmarkedIds(data.bookmarkedIds || []);
      track('videos_filter_applied', {
        category: selectedCategory,
        level: selectedLevel,
        playlist: selectedPlaylist,
        search: searchTerm || undefined,
        videoCount: data.videos?.length || 0,
      });
    } catch (e: any) {
      setFetchError('Failed to load videos. Please try again.');
      trackError(e, { component: 'VideosPage', action: 'fetchVideos' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [selectedCategory, selectedLevel, selectedPlaylist, searchTerm]);

  const handleToggleBookmark = async (videoId: string) => {
    try {
      const res = await fetch('/api/videos/bookmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
      });
      const data = await res.json();
      if (data.bookmarked) {
        setBookmarkedIds((prev) => [...prev, videoId]);
        track('video_bookmarked', { videoId });
      } else {
        setBookmarkedIds((prev) => prev.filter((id) => id !== videoId));
        track('video_unbookmarked', { videoId });
      }
    } catch (e: any) {
      trackError(e, { component: 'VideosPage', action: 'handleToggleBookmark', videoId });
    }
  };

  const handleSuggestVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    try {
      setSubmitting(true);
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: submitTitle,
          youtubeUrl: submitUrl,
          creator: submitCreator,
          professionSlug: submitRole,
          category: 'Technology & Engineering',
          experienceLevel: 'Mid-Level',
          description: submitDesc,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitSuccess(true);
        track('video_suggest_submitted', { title: submitTitle, professionSlug: submitRole });
        setTimeout(() => {
          setShowSubmitModal(false);
          setSubmitSuccess(false);
          setSubmitTitle('');
          setSubmitUrl('');
          setSubmitCreator('');
          setSubmitDesc('');
          fetchVideos();
        }, 1500);
      } else {
        throw new Error(data.error || 'Failed to submit video');
      }
    } catch (e: any) {
      setSubmitError(e?.message || 'Failed to submit video. Please try again.');
      trackError(e, { component: 'VideosPage', action: 'handleSuggestVideo' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Video className="w-4 h-4" />
            <span>&ldquo;A Day in the Life&rdquo; – Video Library</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            See What Professionals Actually Do All Day
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Curated YouTube video documentaries showcasing real working days across junior employees, senior engineers, and startup founders.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 transition-all shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Suggest a Video</span>
        </button>
      </div>

      {/* Curated Playlists Bar */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Curated Career Playlists
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {playlists.map((pl) => {
            const isSelected = selectedPlaylist === pl.id;
            return (
              <button
                key={pl.id}
                onClick={() => setSelectedPlaylist(pl.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'glass-panel text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                {pl.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by video title, company, creator, or topic..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex-1 sm:flex-none flex items-center justify-between sm:justify-start gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className="text-slate-400">Industry:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-slate-900">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 sm:flex-none flex items-center justify-between sm:justify-start gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className="text-slate-400">Seniority:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              {levels.map((l) => (
                <option key={l} value={l} className="bg-slate-900">
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      {fetchError && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{fetchError}</span>
          </div>
          <button
            onClick={fetchVideos}
            className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-semibold"
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-64 rounded-3xl bg-slate-900/60 border border-slate-800" />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-20 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <Video className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No videos found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try choosing a different playlist or resetting your search filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => {
            const isBookmarked = bookmarkedIds.includes(video.id);
            return (
              <div
                key={video.id}
                className="group relative rounded-3xl glass-panel border border-slate-800 overflow-hidden hover:border-purple-500/50 transition-all hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Thumbnail Container */}
                <div
                  onClick={() => {
                    track('video_opened', { videoId: video.id, title: video.title });
                    setSelectedVideo(video);
                  }}
                  className="relative aspect-video w-full bg-slate-950 cursor-pointer overflow-hidden"
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-indigo-500 transition-all">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                    {video.duration}
                  </span>
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-indigo-600/80 text-[10px] font-semibold text-white backdrop-blur-sm">
                    {video.experienceLevel}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        onClick={() => setSelectedVideo(video)}
                        className="text-xs sm:text-sm font-bold text-white line-clamp-2 group-hover:text-indigo-300 transition-colors cursor-pointer leading-snug"
                      >
                        {video.title}
                      </h3>
                      <button
                        onClick={() => handleToggleBookmark(video.id)}
                        className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                          isBookmarked
                            ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                            : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                        title={isBookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-purple-400' : ''}`} />
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-1">
                      {video.creator} • {video.channelName}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">{video.location}</span>
                    <button
                      onClick={() => setSelectedVideo(video)}
                      className="text-indigo-400 hover:text-indigo-300 font-semibold"
                    >
                      Watch & Learn →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Suggest Video Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl sm:rounded-3xl glass-panel border border-slate-700 bg-slate-900 p-4 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Suggest a Day-in-the-Life Video</h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Thank you for submitting!</h4>
                <p className="text-xs text-slate-400">
                  Your video suggestion has been added to our library curation queue.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSuggestVideo} className="space-y-3.5">
                {submitError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{submitError}</span>
                  </div>
                )}
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">Video Title</label>
                  <input
                    type="text"
                    required
                    value={submitTitle}
                    onChange={(e) => setSubmitTitle(e.target.value)}
                    placeholder="e.g. Day in the life of a Cloud Architect at AWS"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">YouTube URL</label>
                  <input
                    type="url"
                    required
                    value={submitUrl}
                    onChange={(e) => setSubmitUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">Creator / Channel Name</label>
                  <input
                    type="text"
                    required
                    value={submitCreator}
                    onChange={(e) => setSubmitCreator(e.target.value)}
                    placeholder="e.g. Tech With Tim"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">What should students learn from this?</label>
                  <textarea
                    rows={2}
                    value={submitDesc}
                    onChange={(e) => setSubmitDesc(e.target.value)}
                    placeholder="Key takeaways, highlights, or tips..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white"
                  >
                    Submit for Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        isBookmarked={selectedVideo ? bookmarkedIds.includes(selectedVideo.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />
    </div>
  );
}
