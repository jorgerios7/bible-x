type AbortSignalWithAny = typeof AbortSignal & {
  any?: (signals: AbortSignal[]) => AbortSignal;
};

type GlobalWithFirebaseAiPolyfills = typeof globalThis & {
  AbortSignal?: AbortSignalWithAny;
  DOMException?: typeof DOMException;
};

class ReactNativeDOMException extends Error {
  constructor(message = '', name = 'Error') {
    super(message);
    this.name = name;
  }
}

const globalScope = globalThis as GlobalWithFirebaseAiPolyfills;

if (typeof globalScope.DOMException !== 'function') {
  globalScope.DOMException = ReactNativeDOMException as unknown as typeof DOMException;
}

const abortController = (controller: AbortController, reason?: unknown) => {
  try {
    controller.abort(reason);
  } catch {
    controller.abort();
  }
};

if (
  typeof globalScope.AbortSignal === 'function' &&
  typeof globalScope.AbortSignal.any !== 'function' &&
  typeof AbortController === 'function'
) {
  globalScope.AbortSignal.any = (signals: AbortSignal[]) => {
    const controller = new AbortController();
    const cleanups: Array<() => void> = [];

    const cleanup = () => {
      while (cleanups.length) {
        cleanups.pop()?.();
      }
    };

    const abortFromSignal = (signal: AbortSignal) => {
      if (!controller.signal.aborted) {
        abortController(controller, signal.reason);
        cleanup();
      }
    };

    for (const signal of signals) {
      if (signal.aborted) {
        abortFromSignal(signal);
        break;
      }

      const onAbort = () => abortFromSignal(signal);
      signal.addEventListener('abort', onAbort, { once: true });
      cleanups.push(() => signal.removeEventListener('abort', onAbort));
    }

    return controller.signal;
  };
}
