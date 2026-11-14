import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

const log = logger('API:Auth:Logout');

export async function POST() {
  log.info('User session terminated');
  const response = NextResponse.json({ success: true });
  response.headers.set(
    'Set-Cookie',
    'careerfind_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'
  );
  return response;
}
