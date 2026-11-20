import { useState } from "react";
import { exitDevMode } from "../lib/devStore";
import { useDevMode } from "../lib/devMode";
import { useBackHandler } from "../lib/navigation";
import { Button } from "./ui";

export function DevModeIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 3h6M10 3v6l-6 10a1.3 1.3 0 0 0 1.1 2h13.8a1.3 1.3 0 0 0 1.1-2L14 9V3M7 15h10" />
  </svg>;
}

/** Floating indicator shown across screens while dev mode is active, with an exit dialog. */
export function DevModeFloat() {
  const devMode = useDevMode();
  const [open, setOpen] = useState(false);
  useBackHandler(() => setOpen(false), open && devMode);
  if (!devMode) return null;
  return <>
    <button type="button" className="dev-mode-float" aria-label="Dev mode active" title="Dev mode" onClick={() => setOpen(true)}>
      <DevModeIcon />
    </button>
    {open && <div className="overlay overlay-center" onClick={() => setOpen(false)}>
      <div className="dialog" role="dialog" aria-modal="true" aria-label="Dev mode" onClick={e => e.stopPropagation()}>
        <h2 className="dialog-title">Dev mode</h2>
        <p className="dialog-description">Temporary changes stay in memory and are discarded on exit. No requests are sent to the server.</p>
        <Button onClick={() => { setOpen(false); exitDevMode(); }}>Exit & discard</Button>
        <Button variant="secondary" className="mt-12" onClick={() => setOpen(false)}>Close</Button>
      </div>
    </div>}
  </>;
}
