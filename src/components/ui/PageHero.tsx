import Image from "next/image";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  lines: readonly string[];
  lead?: string;
  image: string;
  alt: string;
  crumbs: Crumb[];
};

/** Компактный hero внутренних страниц: фотокарточка 56svh, крошки, заголовок, подводка. */
export function PageHero({ eyebrow, lines, lead, image, alt, crumbs }: Props) {
  return (
    <section
      data-hero="dark"
      className="relative isolate flex h-[56svh] min-h-[460px] flex-col overflow-hidden rounded-[var(--radius-section)] bg-espresso text-on-dark lg:min-h-[520px]"
    >
      {/* На телефоне кадр 16:9 обрезается под высокий блок — берём ширину с запасом, чтобы не мылило */}
      <Image src={image} alt={alt} fill preload quality={75} sizes="(max-width: 767px) 160vw, 100vw" className="-z-20 object-cover" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(26,22,19,.75) 0%, rgba(26,22,19,.4) 45%, rgba(26,22,19,.2) 70%), linear-gradient(to bottom, rgba(26,22,19,.5), transparent 38%), rgba(26,22,19,.15)",
        }}
      />
      <div className="container-x flex flex-1 flex-col justify-between px-[var(--section-pad-x)] pb-8 pt-[calc(var(--header-h)+20px)] lg:pb-12">
        <Breadcrumbs items={crumbs} dark />
        <div>
          <Reveal self instant delay={0.1} className="t-eyebrow mb-5 !text-on-dark/75">
            {eyebrow}
          </Reveal>
          <Heading lines={lines} level="h1" cascade instant delay={0.15} />
          {lead && (
            <Reveal self instant delay={0.35} className="mt-5 max-w-xl text-[16px] text-on-dark/85 lg:text-[17px]">
              <p>{lead}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
