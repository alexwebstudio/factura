import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMaterial } from "@/content/materials";
import {
  formatArea,
  getProject,
  getProjectNeighbours,
  projectAlt,
  projects,
  projectStatuses,
  projectTypes,
} from "@/content/projects";
import { LeadButton } from "@/components/forms/LeadButton";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Heading } from "@/components/ui/Heading";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { Mono } from "@/components/ui/Mono";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { KeyValueTable } from "@/components/ui/SpecTable";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return buildMetadata({
    title: p.title,
    description: `${projectTypes[p.type].label}, ${p.city}: ${formatArea(p.area)} фасада, ${p.materialLabel}, ${p.subframe}. ${p.summary}`.slice(0, 155),
    path: `/projects/${p.slug}`,
    type: "article",
    image: { url: p.image, width: 1440, height: 1080, alt: projectAlt(p) },
  });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  const material = getMaterial(p.materialSlug);
  const { prev, next } = getProjectNeighbours(p.slug);
  const passport = [
    { label: "Статус", value: projectStatuses[p.status].label },
    { label: "Тип объекта", value: projectTypes[p.type].label },
    { label: "Площадь фасада", value: formatArea(p.area), mono: true },
    {
      label: "Материал",
      value: material ? (
        <Link href={`/materials/${material.slug}`} className="link-underline pb-0.5">
          {material.title}
        </Link>
      ) : (
        p.materialLabel
      ),
    },
    { label: "Система", value: p.subframe },
    { label: "Город", value: p.city },
    ...(p.year ? [{ label: "Год", value: String(p.year), mono: true }] : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    about: `${projectTypes[p.type].label} — навесной фасад, ${p.materialLabel}`,
    description: p.summary,
    image: absoluteUrl(p.image),
    url: absoluteUrl(`/projects/${p.slug}`),
    locationCreated: { "@type": "Place", name: p.city },
    creator: { "@type": "Organization", name: site.name, url: site.url },
    ...(p.year ? { dateCreated: String(p.year) } : {}),
  };

  return (
    <>
      {/* 1–4: крошки, eyebrow, h1, кнопки */}
      <SectionCard tone="surface" aria-labelledby="project-title" className="!pt-[calc(var(--header-h)+40px)]">
        <Breadcrumbs
          items={[
            { name: "Объекты", path: "/projects" },
            { name: p.title, path: `/projects/${p.slug}` },
          ]}
        />
        <Reveal self instant delay={0.1} className="t-eyebrow mb-5 mt-12 lg:mt-16">
          {projectTypes[p.type].label} · {p.materialLabel}
        </Reveal>
        <Heading id="project-title" level="h1" lines={p.title.split(" ").length > 2 ? splitTitle(p.title) : [p.title]} cascade instant delay={0.15} />
        <Reveal self instant delay={0.35} className="mt-8 flex flex-wrap gap-3 lg:mt-10">
          {p.mapUrl ? (
            <ButtonLink href={p.mapUrl}>Смотреть на карте ↗</ButtonLink>
          ) : (
            <LeadButton source={`Объект: ${p.title}`}>Обсудить похожий фасад →</LeadButton>
          )}
          <ButtonLink href="/projects" variant="ghost">
            Все объекты
          </ButtonLink>
        </Reveal>
      </SectionCard>

      {/* 5: крупное фото (у реконструкции — шторка до/после). Без reveal: это LCP-элемент. */}
      <div>
        {p.beforeImage ? (
          <BeforeAfter before={p.beforeImage} after={p.image} alt={projectAlt(p)} sizes="100vw" preload />
        ) : (
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-section)] bg-surface-2 lg:aspect-[16/9]">
            <Image src={p.image} alt={projectAlt(p)} fill preload quality={85} sizes="100vw" className="object-cover" />
          </div>
        )}
      </div>

      {/* 6–8: паспорт, о проекте, что сделали */}
      <SectionCard tone="surface" aria-label="Паспорт объекта">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p data-reveal className="t-eyebrow mb-5">
              Паспорт объекта
            </p>
            <KeyValueTable rows={passport} caption={`Параметры: ${p.title}`} />
          </Reveal>

          <div className="flex flex-col gap-14 lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h2 data-reveal className="t-eyebrow mb-5">
                О проекте
              </h2>
              <div className="flex flex-col gap-5 text-[17px] leading-relaxed">
                {p.about.map((t) => (
                  <p key={t.slice(0, 24)} data-reveal>
                    {t}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <h2 data-reveal className="t-eyebrow mb-5">
                Что сделали
              </h2>
              <ul className="border-t border-line">
                {p.done.map((d, i) => (
                  <li key={d} data-reveal className="flex gap-5 border-b border-line py-4">
                    <Mono className="pt-0.5 !text-[13px] text-ink-muted">{String(i + 1).padStart(2, "0")}</Mono>
                    <span className="text-[16px]">{d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </SectionCard>

      {/* 9: соседние объекты */}
      <nav aria-label="Другие объекты" className="grid gap-[var(--stack-gap)] sm:grid-cols-2">
        <Link href={`/projects/${prev.slug}`} className="group section-card flex flex-col gap-3 bg-surface !py-8 transition-colors hover:bg-surface-2 lg:!py-10">
          <span className="t-caption flex items-center gap-2 text-ink-muted">
            <ArrowLeft size={16} className="transition-transform duration-500 group-hover:-translate-x-1" /> Предыдущий
          </span>
          <span className="text-[19px] font-medium lg:text-[22px]">{prev.title}</span>
        </Link>
        <Link href={`/projects/${next.slug}`} className="group section-card flex flex-col items-end gap-3 bg-surface !py-8 text-right transition-colors hover:bg-surface-2 lg:!py-10">
          <span className="t-caption flex items-center gap-2 text-ink-muted">
            Следующий <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
          </span>
          <span className="text-[19px] font-medium lg:text-[22px]">{next.title}</span>
        </Link>
      </nav>

      {/* 10: сквозной CTA */}
      <CtaBand source={`Объект: ${p.title}`} />
      <JsonLd data={jsonLd} />
    </>
  );
}

/** «Частный дом в Алматы» → ["Частный дом", "*в Алматы*"] — курсивный акцент на географии. */
function splitTitle(title: string): string[] {
  const m = title.match(/^(.*?)\s+(в\s+.+)$/);
  if (!m) return [title];
  return [m[1]!, `*${m[2]}*`];
}
