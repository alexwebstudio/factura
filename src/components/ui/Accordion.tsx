"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Plus } from "./Icons";

export type AccordionItem = { id: string; title: ReactNode; content: ReactNode };

type Props = {
  items: AccordionItem[];
  defaultOpen?: string | null;
  className?: string;
  /** Несколько панелей одновременно. */
  multiple?: boolean;
};

/** Аккордеон на хэйрлайнах: плавное раскрытие по высоте (grid 0fr → 1fr), «+» → «×». */
export function Accordion({ items, defaultOpen = null, multiple, className }: Props) {
  const [open, setOpen] = useState<string[]>(defaultOpen ? [defaultOpen] : []);
  const uid = useId();

  const toggle = (id: string) =>
    setOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : multiple ? [...prev, id] : [id]));

  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const btnId = `${uid}-${item.id}-btn`;
        const panelId = `${uid}-${item.id}-panel`;
        return (
          <div key={item.id} className="border-b border-line" data-reveal>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left lg:py-7"
              >
                <span className="text-[18px] font-medium leading-snug lg:text-[20px]">{item.title}</span>
                <span
                  aria-hidden
                  className={cn(
                    "inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line transition-[transform,background-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:bg-surface-2",
                    isOpen && "rotate-45",
                  )}
                >
                  <Plus size={18} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
              inert={!isOpen}
            >
              <div className="overflow-hidden">
                <div className="max-w-3xl pb-7 pr-14 text-ink-muted">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
