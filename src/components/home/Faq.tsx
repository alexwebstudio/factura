import { faq, faqSection } from "@/content/faq";
import { messengers } from "@/content/nav";
import { Accordion } from "@/components/ui/Accordion";
import { Icon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqJsonLd } from "@/lib/seo";

export function Faq() {
  return (
    <SectionCard tone="surface-2" aria-labelledby="faq-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 xl:col-span-4">
          <SectionHeader id="faq-title" eyebrow={faqSection.eyebrow} lines={faqSection.lines} lead={faqSection.lead} />
          <Reveal self delay={0.2} className="mt-8">
            <ul className="flex gap-2" aria-label="Мессенджеры">
              {messengers.slice(0, 2).map((m) => (
                <li key={m.label}>
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 text-[15px] font-medium transition-colors hover:bg-bg"
                  >
                    <Icon name={m.icon} size={18} />
                    {m.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal stagger={0.05} className="lg:col-span-7 xl:col-span-8">
          <Accordion items={faq.map((f, i) => ({ id: `q${i}`, title: f.q, content: <p>{f.a}</p> }))} defaultOpen="q0" />
        </Reveal>
      </div>
      <JsonLd data={faqJsonLd()} />
    </SectionCard>
  );
}
