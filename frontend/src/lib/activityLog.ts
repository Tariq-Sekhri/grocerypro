import { flushLog, logEvent, uploadLogs } from "./deviceLog";
import { isNative } from "./server";

/**
 * Records what the user does so a session can be replayed step by step with
 * `npm run replay` in backend: every touch or click (on controls or anywhere
 * else), swipes, long presses, scrolls, typed text, keys, screen changes,
 * Android Back and the app going to the background.
 *
 * Each entry has the device clock time (ISO, from deviceLog), the session it
 * belongs to, and `t`, milliseconds since the session started, which keeps the
 * order exact even if the device clock changes.
 */
const session = typeof crypto.randomUUID === "function" ? crypto.randomUUID().slice(0, 8) : Math.random().toString(36).slice(2, 10);
const sessionStart = performance.now();

export const currentScreen = () => isNative ? (window.location.hash.slice(1) || "/") : window.location.pathname + window.location.search;
const heading = () => document.querySelector("h1, .sheet-title, [role=dialog] h2")?.textContent?.trim().slice(0, 60) || undefined;

/** Logs one user action with the current screen. */
export function logActivity(event: string, details: Record<string, unknown> = {}) {
  logEvent("info", event, { kind: "activity", session, t: Math.round(performance.now() - sessionStart), screen: currentScreen(), ...details }, { merge: false });
}

const CONTROL = "button, a[href], input, select, textarea, label, summary, [role=button], [role=checkbox], [role=radio], [role=switch], [role=tab], [role=option], [role=menuitem], [role=link], [tabindex]:not([tabindex='-1'])";
const clip = (text: string | null | undefined, max = 60) => {
  const value = text?.replace(/\s+/g, " ").trim();
  return value ? value.slice(0, max) : undefined;
};

/** A short CSS path such as `main > ul.list > li:nth-of-type(3) > button.step`, to find the element again. */
function cssPath(element: Element) {
  const parts: string[] = [];
  for (let node: Element | null = element; node && node !== document.body && parts.length < 6; node = node.parentElement) {
    if (node.id && !/^:|«/.test(node.id)) { parts.unshift(`#${node.id}`); break; }
    const className = typeof node.className === "string" ? node.className.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(name => "." + name).join("") : "";
    const parent: Element | null = node.parentElement;
    const tag = node.tagName.toLowerCase();
    const siblings = parent ? Array.from(parent.children).filter(child => child.tagName === node!.tagName) : [];
    parts.unshift(tag + className + (siblings.length > 1 ? `:nth-of-type(${siblings.indexOf(node) + 1})` : ""));
  }
  return parts.join(" > ");
}

function fieldLabel(element: Element) {
  const field = element as HTMLInputElement;
  return clip(field.getAttribute("aria-label")) ?? clip(field.labels?.[0]?.textContent) ?? clip(field.placeholder) ?? clip(field.name);
}

/** What was touched: the control it belongs to (if any) and the element itself. */
function describe(target: EventTarget | null) {
  const element = target instanceof Element ? target : null;
  if (!element) return { target: "(none)" };
  const control = element.closest(CONTROL);
  const node = control ?? element;
  const isField = node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement || node instanceof HTMLSelectElement;
  return {
    target: (isField ? fieldLabel(node) : undefined) ?? clip(node.getAttribute("aria-label")) ?? clip((node as HTMLElement).innerText ?? node.textContent)
      ?? clip(node.getAttribute("title")) ?? clip(node.getAttribute("alt")) ?? clip(node.querySelector("img")?.getAttribute("alt")) ?? "(no text)",
    element: cssPath(node),
    // Presses that miss every control are the ones that do nothing for the user.
    control: !!control,
    disabled: (node as HTMLButtonElement).disabled || node.getAttribute("aria-disabled") === "true" || undefined,
    dialog: clip(element.closest("[role=dialog]")?.getAttribute("aria-label")),
    item: clip(element.closest("li, [role=listitem], .card, .list-row")?.querySelector("h2, h3, .item-name, .name, strong")?.textContent),
  };
}

const at = (x: number, y: number) => ({ x: Math.round(x), y: Math.round(y), vw: window.innerWidth, vh: window.innerHeight });

