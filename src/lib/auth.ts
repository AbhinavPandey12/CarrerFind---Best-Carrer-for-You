import { cookies } from 'next/headers';
import { prisma } from './prisma';
import { logger, formatError } from './logger';

const log = logger('Auth');

export interface AuthSessionUser {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'MENTOR' | 'ADMIN';
  avatarUrl?: string | null;
  headline?: string | null;
}

const SESSION_COOKIE_NAME = 'careerfind_session';

/**
 * Retrieve the currently authenticated user from the session cookie.
 *
 * Returns `null` when:
 *   - No session cookie is present (unauthenticated / public visitor)
 *   - The cookie payload is malformed or missing a user ID
 *   - The user ID in the payload no longer exists in the database
 *
 * All unexpected errors are logged and treated as unauthenticated to
 * prevent leaking internal details to callers.
 */
export async function getCurrentUser(): Promise<AuthSessionUser | null> {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie?.value) {
      log.debug('No session cookie found — treating as unauthenticated');
      return null;
    }

    let payload: { id?: string } | null = null;
    try {
      payload = JSON.parse(decodeURIComponent(sessionCookie.value));
    } catch (parseErr) {
      log.warn('Session cookie parse failed — treating as unauthenticated', {
        error: formatError(parseErr),
      });
      return null;
    }

    if (!payload?.id) {
      log.warn('Session cookie payload missing user ID');
      return null;
    }

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

    if (!user) {
      log.warn('Session references non-existent user', { userId: payload.id });
      return null;
    }

    log.debug('Session resolved successfully', { userId: user.id, role: user.role });
    return user as AuthSessionUser;
  } catch (err: any) {
    // If Next.js dynamic server bailout error, re-throw so App Router handles dynamic rendering
    if (err instanceof Error && (err.message?.includes('Dynamic server usage') || (err as any)?.digest === 'DYNAMIC_SERVER_USAGE')) {
      throw err;
    }
    // Unexpected error (e.g. DB unavailable) — log but do not throw so
    // callers always get a clean null instead of an unhandled exception.
    log.error('Unexpected error in getCurrentUser', { error: formatError(err) });
    return null;
  }
}

/**
 * Build an HTTP Set-Cookie header string for a new session.
 *
 * The session payload is a JSON-encoded, URL-encoded object containing
 * only the fields needed to identify the user. No sensitive data
 * (passwords, secrets) is ever stored in the cookie.
 *
 * Max-Age: 30 days.
 */
export function createSessionCookie(user: {
  id: string;
  email: string;
  name: string;
  role: string;
}): string {
  const sessionData = encodeURIComponent(
    JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }),
  );

  log.info('Session cookie created', { userId: user.id, role: user.role });

  return `${SESSION_COOKIE_NAME}=${sessionData}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`;
}
