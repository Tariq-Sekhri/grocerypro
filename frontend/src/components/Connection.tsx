import { useState } from "react";
import { mdiAlertCircle, mdiArrowLeft, mdiCheckCircle, mdiCloseCircle, mdiMinusCircleOutline } from "@mdi/js";
import Icon from "./Icon";
import { Button } from "./ui";
import { colors } from "../theme";
import { canOpenTailscale, checkConnection, describeProblem, openTailscale, setConnectionCheckOpen, useConnection, type Problem, type Step } from "../lib/connection";
import { uploadLogs, usePendingLogCount } from "../lib/deviceLog";
import { useBackHandler } from "../lib/navigation";
import { describeServer, useServer } from "../lib/server";

const tailscaleProblems: Problem[] = ["tailscale-missing", "tailscale-off", "other-vpn", "server-unreachable"];

/** In-page notice shown while the server cannot be reached, with the fix for the cause found. */
export function ConnectionBanner({ details = true }: { details?: boolean }) {
  const connection = useConnection();
  if (connection.phase !== "problem" || !connection.problem) return null;
  const { title, text } = describeProblem(connection.problem, connection.status);
  const showTailscale = canOpenTailscale && connection.tailscaleRequired && tailscaleProblems.includes(connection.problem);
  return <section className="connection-banner" role="alert">
    <div className="connection-banner-text">
      <Icon path={mdiAlertCircle} size={20} color={colors.danger} />
      <div>
        <p className="connection-banner-title">{title}</p>
        <p className="connection-banner-description">{text}</p>
      </div>
    </div>
    <div className="connection-banner-actions">
      {showTailscale && <button type="button" className="connection-action primary" onClick={() => void openTailscale()}>
        {connection.problem === "tailscale-missing" ? "Install Tailscale" : "Open Tailscale"}
      </button>}
      <button type="button" className="connection-action" disabled={connection.checking} onClick={() => void checkConnection()}>
        {connection.checking ? "Checking…" : "Try again"}
      </button>
      {details && <button type="button" className="connection-action" onClick={() => setConnectionCheckOpen(true)}>Details</button>}
    </div>
  </section>;
}

const time = (value: number | null) => value ? new Date(value).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : "Never";

/** Step-by-step connection check: internet, Tailscale, server, database. */
export function ConnectionCheck({ onServer }: { onServer: () => void }) {
  const connection = useConnection();
  const server = useServer();
  const pending = usePendingLogCount();
  const [sent, setSent] = useState<"sending" | "sent" | "failed" | null>(null);
  const close = () => setConnectionCheckOpen(false);
  useBackHandler(close);
  const { steps, network } = connection;
  const tailscaleText = !connection.tailscaleRequired ? "Not needed for this server"
    : network?.tailscaleInstalled === false ? "Not installed"
    : network?.tailscaleIp ? `On (${network.tailscaleIp})`
    : network?.vpn ? "Another VPN is on"
    : network?.vpn === false ? "Off"
    : steps.tailscale ? "On" : "Not checked in a browser";
  const send = async () => {
    setSent("sending");
    setSent(await uploadLogs() ? "sent" : "failed");
  };
  return <div className="screen">
    <header className="header">
      <div className="header-side"><button type="button" className="icon-button" aria-label="Go back" onClick={close}><Icon path={mdiArrowLeft} color={colors.ink} /></button></div>
      <h1 className="header-title">Connection</h1>
      <div className="header-side" />
    </header>
    <main className="scroll"><div className="form">
      <ConnectionBanner details={false} />
      <ol className="check-steps">
        <CheckStep label="Internet" value={steps.internet} text={steps.internet === false ? "No Wi-Fi or mobile data" : steps.internet ? "Connected" : "Not checked"} />
        <CheckStep label="Tailscale" value={connection.tailscaleRequired ? steps.tailscale : null} text={tailscaleText} />
        <CheckStep label="Server" value={steps.server} text={`${server ? describeServer(server) : "None chosen"}${steps.server === false ? ": not responding" : steps.server ? ": responding" : ""}`} />
        <CheckStep label="Database" value={steps.database} text={steps.database === false ? "Not responding" : steps.database ? "Ready" : "Not checked"} />
      </ol>
      <dl className="check-facts">
        <div><dt>Last connected</dt><dd>{time(connection.lastOk)}</dd></div>
        <div><dt>Last checked</dt><dd>{connection.checking ? "Checking…" : time(connection.checkedAt)}</dd></div>
        <div><dt>Device logs to upload</dt><dd>{pending}</dd></div>
      </dl>
      {sent === "sent" && <p className="check-note">Logs sent.</p>}
      {sent === "failed" && <p className="check-note bad">Could not send logs. They stay on this device and upload when the server answers.</p>}
      <div className="form-actions">
        <Button onClick={() => void checkConnection()} disabled={connection.checking}>{connection.checking ? "Checking…" : "Check again"}</Button>
        {canOpenTailscale && connection.tailscaleRequired && <Button variant="secondary" className="mt-12" onClick={() => void openTailscale()}>
          {network?.tailscaleInstalled === false ? "Install Tailscale" : "Open Tailscale"}
        </Button>}
        <Button variant="secondary" className="mt-12" onClick={() => { close(); onServer(); }}>Change server</Button>
        <Button variant="secondary" className="mt-12" onClick={() => void send()} disabled={!pending || sent === "sending" || connection.phase !== "ok"}>
          {sent === "sending" ? "Sending…" : "Send logs"}
        </Button>
      </div>
    </div></main>
  </div>;
}

function CheckStep({ label, value, text }: { label: string; value: Step; text: string }) {
  return <li className="check-step">
    <Icon path={value === true ? mdiCheckCircle : value === false ? mdiCloseCircle : mdiMinusCircleOutline} size={22}
      color={value === true ? colors.primary : value === false ? colors.danger : colors.muted} />
    <span className="check-step-text"><span className="check-step-label">{label}</span><span className="check-step-value">{text}</span></span>
  </li>;
}
