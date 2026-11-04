import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { mentorProfileId, status, notes } = await req.json();

    if (!mentorProfileId || !status) {
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

    return NextResponse.json({ success: true, mentor: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
