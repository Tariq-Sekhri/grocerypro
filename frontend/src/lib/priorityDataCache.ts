export type LoadPriority = "viewport" | "hover" | "navigation";
const rank = { viewport: 0, hover: 1, navigation: 2 };
type Entry = {
  priority: LoadPriority; running: boolean; data?: unknown; ready: boolean; expires: number;
  promise: Promise<unknown>; load: (priority: LoadPriority) => Promise<unknown>;
  resolve: (data: unknown) => void; reject: (error: unknown) => void;
};

/** One background read at a time, with two slots reserved for user intent. */
export class PriorityDataCache {
  private entries = new Map<string, Entry>();
  private running = 0;
  private background = 0;
  private invalidationListeners = new Set<() => void>();

  onInvalidate(listener: () => void): () => void {
    this.invalidationListeners.add(listener);
    return () => { this.invalidationListeners.delete(listener); };
  }

  peek<T>(key: string): T | null {
    const entry = this.entries.get(key);
    return entry?.ready && entry.expires > Date.now() ? entry.data as T : null;
  }

  read<T>(key: string, priority: LoadPriority, load: (priority: LoadPriority) => Promise<T>, fresh = false): Promise<T> {
    const existing = this.entries.get(key);
    if (existing && (!existing.ready || (!fresh && existing.expires > Date.now()))) {
      if (rank[priority] > rank[existing.priority]) existing.priority = priority;
      this.drain();
      return existing.promise as Promise<T>;
    }
    // Bound speculative work when a catalog contains many visible links.
    if (priority === "viewport" && [...this.entries.values()].filter(e => !e.ready).length >= 32) {
      return Promise.reject(new Error("Preload queue full"));
    }
    let resolve!: Entry["resolve"], reject!: Entry["reject"];
    const promise = new Promise<unknown>((yes, no) => { resolve = yes; reject = no; });
    this.entries.set(key, { priority, running: false, ready: false, expires: 0, promise, load, resolve, reject });
    this.drain();
    return promise as Promise<T>;
  }

  invalidate() {
    for (const entry of this.entries.values()) {
      if (!entry.running && !entry.ready) entry.reject(new Error("Preload invalidated"));
    }
    this.entries.clear();
    for (const listener of this.invalidationListeners) listener();
  }

  private drain() {
    while (this.running < 3) {
      const next = [...this.entries.entries()].filter(([, e]) => !e.ready && !e.running
        && (e.priority !== "viewport" || this.background === 0))
        .sort((a, b) => rank[b[1].priority] - rank[a[1].priority])[0];
      if (!next) return;
      const [key, entry] = next;
      const background = entry.priority === "viewport";
      entry.running = true;
      this.running++;
      if (background) this.background++;
      void Promise.resolve().then(() => entry.load(entry.priority)).then(data => {
        entry.data = data; entry.ready = true; entry.expires = Date.now() + 5000;
        entry.resolve(data);
      }, error => {
        if (this.entries.get(key) === entry) this.entries.delete(key);
        entry.reject(error);
      }).finally(() => {
        this.running--;
        if (background) this.background--;
        // Retain at most 100 completed snapshots.
        const completed = [...this.entries.entries()].filter(([, e]) => e.ready);
        for (const [oldKey] of completed.slice(0, Math.max(0, completed.length - 100))) this.entries.delete(oldKey);
        this.drain();
      });
    }
  }
}

export const screenDataCache = new PriorityDataCache();
