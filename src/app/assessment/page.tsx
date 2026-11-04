'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ASSESSMENT_QUESTIONS,
  AssessmentAnswerState,
  RecommendedCareerResult,
} from '@/lib/assessmentEngine';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Brain,
  TrendingUp,
  DollarSign,
  Heart,
  BarChart2,
  Calendar,
  AlertCircle,
  HelpCircle,
  Award,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

export default function AssessmentPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<AssessmentAnswerState>({
    technicalOrientation: [],
    workMode: [],
    workLifeBalanceTolerance: [],
    salaryPriority: [],
    mathAnalyticalAptitude: [],
    creativeDesignAptitude: [],
    leadershipPeopleAptitude: [],
    helpingAndHumanImpact: [],
    physicalDexterityTacticalCraft: [],
    governanceLawPublicService: [],
    continuousLearning: [],
    lifestylePainPoints: [],
    existingSkills: [],
    preferredIndustries: [],
    ambiguityTolerance: [],
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [resultData, setResultData] = useState<{
    archetypeTitle: string;
    archetypeSubtitle: string;
    topCareers: RecommendedCareerResult[];
  } | null>(null);

  const currentQuestion = ASSESSMENT_QUESTIONS[currentStepIndex];
  const totalSteps = ASSESSMENT_QUESTIONS.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  const handleSingleSelect = (val: any) => {
    const key = currentQuestion.id as keyof AssessmentAnswerState;
    const currentRaw = answers[key];
    const currentList: any[] = Array.isArray(currentRaw)
      ? currentRaw
      : currentRaw !== undefined && currentRaw !== null
      ? [currentRaw]
      : [];

    if (val === 'not_clear') {
      // Toggle 'not_clear': if active, deselect; otherwise, select 'not_clear' and clear others
      if (currentList.includes('not_clear')) {
        setAnswers((prev) => ({ ...prev, [key]: [] }));
      } else {
        setAnswers((prev) => ({ ...prev, [key]: ['not_clear'] }));
      }
    } else {
      // Option clicked: clear 'not_clear' if previously selected
      const withoutNotClear = currentList.filter((x) => x !== 'not_clear');
      if (withoutNotClear.includes(val)) {
        // Toggle off
        setAnswers((prev) => ({
          ...prev,
          [key]: withoutNotClear.filter((x) => x !== val),
        }));
      } else {
        // Toggle on / multi-select
        setAnswers((prev) => ({
          ...prev,
          [key]: [...withoutNotClear, val],
        }));
      }
    }
  };

  const handleMultiSelectToggle = (item: string) => {
    const key = currentQuestion.id as keyof AssessmentAnswerState;
    const currentList = ((answers[key] as string[]) || []);
    if (currentList.includes(item)) {
      setAnswers((prev) => ({
        ...prev,
        [key]: currentList.filter((x) => x !== item),
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [key]: [...currentList, item],
      }));
    }
  };

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      submitAssessment();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const submitAssessment = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to calculate recommendations');
      }

      setResultData({
        archetypeTitle: data.archetypeTitle,
        archetypeSubtitle: data.archetypeSubtitle,
        topCareers: data.topCareers,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setResultData(null);
    setCurrentStepIndex(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {!resultData ? (
        /* WIZARD QUESTIONNAIRE */
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-panel border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Intelligent Career Recommendation Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Interactive Career Assessment
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              Answer {totalSteps} targeted questions across technical systems, patient care, public governance, creative arts, and tactical operations to discover your personalized compatibility.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold text-white">
                Step {currentStepIndex + 1} of {totalSteps}: {currentQuestion.category}
              </span>
              <span className="font-mono text-indigo-400 font-bold">{progressPercent}% Completed</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Current Question Card */}
          <div className="p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl glass-panel border border-slate-800 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">
                Question {currentStepIndex + 1}
              </span>
              <h2 className="text-lg sm:text-2xl font-bold text-white leading-snug">
                {currentQuestion.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">{currentQuestion.description}</p>
            </div>

            {/* Render Question Input Type */}
            {currentQuestion.isMultiSelect ? (
              /* Multi Select Pills */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQuestion.skills?.map((item) => {
                  const key = currentQuestion.id as keyof AssessmentAnswerState;
                  const isChecked = ((answers[key] as string[]) || []).includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleMultiSelectToggle(item)}
                      className={`p-3.5 rounded-2xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-indigo-600/30 border-indigo-400 text-white ring-1 ring-indigo-400'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span>{item}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Option Cards (Multi-Select & Not Clear Supported) */
              <div className="space-y-3 pt-2">
                {currentQuestion.options?.map((opt: any) => {
                  const currentVal = answers[currentQuestion.id as keyof AssessmentAnswerState];
                  const isSelected = Array.isArray(currentVal)
                    ? (currentVal as any[]).includes(opt.value)
                    : (currentVal as any) === opt.value;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleSingleSelect(opt.value)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start justify-between ${
                        isSelected
                          ? 'bg-indigo-600/25 border-indigo-400 text-white ring-1 ring-indigo-400 shadow-md shadow-indigo-500/10'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="text-xs sm:text-sm font-bold text-white block">
                          {opt.label}
                        </span>
                        <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                          {opt.description}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'border-indigo-400 bg-indigo-500' : 'border-slate-700'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStepIndex === 0}
                className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 hover:scale-[1.02]"
              >
                {loading ? (
                  <span>Computing Alignment...</span>
                ) : currentStepIndex === totalSteps - 1 ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Career Matches</span>
                  </>
                ) : (
                  <>
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* RESULTS DASHBOARD */
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* Header & Archetype Banner */}
          <div className="rounded-2xl sm:rounded-3xl glass-panel p-5 sm:p-8 md:p-12 border border-slate-800 relative overflow-hidden bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4 text-indigo-400" />
                  <span>Your Career Assessment Archetype</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {resultData.archetypeTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {resultData.archetypeSubtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <button
                  onClick={handleRestart}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold glass-panel text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake Assessment</span>
                </button>
                <Link
                  href="/student/compare"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Compare Top Matches</span>
                </Link>
              </div>
            </div>

            {/* Explainability note */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400">
              <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>
                <strong>Methodology:</strong> Compatibility scores represent multi-attribute alignment across technical depth, work-life balance, compensation goals, and learning curves.
              </span>
            </div>
          </div>

          {/* Top 10 Recommended Careers List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  Top Recommended Career Paths
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Ranked by compatibility percentage with detailed skill gap breakdowns.
                </p>
              </div>
              <span className="text-xs text-indigo-400 font-semibold hidden sm:inline">
                Showing 10 Matching Professions
              </span>
            </div>

            <div className="space-y-4">
              {resultData.topCareers.map((rec, idx) => (
                <div
                  key={rec.careerSlug}
                  className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-panel border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6"
                >
                  {/* Left: Rank + Title + Match Explanation */}
                  <div className="flex items-start gap-3 sm:gap-4 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center font-extrabold text-sm sm:text-base text-indigo-300 shrink-0">
                      #{idx + 1}
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base sm:text-lg font-bold text-white">{rec.title}</h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full badge-tech">
                          {rec.category}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                        {rec.whyMatch}
                      </p>

                      {/* Skills Possessed vs Needed */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 text-[11px]">
                        <div>
                          <span className="text-slate-400 mr-1.5 font-medium">Skills You Have:</span>
                          <span className="text-emerald-400 font-semibold">
                            {rec.possessedSkills.join(', ')}
                          </span>
                        </div>
                        {rec.missingSkills.length > 0 && (
                          <div>
                            <span className="text-slate-400 mr-1.5 font-medium">Skills to Develop:</span>
                            <span className="text-amber-400 font-semibold">
                              {rec.missingSkills.join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Salary & Metrics Pill */}
                  <div className="w-full lg:w-auto grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-900/80 border border-slate-800 text-[11px] shrink-0">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Senior Pay</span>
                      <span className="font-bold text-white">${rec.seniorSalaryMin}k - ${rec.seniorSalaryMax}k</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Learning Bar</span>
                      <span className="font-bold text-indigo-300">{rec.learningDifficulty}/10</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Work-Life</span>
                      <span className="font-bold text-emerald-400">{rec.workLifeBalance}/10</span>
                    </div>
                  </div>

                  {/* Right: Compatibility Score & CTAs */}
                  <div className="w-full lg:w-auto flex flex-row lg:flex-col items-center justify-between lg:items-end gap-3 shrink-0">
                    <div className="text-left lg:text-right">
                      <span className="text-xl sm:text-2xl font-black text-indigo-400">{rec.compatibilityScore}%</span>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Match</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/student/compare?add=${rec.careerSlug}`}
                        className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white glass-panel border border-slate-700"
                      >
                        Compare
                      </Link>
                      <Link
                        href={`/careers/${rec.careerSlug}`}
                        className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm flex items-center gap-1"
                      >
                        <span>Profile</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
