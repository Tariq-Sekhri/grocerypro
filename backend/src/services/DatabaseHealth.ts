/** Bound health checks without adding more queries when the DB pool is stuck. */
export function databaseProbe(query: () => Promise<unknown>, timeoutMs = 3000) {
  let pending: Promise<void> | null = null;
  return async () => {
    if (!pending) {
      const operation = Promise.resolve().then(query).then(() => {});
      pending = operation;
      const clear = () => { if (pending === operation) pending = null; };
      operation.then(clear, clear);
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([
        pending,
        new Promise<never>((_resolve, reject) => {
          timer = setTimeout(() => reject(Object.assign(new Error('Database health check timed out'), { code: 'HEALTH_TIMEOUT' })), timeoutMs);
        }),
      ]);
    } finally {
      clearTimeout(timer);
    }
  };
}
