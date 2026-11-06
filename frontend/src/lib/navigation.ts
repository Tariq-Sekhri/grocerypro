import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { App } from "@capacitor/app";
import { isNative } from "./server";

type BackHandler = () => void;
const handlers: BackHandler[] = [];
let fallback: BackHandler | null = null;

/** Registers a handler for the Android back button while `active` (most recent wins). */
export function useBackHandler(handler: BackHandler, active = true) {
  const latest = useRef(handler);
  useEffect(() => { latest.current = handler; });
  useEffect(() => {
    if (!active) return;
    const entry: BackHandler = () => latest.current();
    handlers.push(entry);
    return () => { handlers.splice(handlers.indexOf(entry), 1); };
  }, [active]);
}

/** Router-level back behaviour: pop history, or leave the app at the root. */
export function setRootBackHandler(handler: BackHandler | null) { fallback = handler; }

if (isNative) {
  void App.addListener("backButton", () => {
    const top = handlers[handlers.length - 1];
    if (top) top();
    else if (fallback) fallback();
    else void App.exitApp();
  });
}

/** Whether there is an in-app history entry to go back to. */
export const canGoBack = () => ((window.history.state as { idx?: number } | null)?.idx ?? 0) > 0;

/** Go back in the app's history, or to `fallbackPath` when opened directly. */
export function useGoBack() {
  const navigate = useNavigate();
  return useCallback((fallbackPath = "/") => {
    if (canGoBack()) navigate(-1);
    else navigate(fallbackPath, { replace: true });
  }, [navigate]);
}
