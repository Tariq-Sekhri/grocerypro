import { ReactNode } from "react";
import { mdiArrowLeft } from "@mdi/js";
import Icon from "./Icon";
import { colors } from "../theme";
import { useGoBack } from "../lib/navigation";
import { useSession } from "../lib/profile";
import { ConnectionBanner } from "./Connection";

/**
 * Screen frame: a header with back/title/profile, a scrolling body and an
 * optional fixed footer. `back` is the path used when there is no history.
 */
export default function Page({ title, back, footer, children, wide = true, rightAction, headerClassName = "" }: {
  title: string; back?: string; footer?: ReactNode; children: ReactNode; wide?: boolean; rightAction?: ReactNode; headerClassName?: string;
}) {
  const goBack = useGoBack();
  const session = useSession();
  return <div className="screen">
    <header className={`header ${headerClassName}`}>
      <div className="header-side">
        {back !== undefined && <button type="button" className="icon-button" aria-label="Go back" onClick={() => goBack(back)}>
          <Icon path={mdiArrowLeft} color={colors.ink} />
        </button>}
      </div>
      <h1 className="header-title">{title}</h1>
      <div className="header-side header-right">
        {rightAction}
        {session && <button type="button" className="profile-chip" aria-label={`Switch profile, currently ${session.profile.name}`} onClick={session.switchProfile}>
          {session.profile.name}
        </button>}
      </div>
    </header>
    <ConnectionBanner />
    <main className="scroll"><div className={wide ? "page" : "form"}>{children}</div></main>
    {footer && <footer className="footer"><div className="page footer-inner">{footer}</div></footer>}
  </div>;
}
