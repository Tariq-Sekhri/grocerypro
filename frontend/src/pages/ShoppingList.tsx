import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { mdiCancel, mdiCheck, mdiCheckAll, mdiCircleOutline, mdiDotsVertical, mdiHistory, mdiMinus, mdiPencilOutline, mdiPlus, mdiTrashCanOutline } from "@mdi/js";
import { ITEM_STATUS } from "@shared/constants/itemStatus";
import Icon from "../components/Icon";
import { ItemThumb } from "../components/ItemImage";
import Page from "../components/Page";
import { Button, ChoiceField, ConfirmAction, InlineError, ScreenState } from "../components/ui";
import { colors } from "../theme";
import useScreenData from "../lib/useScreenData";
import { useBackHandler, useGoBack } from "../lib/navigation";
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
    && (filters.section === "all" || String(i.section_id ?? "none") === filters.section));
  // One row per item; still-to-get first, then not available, then in the cart.
  const rows = groupByItem(visible).sort((a, b) => statusOrder(groupStatus(a.map(i => i.status_name))) - statusOrder(groupStatus(b.map(i => i.status_name))));
  const filtered = filters.buyer !== "all" || filters.section !== "all";
  // Everything bought or not available (and something bought): ask before finishing the trip.
  const allDone = items.some(i => i.status_name === ITEM_STATUS.IN_CART) && groupStatus(items.map(i => i.status_name)) !== ITEM_STATUS.NOT_IN_CART;
  const [finishOpen, setFinishOpen] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [finishError, setFinishError] = useState<string | null>(null);
  // Opens when the list becomes done; after "Not yet" it waits until the list changes and is done again.
  useEffect(() => { setFinishOpen(allDone); }, [allDone]);
  async function finishTrip() {
    setFinishing(true); setFinishError(null);
    try {
      await api.post(`/locations/${locationId}/shoppingList/complete`, {});
      setFinishOpen(false);
      reload();
    } catch (error) { setFinishError(errorMessage(error)); setFinishOpen(false); }
    finally { setFinishing(false); }
  }
  const clear = () => setFilters(defaultFilters);
  const openAddItems = () => navigate(`/locations/${locationId}/add`);
  return <Page title={storeName ?? "Shopping list"} back="/" headerClassName="shopping-list-page-header"
    rightAction={<Link className="icon-button shopping-list-history" to={`/locations/${locationId}/history`} aria-label="View list history" title="History"><Icon path={mdiHistory} size={22} color={colors.primary} /></Link>}
    footer={allDone
      ? <div className="list-footer-actions">
          <Button variant="secondary" preloadTo={`/locations/${locationId}/add`} onClick={openAddItems}><Icon path={mdiPlus} size={22} color={colors.primary} /> Add items</Button>
          <Button onClick={() => setFinishOpen(true)}><Icon path={mdiCheckAll} size={22} color={colors.background} /> Finish trip</Button>
        </div>
      : <Button preloadTo={`/locations/${locationId}/add`} onClick={openAddItems}><Icon path={mdiPlus} size={22} color={colors.background} /> Add items</Button>}>
    <ChipRow label="Buyer" value={filters.buyer} onChange={buyer => setFilters({ ...filters, buyer })} options={[{ value: "all", label: "Everyone" }, ...buyers]} />
    <ChipRow label="Aisle" value={filters.section} onChange={section => setFilters({ ...filters, section })} options={[{ value: "all", label: "All aisles" }, ...sections]} />
    <InlineError message={error ?? finishError} />
    {!visible.length && <ScreenState loading={loading && !data} title={error ? "Couldn't load your list" : filtered ? "No matching items" : "List empty"}
      description={error ?? (filtered ? "Clear filters to see all items." : undefined)}
      action={error ? "Try again" : filtered ? "Clear filters" : undefined} onAction={error ? reload : filtered ? clear : undefined} />}
    {rows.map(entries => <ListRow key={entries[0].item_id ?? entries[0].item_in_list_id} entries={entries} locationId={locationId}
      aisles={[...(aisleData ?? []), ...addedAisles.filter(added => !aisleData?.some(existing => existing.section_id === added.section_id))]}
      onAisleCreated={section => setAddedAisles(current => [...current.filter(s => s.section_id !== section.section_id), section])} />)}
    <ConfirmAction open={finishOpen} busy={finishing} large variant="primary"
      icon={<Icon path={mdiCheckAll} size={40} color={colors.primary} />}
      title="Finish this trip?"
      description={items.some(i => i.status_name === ITEM_STATUS.NOT_FOUND)
        ? "Everything is in the cart or not available. Not-available items move to the next list."
        : "Everything is in the cart. The list moves to history."}
      confirmLabel="Yes, finish trip" busyLabel="Finishing..." cancelLabel="Not yet"
      onConfirm={() => void finishTrip()} onCancel={() => setFinishOpen(false)} />
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
    case ITEM_STATUS.NOT_FOUND: return <Icon path={mdiCancel} size={18} color={colors.danger} label="Not available" />;
    default: return <Icon path={mdiCircleOutline} size={20} color={colors.primary} label="Not in cart" />;
  }
}

