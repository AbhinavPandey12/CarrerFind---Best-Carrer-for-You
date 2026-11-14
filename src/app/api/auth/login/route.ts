import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createSessionCookie } from '@/lib/auth';
import { logger, formatError } from '@/lib/logger';

const log = logger('API:Auth:Login');

export async function POST(req: Request) {
  const start = Date.now();
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      log.warn('Login: invalid JSON body');
      return NextResponse.json({ success: false, error: 'Invalid JSON request body' }, { status: 400 });
    }

    const { email, password } = body;

    if (!email || !password) {
      log.warn('Login: missing email or password');
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      log.warn('Login: user not found', { email: email.toLowerCase() });
      return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      log.warn('Login: incorrect password', { userId: user.id, email: user.email });
      return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
    }

    const cookieHeader = createSessionCookie(user);
    log.info('Login: successful authentication', { userId: user.id, role: user.role, duration_ms: Date.now() - start });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
        headline: user.headline,
      },
    });
    response.headers.set('Set-Cookie', cookieHeader);
    return response;
  } catch (error: any) {
    log.error('Login: unexpected error', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ success: false, error: error?.message || 'Login failed' }, { status: 500 });
  }
}
