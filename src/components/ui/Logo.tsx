import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Временный знак: сложенная плоскость, угол 45°, 1px контур. TODO(client): заменить на финальный знак. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" width={28} height={28} fill="none" stroke="currentColor" strokeWidth={1} aria-hidden className={className}>
      <path d="M3.5 24.5V3.5h21" />
      <path d="M3.5 24.5L24.5 3.5" />
      <path d="M3.5 24.5h10.5L24.5 14V3.5" />
    </svg>
  );
}

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${site.name} — на главную`}
      className={cn("inline-flex items-center gap-3", className)}
    >
      <Mark className="shrink-0" />
      {/* У DachaPro капслок сидит высоко в строке — опускаем на 0.14em, чтобы центр букв совпал с центром знака */}
      <span className="t-logo translate-y-[0.14em]">{site.name}</span>
    </Link>
  );
}
