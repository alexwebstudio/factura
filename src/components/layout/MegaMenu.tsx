"use client";

import Image from "next/image";
import Link from "next/link";
import { megaMenu } from "@/content/nav";
import { materials } from "@/content/materials";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Mono } from "@/components/ui/Mono";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  open: boolean;
  onNavigate: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
};

/** Панель «Материалы»: слева описание и выход на хаб, справа 3×2 миниатюры. */
export function MegaMenu({ id, open, onNavigate, onPointerEnter, onPointerLeave }: Props) {
  return (
    <div
      id={id}
      inert={!open}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={cn(
        "absolute inset-x-0 top-full pt-2 duration-[280ms] ease-[cubic-bezier(.22,1,.36,1)]",
        open
          ? "visible translate-y-0 opacity-100 transition-[opacity,transform]"
          : "invisible -translate-y-3 opacity-0 transition-[opacity,transform,visibility]",
      )}
    >
      <div className="grid grid-cols-[minmax(220px,1fr)_3fr] gap-8 rounded-[28px] border border-line bg-surface p-6 text-ink xl:p-8">
        <div className="flex flex-col justify-between gap-6 border-r border-line pr-8">
          <div>
            <p className="t-eyebrow mb-4">{megaMenu.title}</p>
            <p className="text-[15px] leading-relaxed text-ink-muted">{megaMenu.text}</p>
          </div>
          <Link href="/materials" onClick={onNavigate} className="link-underline self-start pb-1 text-[15px] font-medium">
            {megaMenu.hubLabel}
          </Link>
        </div>
        <ul className="grid grid-cols-3 gap-x-5 gap-y-6">
          {materials.map((m) => (
            <li key={m.slug}>
              <Link href={`/materials/${m.slug}`} onClick={onNavigate} className="group flex flex-col gap-3">
                <span className="relative block aspect-[4/3] overflow-hidden rounded-[14px] bg-surface-2">
                  <Image
                    src={m.image}
                    alt=""
                    fill
                    sizes="(min-width: 1536px) 300px, 22vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
                  />
                </span>
                <span className="flex items-center justify-between gap-3">
                  <span className="flex flex-col gap-1">
                    <span className="text-[15px] font-medium leading-tight">{m.title}</span>
                    <Mono className="!text-[12px] text-ink-muted">срок службы {m.lifespan}</Mono>
                  </span>
                  <ArrowButton size="sm" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
