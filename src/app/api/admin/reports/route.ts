import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger, formatError } from '@/lib/logger';

const log = logger('API:Admin:Reports');

export async function PATCH(req: Request) {
  const start = Date.now();
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      log.warn('Admin Reports PATCH: invalid JSON');
      return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
    }

    const { reportId, status, adminNotes } = body;

    if (!reportId || !status) {
      log.warn('Admin Reports PATCH: missing reportId or status');
      return NextResponse.json({ error: 'Report ID and status are required' }, { status: 400 });
    }

    const report = await prisma.platformReport.update({
      where: { id: reportId },
      data: {
        status,
        adminNotes: adminNotes || undefined,
      },
    });

    log.info('Admin report updated', { reportId, status, duration_ms: Date.now() - start });

    return NextResponse.json({ success: true, report });
  } catch (error: any) {
    log.error('Admin Reports PATCH error', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ error: error?.message || 'Failed to update report' }, { status: 500 });
  }
}
