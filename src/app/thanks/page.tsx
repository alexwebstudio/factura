import type { Metadata } from "next";
import { thanks } from "@/content/pages";
import { messengers } from "@/content/nav";
import { ButtonLink } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Заявка принята",
  description: "Спасибо за заявку — перезвоним и договоримся о замере.",
  path: "/thanks",
  noindex: true,
});

export default function ThanksPage() {
  return (
    <SectionCard tone="surface" className="flex min-h-[calc(100svh-24px)] items-center !pt-[calc(var(--header-h)+48px)]" innerClassName="w-full">
      <Heading level="h1" lines={thanks.lines} cascade instant className="!text-[clamp(56px,9vw,140px)]" />
      <Reveal self instant delay={0.35} className="mt-8 max-w-lg text-[17px] text-ink-muted lg:text-[19px]">
        <p>{thanks.text}</p>
      </Reveal>
      <Reveal self instant delay={0.45} className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">{thanks.back}</ButtonLink>
        <ButtonLink href="/projects" variant="ghost">
          {thanks.projects}
        </ButtonLink>
        {messengers.slice(0, 2).map((m) => (
          <ButtonLink key={m.label} href={m.href} variant="ghost">
            <Icon name={m.icon} size={18} /> {m.label}
          </ButtonLink>
        ))}
      </Reveal>
    </SectionCard>
  );
}
