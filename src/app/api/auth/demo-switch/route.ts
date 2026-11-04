import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSessionCookie } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { role } = await req.json();

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
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const cookieHeader = createSessionCookie(user);
    const response = NextResponse.json({ success: true, user });
    response.headers.set('Set-Cookie', cookieHeader);
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
