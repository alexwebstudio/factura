import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMaterial, getMaterialSpecs, getRelatedMaterials, materials } from "@/content/materials";
import { projects } from "@/content/projects";
import { CtaBand } from "@/components/ui/CtaBand";
import { Heading } from "@/components/ui/Heading";
import { MaterialCard } from "@/components/ui/MaterialCard";
import { Mono } from "@/components/ui/Mono";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { KeyValueTable } from "@/components/ui/SpecTable";
import { TextLink } from "@/components/ui/TextLink";
import { buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return materials.map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const m = getMaterial((await params).slug);
  if (!m) return {};
  return buildMetadata({
    title: `${m.title} — навесной фасад`,
    description: `${m.title}: ${m.application}, срок службы ${m.lifespan}. Система, подконструкция, характеристики и объекты.`.slice(0, 155),
    path: `/materials/${m.slug}`,
    image: { url: m.image, width: 960, height: 1200, alt: m.alt },
  });
}

export default async function MaterialPage({ params }: { params: Promise<Params> }) {
  const m = getMaterial((await params).slug);
  if (!m) notFound();

  const related = getRelatedMaterials(m.slug);
  const withMaterial = projects.filter((p) => p.materialSlug === m.slug);

  return (
    <>
      <PageHero
        eyebrow={`Материал ${m.index} · срок службы ${m.lifespan}`}
        lines={[m.title]}
        lead={m.short}
        image={m.image}
        alt={m.alt}
        crumbs={[
          { name: "Материалы", path: "/materials" },
          { name: m.title, path: `/materials/${m.slug}` },
        ]}
      />

      <SectionCard tone="surface" aria-labelledby="system-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="t-eyebrow mb-5">Система</p>
            <Heading id="system-title" lines={["Как *работает*", "система"]} cascade />
            <Reveal className="mt-10 flex max-w-xl flex-col gap-5 text-[17px] leading-relaxed">
              {m.intro.map((t) => (
                <p key={t.slice(0, 24)} data-reveal>
                  {t}
                </p>
              ))}
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <p data-reveal className="t-eyebrow mb-5">
              Характеристики
            </p>
            <KeyValueTable rows={getMaterialSpecs(m)} caption={`Характеристики: ${m.title}`} />
          </Reveal>
        </div>
      </SectionCard>

      <SectionCard tone="surface-2" aria-labelledby="benefits-title">
        <SectionHeader id="benefits-title" eyebrow="Преимущества" lines={["Почему", `*${m.nameShort}*`]} />
        <Reveal as="ul" className="hair-grid mt-12 !bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {m.benefits.map((b, i) => (
            <li key={b.title} data-reveal className="flex min-h-[200px] flex-col gap-3 bg-surface-2 py-8 sm:px-6 lg:px-7">
              <Mono className="!text-[13px] text-ink-muted">{String(i + 1).padStart(2, "0")}</Mono>
              <h3 className="t-h3 mt-auto">{b.title}</h3>
              <p className="text-[15px] text-ink-muted">{b.text}</p>
            </li>
          ))}
        </Reveal>
      </SectionCard>

      {withMaterial.length > 0 && (
        <SectionCard tone="surface" aria-labelledby="gallery-title">
          <SectionHeader
            id="gallery-title"
            eyebrow="Объекты"
            lines={["Объекты", "*с этим* материалом"]}
            aside={<TextLink href="/projects">Все объекты →</TextLink>}
          />
          <Reveal as="ul" className="mt-12 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {withMaterial.map((p) => (
              <li key={p.slug} data-reveal="tilt">
                <ProjectCard project={p} />
              </li>
            ))}
          </Reveal>
        </SectionCard>
      )}

      <SectionCard tone="surface-2" aria-labelledby="related-title">
        <SectionHeader id="related-title" eyebrow="Ещё материалы" lines={["Похожие", "*решения*"]} aside={<TextLink href="/materials">Все материалы →</TextLink>} />
        <Reveal as="ul" className="mt-12 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug} data-reveal="tilt">
              <MaterialCard material={r} />
            </li>
          ))}
        </Reveal>
      </SectionCard>

      <CtaBand source={`Материал: ${m.title}`} lines={["Посчитаем фасад", `*из ${m.nameGenitive}*`]} />
    </>
  );
}
