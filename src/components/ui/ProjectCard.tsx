import Image from "next/image";
import Link from "next/link";
import { formatArea, projectAlt, projectStatuses, projectTypes, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { ArrowButton } from "./ArrowButton";
import { Mono } from "./Mono";

type Props = { project: Project; dark?: boolean; className?: string; sizes?: string };

export function ProjectCard({ project: p, dark, className, sizes = "(min-width: 1024px) 31vw, 85vw" }: Props) {
  const meta = [p.city, formatArea(p.area), p.materialLabel, p.year ? String(p.year) : null].filter(Boolean);
  return (
    <Link href={`/projects/${p.slug}`} className={cn("group flex flex-col gap-5", className)}>
      <span className="relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-ink/10">
        <Image
          src={p.image}
          alt={projectAlt(p)}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 inline-flex h-8 items-center gap-2 rounded-full bg-surface/95 px-3 text-[13px] font-medium text-ink">
          <span aria-hidden className={cn("size-1.5 rounded-full", p.status === "done" ? "bg-espresso" : "border border-espresso")} />
          {projectStatuses[p.status].label}
        </span>
        <ArrowButton tone="glass" className="absolute bottom-4 right-4" />
      </span>
      <span className="flex flex-col gap-2 px-1">
        <span className={cn("t-caption", dark ? "text-on-dark-muted" : "text-ink-muted")}>{projectTypes[p.type].label}</span>
        <span className="text-[19px] font-medium leading-snug transition-transform duration-500 group-hover:-translate-y-0.5 lg:text-[21px]">
          {p.title}
        </span>
        <Mono className={cn("!text-[13px]", dark ? "text-on-dark/75" : "text-ink-muted")}>{meta.join(" · ")}</Mono>
      </span>
    </Link>
  );
}