/** A row's state from its entries: anything still to get keeps it open; otherwise not available wins over in cart. */
function groupStatus(statuses: (string | null | undefined)[]) {
  if (statuses.some(status => status !== ITEM_STATUS.IN_CART && status !== ITEM_STATUS.NOT_FOUND)) return ITEM_STATUS.NOT_IN_CART;
  return statuses.includes(ITEM_STATUS.NOT_FOUND) ? ITEM_STATUS.NOT_FOUND : ITEM_STATUS.IN_CART;
}
const statusOrder = (status: string) => status === ITEM_STATUS.NOT_IN_CART ? 0 : status === ITEM_STATUS.NOT_FOUND ? 1 : 2;

/** Entries of the same item (one per buyer) share a row. */
function groupByItem(items: FlattenedShoppingListItem[]) {
  const groups = new Map<number, FlattenedShoppingListItem[]>();
  for (const item of items) {
    const key = item.item_id ?? -item.item_in_list_id;
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return [...groups.values()];
}

/** Closes a menu anchored in `ref` on an outside press, Escape or Android Back. */
function useDismiss(open: boolean, ref: RefObject<HTMLElement | null>, close: () => void) {
  useBackHandler(close, open);
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => { if (!ref.current?.contains(event.target as Node)) close(); };
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, ref, close]);
}

