'use client';

import { useEffect } from 'react';
import { trackError } from '@/lib/telemetry';

/**
 * Global chunk load error recovery listener.
 *
 * Catches webpack ChunkLoadErrors (caused by new deployments, stale browser cache,
 * or slow compilation timeouts) and automatically performs a clean one-time reload
 * so the client browser fetches the current build chunks transparently.
 */
export default function ChunkErrorRecovery() {
  useEffect(() => {
    const handleChunkError = (message: string) => {
      const isChunkError =
        message.includes('Loading chunk') ||
        message.includes('ChunkLoadError') ||
        message.includes('loading chunk') ||
        message.includes('failed to load script');

      if (isChunkError) {
        trackError(new Error(message), { context: 'ChunkLoadErrorRecovery' });
        const lastReload = sessionStorage.getItem('chunk_reload_timestamp');
        const now = Date.now();
        // Allow reload once every 10 seconds to avoid infinite reload loop
        if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
          sessionStorage.setItem('chunk_reload_timestamp', now.toString());
          window.location.reload();
        }
      }
    };

    const onError = (event: ErrorEvent) => {
      if (event.message) {
        handleChunkError(event.message);
      }
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message = reason instanceof Error ? reason.message : String(reason);
      handleChunkError(message);
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onUnhandledRejection);

    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
    };
  }, []);

  return null;
}
