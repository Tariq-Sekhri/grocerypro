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
import { ConnectionCheck } from "./components/Connection";

export default function App() {
  const Router = isNative ? HashRouter : BrowserRouter;
  return <Router><Shell /></Router>;
}

function Shell() {
  const server = useServer();
  useNavigationPreload(server ? server.mode + originFor(server) : null);
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<Profile | null>(readProfile);
  const [serverOpen, setServerOpen] = useState(false);
  const [detecting, setDetecting] = useState(!server);
  const checkOpen = useConnectionCheckOpen();
  const serverKey = server ? server.mode + originFor(server) : null;

  useEffect(() => { startDeviceLog(); logEvent("info", "app-start"); }, []);
  useEffect(() => { setLogProfile(profile?.name); }, [profile]);
  // Each server gets a fresh check; the monitor reads the current server on every check.
  useEffect(() => {
    if (!serverKey) return;
    logEvent("info", "server-selected", { server: serverKey });
    return startConnectionMonitor();
  }, [serverKey]);

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

  // Opening the picker keeps the current shopper until another is selected.
  // Give it a history entry so browser swipes and Android Back can cancel it.
  useEffect(() => {
    if (!profile) { setRootBackHandler(null); return; }
    setRootBackHandler(() => {
      if (canGoBack()) navigate(-1);
      else if (location.pathname !== "/") navigate("/", { replace: true });
      else navigate("/profiles");
    });
    return () => setRootBackHandler(null);
  }, [profile, location.pathname, navigate]);

  if (!server && detecting) return <div className="screen"><ScreenState loading /></div>;
  if (!server || serverOpen) return <ServerSettings onDone={server ? () => setServerOpen(false) : undefined} />;
  // Remount screen data and the live-update socket when the server changes.
  const key = server.mode + originFor(server);
  // The connection check opens over the current screen so unsaved input survives.
  const check = checkOpen && <div className="screen-overlay"><ConnectionCheck onServer={() => setServerOpen(true)} /></div>;
  if (!profile || location.pathname === "/profiles") return <><ProfilePicker key={key} onSelect={p => { rememberProfile(p); setProfile(p); navigate("/", { replace: true }); }} onServer={() => setServerOpen(true)} />{check}</>;
  return <SessionContext.Provider value={session}><AppRoutes key={key} /><NoticeBar />{check}</SessionContext.Provider>;
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
