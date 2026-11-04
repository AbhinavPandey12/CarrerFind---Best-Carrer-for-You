import { cookies } from 'next/headers';
import { prisma } from './prisma';

export interface AuthSessionUser {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'MENTOR' | 'ADMIN';
  avatarUrl?: string | null;
  headline?: string | null;
}

const SESSION_COOKIE_NAME = 'careerfind_session';

export async function getCurrentUser(): Promise<AuthSessionUser | null> {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie || !sessionCookie.value) {
      // Return student demo user by default if no session yet, or null
      return null;
    }

    const payload = JSON.parse(decodeURIComponent(sessionCookie.value));
    if (!payload?.id) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatarUrl: true,
        headline: true,
      },
    });

    if (!user) return null;
    return user as AuthSessionUser;
  } catch (err) {
    return null;
  }
}

export function createSessionCookie(user: { id: string; email: string; name: string; role: string }) {
  const sessionData = encodeURIComponent(
    JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })
  );
  return `${SESSION_COOKIE_NAME}=${sessionData}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`;
}
