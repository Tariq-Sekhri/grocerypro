import { io, Socket } from "socket.io-client";
import { apiOrigin } from "./server";
import { appActive, onAppStateChange } from "./appState";
import { screenDataCache } from "./priorityDataCache";
import { onConnectionRecovered, reportSocketError } from "./connection";

const listeners = new Set<() => void>();
let socket: Socket | null = null;
let cleanup: (() => void) | null = null;
const notify = () => { screenDataCache.invalidate(); listeners.forEach(listener => listener()); };

export const liveUpdatesConnected = () => socket?.connected === true;

/** One connection shared by open screens, including reconnect/resume catch-up. */
export function subscribeToLiveUpdates(listener: () => void) {
  listeners.add(listener);
  if (!cleanup) {
    socket = io(apiOrigin() + "/grocery-sync", {
      autoConnect: false,
      transports: ["websocket", "polling"],
      tryAllTransports: true,
      reconnectionDelay: 500,
      reconnectionDelayMax: 5000,
    });
    socket.on("connect", notify);
    socket.on("changed", notify);
    socket.on("connect_error", reportSocketError);
    // A recovered connection reloads screens now instead of at the next poll.
    const stopRecovery = onConnectionRecovered(() => {
      if (socket && !socket.connected && appActive()) socket.connect();
      notify();
    });
    const stop = onAppStateChange(active => {
      if (active) { socket?.connect(); notify(); }
      else socket?.disconnect();
    });
    cleanup = () => {
      stop();
      stopRecovery();
      socket?.removeAllListeners();
      socket?.disconnect();
      socket = null;
    };
    if (appActive()) socket.connect();
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) { cleanup?.(); cleanup = null; }
  };
}
