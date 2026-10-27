import { messengers } from "@/content/nav";
import { LeadButton } from "@/components/forms/LeadButton";
import { Heading } from "./Heading";
import { Icon } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionCard } from "./SectionCard";

type Props = {
  lines?: readonly string[];
  text?: string;
  button?: string;
  source: string;
};

/** Сквозной CTA-блок перед футером внутренних страниц. */
export function CtaBand({
  lines = ["Нужен *похожий*", "фасад?"],
  text = "Выедем на замер, сделаем расчёт и фикс-смету — до начала работ.",
  button = "Обсудить проект →",
  source,
}: Props) {
  return (
    <SectionCard tone="espresso" aria-label="Заявка на расчёт">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Heading lines={lines} cascade />
          <Reveal self delay={0.15} className="mt-6 max-w-lg text-[17px] text-on-dark-muted">
            <p>{text}</p>
          </Reveal>
        </div>
        <Reveal self delay={0.2} className="flex flex-col items-start gap-5 lg:items-end">
          <LeadButton source={source} variant="light" size="lg">
            {button}
          </LeadButton>
          <ul className="flex gap-2" aria-label="Мессенджеры">
            {messengers.slice(0, 2).map((m) => (
              <li key={m.label}>
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-on-dark/30 px-4 text-[14px] font-medium transition-colors hover:bg-on-dark/10"
                >
                  <Icon name={m.icon} size={17} />
                  {m.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </SectionCard>
  );
}
