import Image from "next/image";
import Link from "next/link";
import { trust } from "@/content/site";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Counter } from "@/components/ui/Counter";
import { Icon, type IconName } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function TrustBento() {
  return (
    <SectionCard tone="surface" aria-labelledby="trust-title" id="advantages">
      <SectionHeader id="trust-title" eyebrow={trust.eyebrow} lines={trust.lines} lead={trust.lead} />

      <Reveal className="mt-12 grid gap-3 md:grid-cols-2 lg:mt-16 lg:gap-4 xl:grid-cols-3 [&>*]:min-w-0">
        {/* 1 — тёмная карточка с цифрой */}
        <Link
          href={trust.years.href}
          data-reveal="tilt"
          className="group card relative flex min-h-[260px] flex-col justify-between overflow-hidden bg-gradient-to-br from-espresso-2 to-espresso p-7 text-on-dark lg:min-h-[320px] lg:p-8"
        >
          <div>
            <p className="flex items-baseline gap-3">
              <Counter value={trust.years.value} className="t-stat" />
              <span className="font-display text-[clamp(40px,4vw,64px)] font-[200] leading-none">{trust.years.unit}</span>
            </p>
            <p className="mt-4 max-w-[16rem] text-[15px] text-on-dark/80">{trust.years.caption}</p>
          </div>
          <ArrowButton tone="dark" />
        </Link>

        {/* 2 — две светлые карточки */}
        <div className="grid gap-3 lg:gap-4" data-reveal="tilt">
          {trust.features.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="group card flex min-h-[124px] items-center gap-5 border border-line bg-surface p-5 transition-colors hover:bg-surface-2 lg:p-6"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-2 text-ink group-hover:bg-surface">
                <Icon name={f.icon as IconName} size={22} />
              </span>
              <span className="flex-1 text-[16px] font-medium leading-snug lg:text-[17px]">{f.title}</span>
              <ArrowButton size="sm" />
            </Link>
          ))}
        </div>

        {/* 3 — тёмная фотокарточка */}
        <Link
          href={trust.projects.href}
          data-reveal="tilt"
          className="group card relative isolate flex min-h-[260px] flex-col justify-between overflow-hidden p-7 text-on-dark md:col-span-2 lg:min-h-[320px] lg:p-8 xl:col-span-1"
        >
          <Image
            src={trust.projects.image}
            alt={trust.projects.alt}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="-z-20 object-cover transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
          />
          <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/35 to-ink/60" />
          <div>
            <Counter value={trust.projects.value} className="t-stat" />
            <p className="mt-4 max-w-[14rem] text-[15px] text-on-dark/85">{trust.projects.caption}</p>
          </div>
          <ArrowButton tone="glass" />
        </Link>
      </Reveal>
    </SectionCard>
  );
}
