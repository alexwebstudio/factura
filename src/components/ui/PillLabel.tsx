import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PillLabel({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "outline" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-9 items-center rounded-full px-4 text-[14px] font-medium leading-none",
        tone === "light" && "bg-surface/95 text-ink",
        tone === "outline" && "border border-line text-ink",
        tone === "dark" && "bg-espresso text-on-dark",
        className,
      )}
    >
      {children}
    </span>
  );
}
