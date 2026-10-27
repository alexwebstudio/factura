import { cn } from "@/lib/utils";
import { ArrowRight } from "./Icons";

type Props = {
  tone?: "light" | "dark" | "glass";
  size?: "sm" | "md";
  /** Направление в покое; при ховере группы стрелка поворачивается на 45°. */
  diagonal?: boolean;
  className?: string;
};

const tones = {
  light: "border-line text-ink bg-surface",
  dark: "border-on-dark/35 text-on-dark",
  glass: "border-on-dark/40 text-on-dark bg-ink/30",
};

/** Декоративный круг со стрелкой. Кликабельна вся карточка-ссылка вокруг. */
export function ArrowButton({ tone = "light", size = "md", diagonal, className }: Props) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border",
        size === "md" ? "size-11 lg:size-12" : "size-10",
        tones[tone],
        className,
      )}
    >
      <ArrowRight
        size={18}
        className={cn(
          "transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
          diagonal
            ? "-rotate-45 group-hover:rotate-0 group-focus-visible:rotate-0"
            : "group-hover:-rotate-45 group-focus-visible:-rotate-45",
        )}
      />
    </span>
  );
}
