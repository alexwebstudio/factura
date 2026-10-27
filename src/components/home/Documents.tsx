import { documents, documentsSection } from "@/content/documents";
import { Icon, type IconName } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Documents({ id }: { id?: string }) {
  return (
    <SectionCard tone="surface" id={id} aria-labelledby="docs-title" className="scroll-mt-24">
      <SectionHeader id="docs-title" eyebrow={documentsSection.eyebrow} lines={documentsSection.lines} lead={documentsSection.lead} />

      <Reveal as="ul" className="hair-grid mt-12 grid-cols-1 md:grid-cols-2 lg:mt-16">
        {documents.map((d) => (
          <li key={d.title} data-reveal className="flex gap-5 bg-surface py-8 md:px-8 md:[&:nth-child(odd)]:pl-0 md:[&:nth-child(even)]:pr-0 lg:py-10">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line">
              <Icon name={d.icon as IconName} size={22} />
            </span>
            <span>
              <h3 className="t-h3">{d.title}</h3>
              <p className="mt-2 text-[15px] text-ink-muted">{d.text}</p>
            </span>
          </li>
        ))}
      </Reveal>

      <Reveal self className="mt-10 text-center lg:mt-14">
        <p className="text-[17px]">{documentsSection.caption}</p>
      </Reveal>
    </SectionCard>
  );
}
