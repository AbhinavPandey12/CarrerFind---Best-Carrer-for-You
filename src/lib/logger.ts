/**
 * @module logger
 * Structured, leveled logger for CareerFind.
 *
 * Usage:
 *   import { logger } from '@/lib/logger';
 *   const log = logger('MyModule');
 *   log.info('User logged in', { userId: 'abc' });
 *   log.error('DB query failed', { error: err, query: '...' });
 *
 * In production, only 'info', 'warn', and 'error' are emitted.
 * In development, all levels (including 'debug') are emitted.
 *
 * To plug in a real sink (e.g. Datadog, Sentry, Logtail) later,
 * replace the `emit()` function below — all call sites remain unchanged.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  module: string;
  message: string;
  timestamp: string;
  data?: Record<string, unknown>;
}

const IS_DEV = process.env.NODE_ENV !== 'production';
const IS_TEST = process.env.NODE_ENV === 'test';

/** Minimum level to emit. Override via LOG_LEVEL env var. */
const LOG_LEVEL_RANK: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function getMinLevel(): LogLevel {
  const envLevel = process.env.LOG_LEVEL as LogLevel | undefined;
  if (envLevel && envLevel in LOG_LEVEL_RANK) return envLevel;
  return IS_DEV ? 'debug' : 'info';
}

/** Core emit function — swap this for your observability provider. */
function emit(entry: LogEntry): void {
  if (IS_TEST) return; // suppress logs during tests

  const minLevel = getMinLevel();
  if (LOG_LEVEL_RANK[entry.level] < LOG_LEVEL_RANK[minLevel]) return;

  const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}] [${entry.module}]`;
  const dataStr = entry.data ? ` ${JSON.stringify(entry.data)}` : '';
  const line = `${prefix} ${entry.message}${dataStr}`;

  switch (entry.level) {
    case 'debug':
      console.debug(line);
      break;
    case 'info':
      console.info(line);
      break;
    case 'warn':
      console.warn(line);
      break;
    case 'error':
      console.error(line);
      break;
  }
}

/** Create a scoped logger for a specific module. */
export function logger(module: string) {
  function log(level: LogLevel, message: string, data?: Record<string, unknown>) {
    emit({
      level,
      module,
      message,
      timestamp: new Date().toISOString(),
      data,
    });
  }

  return {
    debug: (message: string, data?: Record<string, unknown>) => log('debug', message, data),
    info: (message: string, data?: Record<string, unknown>) => log('info', message, data),
    warn: (message: string, data?: Record<string, unknown>) => log('warn', message, data),
    error: (message: string, data?: Record<string, unknown>) => log('error', message, data),
  };
}

/** Convenience helper: format an Error for structured logging. */
export function formatError(err: unknown): Record<string, unknown> {
  if (err instanceof Error) {
    return {
      name: err.name,
      message: err.message,
      stack: IS_DEV ? err.stack : undefined,
    };
  }
  return { raw: String(err) };
}
