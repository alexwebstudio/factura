import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionTone = "surface" | "surface-2" | "espresso" | "bg";

const tones: Record<SectionTone, string> = {
  surface: "bg-surface text-ink",
  "surface-2": "bg-surface-2 text-ink",
  espresso: "bg-espresso text-on-dark on-dark",
  bg: "bg-bg text-ink",
};

type Props = Omit<ComponentProps<"section">, "children"> & {
  tone?: SectionTone;
  children: ReactNode;
  /** Убрать внутренние отступы (для фотокарточек на всю секцию). */
  flush?: boolean;
  innerClassName?: string;
};

export function SectionCard({ tone = "surface", flush, className, innerClassName, children, ...rest }: Props) {
  return (
    <section
      data-tone={tone === "espresso" ? "dark" : "light"}
      className={cn("section-card", tones[tone], flush && "!p-0", className)}
      {...rest}
    >
      <div className={cn(!flush && "container-x", innerClassName)}>{children}</div>
    </section>
  );
}
