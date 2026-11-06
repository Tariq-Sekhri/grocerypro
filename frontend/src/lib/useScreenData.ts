import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { errorMessage, loadScreenData, peekScreenData } from "./api";
import { liveUpdatesConnected, subscribeToLiveUpdates } from "./liveUpdates";
import { appActive } from "./appState";
import { apiOrigin } from "./server";
import { readShoppingListCache, shoppingListCacheKey, writeShoppingListCache } from "./shoppingListCache";

/**
 * Loads `path` while the screen is open. Live screens refresh on server change
 * notifications, with safety reads every 15s (3s while disconnected or failing).
 * Edit forms pass live=false so remote updates cannot replace unsaved input.
 * Active shopping lists show a local snapshot first; successful reads replace it.
 */
export default function useScreenData<T>(path: string, live = true) {
  const origin = apiOrigin() || window.location.origin;
  const cacheKey = shoppingListCacheKey(origin, path);
  const identity = JSON.stringify([origin, path]);
  const cachedData = useMemo(() => peekScreenData<T>(path) ?? readShoppingListCache<T>(cacheKey), [cacheKey, path]);
  const [snapshot, setSnapshot] = useState(() => ({ identity, data: cachedData }));
  // Route changes must never briefly show the previous store's list.
  const data = snapshot.identity === identity ? snapshot.data : cachedData;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const refresh = useRef<(silent?: boolean) => Promise<void>>(async () => {});
  const reload = useCallback(() => { void refresh.current(false); }, []);

  useEffect(() => {
    let active = true, pending = false, lastSuccess = 0, failed = false;
    let request = false;
    let initialFailureTimer: ReturnType<typeof setTimeout> | undefined;
    let initialFailure: unknown;
    const fetchData = async (silent = true, fresh = true): Promise<void> => {
      if (!active) return;
      // Finish the current read, then read again if a newer change arrived.
      if (request) { pending = true; return; }
      request = true;
      if (!silent) setLoading(true);
      try {
        const response = await loadScreenData<T>(path, "navigation", fresh);
        if (active) {
          setSnapshot({ identity, data: response });
          writeShoppingListCache(cacheKey, response);
          setError(null); setLoading(false); lastSuccess = Date.now(); failed = false;
          if (initialFailureTimer) clearTimeout(initialFailureTimer);
          initialFailureTimer = undefined;
          initialFailure = undefined;
        }
      } catch (err) {
        if (active) {
          failed = true;
          // A backend that is starting or reconnecting can fail the first read
          // briefly. Keep the initial screen in its loading state while retries run.
          if (!cachedData && lastSuccess === 0) {
            initialFailure = err;
            if (!initialFailureTimer) {
              initialFailureTimer = setTimeout(() => {
                if (!active || !initialFailure) return;
                setError(errorMessage(initialFailure));
                setLoading(false);
              }, 5000);
            }
          } else {
            setError(errorMessage(err));
          }
        }
      } finally {
        request = false;
        if (active) {
          if (cachedData || lastSuccess > 0 || !initialFailure) setLoading(false);
          if (pending) { pending = false; void fetchData(); }
        }
      }
    };
    refresh.current = fetchData;
    void fetchData(false, live);
    const unsubscribe = live ? subscribeToLiveUpdates(() => { void fetchData(); }) : undefined;
    const timer = live ? setInterval(() => {
      if (!appActive()) return;
      const interval = !liveUpdatesConnected() || failed ? 3000 : 15000;
      if (Date.now() - lastSuccess >= interval) void fetchData();
    }, 1000) : undefined;
    return () => {
      active = false;
      unsubscribe?.();
      if (timer) clearInterval(timer);
      if (initialFailureTimer) clearTimeout(initialFailureTimer);
      refresh.current = async () => {};
    };
  }, [path, live, identity, cacheKey, cachedData]);
  return { data, loading, error, reload };
}
