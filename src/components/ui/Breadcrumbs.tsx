import Link from "next/link";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, dark, className }: { items: Crumb[]; dark?: boolean; className?: string }) {
  const all = [{ name: "Главная", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Хлебные крошки" className={cn("t-mono text-[13px]", className)}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={dark ? "text-on-dark" : "text-ink"}>
                    {c.name}
                  </span>
                ) : (
                  <Link
                    href={c.path}
                    className={cn("link-underline", dark ? "text-on-dark/70 hover:text-on-dark" : "text-ink-muted hover:text-ink")}
                  >
                    {c.name}
                  </Link>
                )}
                {!last && <span className={dark ? "text-on-dark/50" : "text-ink-muted/60"}>/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}
