import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { mdiCheck, mdiCircleOutline, mdiHistory, mdiMinus, mdiPencilOutline, mdiPlus, mdiTrashCanOutline } from "@mdi/js";
import { ITEM_STATUS } from "@shared/constants/itemStatus";
import Icon from "../components/Icon";
import { ItemThumb } from "../components/ItemImage";
import Page from "../components/Page";
import { Button, ChoiceField, InlineError, ScreenState } from "../components/ui";
import { colors } from "../theme";
import useScreenData from "../lib/useScreenData";
import { useGoBack } from "../lib/navigation";
import { api, errorMessage } from "../lib/api";
import { inBackground } from "../lib/optimistic";
import { defaultFilters, listChoices, loadFilters, saveFilters, type FlattenedShoppingListItem, type ListFilters, type location } from "../lib/grocery";
import type { store_section } from "@shared/prisma-types";

/** Store name for headers; loads once and falls back to a generic title. */
function useStoreName(locationId: number) {
  const { data } = useScreenData<location | null>("/locations/" + locationId, false);
  return data?.name ?? null;
}

const activeListPath = (locationId: number) => "/shoppingList/active?location_id=" + locationId;

export function ShoppingList() {
  const locationId = Number(useParams().locationId);
  const navigate = useNavigate();
  const storeName = useStoreName(locationId);
  const [filters, setFiltersState] = useState<ListFilters>(() => loadFilters(locationId));
  const setFilters = (next: ListFilters) => { saveFilters(locationId, next); setFiltersState(next); };
  const { data, loading, error, reload } = useScreenData<FlattenedShoppingListItem[]>(activeListPath(locationId));
  const { data: aisleData } = useScreenData<store_section[]>(`/locations/${locationId}/sections`);
  const [addedAisles, setAddedAisles] = useState<store_section[]>([]);
  const items = data ?? [];
  const { buyers, sections } = listChoices(items);
  const visible = items.filter(i => (filters.buyer === "all" || String(i.buyer_id ?? "none") === filters.buyer)
    && (filters.section === "all" || String(i.section_id ?? "none") === filters.section))
    .sort((a, b) => Number(a.status_name === ITEM_STATUS.IN_CART) - Number(b.status_name === ITEM_STATUS.IN_CART));
  const filtered = filters.buyer !== "all" || filters.section !== "all";
  const clear = () => setFilters(defaultFilters);
  const openAddItems = () => navigate(`/locations/${locationId}/add`);
  return <Page title={storeName ?? "Shopping list"} back="/" headerClassName="shopping-list-page-header"
    rightAction={<Link className="icon-button shopping-list-history" to={`/locations/${locationId}/history`} aria-label="View list history" title="History"><Icon path={mdiHistory} size={22} color={colors.primary} /></Link>}
    footer={<Button preloadTo={`/locations/${locationId}/add`} onClick={openAddItems}><Icon path={mdiPlus} size={22} color={colors.background} /> Add items</Button>}>
    <ChipRow label="Buyer" value={filters.buyer} onChange={buyer => setFilters({ ...filters, buyer })} options={[{ value: "all", label: "Everyone" }, ...buyers]} />
    <ChipRow label="Aisle" value={filters.section} onChange={section => setFilters({ ...filters, section })} options={[{ value: "all", label: "All aisles" }, ...sections]} />
    <InlineError message={error} />
    {!visible.length && <ScreenState loading={loading && !data} title={error ? "Couldn't load your list" : filtered ? "No matching items" : "List empty"}
      description={error ?? (filtered ? "Clear filters to see all items." : undefined)}
      action={error ? "Try again" : filtered ? "Clear filters" : undefined} onAction={error ? reload : filtered ? clear : undefined} />}
    {visible.map(item => <ListRow key={item.item_in_list_id} item={item} locationId={locationId}
      aisles={[...(aisleData ?? []), ...addedAisles.filter(added => !aisleData?.some(existing => existing.section_id === added.section_id))]}
      onAisleCreated={section => setAddedAisles(current => [...current.filter(s => s.section_id !== section.section_id), section])} />)}
  </Page>;
}

/** One-tap filter choices in a scrolling row. Hidden when there is nothing to choose between. */
function ChipRow({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (value: string) => void }) {
  if (options.length < 3) return null;
  return <div className="chip-row" role="group" aria-label={label}>
    {options.map(option => <button key={option.value} type="button" className="chip" aria-pressed={option.value === value} onClick={() => onChange(option.value)}>{option.label}</button>)}
  </div>;
}

