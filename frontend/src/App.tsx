import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, HashRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { readProfile, rememberProfile, SessionContext, type Profile, type Session } from "./lib/profile";
import { canGoBack, setRootBackHandler } from "./lib/navigation";
import { isNative, originFor, serverOptions, setServer, useServer } from "./lib/server";
import { checkServer } from "./lib/api";
import { NoticeBar, ScreenState } from "./components/ui";
import ProfilePicker from "./pages/ProfilePicker";
import ServerSettings from "./pages/ServerSettings";
import { EditLocation, LocationPicker, NewLocation } from "./pages/Locations";
import { ListFiltersPage, ShoppingList } from "./pages/ShoppingList";
import { AddItemsToList, ItemEditor } from "./pages/Catalog";
import EditEntry from "./pages/EditEntry";
import { ListHistory, PastList } from "./pages/History";
import { useNavigationPreload } from "./lib/navigationPreload";
import { useItemImageSync } from "./lib/itemImages";
import { startConnectionMonitor, useConnectionCheckOpen } from "./lib/connection";
import { logEvent, setLogProfile, startDeviceLog } from "./lib/deviceLog";
import { logScreen, startActivityLog } from "./lib/activityLog";
import { ConnectionCheck } from "./components/Connection";
import { DevModeFloat } from "./components/DevMode";
import { devModeGeneration, onDevModeChange, useDevMode } from "./lib/devMode";

export default function App() {
  const Router = isNative ? HashRouter : BrowserRouter;
  return <Router><Shell /></Router>;
}

function Shell() {
  const devMode = useDevMode();
  const generation = devModeGeneration();
  const server = useServer();
  useNavigationPreload(server ? server.mode + originFor(server) : devMode ? "dev" : null);
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<Profile | null>(readProfile);
  const [serverOpen, setServerOpen] = useState(false);
  const [detecting, setDetecting] = useState(!server);
  const checkOpen = useConnectionCheckOpen();
  const serverKey = server ? server.mode + originFor(server) : null;

  useEffect(() => onDevModeChange(() => { setProfile(readProfile()); }), []);
  useEffect(() => { startDeviceLog(); startActivityLog(); logEvent("info", "app-start"); }, []);
  useEffect(() => { setLogProfile(profile?.name); }, [profile]);
  const view = !server && !devMode ? (detecting ? "finding-server" : "server-settings") : serverOpen ? "server-settings" : !profile || location.pathname === "/profiles" ? "profile-picker" : undefined;
  useEffect(() => { logScreen([view, checkOpen && "connection-check"].filter(Boolean).join(", ") || undefined); }, [location.pathname, location.search, location.hash, view, checkOpen]);
  // Each server gets a fresh check; the monitor reads the current server on every check.
  useEffect(() => {
    if (!serverKey || devMode) return;
    logEvent("info", "server-selected", { server: serverKey });
    return startConnectionMonitor();
  }, [serverKey, devMode]);

  // First launch: use the first preset server that answers; ask only if none do.
  // Local goes first: it only answers on an emulator, where it is the direct path.
  useEffect(() => {
    if (server) return;
    let cancelled = false;
    const presets = serverOptions().filter(o => o.mode !== "custom").sort((a, b) => Number(b.mode === "local") - Number(a.mode === "local"));
    void Promise.all(presets.map(o => checkServer(o.url))).then(results => {
      if (cancelled) return;
      const online = presets.find((_, i) => results[i].ok);
      if (online) setServer({ mode: online.mode });
      setDetecting(false);
    });
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const session = useMemo<Session | null>(() => profile && {
    profile,
    switchProfile: () => { navigate("/profiles"); },
  }, [profile, navigate]);

  // On the home screen, let Android Back exit the app instead of replaying old history or jumping to /profiles.
  useEffect(() => {
    if (!profile || location.pathname === "/") { setRootBackHandler(null); return; }
    setRootBackHandler(() => {
      if (canGoBack()) navigate(-1);
      else navigate("/", { replace: true });
    });
    return () => setRootBackHandler(null);
  }, [profile, location.pathname, navigate]);

  if (!server && !devMode && detecting) return <div className="screen"><ScreenState loading /></div>;
  if ((!server && !devMode) || serverOpen) return <><ServerSettings onDone={server || devMode ? () => setServerOpen(false) : undefined} /><DevModeFloat /></>;
  // Remount screen data and the live-update socket when the server or dev mode changes.
  const key = `${server ? server.mode + originFor(server) : "dev"}:${generation}`;
  // The connection check opens over the current screen so unsaved input survives.
  const check = checkOpen && <div className="screen-overlay"><ConnectionCheck onServer={() => setServerOpen(true)} /></div>;
  if (!profile || location.pathname === "/profiles") return <><ProfilePicker key={key} onSelect={p => { rememberProfile(p); setProfile(p); if (location.pathname === "/profiles" && canGoBack()) navigate(-1); else navigate("/", { replace: true }); }} onServer={() => setServerOpen(true)} />{check}<DevModeFloat /></>;
  return <SessionContext.Provider value={session}><AppRoutes key={key} /><NoticeBar />{check}<DevModeFloat /></SessionContext.Provider>;
}

function AppRoutes() {
  useItemImageSync();
  return <Routes>
    <Route path="/" element={<LocationPicker />} />
    <Route path="/locations/new" element={<NewLocation />} />
    <Route path="/locations/:locationId/edit" element={<EditLocation />} />
    <Route path="/locations/:locationId/list" element={<ShoppingList />} />
    <Route path="/locations/:locationId/filters" element={<ListFiltersPage />} />
    <Route path="/locations/:locationId/add" element={<AddItemsToList />} />
    <Route path="/locations/:locationId/items/new" element={<ItemEditor />} />
    <Route path="/locations/:locationId/items/:itemId" element={<ItemEditor />} />
    <Route path="/locations/:locationId/history" element={<ListHistory />} />
    <Route path="/entries/:entryId" element={<EditEntry />} />
    <Route path="/history/:listId" element={<PastList />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
