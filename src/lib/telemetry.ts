/**
 * @module telemetry
 * Lightweight client-side telemetry for CareerFind.
 *
 * Usage (client components only):
 *   import { track, trackError, measure } from '@/lib/telemetry';
 *
 *   // Track a named event with optional properties
 *   track('assessment_started', { totalSteps: 20 });
 *
 *   // Track an error with context
 *   trackError(err, { component: 'BookingModal', mentorId: '...' });
 *
 *   // Measure async operation duration
 *   const result = await measure('fetch_careers', () => fetchCareers());
 *
 * To wire up a real analytics provider (PostHog, Mixpanel, Amplitude, etc.)
 * replace the `dispatch()` function below — no call sites need to change.
 */

export interface TelemetryEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp: string;
}

/** Core dispatch — swap for your analytics provider. */
function dispatch(entry: TelemetryEvent): void {
  // Guard: only run in browser
  if (typeof window === 'undefined') return;

  if (process.env.NODE_ENV === 'development') {
    // Log events clearly during development for easy inspection
    console.info(
      `[Telemetry] ${entry.event}`,
      entry.properties ?? {},
    );
  }

  // ── PostHog example ──────────────────────────────────────────────
  // if (window.posthog) {
  //   window.posthog.capture(entry.event, entry.properties);
  // }

  // ── Mixpanel example ─────────────────────────────────────────────
  // if (window.mixpanel) {
  //   window.mixpanel.track(entry.event, entry.properties);
  // }

  // ── Datadog RUM example ──────────────────────────────────────────
  // if (window.DD_RUM) {
  //   window.DD_RUM.addAction(entry.event, entry.properties);
  // }
}

/**
 * Track a named user action or system event.
 * Safe to call unconditionally — no-ops server-side.
 */
export function track(event: string, properties?: Record<string, unknown>): void {
  dispatch({ event, properties, timestamp: new Date().toISOString() });
}

/**
 * Track an error with optional context. Normalises Error objects
 * and plain strings into a consistent structure.
 */
export function trackError(
  err: unknown,
  context?: Record<string, unknown>,
): void {
  const message = err instanceof Error ? err.message : String(err);
  const stack = err instanceof Error ? err.stack : undefined;

  dispatch({
    event: 'error_encountered',
    properties: {
      error_message: message,
      error_stack: process.env.NODE_ENV === 'development' ? stack : undefined,
      ...context,
    },
    timestamp: new Date().toISOString(),
  });
}

/**
 * Measure the wall-clock duration of an async operation and emit
 * a telemetry event with the elapsed milliseconds.
 *
 * @example
 *   const careers = await measure('api_fetch_careers', () => fetchCareers());
 */
export async function measure<T>(
  label: string,
  fn: () => Promise<T>,
  extraProps?: Record<string, unknown>,
): Promise<T> {
  const start = Date.now();
  try {
    const result = await fn();
    track(`${label}_completed`, {
      duration_ms: Date.now() - start,
      success: true,
      ...extraProps,
    });
    return result;
  } catch (err) {
    track(`${label}_failed`, {
      duration_ms: Date.now() - start,
      success: false,
      error_message: err instanceof Error ? err.message : String(err),
      ...extraProps,
    });
    throw err;
  }
}

/**
 * Measure a synchronous operation.
 */
export function measureSync<T>(
  label: string,
  fn: () => T,
  extraProps?: Record<string, unknown>,
): T {
  const start = Date.now();
  try {
    const result = fn();
    track(`${label}_completed`, {
      duration_ms: Date.now() - start,
      success: true,
      ...extraProps,
    });
    return result;
  } catch (err) {
    track(`${label}_failed`, {
      duration_ms: Date.now() - start,
      success: false,
      error_message: err instanceof Error ? err.message : String(err),
      ...extraProps,
    });
    throw err;
  }
}
