import { App } from "@capacitor/app";
import { isNative } from "./server";

/** Whether the app is in the foreground (tab visible / Android app resumed). */
let nativeActive = true;
export const appActive = () => nativeActive && document.visibilityState !== "hidden";

/** Calls the listener whenever the app moves between foreground and background. */
export function onAppStateChange(listener: (active: boolean) => void) {
  const visibility = () => listener(appActive());
  document.addEventListener("visibilitychange", visibility);
  let removeNative: (() => void) | null = null;
  let disposed = false;
  if (isNative) {
    void App.addListener("appStateChange", ({ isActive }) => {
      nativeActive = isActive;
      listener(appActive());
    }).then(handle => { if (disposed) void handle.remove(); else removeNative = () => void handle.remove(); });
  }
  return () => {
    disposed = true;
    document.removeEventListener("visibilitychange", visibility);
    removeNative?.();
  };
}
