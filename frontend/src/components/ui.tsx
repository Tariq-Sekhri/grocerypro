import { ReactNode, useEffect, useId, useRef, useState } from "react";
import { mdiBasketOutline, mdiCheck, mdiChevronDown, mdiClose, mdiMinus, mdiPlus } from "@mdi/js";
import Icon from "./Icon";
import ProfileAvatar from "./ProfileAvatar";
import { colors } from "../theme";
import { useBackHandler } from "../lib/navigation";
import { dismissNotice, useNotice } from "../lib/optimistic";
import { formatPriceInput, type Choice } from "../lib/grocery";

type ButtonVariant = "primary" | "secondary" | "danger";
export function Button({ onClick, children, variant = "primary", disabled, className = "", type = "button", preloadTo }: {
  onClick?: () => void; children: ReactNode; variant?: ButtonVariant; disabled?: boolean; className?: string; type?: "button" | "submit";
  preloadTo?: string;
}) {
  return <button type={type} className={`btn btn-${variant} ${className}`} disabled={disabled} onClick={onClick} data-preload-to={preloadTo}>{children}</button>;
}

export function ScreenIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="intro">
    <p className="eyebrow">{eyebrow}</p>
    <h1 className="intro-title">{title}</h1>
    {!!description && <p className="intro-description">{description}</p>}
  </div>;
}

export function ScreenState({ loading, title, description, action, onAction }: { loading?: boolean; title?: string; description?: string; action?: string; onAction?: () => void }) {
  return <div className="state" role={loading ? "status" : undefined}>
    {loading ? <div className="spinner" aria-hidden /> : <div className="state-icon"><Icon path={mdiBasketOutline} size={32} color={colors.primary} /></div>}
    <p className="state-title">{loading ? "Getting things ready..." : title}</p>
    {!!description && <p className="state-description">{description}</p>}
    {!!action && <Button onClick={onAction} className="state-action">{action}</Button>}
  </div>;
}

export function InlineError({ message }: { message: string | null | undefined }) {
  return message ? <p role="alert" className="inline-error">{message}</p> : null;
}

export function TextField({ label, value, onChange, inputMode, placeholder, autoFocus }: {
  label: string; value: string; onChange: (value: string) => void; inputMode?: "numeric" | "decimal" | "text" | "url"; placeholder?: string; autoFocus?: boolean;
}) {
  const id = useId();
  return <div className="field">
    <label htmlFor={id} className="label">{label}</label>
    <input id={id} className="input" value={value} onChange={e => onChange(e.target.value)} inputMode={inputMode} placeholder={placeholder} autoFocus={autoFocus}
      autoComplete="off" autoCapitalize={inputMode === "url" ? "off" : undefined} spellCheck={inputMode === "url" ? false : undefined} />
  </div>;
}

export function PriceField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <TextField label={label} value={value} onChange={text => onChange(formatPriceInput(text))} inputMode="decimal" placeholder="0.00" />;
}

export function QuantityField({ value, onChange, disabled = false }: { value: string; onChange: (value: string) => void; disabled?: boolean }) {
  const id = useId();
  const adjust = (delta: number) => onChange(String(Math.max(1, Math.min(9999, (Number(value) || 0) + delta))));
  return <div className="field">
    <label htmlFor={id} className="label">Quantity</label>
    <div className="quantity-edit-row">
      <button type="button" className="step" aria-label="Decrease quantity" disabled={disabled || Number(value) <= 1} onClick={() => adjust(-1)}>
        <Icon path={mdiMinus} size={18} color={colors.primary} />
      </button>
      <input id={id} className="input quantity-edit-input" value={value} onChange={e => onChange(e.target.value.replace(/[^0-9]/g, ""))} inputMode="numeric" maxLength={4} aria-label="Quantity" />
      <button type="button" className="step" aria-label="Increase quantity" disabled={disabled || Number(value) >= 9999} onClick={() => adjust(1)}>
        <Icon path={mdiPlus} size={20} color={colors.primary} />
      </button>
    </div>
  </div>;
}

export function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useBackHandler(onClose);
  return <div className="overlay overlay-bottom" onClick={onClose}>
    <div className="sheet" role="dialog" aria-modal="true" aria-label={title} onClick={e => e.stopPropagation()}>
      <div className="sheet-header">
        <h2 className="sheet-title">{title}</h2>
        <button type="button" className="icon-button" aria-label="Close" onClick={onClose}><Icon path={mdiClose} color={colors.ink} /></button>
      </div>
      <div className="sheet-body">{children}</div>
    </div>
  </div>;
}

