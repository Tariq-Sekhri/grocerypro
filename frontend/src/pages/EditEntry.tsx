import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../components/Page";
import { Button, ChoiceField, ConfirmAction, InlineError, PriceField, QuantityField, ScreenIntro, ScreenState } from "../components/ui";
import { api } from "../lib/api";
import { inBackground, patchCached } from "../lib/optimistic";
import useScreenData from "../lib/useScreenData";
import { useGoBack } from "../lib/navigation";
import { buyerChoices, parsePrice, priceInput, validPrice, type EntryData, type FlattenedShoppingListItem } from "../lib/grocery";

/** Edits one item on the active shopping list: buyer, quantity and sale price. */
export default function EditEntry() {
  const entryId = Number(useParams().entryId);
  const goBack = useGoBack();
  const navigate = useNavigate();
  const { data, loading, error, reload } = useScreenData<EntryData>("/listEntries/" + entryId, false);
  const [buyer, setBuyer] = useState("none");
  const [quantity, setQuantity] = useState("1");
  const [price, setPrice] = useState("");
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    if (data) { setBuyer(data.entry.buyer_id == null ? "none" : String(data.entry.buyer_id)); setQuantity(String(data.entry.quantity ?? 1)); setPrice(priceInput(data.entry.discount_price)); }
  }, [data]);
  const locationId = data?.entry.item?.location_id ?? data?.entry.shopping_list?.location_id;
  const fallback = locationId ? `/locations/${locationId}/list` : "/";
  const valid = /^\d+$/.test(quantity) && Number(quantity) > 0 && Number(quantity) <= 9999 && validPrice(price);
  const listPath = `/shoppingList/active?location_id=${locationId}`;
  function save() {
    if (!valid || !data) return;
    const body = { buyer_id: buyer === "none" ? null : Number(buyer), quantity: Number(quantity), discount_price: parsePrice(price) };
    const buyer_name = data.buyers.find(b => b.user_id === body.buyer_id)?.name ?? null;
    const undo = patchCached<FlattenedShoppingListItem[]>(listPath, list => list.map(row => row.item_in_list_id === entryId ? { ...row, ...body, buyer_name } : row));
    inBackground(() => api.patch("/listEntries/" + entryId, body), undo);
    goBack(fallback);
  }
  function remove() {
    const undo = patchCached<FlattenedShoppingListItem[]>(listPath, list => list.filter(row => row.item_in_list_id !== entryId));
    inBackground(() => api.delete("/listEntries/" + entryId), undo);
    setConfirm(false);
    goBack(fallback);
  }
  if (!data) return <Page title="Edit Item" back="/" wide={false}><ScreenState loading={loading} title="Couldn't load this list item" description={error ?? undefined} action={loading ? undefined : "Try again"} onAction={reload} /></Page>;
  const item = data.entry.item;
  return <Page title="Edit Item" back={fallback} wide={false}>
    <ScreenIntro eyebrow="ON THIS TRIP" title={item?.name ?? "Item"} />
    <form onSubmit={e => { e.preventDefault(); void save(); }}>
      <ChoiceField label="Buyer" value={buyer} onChange={setBuyer} options={buyerChoices(data.buyers)} dropdown />
      <QuantityField value={quantity} onChange={setQuantity} />
      <PriceField label="Sale price per item ($)" value={price} onChange={setPrice} />
      <p className="hint">If no regular price is set, this sale price becomes the regular price too. Leave empty to use the regular price.</p>
      <InlineError message={error} />
      <div className="form-actions">
        <Button type="submit" disabled={!valid}>Save changes</Button>
        {!!item && item.location_id != null && <Button variant="secondary" className="mt-12" onClick={() => navigate(`/locations/${item.location_id}/items/${item.item_id}`)}>Edit catalog item</Button>}
        <Button variant="danger" className="mt-12" onClick={() => setConfirm(true)}>Remove from list</Button>
      </div>
    </form>
    <ConfirmAction open={confirm} busy={false} title="Remove from this list?" description="The item stays in your store catalog for another trip." onConfirm={remove} onCancel={() => setConfirm(false)} />
  </Page>;
}
