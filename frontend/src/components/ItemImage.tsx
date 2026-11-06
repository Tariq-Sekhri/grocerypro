import { useItemImage } from "../lib/itemImages";

/** Square item photo from the device copy. Items without one render nothing. */
export function ItemThumb({ path, size = "medium" }: { path: string | null | undefined; size?: "small" | "medium" }) {
  const url = useItemImage(path);
  if (!path) return null;
  return <span className={`item-thumb item-thumb-${size}`} aria-hidden>{url && <img src={url} alt="" draggable={false} />}</span>;
}
