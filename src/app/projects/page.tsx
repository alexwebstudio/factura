import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionCard } from "@/components/ui/SectionCard";
import { buildMetadata } from "@/lib/seo";

const p = pages.projects;

export const metadata: Metadata = buildMetadata({ title: p.title, description: p.description, path: "/projects" });

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow={p.eyebrow} lines={p.lines} lead={p.lead} image={p.image} alt={p.alt} crumbs={[{ name: "Объекты", path: "/projects" }]} />
      <SectionCard tone="surface" aria-label="Каталог объектов">
        <ProjectsExplorer />
      </SectionCard>
      <CtaBand source="Страница объектов" />
    </>
  );
}
