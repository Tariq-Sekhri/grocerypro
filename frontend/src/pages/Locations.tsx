import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mdiMapOutline, mdiPencilOutline, mdiPlus, mdiStorefrontOutline } from "@mdi/js";
import Icon from "../components/Icon";
import Page from "../components/Page";
import { Button, ConfirmAction, InlineError, ScreenState, TextField } from "../components/ui";
import { colors } from "../theme";
import { api } from "../lib/api";
import { inBackground, patchCached } from "../lib/optimistic";
import useScreenData from "../lib/useScreenData";
import { useGoBack } from "../lib/navigation";
import { useNavigate } from "react-router-dom";
import type { location } from "../lib/grocery";

export function LocationPicker() {
  const navigate = useNavigate();
  const { data, loading, error, reload } = useScreenData<location[]>("/locations");
  const locations = data ?? [];
  return <Page title="Grocery Pro" footer={<Button onClick={() => navigate("/locations/new")}><Icon path={mdiPlus} size={18} color={colors.background} /> New location</Button>}>
    <div className="section-header"><h2 className="section-title">Your stores</h2><span className="muted small">{locations.length} saved</span></div>
    <InlineError message={data ? error : null} />
    {!data && <ScreenState loading={loading} title="Couldn't load your stores" description={error ?? undefined} action={loading ? undefined : "Try again"} onAction={reload} />}
    {locations.map(store => <div className="card location-card" key={store.location_id}>
      {store.location_id < 0 ? <span className="location-main">
        <span className="location-icon"><Icon path={mdiStorefrontOutline} size={28} color={colors.accent} /></span>
        <span className="location-details"><span className="location-name">{store.name}</span></span>
      </span> : <Link className="location-main" to={`/locations/${store.location_id}/list`} aria-label={`Open ${store.name} shopping list`}>
        <span className="location-icon"><Icon path={mdiStorefrontOutline} size={28} color={colors.accent} /></span>
        <span className="location-details">
          <span className="location-name">{store.name}</span>
        </span>
      </Link>}
      {store.location_id > 0 && <Link className="square-button" to={`/locations/${store.location_id}/edit`} aria-label={`Edit ${store.name}`}>
        <Icon path={mdiPencilOutline} size={20} color={colors.primary} />
      </Link>}
      <a
        className="square-button"
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([store.name, store.address].filter(Boolean).join(" "))}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${store.name} in Google Maps`}
        title="Open in Google Maps"
      >
        <Icon path={mdiMapOutline} size={20} color={colors.primary} />
      </a>
    </div>)}
  </Page>;
}

export function NewLocation() {
  const goBack = useGoBack();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  function add() {
    if (!name.trim()) return;
    const body = { name: name.trim(), address };
    // Shown right away with a temporary id; the list replaces it once the server answers.
    const undo = patchCached<location[]>("/locations", stores => [...stores, { location_id: -Date.now(), ...body } as location]);
    inBackground(() => api.post("/locations", body), undo);
    goBack("/");
  }
  return <Page title="New Location" back="/" wide={false}>
    <form onSubmit={e => { e.preventDefault(); void add(); }}>
      <TextField label="Name" value={name} onChange={setName} />
      <TextField label="Address" value={address} onChange={setAddress} />
      <div className="form-actions"><Button type="submit" disabled={!name.trim()}>Add location</Button></div>
    </form>
  </Page>;
}

export function EditLocation() {
  const locationId = Number(useParams().locationId);
  const goBack = useGoBack();
  const { data, loading, error: loadError, reload } = useScreenData<location>("/locations/" + locationId, false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [confirm, setConfirm] = useState(false);
  useEffect(() => { if (data) { setName(data.name ?? ""); setAddress(data.address ?? ""); } }, [data]);
  function update() {
    const body = { name, address };
    const undo = [
      patchCached<location[]>("/locations", stores => stores.map(s => s.location_id === locationId ? { ...s, ...body } : s)),
      patchCached<location>("/locations/" + locationId, store => ({ ...store, ...body })),
    ];
    inBackground(() => api.patch("/locations/" + locationId, body), () => undo.reverse().forEach(restore => restore()));
    goBack("/");
  }
  function remove() {
    const undo = patchCached<location[]>("/locations", stores => stores.filter(s => s.location_id !== locationId));
    inBackground(() => api.delete("/locations/" + locationId), undo);
    setConfirm(false);
    goBack("/");
  }
  return <Page title="Edit Location" back="/" wide={false}>
    {!data ? <ScreenState loading={loading} title="Couldn't load this store" description={loadError ?? undefined} action={loading ? undefined : "Try again"} onAction={reload} /> : <>
      <form onSubmit={e => { e.preventDefault(); void update(); }}>
        <TextField label="Name" value={name} onChange={setName} />
        <TextField label="Address" value={address} onChange={setAddress} />
        <div className="form-actions">
          <Button type="submit">Save changes</Button>
          <Button variant="danger" className="mt-12" onClick={() => setConfirm(true)}>Delete location</Button>
        </div>
      </form>
    </>}
    <ConfirmAction open={confirm} busy={false} title="Delete this store?" description="This removes the store from Grocery Pro for everyone." onConfirm={remove} onCancel={() => setConfirm(false)} />
  </Page>;
}
