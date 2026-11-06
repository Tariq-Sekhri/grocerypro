import { Link, useParams } from "react-router-dom";
import { mdiBasketOutline, mdiChevronRight, mdiHistory } from "@mdi/js";
import Icon from "../components/Icon";
import { ItemThumb } from "../components/ItemImage";
import Page from "../components/Page";
import { InlineError, ScreenIntro, ScreenState } from "../components/ui";
import { colors } from "../theme";
import useScreenData from "../lib/useScreenData";
import { money, tripDate, type HistoryDetail, type HistoryList } from "../lib/grocery";

export function ListHistory() {
  const locationId = Number(useParams().locationId);
  const { data, loading, error, reload } = useScreenData<HistoryList[]>("/listHistory/" + locationId);
  const lists = data ?? [];
  return <Page title="Past Lists" back={`/locations/${locationId}/list`}>
    <InlineError message={data ? error : null} />
    {!lists.length && <ScreenState loading={loading} title={error ? "Couldn't load your lists" : "No past lists"}
      description={error ?? undefined} action={error ? "Try again" : undefined} onAction={reload} />}
    {lists.map(list => <Link key={list.shopping_list_id} className="card history-row" to={`/history/${list.shopping_list_id}`} aria-label={"View " + tripDate(list.completed_at)}>
      <span className="history-icon"><Icon path={list.completed_at ? mdiHistory : mdiBasketOutline} size={25} color={colors.primary} /></span>
      <span className="grow">
        <span className="list-name">{tripDate(list.completed_at)}</span>
        <span className="list-meta">{list._count.item_in_list} {list._count.item_in_list === 1 ? "item" : "items"} / {list.completed_at ? "Completed" : "In progress"}</span>
      </span>
      <Icon path={mdiChevronRight} color={colors.muted} />
    </Link>)}
  </Page>;
}

export function PastList() {
  const listId = Number(useParams().listId);
  const { data, loading, error, reload } = useScreenData<HistoryDetail>("/listHistory/detail/" + listId);
  const back = data?.list.location_id ? `/locations/${data.list.location_id}/history` : "/";
  if (!data) return <Page title="Trip Details" back={back}><ScreenState loading={loading} title="Couldn't load this trip" description={error ?? undefined} action={loading ? undefined : "Try again"} onAction={reload} /></Page>;
  const buyers = new Map<string, { name: string; total: number; unknown: number }>();
  let total = 0, unknown = 0;
  for (const item of data.items) {
    const key = item.buyer_id == null ? "none" : String(item.buyer_id);
    const group = buyers.get(key) ?? { name: item.buyer_name ?? "Unassigned", total: 0, unknown: 0 };
    const price = item.discount_price ?? item.regular_price;
    if (price == null) { unknown++; group.unknown++; }
    else { const subtotal = price * (item.quantity ?? 0); total += subtotal; group.total += subtotal; }
    buyers.set(key, group);
  }
  return <Page title="Trip Details" back={back}>
    <ScreenIntro eyebrow="YOUR TRIP AT A GLANCE" title={data.list.location?.name ?? "Shopping trip"} description={tripDate(data.list.completed_at)} />
    <InlineError message={error} />
    <div className="summary">
      <p className="overline">{unknown ? "KNOWN SUBTOTAL" : "ESTIMATED TOTAL"}</p>
      <p className="total">{money(total)}</p>
      <p className="muted small">{data.items.length} {data.items.length === 1 ? "item" : "items"} / Based on recorded prices{unknown ? " / " + unknown + " without a price" : ""}</p>
    </div>
    <h2 className="section-title spaced">By buyer</h2>
    {[...buyers.entries()].map(([key, group]) => <div key={key} className="card money-row">
      <span className="grow"><span className="money-name">{group.name}</span>{!!group.unknown && <span className="list-meta">{group.unknown} without a price</span>}</span>
      <span className="amount">{money(group.total)}</span>
    </div>)}
    <h2 className="section-title spaced">What was on the list</h2>
    {!data.items.length && <ScreenState title="List empty" />}
    {data.items.map(item => {
      const price = item.discount_price ?? item.regular_price;
      return <div key={item.item_in_list_id} className="card money-row">
        <ItemThumb path={item.image_path} size="small" />
        <span className="grow"><span className="money-name">{item.item_name ?? "Removed item"}</span><span className="list-meta">{item.quantity ?? 0} / {item.buyer_name ?? "Unassigned"}</span></span>
        <span className="amount">{money(price == null ? null : price * (item.quantity ?? 0))}</span>
      </div>;
    })}
  </Page>;
}
