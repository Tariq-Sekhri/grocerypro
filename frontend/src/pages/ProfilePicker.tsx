import { useCallback, useEffect, useState, type FormEvent } from "react";
import { mdiClose, mdiPlus, mdiServerNetwork } from "@mdi/js";
import Icon from "../components/Icon";
import ProfileAvatar from "../components/ProfileAvatar";
import { Button, ChoiceField, ConfirmAction, InlineError, ScreenState, TextField } from "../components/ui";
import { colors } from "../theme";
import { api, errorMessage } from "../lib/api";
import { describeServer, useServer } from "../lib/server";
import { readProfile, rememberProfile, type Profile } from "../lib/profile";
import { onConnectionRecovered, useConnection } from "../lib/connection";
import { ConnectionBanner } from "../components/Connection";
import { useBackHandler } from "../lib/navigation";

const roles = [
  { value: "member", label: "Family member" },
  { value: "shared", label: "Shared profile" },
  { value: "admin", label: "Full admin" },
];
const roleLabel = (profile: Profile) => roles.find(r => r.value === profile.role)?.label ?? "Family member";

function AddProfileDialog({ first, onClose, onAdded }: { first: boolean; onClose: () => void; onAdded: (profile: Profile) => void }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState(first ? "admin" : "member");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useBackHandler(() => { if (!busy) onClose(); });
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || busy) return;
    setBusy(true); setError(null);
    try { onAdded(await api.post<Profile>("/profiles", { name: name.trim(), role })); }
    catch (err) { setError(errorMessage(err)); setBusy(false); }
  };
  return <div className="overlay overlay-center" onClick={() => { if (!busy) onClose(); }}>
    <form className="dialog profile-dialog" role="dialog" aria-modal="true" aria-label="Add profile" onClick={e => e.stopPropagation()} onSubmit={submit}>
      <h2 className="dialog-title">Add profile</h2>
      <TextField label="Name" value={name} onChange={setName} autoFocus />
      {!first && <ChoiceField label="Type" value={role} options={roles} onChange={setRole} dropdown />}
      <InlineError message={error} />
      <Button type="submit" disabled={busy || !name.trim()} className="mt-24">{busy ? "Adding..." : "Add"}</Button>
      <Button variant="secondary" disabled={busy} onClick={onClose} className="mt-12">Cancel</Button>
    </form>
  </div>;
}

export default function ProfilePicker({ onSelect, onServer }: { onSelect: (profile: Profile) => void; onServer: () => void }) {
  const server = useServer();
  const connection = useConnection();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState<Profile | null>(null);
  const [removeBusy, setRemoveBusy] = useState(false);
  const [removeError, setRemoveError] = useState<string | null>(null);
  const reload = useCallback(async () => {
    setLoading(true); setError(null);
    try { setProfiles(await api.get<Profile[]>("/profiles")); }
    catch (err) { setError(errorMessage(err)); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void reload(); }, [reload]);
  useEffect(() => onConnectionRecovered(() => { void reload(); }), [reload]);
  useBackHandler(() => setEditing(false), editing && !adding && !removing);
  const remove = async () => {
    if (!removing) return;
    setRemoveBusy(true); setRemoveError(null);
    try {
      await api.delete("/profiles/" + removing.user_id);
      if (readProfile()?.user_id === removing.user_id) rememberProfile(null);
      setProfiles(prev => prev.filter(p => p.user_id !== removing.user_id));
      setRemoving(null);
    } catch (err) { setRemoveError(errorMessage(err)); }
    finally { setRemoveBusy(false); }
  };
  const diagnosed = !!error && connection.phase === "problem";
  // Only an admin may manage profiles; the server checks this too. An empty server lets anyone add the first (admin) profile.
  const currentId = readProfile()?.user_id;
  const isAdmin = profiles.some(p => p.user_id === currentId && p.role === "admin");
  const canAdd = isAdmin ? editing : !profiles.length;
  return <div className="screen"><main className="scroll"><div className="picker">
    <p className="brand">Grocery Pro</p>
    <h1 className="picker-title">{editing ? "Edit profiles" : "Who's shopping?"}</h1>
    {diagnosed && <div className="picker-banner"><ConnectionBanner /></div>}
    {loading || error
      ? <ScreenState loading={loading} title="Couldn't load profiles" description={diagnosed ? undefined : error ?? undefined} action={loading ? undefined : "Try again"} onAction={reload} />
      : <>
        <div className="profile-grid">
          {profiles.map(profile => {
            const name = profile.name ?? "Profile";
            return <button type="button" key={profile.user_id} className={`profile${editing ? " profile-editing" : ""}`} data-preload-to={editing ? undefined : "/"}
              aria-label={editing ? `Delete ${name}` : `Choose ${name}${profile.role === "admin" ? ", full admin" : ""}`}
              onClick={() => { if (editing) { setRemoveError(null); setRemoving(profile); } else onSelect(profile); }}>
              <span className="profile-avatar-wrap">
                <ProfileAvatar name={name} shared={profile.role === "shared"} />
                {editing && <span className="profile-remove" aria-hidden><Icon path={mdiClose} size={18} color={colors.danger} /></span>}
              </span>
              <span className="profile-name">{name}</span>
              <span className="profile-role">{roleLabel(profile)}</span>
            </button>;
          })}
          {canAdd && <button type="button" className="profile" onClick={() => setAdding(true)}>
            <span className="avatar avatar-add"><Icon path={mdiPlus} size={48} color={colors.primary} /></span>
            <span className="profile-name">Add profile</span>
          </button>}
        </div>
        {isAdmin && <button type="button" className="server-link" onClick={() => setEditing(e => !e)}>{editing ? "Done" : "Edit profiles"}</button>}
      </>}
    {error && <button type="button" className="server-link" onClick={onServer}>
      <Icon path={mdiServerNetwork} size={18} color={colors.primary} />
      <span>{server ? describeServer(server) : "Choose a server"}</span>
    </button>}
  </div></main>
    {adding && <AddProfileDialog first={!profiles.length} onClose={() => setAdding(false)} onAdded={profile => { setProfiles(prev => [...prev, profile]); setAdding(false); }} />}
    <ConfirmAction open={!!removing} busy={removeBusy} title={`Delete ${removing?.name ?? "profile"}?`}
      description={removeError ?? "Their favourites are removed. Items they were buying stay on the list without a buyer."}
      onCancel={() => setRemoving(null)} onConfirm={() => { void remove(); }} />
  </div>;
}