function ListRow({ entries, locationId, aisles, onAisleCreated }: { entries: FlattenedShoppingListItem[]; locationId: number; aisles: store_section[]; onAisleCreated: (section: store_section) => void }) {
  const first = entries[0];
  const name = first.item_name ?? "Item";
  const merged = entries.length > 1;
  // Optimistic changes per entry, dropped once the server's values change.
  const [statuses, setStatuses] = useState<Record<number, string>>({});
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [removed, setRemoved] = useState(false);
  const serverState = entries.map(e => `${e.item_in_list_id}:${e.status_name}:${e.quantity}`).join();
  useEffect(() => { setStatuses({}); setQuantities({}); }, [serverState]);
  const statusOf = (e: FlattenedShoppingListItem) => statuses[e.item_in_list_id] ?? e.status_name ?? ITEM_STATUS.NOT_IN_CART;
  const quantityOf = (e: FlattenedShoppingListItem) => quantities[e.item_in_list_id] ?? e.quantity ?? 1;
  const status = groupStatus(entries.map(statusOf));
  const inCart = status === ITEM_STATUS.IN_CART, unavailable = status === ITEM_STATUS.NOT_FOUND;
  const total = entries.reduce((sum, e) => sum + quantityOf(e), 0);

  const [quantityOpen, setQuantityOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useDismiss(menuOpen, menuRef, closeMenu);

  const [aisleOpen, setAisleOpen] = useState(false);
  const [newAisle, setNewAisle] = useState("");
  const [aisleBusy, setAisleBusy] = useState(false);
  const [aisleError, setAisleError] = useState<string | null>(null);
  const [aisleName, setAisleName] = useState(first.section_name ?? "No aisle");
  const [aisleId, setAisleId] = useState<number | null>(first.section_id ?? null);
  const aislePickerRef = useRef<HTMLSpanElement>(null);
  const closeAisle = useCallback(() => setAisleOpen(false), []);
  useDismiss(aisleOpen, aislePickerRef, closeAisle);
  useEffect(() => {
    setAisleId(first.section_id ?? null);
    setAisleName(first.section_name ?? "No aisle");
  }, [first.section_id, first.section_name]);

  function setStatus(next: string) {
    setMenuOpen(false);
    for (const entry of entries) {
      const previous = statusOf(entry);
      if (previous === next) continue;
      const id = entry.item_in_list_id;
      setStatuses(current => ({ ...current, [id]: next }));
      inBackground(() => api.patch(`/listEntries/${id}/status`, { status: next }), () => setStatuses(current => ({ ...current, [id]: previous })));
    }
  }
  // Tapping the status puts everything in the cart, or takes it all back out.
  const toggleStatus = () => setStatus(inCart ? ITEM_STATUS.NOT_IN_CART : ITEM_STATUS.IN_CART);
  function adjustQuantity(entry: FlattenedShoppingListItem, delta: number) {
    const previous = quantityOf(entry), next = Math.max(1, Math.min(9999, previous + delta));
    if (next === previous) return;
    const id = entry.item_in_list_id;
    setQuantities(current => ({ ...current, [id]: next }));
    inBackground(() => api.patch(`/listEntries/${id}`, {
      buyer_id: entry.buyer_id ?? null, quantity: next, discount_price: entry.discount_price ?? null,
    }), () => setQuantities(current => ({ ...current, [id]: previous })));
  }
  function removeFromList() {
    setMenuOpen(false);
    setRemoved(true);
    for (const entry of entries) inBackground(() => api.delete(`/listEntries/${entry.item_in_list_id}`), () => setRemoved(false));
  }
  function assignAisle(section: store_section | null) {
    const previous = { id: aisleId, name: aisleName };
    setAisleId(section?.section_id ?? null); setAisleName(section?.name ?? "No aisle"); setAisleOpen(false);
    inBackground(() => api.patch(`/listEntries/${first.item_in_list_id}/aisle`, { section_id: section?.section_id ?? null }),
      () => { setAisleId(previous.id); setAisleName(previous.name); });
  }
  async function createAisle() {
    const aisle = newAisle.trim();
    if (!aisle || aisleBusy) return;
    setAisleBusy(true); setAisleError(null);
    try {
      const section = await api.post<store_section>(`/locations/${locationId}/sections`, { name: aisle });
      onAisleCreated(section);
      await api.patch(`/listEntries/${first.item_in_list_id}/aisle`, { section_id: section.section_id });
      setAisleId(section.section_id); setAisleName(section.name ?? aisle); setNewAisle(""); setAisleOpen(false);
    } catch (error) { setAisleError(errorMessage(error)); }
    finally { setAisleBusy(false); }
  }
  if (removed) return null;
  const buyerName = (e: FlattenedShoppingListItem) => e.buyer_name ?? "Unassigned";
  const forBuyer = (e: FlattenedShoppingListItem) => merged ? " for " + buyerName(e) : "";
  const stepper = (entry: FlattenedShoppingListItem, done?: () => void) => <div className="list-quantity-stepper" aria-label={`Quantity ${quantityOf(entry)}`}>
    <button type="button" className="list-qty-step" aria-label={`Remove one ${name}${forBuyer(entry)}`} disabled={quantityOf(entry) <= 1} onClick={() => adjustQuantity(entry, -1)}>
      <Icon path={mdiMinus} size={17} color={colors.primary} />
    </button>
    {done ? <button type="button" className="list-qty-value" aria-label="Done changing quantity" onClick={done}>{quantityOf(entry)}</button>
      : <span className="list-qty-value">{quantityOf(entry)}</span>}
    <button type="button" className="list-qty-step" aria-label={`Add one ${name}${forBuyer(entry)}`} disabled={quantityOf(entry) >= 9999} onClick={() => adjustQuantity(entry, 1)}>
      <Icon path={mdiPlus} size={17} color={colors.primary} />
    </button>
  </div>;
  const rowClass = ["card list-row", inCart && "list-row-in-cart", unavailable && "list-row-unavailable", (aisleOpen || menuOpen) && "aisle-picker-open", merged && quantityOpen && "list-row-split"].filter(Boolean).join(" ");
  return <div className={rowClass}>
    <button type="button" className="status" aria-label={inCart ? `Mark ${name} not in cart` : `Mark ${name} in cart`}
      aria-pressed={inCart} onClick={toggleStatus} title={inCart ? "In cart — tap to undo" : "Mark as in cart"}>
      <StatusIcon status={status} />
    </button>
    <ItemThumb path={first.image_path} />
    <span className="list-details">
      {merged
        ? <button type="button" className="list-name list-name-trigger" onClick={() => setQuantityOpen(open => !open)}>{name}</button>
        : <Link className="list-name list-name-trigger" to={`/entries/${first.item_in_list_id}`}>{name}</Link>}
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
      </span><span className="list-buyer">{"  ·  "}{merged ? entries.map(e => `${buyerName(e)} ${quantityOf(e)}`).join(" | ") : buyerName(first)}</span>
      {unavailable && <span className="list-unavailable">{"  ·  "}Not available</span>}</div>
    </span>
    <div className="list-quantity-control">
      {!quantityOpen || merged
        ? <button type="button" className="quantity quantity-trigger" aria-label={`Change quantity, currently ${total}`} aria-expanded={quantityOpen} onClick={() => setQuantityOpen(open => !open)}>
            <span className="qty">{total}</span><span className="qty-label">QTY</span>
          </button>
        : stepper(first, () => setQuantityOpen(false))}
    </div>
    {merged
      ? <button type="button" className="icon-button" aria-label={`Edit ${name} for each buyer`} aria-expanded={quantityOpen} onClick={() => setQuantityOpen(open => !open)}>
          <Icon path={mdiPencilOutline} size={19} color={colors.muted} />
        </button>
      : <Link className="icon-button" to={`/entries/${first.item_in_list_id}`} aria-label={"Edit " + name}>
          <Icon path={mdiPencilOutline} size={19} color={colors.muted} />
        </Link>}
    <div className="list-row-menu" ref={menuRef}>
      <button type="button" className="icon-button" aria-label={`More for ${name}`} aria-haspopup="menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)}>
        <Icon path={mdiDotsVertical} size={20} color={colors.muted} />
      </button>
      {menuOpen && <div className="row-menu" role="menu" aria-label={name}>
        {unavailable
          ? <button type="button" role="menuitem" className="aisle-choice" onClick={() => setStatus(ITEM_STATUS.NOT_IN_CART)}>Available again</button>
          : <button type="button" role="menuitem" className="aisle-choice" onClick={() => setStatus(ITEM_STATUS.NOT_FOUND)}>Not available</button>}
        <button type="button" role="menuitem" className="aisle-choice row-menu-danger" onClick={removeFromList}>
          <Icon path={mdiTrashCanOutline} size={18} color={colors.danger} /> Remove from list
        </button>
      </div>}
    </div>
    {merged && quantityOpen && <div className="list-split" aria-label={`${name} by buyer`}>
      {entries.map(entry => <div className="list-split-row" key={entry.item_in_list_id}>
        <span className="list-split-buyer">{buyerName(entry)}</span>
        {stepper(entry)}
        <Link className="icon-button" to={`/entries/${entry.item_in_list_id}`} aria-label={`Edit ${name} for ${buyerName(entry)}`}>
          <Icon path={mdiPencilOutline} size={19} color={colors.muted} />
        </Link>
      </div>)}
    </div>}
  </div>;
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
