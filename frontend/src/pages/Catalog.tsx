import { useEffect, useState, type ChangeEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { mdiCameraOutline, mdiFoodAppleOutline, mdiImageOutline, mdiMagnify, mdiMinus, mdiPlus, mdiPlusBoxOutline, mdiStar, mdiStarOutline, mdiTrashCanOutline } from "@mdi/js";
import type { item } from "@shared/prisma-types";
import Icon from "../components/Icon";
import { ItemThumb } from "../components/ItemImage";
import Page from "../components/Page";
import { Button, ChoiceField, ConfirmAction, InlineError, PriceField, ScreenState, TextField } from "../components/ui";
import { colors } from "../theme";
import { ITEM_STATUS } from "@shared/constants/itemStatus";
import { api } from "../lib/api";
import { inBackground, patchCached } from "../lib/optimistic";
import useScreenData from "../lib/useScreenData";
import { useGoBack } from "../lib/navigation";
import { useProfile } from "../lib/profile";
import { prepareItemImage, rememberItemImage, useItemImage } from "../lib/itemImages";
import { isNative } from "../lib/server";
import { buyerChoices, catalogFavorite, money, parsePrice, priceInput, sortedCatalog, validPrice, type CatalogData, type CatalogItem, type FlattenedShoppingListItem, type ItemData } from "../lib/grocery";

export function AddItemsToList() {
  const locationId = Number(useParams().locationId);
  const goBack = useGoBack();
  const listPath = `/locations/${locationId}/list`;
  const { data, loading, error, reload } = useScreenData<CatalogData>("/catalog?location_id=" + locationId);
  const profile = useProfile();
  const [search, setSearch] = useState("");
  const [buyer, setBuyer] = useState(profile ? String(profile.user_id) : "none");
  const [itemBuyers, setItemBuyers] = useState<Record<number, string>>({});
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [favoriteOverrides, setFavoriteOverrides] = useState<Record<string, boolean>>({});
  // Fresh catalog data already reflects saved favourites and removed items.
  useEffect(() => { setFavoriteOverrides({}); }, [data]);
  useEffect(() => {
    if (data) setSelected(prev => Object.fromEntries(Object.entries(prev).filter(([id]) => data.items.some(item => item.item_id === Number(id)))));
  }, [data]);
  const isFavorite = (item: CatalogItem) => catalogFavorite(item, profile?.user_id ?? null, favoriteOverrides);
  function toggleFavorite(item: CatalogItem) {
    if (!profile) return;
    const user_id = profile.user_id, favorite = !isFavorite(item), id = user_id + ":" + item.item_id;
    setFavoriteOverrides(prev => ({ ...prev, [id]: favorite }));
    inBackground(() => api.put("/catalog/" + item.item_id + "/favorite", { user_id, favorite }), () => setFavoriteOverrides(prev => ({ ...prev, [id]: !favorite })));
  }
  const count = Object.values(selected).reduce((sum, n) => sum + n, 0);
  const adjust = (id: number, delta: number) => { setSelected(prev => ({ ...prev, [id]: Math.max(0, Math.min(9999, (prev[id] ?? 0) + delta)) })); };
  function save() {
    if (!data) return;
    const entries = Object.entries(selected).filter(([, quantity]) => quantity > 0).map(([id, quantity]) => {
      const chosen = itemBuyers[Number(id)] ?? buyer;
      return { item_id: Number(id), quantity, buyer_id: chosen === "none" ? null : Number(chosen) };
    });
    // Rows appear on the list at once with temporary ids; the list replaces them when the server answers.
    const undo = patchCached<FlattenedShoppingListItem[]>(`/shoppingList/active?location_id=${locationId}`, list => [...list, ...entries.flatMap((entry, i) => {
      const item = data.items.find(candidate => candidate.item_id === entry.item_id);
      return item ? [{
        item_in_list_id: -(Date.now() + i), item_id: item.item_id, quantity: entry.quantity, buyer_id: entry.buyer_id,
        buyer_name: data.buyers.find(b => b.user_id === entry.buyer_id)?.name ?? null, discount_price: null,
        item_name: item.name, image_path: item.image_path, section_id: item.section_id ?? undefined, section_name: item.section_name,
        status_name: ITEM_STATUS.NOT_IN_CART, regular_price: item.price, sort_order: null,
      } as unknown as FlattenedShoppingListItem] : [];
    })]);
    inBackground(() => api.post("/listEntries", { location_id: locationId, entries }), undo);
    goBack(listPath);
  }
  const footer = <>
    <div className="catalog-footer-actions">
      <Link className="btn btn-secondary catalog-create-footer" to={`/locations/${locationId}/items/new?returnToAdd=1`} aria-label="Create new item">
        <Icon path={mdiPlusBoxOutline} size={19} color={colors.primary} /> New item
      </Link>
      <Button disabled={!count} onClick={save}>{count ? "Add " + count + (count === 1 ? " item" : " items") : "Select items"}</Button>
    </div>
  </>;
  if (!data) return <Page title="Add Items" back={listPath}><ScreenState loading={loading} title="Couldn't load the catalog" description={error ?? undefined} action={loading ? undefined : "Try again"} onAction={reload} /></Page>;
  const items = sortedCatalog(data.items, search, profile?.user_id ?? null, favoriteOverrides);
  const buyers = buyerChoices(data.buyers);
  return <Page title="Add Items" back={listPath} footer={footer}>
    <label className="search">
      <Icon path={mdiMagnify} size={22} color={colors.muted} />
      <input aria-label="Search items" placeholder="Find an item" value={search} onChange={e => setSearch(e.target.value)} type="search" autoComplete="off" />
    </label>
    <ChoiceField label="Buying for" value={buyer} onChange={setBuyer} options={buyers} dropdown />
    {!!profile && <p className="hint">{profile.name}'s favourites appear first. Tap a star to save or remove one.</p>}
    <div className="section-header spaced-top">
      <h2 className="section-title">All items</h2>
      <span className="muted small">{items.length} in catalog</span>
    </div>
    <InlineError message={error} />
    {!items.length && <ScreenState title={search ? "No matching items" : "Catalog empty"} description={search ? "Try another item name." : undefined} />}
    {items.map(item => {
      const favorite = isFavorite(item), quantity = selected[item.item_id] ?? 0;
      return <div className="card catalog-row" key={item.item_id}>
        {!!profile && <button type="button" className="icon-button" aria-pressed={favorite} onClick={() => toggleFavorite(item)}
          aria-label={(favorite ? "Remove " : "Add ") + item.name + (favorite ? " from " : " to ") + profile.name + "'s favourites"}>
          <Icon path={favorite ? mdiStar : mdiStarOutline} color={favorite ? colors.primary : colors.muted} />
        </button>}
        <ItemThumb path={item.image_path} />
        <Link className="catalog-details" to={`/locations/${locationId}/items/${item.item_id}`} aria-label={"Edit catalog item " + item.name}>
          <span className="list-name">{item.name}</span>
          <span className="muted small">{money(item.price)}{item.section_name ? " / " + item.section_name : ""}</span>
        </Link>
        <ChoiceField compact dropdown label={"Buyer for " + item.name} value={itemBuyers[item.item_id] ?? buyer} onChange={value => setItemBuyers(prev => ({ ...prev, [item.item_id]: value }))} options={buyers} />
        <div className="stepper">
          {quantity > 0 && <>
            <button type="button" className="step" aria-label={"Remove one " + item.name} onClick={() => adjust(item.item_id, -1)}><Icon path={mdiMinus} size={18} color={colors.primary} /></button>
            <span className="step-number" aria-live="polite">{quantity}</span>
          </>}
          <button type="button" className="step" aria-label={"Add one " + item.name} disabled={quantity === 9999} onClick={() => adjust(item.item_id, 1)}><Icon path={mdiPlus} size={20} color={colors.primary} /></button>
        </div>
      </div>;
    })}
  </Page>;
}

/** Creates a catalog item (no itemId) or edits one. */
export function ItemEditor() {
  const params = useParams();
  const locationId = Number(params.locationId);
  const itemId = params.itemId ? Number(params.itemId) : undefined;
  const goBack = useGoBack();
  const fallback = `/locations/${locationId}/${new URLSearchParams(window.location.search).has("returnToAdd") ? "add" : "list"}`;
  const { data, loading, error, reload } = useScreenData<CatalogData | ItemData>(itemId ? "/catalog/" + itemId : "/catalog?location_id=" + locationId, false);
  const [name, setName] = useState("");
  const [section, setSection] = useState("none");
  const [price, setPrice] = useState("");
  const [confirm, setConfirm] = useState(false);
  // A new photo or removal applies when the form is saved.
  const [imageChange, setImageChange] = useState<{ blob: Blob; url: string } | "remove" | null>(null);
  const [imageBusy, setImageBusy] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  useEffect(() => () => { if (imageChange && imageChange !== "remove") URL.revokeObjectURL(imageChange.url); }, [imageChange]);
  const savedImagePath = data && "item" in data ? data.item.image_path : null;
  const savedImage = useItemImage(savedImagePath);
  useEffect(() => {
    if (data && "item" in data) { setName(data.item.name ?? ""); setSection(data.item.section_id == null ? "none" : String(data.item.section_id)); setPrice(priceInput(data.price)); }
  }, [data]);
  const valid = !!name.trim() && validPrice(price) && !imageBusy;
  async function pickImage(file: File | undefined) {
    if (!file) return;
    setImageBusy(true); setImageError(null);
    try {
      const blob = await prepareItemImage(file);
      setImageChange({ blob, url: URL.createObjectURL(blob) });
    } catch { setImageError("Could not read this image. Try another photo."); }
    finally { setImageBusy(false); }
  }
  function save() {
    if (!valid) return;
    const payload = { name: name.trim(), section_id: section === "none" ? null : Number(section), price: parsePrice(price) };
    const change = imageChange;
    const saveImage = async (id: number) => {
      if (change === "remove") await api.delete("/catalog/" + id + "/image");
      else if (change) {
        const updated = await api.upload<item>("/catalog/" + id + "/image", change.blob);
        if (updated.image_path) rememberItemImage(updated.image_path, change.blob);
      }
    };
    inBackground(async () => {
      if (itemId) { await api.patch("/catalog/" + itemId, payload); await saveImage(itemId); }
      else await saveImage((await api.post<item>("/catalog", { ...payload, location_id: locationId })).item_id);
    });
    goBack(fallback);
  }
  function remove() {
    inBackground(() => api.delete("/item/" + itemId));
    setConfirm(false);
    goBack(fallback);
  }
  const title = itemId ? "Edit Catalog Item" : "New Item";
  if (!data) return <Page title={title} back={fallback} wide={false}><ScreenState loading={loading} title="Couldn't load item details" description={error ?? undefined} action={loading ? undefined : "Try again"} onAction={reload} /></Page>;
  const shownImage = imageChange === "remove" ? null : imageChange ? imageChange.url : savedImage;
  const hasImage = imageChange === "remove" ? false : !!imageChange || !!savedImagePath;
  const chooseFile = (event: ChangeEvent<HTMLInputElement>) => { void pickImage(event.target.files?.[0]); event.target.value = ""; };
  return <Page title={title} back={fallback} wide={false}>
    <div className="item-image">{shownImage ? <img src={shownImage} alt={"Photo of " + (name.trim() || "this item")} /> : <Icon path={mdiFoodAppleOutline} size={44} color={colors.primary} />}</div>
    <div className="image-actions">
      {(isNative || matchMedia("(pointer: coarse)").matches) && <label className="tool image-action">
        <Icon path={mdiCameraOutline} size={18} color={colors.primary} />Take photo
        <input className="visually-hidden" type="file" accept="image/*" capture="environment" disabled={imageBusy} onChange={chooseFile} />
      </label>}
      <label className="tool image-action">
        <Icon path={mdiImageOutline} size={18} color={colors.primary} />{hasImage ? "Replace photo" : "Choose photo"}
        <input className="visually-hidden" type="file" accept="image/jpeg,image/png,image/webp,image/*" disabled={imageBusy} onChange={chooseFile} />
      </label>
      {hasImage && <button type="button" className="tool image-action image-remove" disabled={imageBusy} onClick={() => setImageChange(savedImagePath ? "remove" : null)}>
        <Icon path={mdiTrashCanOutline} size={18} color={colors.danger} />Remove photo
      </button>}
    </div>
    {imageBusy && <p className="hint" role="status">Preparing photo...</p>}
    <InlineError message={imageError} />
    <form onSubmit={e => { e.preventDefault(); void save(); }}>
      <TextField label="Item name" value={name} onChange={setName} />
      <ChoiceField label="Aisle" value={section} onChange={setSection}
        options={[{ value: "none", label: "No aisle assigned" }, ...data.sections.map(s => ({ value: String(s.section_id), label: s.name ?? "Aisle" }))]} />
      <PriceField label="Regular price ($)" value={price} onChange={setPrice} />
      <p className="hint">{itemId ? "Leave the price empty to keep its recorded price." : "You can leave the price empty and add it later."}</p>
      <InlineError message={error} />
      <div className="form-actions">
        <Button type="submit" disabled={!valid}>{itemId ? "Save changes" : "Create item"}</Button>
        {!!itemId && <Button variant="danger" className="mt-12" onClick={() => setConfirm(true)}>Delete item</Button>}
      </div>
    </form>
    <ConfirmAction open={confirm} busy={false} title="Remove this item?" description="This removes the item from the store catalog and all shopping lists that include it." onConfirm={remove} onCancel={() => setConfirm(false)} />
  </Page>;
}
