import { useCallback, useEffect, useState } from "react";
import { mdiArrowLeft, mdiCheckCircle, mdiCloseCircle, mdiRadioboxBlank, mdiRadioboxMarked } from "@mdi/js";
import Icon from "../components/Icon";
import { Button, InlineError, TextField } from "../components/ui";
import { colors } from "../theme";
import { checkServer } from "../lib/api";
import { useBackHandler } from "../lib/navigation";
import { normalizeServerUrl, originFor, serverOptions, setServer, useServer, type ServerChoice, type ServerMode } from "../lib/server";

type Status = { state: "checking" } | { state: "done"; ok: boolean; message: string };

/** Lets the client pick which Grocery Pro backend to use: Tailscale, Local or a custom address. */
export default function ServerSettings({ onDone }: { onDone?: () => void }) {
  const saved = useServer();
  const options = serverOptions();
  const [mode, setMode] = useState<ServerMode>(saved?.mode ?? "tailscale");
  const [custom, setCustom] = useState(saved?.mode === "custom" ? saved.custom ?? "" : "");
  const [status, setStatus] = useState<Partial<Record<ServerMode, Status>>>({});
  useBackHandler(() => onDone?.(), !!onDone);

  const check = useCallback(async (target: ServerMode, customUrl: string) => {
    const choice: ServerChoice = { mode: target, custom: customUrl };
    if (target === "custom" && !normalizeServerUrl(customUrl)) { setStatus(s => ({ ...s, custom: undefined })); return; }
    setStatus(s => ({ ...s, [target]: { state: "checking" } }));
    const result = await checkServer(originFor(choice));
    setStatus(s => ({ ...s, [target]: { state: "done", ...result } }));
  }, []);

  // Check every preset when the screen opens so it is obvious which one works.
  useEffect(() => {
    for (const option of serverOptions()) if (option.mode !== "custom") void check(option.mode, "");
  }, [check]);
  useEffect(() => {
    const timer = setTimeout(() => { void check("custom", custom); }, 500);
    return () => clearTimeout(timer);
  }, [custom, check]);

  const customValid = !!normalizeServerUrl(custom);
  const selected = status[mode];
  const save = () => { setServer({ mode, custom }); onDone?.(); };

  return <div className="screen">
    <header className="header">
      <div className="header-side">{onDone && <button type="button" className="icon-button" aria-label="Go back" onClick={onDone}><Icon path={mdiArrowLeft} color={colors.ink} /></button>}</div>
      <h1 className="header-title">Server</h1>
      <div className="header-side" />
    </header>
    <main className="scroll"><div className="form">
      <div className="server-options" role="radiogroup" aria-label="Server">
        {options.map(option => {
          const s = status[option.mode];
          const url = option.mode === "custom" ? (normalizeServerUrl(custom) ?? "Enter an address below") : option.url;
          return <button type="button" key={option.mode} role="radio" aria-checked={mode === option.mode}
            className={`server-option ${mode === option.mode ? "selected" : ""}`} onClick={() => setMode(option.mode)}>
            <Icon path={mode === option.mode ? mdiRadioboxMarked : mdiRadioboxBlank} color={mode === option.mode ? colors.primary : colors.muted} />
            <span className="server-option-text">
              <span className="server-option-label">{option.label}</span>
              <span className="server-option-url">{url}</span>
              <span className="server-option-description">{option.description}</span>
            </span>
            <StatusBadge status={s} />
          </button>;
        })}
      </div>
      {mode === "custom" && <TextField label="Server address" value={custom} onChange={setCustom} inputMode="url" placeholder="http://192.168.1.20:3033" autoFocus />}
      <InlineError message={selected?.state === "done" && !selected.ok ? `This server is not answering (${selected.message}). You can still save it and connect later.` : null} />
      <div className="form-actions">
        <Button onClick={save} disabled={mode === "custom" && !customValid}>Use this server</Button>
        <Button variant="secondary" className="mt-12" onClick={() => void check(mode, custom)} disabled={mode === "custom" && !customValid}>Test connection</Button>
      </div>
    </div></main>
  </div>;
}

function StatusBadge({ status }: { status: Status | undefined }) {
  if (!status) return <span className="badge" />;
  if (status.state === "checking") return <span className="badge"><span className="spinner small" aria-label="Checking" /></span>;
  return <span className={`badge ${status.ok ? "ok" : "bad"}`} title={status.message}>
    <Icon path={status.ok ? mdiCheckCircle : mdiCloseCircle} size={18} color={status.ok ? colors.primary : colors.danger} />
    <span>{status.ok ? "Online" : status.message}</span>
  </span>;
}
