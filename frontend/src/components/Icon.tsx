export default function Icon({ path, size = 24, color = "currentColor", label }: { path: string; size?: number; color?: string; label?: string }) {
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" role={label ? "img" : undefined}
    aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
    <path d={path} fill={color} />
  </svg>;
}
