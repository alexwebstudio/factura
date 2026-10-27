import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { messengers } from "@/content/nav";
import { site } from "@/content/site";
import { CtaForm } from "@/components/home/CtaForm";
import { Icon, type IconName } from "@/components/ui/Icons";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { buildMetadata } from "@/lib/seo";

const p = pages.contacts;

export const metadata: Metadata = buildMetadata({ title: p.title, description: p.description, path: "/contacts" });

const items: { icon: IconName; label: string; value: string; href?: string; mono?: boolean }[] = [
  { icon: "phone", label: "Телефон", value: site.contacts.phone, href: site.contacts.phoneHref, mono: true },
  { icon: "mail", label: "Почта", value: site.contacts.email, href: `mailto:${site.contacts.email}` },
  { icon: "pin", label: "Адрес", value: site.contacts.address },
  { icon: "clock", label: "Режим работы", value: site.contacts.hours, mono: true },
];

export default function ContactsPage() {
  return (
    <>
      <PageHero eyebrow={p.eyebrow} lines={p.lines} lead={p.lead} image={p.image} alt={p.alt} crumbs={[{ name: "Контакты", path: "/contacts" }]} />

      <SectionCard tone="surface" aria-label="Контактные данные">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal as="ul" className="hair-grid sm:grid-cols-2 lg:col-span-7">
            {items.map((it) => (
              <li key={it.label} data-reveal className="flex gap-4 bg-surface py-7 sm:px-6 sm:[&:nth-child(odd)]:pl-0">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line">
                  <Icon name={it.icon} size={20} />
                </span>
                <span className="min-w-0">
                  <span className="t-caption block text-ink-muted">{it.label}</span>
                  {it.href ? (
                    <a href={it.href} className={`link-underline mt-1.5 inline-block break-all pb-0.5 ${it.mono ? "t-mono !text-[16px]" : "text-[16px]"}`}>
                      {it.value}
                    </a>
                  ) : (
                    <span className={`mt-1.5 block ${it.mono ? "t-mono !text-[15px]" : "text-[16px]"}`}>{it.value}</span>
                  )}
                </span>
              </li>
            ))}
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9">
            <p data-reveal className="t-eyebrow mb-5">
              Мессенджеры
            </p>
            <ul data-reveal className="flex flex-col gap-2">
              {messengers.map((m) => (
                <li key={m.label}>
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-14 items-center justify-between rounded-full border border-line px-6 text-[15px] font-medium transition-colors hover:bg-surface-2"
                  >
                    <span className="flex items-center gap-3">
                      <Icon name={m.icon} size={20} />
                      {m.label}
                    </span>
                    <span aria-hidden className="transition-transform duration-500 group-hover:-rotate-45">→</span>
                  </a>
                </li>
              ))}
            </ul>
            <p data-reveal className="mt-6 text-[15px] text-ink-muted">
              {site.regions}.
            </p>
          </Reveal>
        </div>
      </SectionCard>

      <CtaForm source="Страница контактов" id="contact-form" />

      <section aria-label="Карта" className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-section)] bg-surface-2 sm:aspect-[16/9] lg:aspect-[21/8]">
        <MapEmbed src={site.mapEmbedUrl} title={`Карта: ${site.contacts.address}`} />
      </section>
    </>
  );
}
