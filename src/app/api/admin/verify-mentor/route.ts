import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger, formatError } from '@/lib/logger';

const log = logger('API:Admin:VerifyMentor');

export async function POST(req: Request) {
  const start = Date.now();
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      log.warn('VerifyMentor POST: invalid JSON');
      return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
    }

    const { mentorProfileId, status, notes } = body;

    if (!mentorProfileId || !status) {
      log.warn('VerifyMentor POST: missing mentorProfileId or status');
      return NextResponse.json({ error: 'Mentor profile ID and status are required' }, { status: 400 });
    }

    const isVerified = status === 'APPROVED';

    const updated = await prisma.mentorProfile.update({
      where: { id: mentorProfileId },
      data: {
        verificationStatus: status,
        isVerified,
        verificationNotes: notes || (isVerified ? 'Verified by Admin review.' : 'Application rejected.'),
      },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    log.info('Mentor verification status updated', {
      mentorProfileId,
      status,
      isVerified,
      duration_ms: Date.now() - start,
    });

    return NextResponse.json({ success: true, mentor: updated });
  } catch (error: any) {
    log.error('VerifyMentor POST error', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ error: error?.message || 'Failed to update mentor verification status' }, { status: 500 });
  }
}
