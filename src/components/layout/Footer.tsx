import Link from "next/link";
import { footerNav, messengers } from "@/content/nav";
import { site } from "@/content/site";
import { ArrowRight, Icon } from "@/components/ui/Icons";
import { Mono } from "@/components/ui/Mono";

export function Footer() {
  return (
    <footer className="px-[var(--page-gutter)] pb-[var(--page-gutter)] pt-[var(--stack-gap)]">
      <div className="section-card bg-surface !pb-0">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="t-caption mb-4 text-ink-muted">{site.descriptor}</p>
              <p className="max-w-sm text-[17px] leading-relaxed">
                {site.slogan}. Проектируем, производим и монтируем навесные фасады {site.cityIn} и по Казахстану.
              </p>
            </div>

            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
                <p className="t-eyebrow mb-5">{col.title}</p>
                <ul className="flex flex-col gap-3">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="link-underline pb-0.5 text-[15px]">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <address className="not-italic lg:col-span-3">
              <p className="t-eyebrow mb-5">Контакты</p>
              <ul className="flex flex-col gap-3 text-[15px]">
                <li>
                  <a href={site.contacts.phoneHref} className="t-mono link-underline !text-[16px]">
                    {site.contacts.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.contacts.email}`} className="link-underline">
                    {site.contacts.email}
                  </a>
                </li>
                <li className="text-ink-muted">{site.contacts.address}</li>
              </ul>
              <ul className="mt-6 flex gap-2" aria-label="Мессенджеры">
                {messengers.map((m) => (
                  <li key={m.label}>
                    <a
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={m.label}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-line transition-colors hover:bg-surface-2"
                    >
                      <Icon name={m.icon} size={19} />
                    </a>
                  </li>
                ))}
              </ul>
            </address>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-line py-6 text-[13px] text-ink-muted md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-8">
            <p>
              © {new Date().getFullYear()} {site.name} · <Mono className="!text-[12px]">{site.legal.bin}</Mono>
            </p>
            <Link href="/privacy" className="link-underline self-start pb-0.5">
              Политика конфиденциальности
            </Link>
            <a
              href="https://aw-flow.alexwebstudio.ru"
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-1.5 self-start text-ink transition-opacity hover:opacity-70"
            >
              Анимации <span className="font-medium">aw-flow</span>
              <ArrowRight
                size={14}
                className="-rotate-45 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="https://alexwebstudio.ru"
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-1.5 self-start text-ink transition-opacity hover:opacity-70"
            >
              Разработано <span className="font-medium">alexwebstudio</span>
              <ArrowRight
                size={14}
                className="-rotate-45 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          {/* Подвал-вордмарк: обрезан по нижней линии, с акцентной точкой */}
          <div aria-hidden className="-mx-1 select-none overflow-hidden">
            <p className="whitespace-nowrap font-display text-[clamp(64px,15.2vw,272px)] font-[200] leading-[0.74] tracking-[0.02em] text-ink">
              {site.name}
              <span className="text-espresso-2">.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
