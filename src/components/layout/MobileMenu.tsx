"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { messengers, mobileNav } from "@/content/nav";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icons";
import { useLeadModal } from "@/components/forms/LeadModal";
import { Button } from "@/components/ui/Button";
import { useLockBody } from "@/hooks/useLockBody";
import { cn } from "@/lib/utils";

type Props = { id: string; open: boolean; onClose: () => void };

/** Полноэкранный оверлей: пункты крупным Display, снизу телефон, мессенджеры и расчёт. */
export function MobileMenu({ id, open, onClose }: Props) {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const { open: openLead } = useLeadModal();
  useLockBody(open);

  useEffect(() => {
    const root = document.getElementById("page-root");
    if (!open) return;
    root?.setAttribute("inert", "");
    const t = window.setTimeout(() => listRef.current?.querySelector("a")?.focus({ preventScroll: true }), 60);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      root?.removeAttribute("inert");
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      // Фокус из закрытого меню возвращаем на бургер
      if (document.getElementById(id)?.contains(document.activeElement) || document.activeElement === document.body) {
        document.querySelector<HTMLElement>(`[aria-controls="${CSS.escape(id)}"]`)?.focus({ preventScroll: true });
      }
    };
  }, [open, onClose, id]);

  return (
    <div
      id={id}
      inert={!open}
      data-lenis-prevent
      className={cn(
        "fixed inset-0 z-40 flex flex-col overflow-y-auto bg-bg px-[var(--page-gutter)] pb-6 pt-[calc(var(--header-h)+32px)] duration-300 lg:hidden",
        // visibility включается сразу (иначе фокус не попадёт в меню), выключается после fade
        open ? "visible opacity-100 transition-opacity" : "invisible opacity-0 transition-[opacity,visibility]",
      )}
    >
      <nav aria-label="Меню" className="flex-1 px-3">
        <ul ref={listRef} className="flex flex-col">
          {mobileNav.map((item, i) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li
                key={item.href}
                className={cn(
                  "border-b border-line transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                  open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
                )}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className="flex items-baseline justify-between py-3"
                >
                  <span className={cn("font-display text-[40px] font-[200] leading-[1.15]", active && "italic")}>{item.label}</span>
                  <span className="t-mono text-[12px] text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className={cn(
          "mt-10 flex flex-col gap-5 px-3 transition-opacity delay-300 duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
      >
        <a href={site.contacts.phoneHref} className="t-mono !text-[18px]">
          {site.contacts.phone}
        </a>
        <ul className="flex gap-2" aria-label="Мессенджеры">
          {messengers.map((m) => (
            <li key={m.label}>
              <a
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={m.label}
                className="inline-flex size-12 items-center justify-center rounded-full border border-line transition-colors hover:bg-surface"
              >
                <Icon name={m.icon} size={20} />
              </a>
            </li>
          ))}
        </ul>
        <Button
          size="lg"
          className="w-full"
          onClick={() => {
            onClose();
            openLead("Мобильное меню");
          }}
        >
          Рассчитать проект →
        </Button>
      </div>
    </div>
  );
}
