import { createContext, useContext } from "react";

export type Profile = { user_id: number; name: string | null; role: string };
const STORAGE_KEY = "grocerypro.profile";

export function readProfile(): Profile | null {
  try {
    const profile: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (!profile || typeof profile !== "object") return null;
    const saved = profile as Partial<Profile>;
    if (!Number.isInteger(saved.user_id) || saved.user_id! <= 0
      || (saved.name !== null && typeof saved.name !== "string")
      || typeof saved.role !== "string") return null;
    return { user_id: saved.user_id!, name: saved.name!, role: saved.role };
  } catch { return null; }
}

export function rememberProfile(profile: Profile | null) {
  if (profile) localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  else localStorage.removeItem(STORAGE_KEY);
}

export type Session = { profile: Profile; switchProfile: () => void };
export const SessionContext = createContext<Session | null>(null);
export const useSession = () => useContext(SessionContext);
export const useProfile = () => useContext(SessionContext)?.profile ?? null;
