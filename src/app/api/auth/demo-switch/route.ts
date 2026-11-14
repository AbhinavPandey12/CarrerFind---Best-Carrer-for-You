import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSessionCookie } from '@/lib/auth';
import { logger, formatError } from '@/lib/logger';

const log = logger('API:Auth:DemoSwitch');

export async function POST(req: Request) {
  const start = Date.now();
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      log.warn('DemoSwitch: invalid JSON body');
      return NextResponse.json({ success: false, error: 'Invalid JSON request body' }, { status: 400 });
    }

    const { role } = body;

    let targetEmail = 'alex.chen@university.edu';
    if (role === 'mentor') {
      targetEmail = 'priya.sharma@deepmind.com';
    } else if (role === 'admin') {
      targetEmail = 'admin@careerfind.com';
    }

    const user = await prisma.user.findUnique({
      where: { email: targetEmail },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatarUrl: true,
        headline: true,
      },
    });

    if (!user) {
      log.error('DemoSwitch: target persona user not found in database', { targetEmail, role });
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const cookieHeader = createSessionCookie(user);
    log.info('DemoSwitch: switched persona successfully', {
      role,
      userId: user.id,
      email: user.email,
      duration_ms: Date.now() - start,
    });

    const response = NextResponse.json({ success: true, user });
    response.headers.set('Set-Cookie', cookieHeader);
    return response;
  } catch (error: any) {
    log.error('DemoSwitch: unexpected error', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ success: false, error: error?.message || 'Failed to switch demo persona' }, { status: 500 });
  }
}
