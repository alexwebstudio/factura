import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  lines: readonly string[];
  lead?: string;
  cascade?: boolean;
  level?: "h1" | "h2";
  /** Ссылка-выход или кнопка справа от заголовка. */
  aside?: ReactNode;
  id?: string;
  className?: string;
  dark?: boolean;
};

/** Заголовочный паттерн: eyebrow → заголовок с курсивным акцентом → подводка; справа — выход на хаб. */
export function SectionHeader({ eyebrow, lines, lead, cascade = true, level = "h2", aside, id, className, dark }: Props) {
  return (
    <header className={cn("flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12", className)}>
      <div className="min-w-0 lg:max-w-[64rem]">
        {eyebrow && (
          <Reveal self as="div" className={cn("t-eyebrow mb-5 lg:mb-7", dark && "!text-on-dark-muted")}>
            {eyebrow}
          </Reveal>
        )}
        <Heading lines={lines} level={level} cascade={cascade} id={id} />
        {lead && (
          <Reveal self delay={0.15} className={cn("mt-6 max-w-xl text-[16px] lg:mt-8 lg:text-[17px]", dark ? "text-on-dark-muted" : "text-ink-muted")}>
            <p>{lead}</p>
          </Reveal>
        )}
      </div>
      {aside && (
        <Reveal self delay={0.2} className="shrink-0">
          {aside}
        </Reveal>
      )}
    </header>
  );
}
