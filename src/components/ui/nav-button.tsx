"use client";

import { Icon } from "./icon";

type NavButtonProps = {
  label: string;
  icon: string;
  active?: boolean;
  onClick?: () => void;
};

export function NavButton({ label, icon, active, onClick }: NavButtonProps) {
  return (
    <button
      type="button"
      className={`nav-button${active ? " is-active" : ""}`}
      onClick={onClick}
    >
      <Icon name={icon} />
      <span>{label}</span>
    </button>
  );
}
