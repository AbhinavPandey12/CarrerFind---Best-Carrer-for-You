import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { logger, formatError } from '@/lib/logger';

export const dynamic = 'force-dynamic';

const log = logger('API:Auth:Me');

export async function GET() {
  try {
    const user = await getCurrentUser();
    log.debug('Current user session fetched', { userId: user?.id, role: user?.role });
    return NextResponse.json({ user });
  } catch (error: any) {
    if (error instanceof Error && (error.message?.includes('Dynamic server usage') || (error as any)?.digest === 'DYNAMIC_SERVER_USAGE')) {
      throw error;
    }
    log.error('Failed to get current user', { error: formatError(error) });
    return NextResponse.json({ user: null, error: error?.message || 'Failed to authenticate' }, { status: 500 });
  }
}
