import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { computeCareerRecommendations, AssessmentAnswerState } from '@/lib/assessmentEngine';
import { logger, formatError } from '@/lib/logger';

const log = logger('API:Assessment');

export async function POST(req: Request) {
  const start = Date.now();
  try {
    let answers: AssessmentAnswerState;
    try {
      answers = await req.json();
    } catch {
      log.warn('Assessment POST: invalid JSON body');
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 },
      );
    }

    if (!answers || typeof answers !== 'object') {
      log.warn('Assessment POST: missing or non-object answers');
      return NextResponse.json(
        { success: false, error: 'Request body must be a valid assessment answers object' },
        { status: 400 },
      );
    }

    const allCareers = await prisma.career.findMany();
    if (allCareers.length === 0) {
      log.error('Assessment POST: no careers found in database');
      return NextResponse.json(
        { success: false, error: 'Career data is temporarily unavailable. Please try again later.' },
        { status: 503 },
      );
    }

    const recommendation = computeCareerRecommendations(answers, allCareers);

    // Persist result when a user is authenticated
    const currentUser = await getCurrentUser();
    let savedResultId: string | null = null;

    if (currentUser?.id) {
      try {
        const saved = await prisma.assessmentResult.create({
          data: {
            userId: currentUser.id,
            archetypeTitle: recommendation.archetypeTitle,
            archetypeSubtitle: recommendation.archetypeSubtitle,
            answersSnapshot: JSON.stringify(answers),
            recommendedCareers: JSON.stringify(recommendation.topCareers),
          },
        });
        savedResultId = saved.id;
        log.info('Assessment result persisted', { userId: currentUser.id, resultId: saved.id });
      } catch (saveErr) {
        // Non-fatal: still return results even if save fails
        log.error('Failed to persist assessment result — returning results anyway', {
          userId: currentUser.id,
          error: formatError(saveErr),
        });
      }
    }

    log.info('Assessment computed successfully', {
      archetypeTitle: recommendation.archetypeTitle,
      topCareer: recommendation.topCareers[0]?.careerSlug,
      duration_ms: Date.now() - start,
    });

    return NextResponse.json({
      success: true,
      archetypeTitle: recommendation.archetypeTitle,
      archetypeSubtitle: recommendation.archetypeSubtitle,
      topCareers: recommendation.topCareers,
      savedResultId,
    });
  } catch (error: unknown) {
    log.error('Assessment POST: unhandled error', {
      error: formatError(error),
      duration_ms: Date.now() - start,
    });
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
