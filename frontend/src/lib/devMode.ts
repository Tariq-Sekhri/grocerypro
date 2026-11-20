import { useSyncExternalStore } from "react";

let enabled = false;
let generation = 0;
const listeners = new Set<(enabled: boolean) => void>();

export const isDevMode = () => enabled;
export const devModeGeneration = () => generation;

export function onDevModeChange(listener: (enabled: boolean) => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function setDevModeState(next: boolean) {
  if (next === enabled) return;
  enabled = next;
  generation++;
  listeners.forEach(listener => listener(enabled));
}

export const useDevMode = () => useSyncExternalStore(
  listener => onDevModeChange(() => listener()),
  isDevMode,
);
