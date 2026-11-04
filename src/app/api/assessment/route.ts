import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { computeCareerRecommendations, AssessmentAnswerState } from '@/lib/assessmentEngine';

export async function POST(req: Request) {
  try {
    const answers: AssessmentAnswerState = await req.json();

    const allCareers = await prisma.career.findMany();

    const recommendation = computeCareerRecommendations(answers, allCareers);

    // Save result if user logged in
    const currentUser = await getCurrentUser();
    let savedResultId = null;

    const targetUserId = currentUser?.id;
    if (targetUserId) {
      const saved = await prisma.assessmentResult.create({
        data: {
          userId: targetUserId,
          archetypeTitle: recommendation.archetypeTitle,
          archetypeSubtitle: recommendation.archetypeSubtitle,
          answersSnapshot: JSON.stringify(answers),
          recommendedCareers: JSON.stringify(recommendation.topCareers),
        },
      });
      savedResultId = saved.id;
    }

    return NextResponse.json({
      success: true,
      archetypeTitle: recommendation.archetypeTitle,
      archetypeSubtitle: recommendation.archetypeSubtitle,
      topCareers: recommendation.topCareers,
      savedResultId,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
