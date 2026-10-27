"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type FocusEvent } from "react";
import { mainNav } from "@/content/nav";
import { useLeadModal } from "@/components/forms/LeadModal";
import { Logo } from "@/components/ui/Logo";
import { useHideOnScroll, useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

const CLOSE_DELAY = 150;

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled(24);
  const scrollHidden = useHideOnScroll(160);
  const { open: openLead } = useLeadModal();
  const [megaOpen, setMegaOpen] = useState(false);
  const [megaArmed, setMegaArmed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const megaId = useId();
  const menuId = useId();

  const openMega = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setMegaArmed(true);
    setMegaOpen(true);
  }, []);
  const closeMega = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setMegaOpen(false);
  }, []);
  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), CLOSE_DELAY);
  }, []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Смена страницы закрывает всё.
  useEffect(() => {
    closeMega();
    setMenuOpen(false);
  }, [pathname, closeMega]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMega();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [megaOpen, closeMega]);

  // Tab за пределы триггера и панели — закрыть.
  const onMegaBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeMega();
  };

  const solid = scrolled || megaOpen || menuOpen;
  const capsule = scrolled && !menuOpen;
  // Вниз — шапка уезжает, вверх — возвращается (та же подача, что у интро героя: .motion-reveal)
  const hidden = scrollHidden && !megaOpen && !menuOpen;

  return (
    <>
      <header
        className="site-header motion-reveal fixed inset-x-0 top-0 z-50 px-[var(--page-gutter)] pt-[var(--page-gutter)]"
        data-solid={solid}
        data-hidden={hidden}
      >
        <div
          onBlur={onMegaBlur}
          className={cn(
            "relative mx-auto transition-[max-width,margin,transform] duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)]",
            capsule ? "max-w-[min(1320px,calc(100%-8px))] lg:max-w-[min(1320px,calc(100%-48px))]" : "max-w-full",
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between gap-6 border text-[var(--hdr-fg)] transition-[height,padding,background-color,border-color,border-radius,backdrop-filter] duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)]",
              capsule
                ? "h-14 rounded-full border-line bg-surface/80 pl-5 pr-2 backdrop-blur-[16px] lg:h-16 lg:pl-6"
                : megaOpen
                  ? "h-[var(--header-h)] rounded-[24px] border-line bg-surface px-5 lg:px-8"
                  : "h-[var(--header-h)] rounded-[24px] border-transparent bg-transparent px-[max(var(--section-pad-x),calc((100%-1560px)/2))]",
            )}
          >
            <Logo />

            <nav aria-label="Основное меню" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {mainNav.map((item) => {
                  const active = pathname.startsWith(item.href);
                  if (item.mega) {
                    return (
                      <li key={item.href} onPointerEnter={openMega} onPointerLeave={scheduleClose}>
                        <button
                          ref={triggerRef}
                          type="button"
                          aria-expanded={megaOpen}
                          aria-controls={megaId}
                          onClick={() => (megaOpen ? closeMega() : openMega())}
                          className={cn(
                            "inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[15px] font-medium transition-opacity hover:opacity-70",
                            active && "underline decoration-1 underline-offset-[6px]",
                          )}
                        >
                          {item.label}
                          <svg
                            aria-hidden
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            className={cn("transition-transform duration-300", megaOpen && "rotate-180")}
                          >
                            <path d="M1.5 3.5L5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                          </svg>
                        </button>
                      </li>
                    );
                  }
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "inline-flex h-10 items-center rounded-full px-4 text-[15px] font-medium transition-opacity hover:opacity-70",
                          active && "underline decoration-1 underline-offset-[6px]",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openLead("Шапка")}
                aria-haspopup="dialog"
                className="hidden h-12 items-center gap-2 whitespace-nowrap rounded-full bg-espresso px-6 text-[15px] font-medium text-on-dark transition-colors duration-300 hover:bg-espresso-2 lg:inline-flex"
              >
                Рассчитать проект <span aria-hidden>→</span>
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-controls={menuId}
                aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                className="relative inline-flex size-12 items-center justify-center rounded-full lg:hidden"
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute h-px w-6 bg-current transition-transform duration-300",
                    menuOpen ? "rotate-45" : "-translate-y-[4px]",
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "absolute h-px w-6 bg-current transition-transform duration-300",
                    menuOpen ? "-rotate-45" : "translate-y-[4px]",
                  )}
                />
              </button>
            </div>
          </div>

          {megaArmed && (
            <MegaMenu id={megaId} open={megaOpen} onNavigate={closeMega} onPointerEnter={openMega} onPointerLeave={scheduleClose} />
          )}
        </div>
      </header>

      <MobileMenu id={menuId} open={menuOpen} onClose={closeMenu} />
    </>
  );
}
