"use client";

type StatusBadgeProps = {
  insight: { severity: string; label: string };
  compact?: boolean;
};

export function StatusBadge({ insight, compact }: StatusBadgeProps) {
  const extreme = insight.label.includes("Ekstrem");
  return (
    <span
      className={`status-badge severity-${insight.severity}${compact ? " compact" : ""}${extreme ? " is-extreme" : ""}`}
    >
      <i />
      {insight.label}
    </span>
  );
}
