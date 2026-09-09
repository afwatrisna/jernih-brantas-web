"use client";

type IconProps = {
  name: string;
  className?: string;
};

const ICONS: Record<string, string> = {
  water: "💧",
  check: "✓",
  alert: "⚠",
  database: "🗄️",
  field: "📋",
  chart: "📈",
  settings: "⚙",
  restart: "↺",
};

export function Icon({ name, className }: IconProps) {
  return (
    <span className={className ? `icon ${className}` : "icon"} aria-hidden="true">
      {ICONS[name] ?? "•"}
    </span>
  );
}
