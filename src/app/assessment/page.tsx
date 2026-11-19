'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { track, trackError } from '@/lib/telemetry';
import {
  ASSESSMENT_QUESTIONS,
  AssessmentAnswerState,
  RecommendedCareerResult,
  CareerSuitabilityEntry,
  PersonalCharacteristicsReview,
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
  User,
  Star,
  List,
  ChevronDown,
  ChevronUp,
  Layers,
  Target,
  Zap,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts';

export default function AssessmentPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<AssessmentAnswerState>({
    technicalOrientation: [],
    workMode: [],
    outputMedium: [],
    financialStrategy: [],
    mathAnalyticalAptitude: [],
    ambiguityTolerance: [],
    leadershipScope: [],
    helpingAndHumanImpact: [],
    creativeDesignAptitude: [],
    physicalDexterityTacticalCraft: [],
    technicalPracticalBalance: [],
    governanceLawPublicService: [],
    continuousLearning: [],
    feedbackHorizon: [],
    publicVisibility: [],
    pressureDynamics: [],
    lifestylePainPoints: [],
    existingSkills: [],
    preferredIndustries: [],
    coreLifeDriver: [],
    nonNegotiables: [],
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showAllCareers, setShowAllCareers] = useState<boolean>(false);
  const [resultData, setResultData] = useState<{
    archetypeTitle: string;
    archetypeSubtitle: string;
    topCareers: RecommendedCareerResult[];
    allCareers: CareerSuitabilityEntry[];
    personalReview: PersonalCharacteristicsReview;
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
    if (currentStepIndex === 0) {
      track('assessment_started', { totalSteps });
    }
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
      setErrorMsg(null);
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
        allCareers: data.allCareers || [],
        personalReview: data.personalReview || {
          summaryParagraph: '',
          keyStrengths: [],
          workStyleTraits: [],
          professionalInclinations: [],
          technicalPracticalBalance: '',
          workEnvironmentPreference: '',
          coreDrives: [],
          thingsToAvoid: [],
        },
      });
      track('assessment_completed', {
        archetypeTitle: data.archetypeTitle,
        topCareerCount: data.topCareers?.length || 0,
      });
    } catch (e: any) {
      setErrorMsg(e?.message || 'Failed to calculate recommendations. Please try again.');
      trackError(e, { component: 'AssessmentPage' });
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    track('assessment_restarted');
    setResultData(null);
    setCurrentStepIndex(0);
    setErrorMsg(null);
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!resultData ? 'py-4 sm:py-6' : 'py-10 sm:py-16'}`}>
      {!resultData ? (
        /* WIZARD QUESTIONNAIRE */
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {/* Header - Single short, concise one-line description */}
          <div className="text-center">
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Answer {totalSteps} focused questions to discover your personalized career matches and detailed compatibility analysis.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="p-3 sm:p-3.5 rounded-xl glass-panel border border-slate-800 space-y-1.5">
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
          <div className="p-4 sm:p-6 rounded-2xl glass-panel border border-slate-800 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}
            <div className="space-y-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">
                Question {currentStepIndex + 1} of {totalSteps}
              </span>
              <h2 className="text-base sm:text-xl font-bold text-white leading-snug">
                {currentQuestion.title}
              </h2>
              <p className="text-xs text-slate-400">{currentQuestion.description}</p>
            </div>

            {/* Multiple Selections Supported Notice */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-indigo-200 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <p className="text-[11px] text-indigo-300 leading-normal">
                <strong className="text-white font-semibold">Multiple selections supported:</strong> Select all options that match your preferences.
              </p>
            </div>

            {/* Render Question Input Type */}
            {currentQuestion.isMultiSelect ? (
              /* Multi Select Pills */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {currentQuestion.skills?.map((item) => {
                  const key = currentQuestion.id as keyof AssessmentAnswerState;
                  const isChecked = ((answers[key] as string[]) || []).includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleMultiSelectToggle(item)}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
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
              <div className="space-y-2 pt-1">
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
                      className={`w-full p-2.5 sm:p-3 rounded-xl border text-left transition-all flex items-start justify-between ${
                        isSelected
                          ? 'bg-indigo-600/25 border-indigo-400 text-white ring-1 ring-indigo-400 shadow-md shadow-indigo-500/10'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-xs sm:text-sm font-semibold text-white block">
                          {opt.label}
                        </span>
                        <p className="text-[11px] sm:text-xs text-slate-400 leading-snug">
                          {opt.description}
                        </p>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ml-2 ${
                          isSelected ? 'border-indigo-400 bg-indigo-500' : 'border-slate-700'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStepIndex === 0}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 hover:scale-[1.02]"
              >
                {loading ? (
                  <span>Computing Alignment...</span>
                ) : currentStepIndex === totalSteps - 1 ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Career Matches</span>
                  </>
                ) : (
                  <>
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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

          {/* ═══════════════════════════════════════════════════════
              SECTION 1: PERSONAL CHARACTERISTICS REVIEW
          ═══════════════════════════════════════════════════════ */}
          {resultData.personalReview && resultData.personalReview.summaryParagraph && (
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl glass-panel border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Personal Characteristics Review</h3>
                  <p className="text-[11px] text-slate-400">Based on your 21 assessment responses</p>
                </div>
              </div>

              {/* Summary Paragraph */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-l-2 border-indigo-500/40 pl-4">
                {resultData.personalReview.summaryParagraph}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Key Strengths */}
                {resultData.personalReview.keyStrengths?.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" /> Key Strengths
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {resultData.personalReview.keyStrengths.map((s, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-200 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Work Style Traits */}
                {resultData.personalReview.workStyleTraits?.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5" /> Work Style Traits
                    </h4>
                    <ul className="space-y-1">
                      {resultData.personalReview.workStyleTraits.map((t, i) => (
                        <li key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                          <span className="text-emerald-400 mt-0.5">•</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Professional Inclinations */}
                {resultData.personalReview.professionalInclinations?.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5" /> Professional Inclinations
                    </h4>
                    <ul className="space-y-1">
                      {resultData.personalReview.professionalInclinations.map((p, i) => (
                        <li key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                          <span className="text-amber-400 mt-0.5">•</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Core Drives */}
                {resultData.personalReview.coreDrives?.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5" /> Core Drives
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {resultData.personalReview.coreDrives.map((d, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-rose-950/40 border border-rose-500/20 text-rose-200 font-medium">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Technical-Practical Balance & Work Environment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                {resultData.personalReview.technicalPracticalBalance && (
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Technical / Practical Balance</span>
                    <span className="text-xs text-slate-200">{resultData.personalReview.technicalPracticalBalance}</span>
                  </div>
                )}
                {resultData.personalReview.workEnvironmentPreference && (
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Work Environment Preference</span>
                    <span className="text-xs text-slate-200">{resultData.personalReview.workEnvironmentPreference}</span>
                  </div>
                )}
              </div>

              {/* Things to Avoid */}
              {resultData.personalReview.thingsToAvoid?.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Work Situations to Avoid</h4>
                  <div className="flex flex-wrap gap-2">
                    {resultData.personalReview.thingsToAvoid.map((item, i) => (
                      <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-400 font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════
              SECTION 2: TOP CAREER RECOMMENDATION
          ═══════════════════════════════════════════════════════ */}
          {resultData.topCareers?.[0] && (
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl glass-panel border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Top Career Recommendation</h3>
                  <p className="text-[11px] text-indigo-300/70">Your single strongest career match based on all 21 responses</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-xl sm:text-2xl font-extrabold text-white">{resultData.topCareers[0].title}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full badge-tech">
                      {resultData.topCareers[0].category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{resultData.topCareers[0].whyMatch}</p>

                  <div className="flex flex-wrap gap-3 text-[11px] pt-1">
                    <div>
                      <span className="text-slate-400 mr-1 font-medium">Skills You Have:</span>
                      <span className="text-emerald-400 font-semibold">{resultData.topCareers[0].possessedSkills.join(', ')}</span>
                    </div>
                    {resultData.topCareers[0].missingSkills.length > 0 && (
                      <div>
                        <span className="text-slate-400 mr-1 font-medium">Skills to Develop:</span>
                        <span className="text-amber-400 font-semibold">{resultData.topCareers[0].missingSkills.join(', ')}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <div className="text-[11px] px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-slate-400">Entry:</span> <span className="text-white font-semibold">${resultData.topCareers[0].entrySalaryMin}k–${resultData.topCareers[0].entrySalaryMax}k</span>
                    </div>
                    <div className="text-[11px] px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-slate-400">Senior:</span> <span className="text-white font-semibold">${resultData.topCareers[0].seniorSalaryMin}k–${resultData.topCareers[0].seniorSalaryMax}k</span>
                    </div>
                    <div className="text-[11px] px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-slate-400">Work-Life:</span> <span className="text-emerald-400 font-semibold">{resultData.topCareers[0].workLifeBalance}/10</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className="text-center p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/30">
                    <span className="text-4xl font-black text-indigo-400 block">{resultData.topCareers[0].compatibilityScore}%</span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Match Score</span>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Link
                      href={`/careers/${resultData.topCareers[0].careerSlug}`}
                      className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-1 transition-all"
                    >
                      <span>View Full Profile</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/student/compare?add=${resultData.topCareers[0].careerSlug}`}
                      className="px-5 py-2 rounded-xl text-xs font-medium glass-panel text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center gap-1 transition-all"
                    >
                      <BarChart2 className="w-3.5 h-3.5" />
                      <span>Add to Compare</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════
              SECTION 2.5: VISUAL ANALYTICS DASHBOARD
          ═══════════════════════════════════════════════════════ */}
          {resultData.topCareers?.length > 0 && (() => {
            /* ---- Data prep ---- */
            const top10 = resultData.topCareers.slice(0, 10);

            // Bar chart: match scores
            const barData = top10.map((c) => ({
              name: c.title.length > 18 ? c.title.slice(0, 16) + '…' : c.title,
              fullName: c.title,
              score: c.compatibilityScore,
            }));

            // Radar chart: top 5 careers across 4 dimensions
            const top5 = top10.slice(0, 5);
            const radarDimensions = [
              { key: 'compatibilityScore', label: 'Match', max: 100 },
              { key: 'workLifeBalance', label: 'Work-Life', max: 10 },
              { key: 'learningDifficulty', label: 'Learning', max: 10 },
              { key: 'entrySalaryMin', label: 'Entry $', max: 150 },
              { key: 'seniorSalaryMin', label: 'Senior $', max: 400 },
            ];
            const radarData = radarDimensions.map((dim) => {
              const entry: any = { dimension: dim.label };
              top5.forEach((c, i) => {
                entry[`career${i}`] = Math.round(((c as any)[dim.key] || 0) / dim.max * 100);
              });
              return entry;
            });

            // Donut chart: skills possessed vs skills to develop
            const totalPossessed = top10.reduce((sum, c) => sum + (c.possessedSkills?.length || 0), 0);
            const totalMissing = top10.reduce((sum, c) => sum + (c.missingSkills?.length || 0), 0);
            const donutData = [
              { name: 'Skills You Have', value: totalPossessed, fill: '#10b981' },
              { name: 'Skills to Develop', value: totalMissing, fill: '#6366f1' },
            ];

            // Salary trajectory grouped bar data (top 5 careers)
            const salaryData = top5.map((c) => ({
              name: c.title.length > 14 ? c.title.slice(0, 12) + '…' : c.title,
              Entry: Math.round((c.entrySalaryMin + c.entrySalaryMax) / 2),
              Mid: Math.round((c.midSalaryMin + c.midSalaryMax) / 2),
              Senior: Math.round((c.seniorSalaryMin + c.seniorSalaryMax) / 2),
            }));

            const radarColors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#06b6d4'];

            const CustomTooltip = ({ active, payload, label }: any) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs shadow-xl">
                    <p className="text-white font-bold mb-1">{payload[0]?.payload?.fullName || label}</p>
                    {payload.map((p: any, i: number) => (
                      <p key={i} style={{ color: p.color }} className="font-semibold">
                        {p.name}: {p.name === 'score' ? `${p.value}%` : `$${p.value}k`}
                      </p>
                    ))}
                  </div>
                );
              }
              return null;
            };

            const SalaryTooltip = ({ active, payload, label }: any) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs shadow-xl">
                    <p className="text-white font-bold mb-1">{label}</p>
                    {payload.map((p: any, i: number) => (
                      <p key={i} style={{ color: p.color }} className="font-semibold">
                        {p.name}: ~${p.value}k/yr
                      </p>
                    ))}
                  </div>
                );
              }
              return null;
            };

            return (
              <div className="space-y-6">
                {/* Section Header */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <BarChart2 className="w-4 h-4 text-indigo-300" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">Visual Analytics Dashboard</h3>
                    <p className="text-[11px] text-slate-400">Charts and insights derived from your top career matches</p>
                  </div>
                </div>

                {/* Row 1: Match Score Bar Chart + Skill Donut */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                  {/* Match Score Bar Chart */}
                  <div className="lg:col-span-2 p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-indigo-400" /> Match Score — Top 10 Careers
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Your compatibility % across all recommended paths</p>
                    </div>
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={barData} margin={{ top: 4, right: 8, left: -20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: '#94a3b8', fontSize: 10 }}
                          angle={-38}
                          textAnchor="end"
                          interval={0}
                        />
                        <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} unit="%" />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.08)' }} />
                        <Bar dataKey="score" radius={[6, 6, 0, 0]} name="score">
                          {barData.map((_, i) => (
                            <Cell
                              key={i}
                              fill={i === 0 ? '#6366f1' : i <= 2 ? '#8b5cf6' : i <= 5 ? '#a78bfa' : '#c4b5fd'}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Skill Profile Donut */}
                  <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 space-y-3 flex flex-col">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-emerald-400" /> Your Skill Profile
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Across top 10 career matches combined</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                          <Pie
                            data={donutData}
                            cx="50%"
                            cy="50%"
                            innerRadius={52}
                            outerRadius={72}
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {donutData.map((entry, i) => (
                              <Cell key={i} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(val: any) => [`${val} skills`, '']}
                            contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', fontSize: '11px' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-col gap-1.5 w-full mt-2">
                        {donutData.map((d, i) => (
                          <div key={i} className="flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.fill }} />
                              <span className="text-slate-300">{d.name}</span>
                            </div>
                            <span className="font-bold text-white">{d.value}</span>
                          </div>
                        ))}
                        <div className="pt-1.5 border-t border-slate-800 mt-1 text-[11px] text-center">
                          <span className="text-slate-400">Readiness: </span>
                          <span className="font-bold text-emerald-400">
                            {Math.round((totalPossessed / (totalPossessed + totalMissing || 1)) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2: Salary Trajectory + Radar */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                  {/* Salary Trajectory Bar Chart */}
                  <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Salary Trajectory — Top 5 Matches
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Average salary ($k/yr) at each career stage</p>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={salaryData} margin={{ top: 4, right: 8, left: -16, bottom: 50 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-30} textAnchor="end" interval={0} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 10 }} unit="k" />
                        <Tooltip content={<SalaryTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
                        <Legend
                          wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                          formatter={(val) => <span style={{ color: '#94a3b8' }}>{val}</span>}
                        />
                        <Bar dataKey="Entry" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Mid" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Senior" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Multi-career Radar Chart */}
                  <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Brain className="w-3.5 h-3.5 text-purple-400" /> Multi-Dimension Radar — Top 5
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Normalised scores across key career dimensions</p>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                      <RadarChart cx="50%" cy="50%" outerRadius="68%" data={radarData}>
                        <PolarGrid stroke="#1e293b" />
                        <PolarAngleAxis dataKey="dimension" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        {top5.map((c, i) => (
                          <Radar
                            key={c.careerSlug}
                            name={c.title.length > 20 ? c.title.slice(0, 18) + '…' : c.title}
                            dataKey={`career${i}`}
                            stroke={radarColors[i]}
                            fill={radarColors[i]}
                            fillOpacity={0.12}
                            strokeWidth={1.5}
                          />
                        ))}
                        <Legend
                          wrapperStyle={{ fontSize: '10px' }}
                          formatter={(val) => <span style={{ color: '#94a3b8' }}>{val}</span>}
                        />
                        <Tooltip
                          contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', fontSize: '11px' }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ═══════════════════════════════════════════════════════
              SECTION 3: SUITABILITY ANALYSIS — ALL CAREERS
          ═══════════════════════════════════════════════════════ */}
          {resultData.allCareers?.length > 0 && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
                    <List className="w-5 h-5 text-indigo-400" />
                    Suitability Analysis — All {resultData.allCareers.length} Careers
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Every available career ranked from highest to lowest suitability based on your responses.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-[11px] shrink-0">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-semibold">Excellent Fit: ≥85%</span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 font-semibold">Good: ≥68%</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 font-semibold">Moderate: ≥48%</span>
                </div>
              </div>

              <div className="space-y-3">
                {(showAllCareers ? resultData.allCareers : resultData.allCareers.slice(0, 20)).map((career) => {
                  const fitColors: Record<string, string> = {
                    'Excellent Fit': 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300',
                    'Good Fit': 'bg-indigo-950/40 border-indigo-500/30 text-indigo-300',
                    'Moderate Fit': 'bg-amber-950/40 border-amber-500/30 text-amber-300',
                    'Low Fit': 'bg-rose-950/40 border-rose-500/30 text-rose-300',
                  };
                  const scoreColors: Record<string, string> = {
                    'Excellent Fit': 'text-emerald-400',
                    'Good Fit': 'text-indigo-400',
                    'Moderate Fit': 'text-amber-400',
                    'Low Fit': 'text-rose-400',
                  };
                  const fcClass = fitColors[career.fitCategory] || fitColors['Low Fit'];
                  const scoreClass = scoreColors[career.fitCategory] || scoreColors['Low Fit'];

                  return (
                    <div
                      key={career.careerSlug}
                      className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center gap-4"
                    >
                      {/* Rank Badge */}
                      <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-400 shrink-0">
                        #{career.rank}
                      </div>

                      {/* Title + Category + Explanation */}
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-bold text-white">{career.title}</span>
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full badge-tech">
                            {career.category}
                          </span>
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${fcClass}`}>
                            {career.fitCategory}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{career.fitExplanation}</p>
                        <div className="flex flex-wrap gap-3 text-[10px]">
                          {career.possessedSkills?.slice(0, 3).map((s, i) => (
                            <span key={i} className="text-emerald-400 font-medium">✓ {s}</span>
                          ))}
                          {career.missingSkills?.slice(0, 2).map((s, i) => (
                            <span key={i} className="text-amber-400 font-medium">△ {s}</span>
                          ))}
                        </div>
                      </div>

                      {/* Score + Link */}
                      <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
                        <div className="text-right">
                          <span className={`text-xl font-black ${scoreClass}`}>{career.compatibilityScore}%</span>
                          <span className="text-[10px] text-slate-500 block">{career.scoreOutOf10}/10</span>
                        </div>
                        <Link
                          href={`/careers/${career.careerSlug}`}
                          className="px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 flex items-center gap-1 transition-all"
                        >
                          <span>Profile</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Show All / Show Less Toggle */}
              {resultData.allCareers.length > 20 && (
                <button
                  type="button"
                  onClick={() => setShowAllCareers((prev) => !prev)}
                  className="w-full py-3 rounded-2xl glass-panel border border-slate-800 hover:border-indigo-500/30 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all"
                >
                  {showAllCareers ? (
                    <>
                      <ChevronUp className="w-4 h-4 text-indigo-400" />
                      Show Top 20 Only
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 text-indigo-400" />
                      Show All {resultData.allCareers.length} Careers
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════
              SECTION 4: RANKED TOP 10 RECOMMENDED CAREERS (existing)
          ═══════════════════════════════════════════════════════ */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-400" />
                  Ranked Top 10 Recommendations
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Your 10 highest-scoring career paths with detailed metrics and skill gap breakdowns.
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
