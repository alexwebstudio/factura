import { cta } from "@/content/site";
import { messengers } from "@/content/nav";
import { LeadForm } from "@/components/forms/LeadForm";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icons";
import { Mono } from "@/components/ui/Mono";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";

/** Крупная тёмная карточка: слева форма, справа — что будет после заявки. */
export function CtaForm({ source = "Форма внизу страницы", id = "request" }: { source?: string; id?: string }) {
  return (
    <SectionCard tone="espresso" id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 lg:!py-24">
      <Heading id={`${id}-title`} lines={cta.lines} cascade />
      <Reveal self delay={0.15} className="mt-6 max-w-xl text-[17px] text-on-dark-muted">
        <p>{cta.subtitle}</p>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
        <Reveal self className="lg:col-span-7">
          <LeadForm dark source={source} />
        </Reveal>

        <Reveal className="lg:col-span-4 lg:col-start-9">
          <p data-reveal className="t-eyebrow mb-6 !text-on-dark-muted">
            После заявки
          </p>
          <ol className="border-t border-on-dark/15">
            {cta.after.map((step, i) => (
              <li key={step.text} data-reveal className="flex gap-5 border-b border-on-dark/15 py-5">
                <Mono className="w-6 shrink-0 !text-[13px] text-on-dark/55">{String(i + 1).padStart(2, "0")}</Mono>
                <span className="flex-1 text-[16px]">{step.text}</span>
                <Mono className="shrink-0 !text-[13px] text-on-dark/75">{step.term}</Mono>
              </li>
            ))}
          </ol>
          <div data-reveal className="mt-8">
            <p className="mb-4 text-[15px] text-on-dark-muted">{cta.messengersNote}</p>
            <ul className="flex flex-wrap gap-2" aria-label="Мессенджеры">
              {messengers.slice(0, 2).map((m) => (
                <li key={m.label}>
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-on-dark/30 px-5 text-[15px] font-medium transition-colors hover:bg-on-dark/10"
                  >
                    <Icon name={m.icon} size={18} />
                    {m.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </SectionCard>
  );
}
