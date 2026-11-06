import { mdiAccountGroup } from "@mdi/js";
import Icon from "./Icon";
import { colors } from "../theme";

const avatarColors = ["#A8D5AE", "#90BCE8", "#D0AAE8", "#EAAEBB", "#E9B580", "#86D4C7"];

/** A stable color per name, so a profile looks the same on every device. */
function avatarColor(name: string, shared: boolean) {
  if (shared) return avatarColors[avatarColors.length - 1];
  let hash = 0;
  for (const char of name.toLocaleLowerCase()) hash = (hash * 31 + char.codePointAt(0)!) >>> 0;
  return avatarColors[hash % avatarColors.length];
}

/** Shared profiles (role "shared") show a group icon. */
export default function ProfileAvatar({ name, shared = false, small = false }: { name: string; shared?: boolean; small?: boolean }) {
  return <span className={`avatar${small ? " avatar-small" : ""}`} style={{ backgroundColor: avatarColor(name, shared) }}>
    {shared ? <Icon path={mdiAccountGroup} size={small ? 17 : 56} color={colors.background} /> : <>
      <span className="avatar-initial">{name.slice(0, 1).toUpperCase()}</span>
      <span className="avatar-smile" />
    </>}
  </span>;
}
