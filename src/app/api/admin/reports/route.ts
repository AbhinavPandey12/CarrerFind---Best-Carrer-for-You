import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: Request) {
  try {
    const { reportId, status, adminNotes } = await req.json();

    if (!reportId || !status) {
      return NextResponse.json({ error: 'Report ID and status are required' }, { status: 400 });
    }

    const report = await prisma.platformReport.update({
      where: { id: reportId },
      data: {
        status,
        adminNotes: adminNotes || undefined,
      },
    });

    return NextResponse.json({ success: true, report });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