export function ChoiceField({ label, value, options, onChange, compact, dropdown }: { label: string; value: string; options: Choice[]; onChange: (value: string) => void; compact?: boolean; dropdown?: boolean }) {
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const currentOption = options.find(o => o.value === value);
  const current = currentOption?.label ?? "Choose";
  useEffect(() => {
    if (!open || !compact || !menuPosition) return;
    const closeOutside = (event: PointerEvent) => {
      if (!menu.current?.contains(event.target as Node) && !trigger.current?.contains(event.target as Node)) setOpen(false);
    };
    const close = () => setOpen(false);
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open, compact, menuPosition]);
  function toggleBuyerMenu() {
    if (open) { setOpen(false); return; }
    const rect = trigger.current?.getBoundingClientRect();
    if (!rect) return;
    const height = Math.min(options.length * 44 + 12, 320);
    const top = rect.bottom + height + 12 <= window.innerHeight
      ? rect.bottom + 6
      : Math.max(12, rect.top - height - 6);
    setMenuPosition({ top, left: Math.max(12, Math.min(rect.right - 184, window.innerWidth - 196)) });
    setOpen(true);
  }
  return <>
    {dropdown
      ? compact
        ? <>
          <button ref={trigger} type="button" className="icon-button buyer-picker-trigger" aria-label={`${label}: ${current}`} aria-haspopup="listbox" aria-expanded={open} onClick={toggleBuyerMenu}>
            <ProfileAvatar name={current} shared={currentOption?.shared} small />
          </button>
          {open && menuPosition && <div ref={menu} className="buyer-menu" role="listbox" aria-label={label} style={menuPosition}>
            {options.map(option => <button key={option.value} type="button" className="buyer-menu-option" role="option" aria-selected={option.value === value}
              onClick={() => { onChange(option.value); setOpen(false); }}>
              <span>{option.label}</span>{option.value === value && <Icon path={mdiCheck} size={18} color={colors.primary} />}
            </button>)}
          </div>}
        </>
        : <div className="field">
          <span className="label">{label}</span>
          <select className="input choice choice-dropdown" aria-label={label} value={value} onChange={e => onChange(e.target.value)}>
            {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>
      : compact
      ? <button type="button" className="icon-button" aria-label={`${label}: ${current}`} onClick={() => setOpen(true)}><ProfileAvatar name={current} shared={currentOption?.shared} small /></button>
      : <div className="field">
        <span className="label">{label}</span>
        <button type="button" className="input choice" aria-label={`${label}: ${current}`} onClick={() => setOpen(true)}>
          <span className="choice-value">{current}</span><Icon path={mdiChevronDown} size={22} color={colors.muted} />
        </button>
      </div>}
    {!dropdown && open && <Sheet title={label} onClose={() => setOpen(false)}>
      {options.map(option => <button key={option.value} type="button" className="option" aria-pressed={option.value === value}
        onClick={() => { onChange(option.value); setOpen(false); }}>
        <span className="choice-value">{option.label}</span>
        {option.value === value && <Icon path={mdiCheck} size={20} color={colors.primary} />}
      </button>)}
    </Sheet>}
  </>;
}

export function ConfirmAction({ open, title, description, onCancel, onConfirm, busy }: { open: boolean; title: string; description: string; onCancel: () => void; onConfirm: () => void; busy: boolean }) {
  useBackHandler(() => { if (!busy) onCancel(); }, open);
  if (!open) return null;
  return <div className="overlay overlay-center" onClick={() => { if (!busy) onCancel(); }}>
    <div className="dialog" role="alertdialog" aria-modal="true" aria-label={title} onClick={e => e.stopPropagation()}>
      <h2 className="dialog-title">{title}</h2>
      <p className="dialog-description">{description}</p>
      <Button variant="danger" disabled={busy} onClick={onConfirm}>{busy ? "Removing..." : "Remove"}</Button>
      <Button disabled={busy} onClick={onCancel} className="mt-12">Keep it</Button>
    </div>
  </div>;
}

/** Failure message for a change that was assumed to work. Tap to dismiss. */
export function NoticeBar() {
  const notice = useNotice();
  if (!notice) return null;
  return <button type="button" className="notice-bar" role="alert" onClick={dismissNotice}>{notice.text}</button>;
}
