"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects, projectsSection } from "@/content/projects";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/utils";

/** Тёмная секция со слайдером кейсов: 3 видимые карточки, нативный scroll-snap + стрелки. */
export function Projects() {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: "smooth" });
  };

  const navBtn = "inline-flex size-12 items-center justify-center rounded-full border border-on-dark/30 transition-[opacity,background-color] hover:bg-on-dark/10 disabled:opacity-35";

  return (
    <SectionCard tone="espresso" aria-labelledby="projects-title">
      <SectionHeader
        id="projects-title"
        dark
        eyebrow={projectsSection.eyebrow}
        lines={projectsSection.lines}
        lead={projectsSection.lead}
        aside={
          <div className="flex items-center gap-6">
            <TextLink href="/projects" className="text-on-dark">
              {projectsSection.hubLink}
            </TextLink>
            <div className="hidden gap-2 md:flex">
              <button type="button" className={navBtn} onClick={() => scroll(-1)} disabled={edges.start} aria-label="Предыдущие объекты">
                <ArrowLeft size={18} />
              </button>
              <button type="button" className={navBtn} onClick={() => scroll(1)} disabled={edges.end} aria-label="Следующие объекты">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        }
      />

      <Reveal className="-mx-[var(--section-pad-x)] mt-12 lg:mt-16">
        <ul
          ref={track}
          onScroll={update}
          aria-label="Объекты"
          className="scrollbar-none flex snap-x snap-mandatory scroll-px-[var(--section-pad-x)] gap-4 overflow-x-auto px-[var(--section-pad-x)] pb-2"
        >
          {projects.map((p) => (
            <li key={p.slug} data-reveal="tilt" className={cn("w-[85%] shrink-0 snap-start sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-32px)/3)]")}>
              <ProjectCard project={p} dark />
            </li>
          ))}
        </ul>
      </Reveal>
    </SectionCard>
  );
}