let started = false;
export function startActivityLog() {
  if (started) return;
  started = true;

  // Described at pointerdown, before the press changes the screen.
  const presses = new Map<number, { x: number; y: number; time: number; pointer: string; described: ReturnType<typeof describe> }>();
  document.addEventListener("pointerdown", event => {
    if (!event.isPrimary && event.pointerType !== "mouse") return;
    presses.set(event.pointerId, { x: event.clientX, y: event.clientY, time: performance.now(), pointer: event.pointerType, described: describe(event.target) });
  }, { capture: true, passive: true });
  document.addEventListener("pointerup", event => {
    const press = presses.get(event.pointerId);
    if (!press) return;
    presses.delete(event.pointerId);
    const dx = Math.round(event.clientX - press.x), dy = Math.round(event.clientY - press.y);
    const ms = Math.round(performance.now() - press.time);
    const moved = Math.hypot(dx, dy) > 12;
    const gesture = moved ? "swipe" : ms >= 500 ? "long-press" : "tap";
    logActivity(gesture, { ...press.described, ...at(press.x, press.y), ms, ...(moved ? { dx, dy } : {}), pointer: press.pointer === "touch" ? undefined : press.pointer });
  }, { capture: true, passive: true });
  // The browser took the touch over for scrolling; the scroll entry records where it went.
  document.addEventListener("pointercancel", event => { presses.delete(event.pointerId); }, { capture: true, passive: true });

  // Logged once a scroll settles, with where it ended.
  const scrolls = new Map<EventTarget, ReturnType<typeof setTimeout>>();
  document.addEventListener("scroll", event => {
    const target = event.target ?? document;
    clearTimeout(scrolls.get(target));
    scrolls.set(target, setTimeout(() => {
      scrolls.delete(target);
      const box = target === document ? document.scrollingElement : target instanceof Element ? target : null;
      if (!box) return;
      logActivity("scroll", { element: box === document.scrollingElement ? "page" : cssPath(box), top: Math.round(box.scrollTop), height: box.scrollHeight, view: box.clientHeight });
    }, 400));
  }, { capture: true, passive: true });

  // Typing is logged when it pauses, so one entry holds the word rather than each letter.
  const typing = new Map<Element, ReturnType<typeof setTimeout>>();
  const logField = (element: Element, event: string) => {
    const field = element as HTMLInputElement;
    const secret = field.type === "password";
    const value = field.type === "checkbox" || field.type === "radio" ? field.checked : secret ? "(hidden)" : field.value.slice(0, 200);
    logActivity(event, { target: fieldLabel(element) ?? "(field)", element: cssPath(element), value });
  };
  document.addEventListener("input", event => {
    const element = event.target;
    if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) || element.type === "checkbox" || element.type === "radio") return;
    clearTimeout(typing.get(element));
    typing.set(element, setTimeout(() => { typing.delete(element); logField(element, "type"); }, 800));
  }, { capture: true, passive: true });
  document.addEventListener("change", event => {
    const element = event.target;
    if (element instanceof HTMLSelectElement || (element instanceof HTMLInputElement && (element.type === "checkbox" || element.type === "radio"))) logField(element, "change");
  }, { capture: true, passive: true });

  document.addEventListener("keydown", event => {
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) return; // Text is recorded by "type".
    if (["Shift", "Control", "Alt", "Meta", "Unidentified", "Process"].includes(event.key)) return;
    logActivity("key", { key: [event.ctrlKey && "Ctrl", event.altKey && "Alt", event.metaKey && "Meta", event.key].filter(Boolean).join("+"), ...describe(event.target) });
  }, { capture: true, passive: true });

  document.addEventListener("visibilitychange", () => {
    logActivity(document.hidden ? "app-hidden" : "app-shown");
    if (document.hidden) { flushLog(); void uploadLogs(); }
  });
  window.addEventListener("pagehide", flushLog);
}

let lastScreen = "";
/**
 * Called after each route change, and when a full-screen view (server settings,
 * profile picker, connection check) opens without one. Waits a frame so the new
 * screen's heading is in place.
 */
export function logScreen(view?: string) {
  const key = currentScreen() + (view ? ` [${view}]` : "");
  if (key === lastScreen) return;
  const from = lastScreen || undefined;
  lastScreen = key;
  requestAnimationFrame(() => logActivity("screen", { view, from, heading: heading() }));
}