function StatusIcon({ status }: { status: string | null | undefined }) {
  switch (status) {
    case ITEM_STATUS.IN_CART: return <Icon path={mdiCheck} size={18} color={colors.disabled} label="In cart" />;
    case ITEM_STATUS.NOT_FOUND: return <Icon path={mdiMinus} size={18} color={colors.danger} label="Not found" />;
    default: return <Icon path={mdiCircleOutline} size={20} color={colors.primary} label="Not in cart" />;
  }
}

function ListRow({ item, locationId, aisles, onAisleCreated }: { item: FlattenedShoppingListItem; locationId: number; aisles: store_section[]; onAisleCreated: (section: store_section) => void }) {
  const [quantityOpen, setQuantityOpen] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity ?? 1);
  const [removed, setRemoved] = useState(false);
  const [aisleOpen, setAisleOpen] = useState(false);
  const [newAisle, setNewAisle] = useState("");
  const [aisleBusy, setAisleBusy] = useState(false);
  const [aisleError, setAisleError] = useState<string | null>(null);
  const [aisleName, setAisleName] = useState(item.section_name ?? "No aisle");
  const [aisleId, setAisleId] = useState<number | null>(item.section_id ?? null);
  const aislePickerRef = useRef<HTMLSpanElement>(null);
  const [inCart, setInCart] = useState(item.status_name === ITEM_STATUS.IN_CART);
  const statusName = inCart ? ITEM_STATUS.IN_CART : item.status_name === ITEM_STATUS.IN_CART ? ITEM_STATUS.NOT_IN_CART : item.status_name;
  useEffect(() => { setInCart(item.status_name === ITEM_STATUS.IN_CART); }, [item.status_name]);
  useEffect(() => { setQuantity(item.quantity ?? 1); }, [item.quantity]);
  useEffect(() => {
    setAisleId(item.section_id ?? null);
    setAisleName(item.section_name ?? "No aisle");
  }, [item.section_id, item.section_name]);
  useEffect(() => {
    if (!aisleOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (!aislePickerRef.current?.contains(event.target as Node)) setAisleOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setAisleOpen(false); };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [aisleOpen]);
  function toggleStatus() {
    const next = !inCart;
    setInCart(next);
    inBackground(() => api.patch(`/listEntries/${item.item_in_list_id}/status`, {}), () => setInCart(!next));
  }
  function adjustQuantity(delta: number) {
    const next = Math.max(1, Math.min(9999, quantity + delta));
    if (next === quantity) return;
    const previous = quantity;
    setQuantity(next);
    inBackground(() => api.patch(`/listEntries/${item.item_in_list_id}`, {
      buyer_id: item.buyer_id ?? null, quantity: next, discount_price: item.discount_price ?? null,
    }), () => setQuantity(previous));
  }
  function removeFromList() {
    setRemoved(true);
    inBackground(() => api.delete(`/listEntries/${item.item_in_list_id}`), () => setRemoved(false));
  }
  function assignAisle(section: store_section | null) {
    const previous = { id: aisleId, name: aisleName };
    setAisleId(section?.section_id ?? null); setAisleName(section?.name ?? "No aisle"); setAisleOpen(false);
    inBackground(() => api.patch(`/listEntries/${item.item_in_list_id}/aisle`, { section_id: section?.section_id ?? null }),
      () => { setAisleId(previous.id); setAisleName(previous.name); });
  }
  async function createAisle() {
    const name = newAisle.trim();
    if (!name || aisleBusy) return;
    setAisleBusy(true); setAisleError(null);
    try {
      const section = await api.post<store_section>(`/locations/${locationId}/sections`, { name });
      onAisleCreated(section);
      await api.patch(`/listEntries/${item.item_in_list_id}/aisle`, { section_id: section.section_id });
      setAisleId(section.section_id); setAisleName(section.name ?? name); setNewAisle(""); setAisleOpen(false);
    } catch (error) { setAisleError(errorMessage(error)); }
    finally { setAisleBusy(false); }
  }
  if (removed) return null;
  return <>
  <div className={`card list-row${inCart ? " list-row-in-cart" : ""}${aisleOpen ? " aisle-picker-open" : ""}`}>
    <button type="button" className="status" aria-label={inCart ? `Mark ${item.item_name} not in cart` : `Mark ${item.item_name} in cart`}
      aria-pressed={inCart} onClick={toggleStatus} title={inCart ? "In cart — tap to undo" : "Mark as in cart"}>
      <StatusIcon status={statusName} />
    </button>
    <ItemThumb path={item.image_path} />
    <span className="list-details">
      <span className="list-name">{item.item_name}</span>
      <div className="list-meta"><span className="list-aisle-picker" ref={aislePickerRef}>
        <button type="button" className="list-aisle-trigger" aria-label={`Set aisle, currently ${aisleName}`} aria-expanded={aisleOpen} onClick={() => { setAisleError(null); setAisleOpen(open => !open); }}>{aisleName}</button>
        {aisleOpen && <div className="aisle-picker-menu" aria-label="Choose an aisle">
          <div className="aisle-choice-list" role="listbox" aria-label="Aisles">
            <button type="button" className="aisle-choice" role="option" aria-selected={aisleId === null} onClick={() => assignAisle(null)}>No aisle</button>
            {aisles.map(section => <button key={section.section_id} type="button" className="aisle-choice" role="option" aria-selected={aisleId === section.section_id} onClick={() => assignAisle(section)}>{section.name}</button>)}
          </div>
          <div className="aisle-add-form">
            <label className="aisle-add-label">New aisle
              <input className="aisle-name-input" value={newAisle} onChange={event => setNewAisle(event.target.value)} placeholder="e.g. Produce" maxLength={255} />
            </label>
            {aisleError && <p className="aisle-error" role="alert">{aisleError}</p>}
            <Button className="aisle-add-button" disabled={aisleBusy || !newAisle.trim()} onClick={() => void createAisle()}>{aisleBusy ? "Saving..." : "Add new aisle"}</Button>
          </div>
        </div>}
      </span><span className="list-buyer">{"  ·  "}{item.buyer_name ?? "Unassigned"}</span></div>
    </span>
    <div className="list-quantity-control">
      {!quantityOpen
        ? <button type="button" className="quantity quantity-trigger" aria-label={`Change quantity, currently ${quantity}`} aria-expanded="false" onClick={() => setQuantityOpen(true)}>
            <span className="qty">{quantity}</span><span className="qty-label">QTY</span>
          </button>
        : <div className="list-quantity-stepper" aria-label={`Quantity ${quantity}`}>
            <button type="button" className="list-qty-step" aria-label={`Remove one ${item.item_name}`} disabled={quantity <= 1} onClick={() => adjustQuantity(-1)}>
              <Icon path={mdiMinus} size={17} color={colors.primary} />
            </button>
            <button type="button" className="list-qty-value" aria-label="Done changing quantity" onClick={() => setQuantityOpen(false)}>{quantity}</button>
            <button type="button" className="list-qty-step" aria-label={`Add one ${item.item_name}`} disabled={quantity >= 9999} onClick={() => adjustQuantity(1)}>
              <Icon path={mdiPlus} size={17} color={colors.primary} />
            </button>
          </div>}
    </div>
    <Link className="icon-button" to={`/entries/${item.item_in_list_id}`} aria-label={"Edit " + item.item_name}>
      <Icon path={mdiPencilOutline} size={19} color={colors.muted} />
    </Link>
    <button type="button" className="icon-button list-delete-button" aria-label={`Remove ${item.item_name} from list`} title="Remove from list" onClick={removeFromList}>
      <Icon path={mdiTrashCanOutline} size={19} color={colors.danger} />
    </button>
  </div>
  </>;
}

