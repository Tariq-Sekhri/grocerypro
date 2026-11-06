import { useEffect } from "react";
import { loadScreenData } from "./api";
import { appActive, onAppStateChange } from "./appState";
import { screenDataCache, type LoadPriority } from "./priorityDataCache";
import { isNative } from "./server";

export function routeDataPaths(destination: string): string[] {
  const path = destination.split("?")[0];
  if (path === "/") return ["/locations"];
  const store = path.match(/^\/locations\/(\d+)\/(list|filters|add|history|edit|items\/new|items\/\d+)$/);
  if (store) {
    const [, id, page] = store;
    if (page === "list") return [`/shoppingList/active?location_id=${id}`, `/locations/${id}`, `/locations/${id}/sections`];
    if (page === "filters") return [`/shoppingList/active?location_id=${id}`];
    if (page === "add" || page === "items/new") return [`/catalog?location_id=${id}`];
    if (page === "history") return [`/listHistory/${id}`, `/locations/${id}`];
    if (page === "edit") return [`/locations/${id}`];
    return [`/catalog/${page.split("/")[1]}`];
  }
  const entry = path.match(/^\/entries\/(\d+)$/);
  if (entry) return [`/listEntries/${entry[1]}`];
  const history = path.match(/^\/history\/(\d+)$/);
  return history ? [`/listHistory/detail/${history[1]}`] : [];
}

/** Observe actual visible controls, including controls added after a server read. */
export function useNavigationPreload(serverIdentity: string | null) {
  useEffect(() => {
    if (!serverIdentity) return;
    const selector = "a[href], [data-preload-to]";
    const observed = new Set<Element>();
    const destination = (element: Element): string | null => {
      if (element.matches(":disabled")) return null;
      const explicit = element.getAttribute("data-preload-to");
      if (explicit) return explicit;
      const href = element.getAttribute("href");
      if (!href || element.getAttribute("target") === "_blank" || element.hasAttribute("download")) return null;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return null;
      if (!isNative) return url.pathname + url.search;
      if (url.pathname !== window.location.pathname || !url.hash.startsWith("#/")) return null;
      return url.hash.slice(1);
    };
    const preload = (element: Element, priority: LoadPriority) => {
      if (!appActive()) return;
      const route = destination(element);
      const currentPath = isNative ? window.location.hash.slice(1).split("?")[0] : window.location.pathname;
      if (!route || route.split("?")[0] === currentPath) return;
      for (const path of routeDataPaths(route)) void loadScreenData(path, priority).catch(() => {});
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) preload(entry.target, "viewport");
    });
    const scan = () => {
      for (const element of observed) {
        if (!element.isConnected) { observer.unobserve(element); observed.delete(element); }
      }
      for (const element of document.querySelectorAll(selector)) {
        if (!observed.has(element)) { observed.add(element); observer.observe(element); }
      }
    };
    const mutations = new MutationObserver(records => {
      scan();
      // Re-observe reused controls whose destination changed.
      for (const record of records) if (record.type === "attributes" && record.target instanceof Element && observed.has(record.target)) {
        observer.unobserve(record.target); observer.observe(record.target);
      }
    });
    const intent = (event: Event) => {
      const element = event.target instanceof Element ? event.target.closest(selector) : null;
      if (element) preload(element, "hover");
    };
    scan();
    const recheckVisible = () => {
      // Reconnects/writes can discard queued preloads after visibility was reported.
      for (const element of observed) { observer.unobserve(element); observer.observe(element); }
    };
    const unsubscribe = screenDataCache.onInvalidate(recheckVisible);
    const stopAppState = onAppStateChange(active => { if (active) recheckVisible(); });
    mutations.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["href", "data-preload-to"] });
    document.addEventListener("pointerover", intent, true);
    document.addEventListener("focusin", intent, true);
    document.addEventListener("pointerdown", intent, true);
    return () => {
      observer.disconnect(); mutations.disconnect();
      unsubscribe();
      stopAppState();
      document.removeEventListener("pointerover", intent, true);
      document.removeEventListener("focusin", intent, true);
      document.removeEventListener("pointerdown", intent, true);
    };
  }, [serverIdentity]);
}
