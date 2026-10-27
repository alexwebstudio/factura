import { notFound as text } from "@/content/pages";
import { ButtonLink } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Mono } from "@/components/ui/Mono";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";

export default function NotFound() {
  return (
    <SectionCard tone="surface" className="flex min-h-[calc(100svh-24px)] items-center !pt-[calc(var(--header-h)+48px)]" innerClassName="w-full">
      <Mono className="!text-[13px] text-ink-muted">404</Mono>
      <Heading level="h1" lines={text.lines} cascade instant className="mt-6 !text-[clamp(56px,9vw,140px)]" />
      <Reveal self instant delay={0.35} className="mt-8 max-w-lg text-[17px] text-ink-muted">
        <p>{text.text}</p>
      </Reveal>
      <Reveal self instant delay={0.45} className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">На главную</ButtonLink>
        <ButtonLink href="/materials" variant="ghost">
          Материалы
        </ButtonLink>
      </Reveal>
    </SectionCard>
  );
}
