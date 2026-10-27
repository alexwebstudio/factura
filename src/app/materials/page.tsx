import type { Metadata } from "next";
import { materials, formatPrice, type Material } from "@/content/materials";
import { pages } from "@/content/pages";
import { CtaBand } from "@/components/ui/CtaBand";
import { Heading } from "@/components/ui/Heading";
import { MaterialCard } from "@/components/ui/MaterialCard";
import { PageHero } from "@/components/ui/PageHero";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { SpecTable, type SpecColumn } from "@/components/ui/SpecTable";
import { buildMetadata } from "@/lib/seo";

const p = pages.materials;

export const metadata: Metadata = buildMetadata({ title: p.title, description: p.description, path: "/materials" });

const columns: SpecColumn<Material>[] = [
  { key: "title", label: "Материал", render: (m) => m.title },
  { key: "application", label: "Применение", render: (m) => m.application },
  { key: "lifespan", label: "Срок службы", mono: true, render: (m) => m.lifespan, className: "whitespace-nowrap" },
  { key: "price", label: "Стоимость", mono: true, render: (m) => formatPrice(m.priceFrom), className: "whitespace-nowrap" },
];

export default function MaterialsPage() {
  return (
    <>
      <PageHero eyebrow={p.eyebrow} lines={p.lines} lead={p.lead} image={p.image} alt={p.alt} crumbs={[{ name: "Материалы", path: "/materials" }]} />

      <SectionCard tone="surface" aria-labelledby="spec-title">
        <div className="grid gap-10 xl:grid-cols-12">
          <div className="xl:col-span-6">
            <Heading id="spec-title" lines={p.tableTitle} cascade />
          </div>
          <Reveal self className="max-w-2xl xl:col-span-5 xl:col-start-8 xl:pt-3">
            <p className="text-[17px] leading-relaxed lg:text-[19px]">{p.intro}</p>
          </Reveal>
        </div>
        <Reveal className="mt-14 lg:mt-20" stagger={0.05}>
          <SpecTable caption="Спецификация материалов" columns={columns} rows={materials} rowKey={(m) => m.slug} rowHref={(m) => `/materials/${m.slug}`} />
        </Reveal>
      </SectionCard>

      <SectionCard tone="surface-2" aria-label="Карточки материалов">
        <Reveal as="ul" className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((m) => (
            <li key={m.slug} data-reveal="tilt">
              <MaterialCard material={m} />
            </li>
          ))}
          <li data-reveal="tilt" className="sm:col-span-2 lg:col-span-3">
            <QuestionCard />
          </li>
        </Reveal>
      </SectionCard>

      <CtaBand source="Страница материалов" lines={["Подберём", "*ваш* материал"]} button="Подобрать материал →" />
    </>
  );
}
