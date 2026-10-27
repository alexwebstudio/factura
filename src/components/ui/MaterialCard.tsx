import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Material } from "@/content/materials";
import { cn } from "@/lib/utils";
import { ArrowButton } from "./ArrowButton";
import { Mono } from "./Mono";

/** Карточка материала: номер, фото 4:5, pill-подпись, одна строка применения, цена и срок службы. */
export function MaterialCard({ material: m, className }: { material: Material; className?: string }) {
  return (
    <Link href={`/materials/${m.slug}`} className={cn("group flex flex-col gap-4", className)}>
      <span className="relative block aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-surface">
        <Image
          src={m.image}
          alt={m.alt}
          fill
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 80vw"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
        />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/35 via-transparent to-ink/30" />
        <span aria-hidden className="t-index absolute left-5 top-4 text-on-dark lg:left-6 lg:top-5">
          {m.index}
        </span>
        <span className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 lg:inset-x-5 lg:bottom-5">
          <span className="inline-flex h-10 items-center rounded-full bg-surface/95 px-4 text-[15px] font-medium text-ink transition-transform duration-500 group-hover:-translate-y-0.5">
            {m.title}
          </span>
          <ArrowButton tone="glass" />
        </span>
      </span>
      <span className="flex flex-col gap-2 px-1">
        <span className="text-[15px] leading-snug">{m.short}</span>
        <Mono className="!text-[13px] text-ink-muted">
          {formatPrice(m.priceFrom)} · срок службы {m.lifespan}
        </Mono>
      </span>
    </Link>
  );
}
