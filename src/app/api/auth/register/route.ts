import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createSessionCookie } from '@/lib/auth';
import { logger, formatError } from '@/lib/logger';

const log = logger('API:Auth:Register');

export async function POST(req: Request) {
  const start = Date.now();
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      log.warn('Register: invalid JSON body');
      return NextResponse.json({ success: false, error: 'Invalid JSON request body' }, { status: 400 });
    }

    const { name, email, password, role, headline, company, title, industry } = body;

    if (!name || !email || !password) {
      log.warn('Register: missing required fields', { hasName: !!name, hasEmail: !!email, hasPassword: !!password });
      return NextResponse.json({ success: false, error: 'Name, email, and password are required' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      log.warn('Register: account with email already exists', { email: email.toLowerCase() });
      return NextResponse.json({ success: false, error: 'An account with this email already exists' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const assignedRole = role === 'MENTOR' ? 'MENTOR' : 'STUDENT';

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash,
        role: assignedRole,
        headline: headline || (assignedRole === 'STUDENT' ? 'Aspiring Professional & Student' : `${title || 'Specialist'} at ${company || 'Industry'}`),
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      },
    });

    if (assignedRole === 'STUDENT') {
      await prisma.studentProfile.create({
        data: {
          userId: user.id,
          academicLevel: 'Undergraduate',
        },
      });
    } else if (assignedRole === 'MENTOR') {
      await prisma.mentorProfile.create({
        data: {
          userId: user.id,
          company: company || 'Independent / Tech Firm',
          title: title || 'Senior Professional',
          industry: industry || 'Technology & Engineering',
          experienceYears: 4,
          aboutDayInLife: 'Mentoring future talent and solving complex problems daily.',
          verificationStatus: 'PENDING',
          isVerified: false,
          offersVirtual: true,
          offersInPerson: false,
        },
      });
    }

    const cookieHeader = createSessionCookie(user);
    log.info('Register: account created successfully', {
      userId: user.id,
      role: user.role,
      duration_ms: Date.now() - start,
    });

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
    log.error('Register: unexpected error', { error: formatError(error), duration_ms: Date.now() - start });
    return NextResponse.json({ success: false, error: error?.message || 'Registration failed' }, { status: 500 });
  }
}