export function ListFiltersPage() {
  const locationId = Number(useParams().locationId);
  const goBack = useGoBack();
  const listPath = `/locations/${locationId}/list`;
  const initial = loadFilters(locationId);
  const [buyer, setBuyer] = useState(initial.buyer);
  const [section, setSection] = useState(initial.section);
  const { data, loading, error, reload } = useScreenData<FlattenedShoppingListItem[]>(activeListPath(locationId), false);
  const { buyers, sections } = listChoices(data ?? []);
  return <Page title="Filters" back={listPath} wide={false}>
    {!data ? <ScreenState loading={loading} title="Couldn't load your list" description={error ?? undefined} action={loading ? undefined : "Try again"} onAction={reload} /> : <>
      <ChoiceField label="Buyer" value={buyer} onChange={setBuyer} options={[{ value: "all", label: "Everyone" }, ...buyers]} dropdown />
      <ChoiceField label="Aisle" value={section} onChange={setSection} options={[{ value: "all", label: "All aisles" }, ...sections]} />
      <div className="form-actions">
        <Button onClick={() => { saveFilters(locationId, { buyer, section }); goBack(listPath); }}>Apply filters</Button>
        <Button variant="secondary" className="mt-12" onClick={() => { setBuyer("all"); setSection("all"); }}>Reset filters</Button>
      </div>
    </>}
  </Page>;
}
