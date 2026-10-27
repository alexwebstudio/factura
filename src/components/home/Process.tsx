import { process } from "@/content/site";
import { Icon, type IconName } from "@/components/ui/Icons";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Process() {
  return (
    <section aria-labelledby="process-title" className="grid gap-[var(--stack-gap)] lg:grid-cols-12">
      <div className="section-card bg-surface lg:col-span-6 xl:col-span-5">
        <SectionHeader id="process-title" eyebrow={process.eyebrow} lines={process.lines} />
        <Reveal as="ul" className="mt-10 border-t border-line lg:mt-14">
          {process.items.map((item) => (
            <li key={item.title} data-reveal className="flex gap-5 border-b border-line py-6 last:border-b-0 lg:py-7">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-2">
                <Icon name={item.icon as IconName} size={22} />
              </span>
              <span>
                <span className="block text-[17px] font-medium">{item.title}</span>
                <span className="mt-1 block text-[14px] leading-relaxed text-ink-muted">{item.text}</span>
              </span>
            </li>
          ))}
        </Reveal>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-section)] lg:col-span-6 lg:aspect-auto xl:col-span-7">
        <ParallaxImage src={process.image} alt={process.alt} sizes="(min-width: 1024px) 58vw, 100vw" />
      </div>
    </section>
  );
}
