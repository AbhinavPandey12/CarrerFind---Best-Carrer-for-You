import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

const log = logger('Prisma');

/**
 * PrismaClient singleton.
 *
 * In development the client is attached to the Node.js global object so that
 * Next.js hot-module replacement does not create a new connection pool on
 * every file save. In production a fresh client is instantiated once per
 * process.
 *
 * Log levels:
 *   - development: 'query', 'info', 'warn', 'error'
 *   - production:  'warn', 'error' only
 */

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createPrismaClient(): PrismaClient {
  const isDev = process.env.NODE_ENV === 'development';

  const client = new PrismaClient({
    log: isDev
      ? [
          { emit: 'event', level: 'query' },
          { emit: 'stdout', level: 'info' },
          { emit: 'stdout', level: 'warn' },
          { emit: 'stdout', level: 'error' },
        ]
      : [
          { emit: 'stdout', level: 'warn' },
          { emit: 'stdout', level: 'error' },
        ],
  });

  if (isDev) {
    // Forward slow queries to the structured logger for easy profiling.
    // The '$on' method is only available when the 'query' event log is enabled.
    (client as any).$on('query', (e: { query: string; duration: number }) => {
      if (e.duration > 200) {
        log.warn('Slow Prisma query detected', {
          query: e.query,
          duration_ms: e.duration,
        });
      }
    });
  }

  return client;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;

  log.debug('Prisma client initialised (development singleton)');
}
