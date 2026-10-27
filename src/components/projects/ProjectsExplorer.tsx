"use client";

import { useMemo, useState } from "react";
import { projects, projectStatuses, projectTypes, type ProjectType } from "@/content/projects";
import { Button } from "@/components/ui/Button";
import { Mono } from "@/components/ui/Mono";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const PAGE = 6;
type Filter = "all" | ProjectType;

/** Фильтр-чипсы со счётчиками, тумблер «Только реализованные», «Показать ещё», легенда статусов. */
export function ProjectsExplorer() {
  const [filter, setFilter] = useState<Filter>("all");
  const [doneOnly, setDoneOnly] = useState(false);
  const [limit, setLimit] = useState(PAGE);

  const base = useMemo(() => (doneOnly ? projects.filter((p) => p.status === "done") : projects), [doneOnly]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: base.length };
    for (const p of base) c[p.type] = (c[p.type] ?? 0) + 1;
    return c;
  }, [base]);
  const filtered = filter === "all" ? base : base.filter((p) => p.type === filter);
  const shown = filtered.slice(0, limit);
  const rest = filtered.length - shown.length;

  const chips: { id: Filter; label: string }[] = [
    { id: "all", label: "Все" },
    ...(Object.keys(projectTypes) as ProjectType[]).map((t) => ({ id: t, label: projectTypes[t].plural })),
  ];

  const change = (fn: () => void) => {
    fn();
    setLimit(PAGE);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Тип объекта" className="flex flex-wrap gap-2">
          {chips.map((c) => {
            const n = counts[c.id] ?? 0;
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                disabled={n === 0 && !active}
                onClick={() => change(() => setFilter(c.id))}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-full border px-5 text-[15px] font-medium transition-colors duration-300 disabled:opacity-40",
                  active ? "border-espresso bg-espresso text-on-dark" : "border-line hover:bg-surface-2",
                )}
              >
                {c.label}
                <Mono className={cn("!text-[12px]", active ? "text-on-dark/70" : "text-ink-muted")}>{n}</Mono>
              </button>
            );
          })}
        </div>

        <label className="flex cursor-pointer items-center gap-3 text-[15px]">
          <span>Только реализованные</span>
          <button
            type="button"
            role="switch"
            aria-checked={doneOnly}
            onClick={() => change(() => setDoneOnly((v) => !v))}
            className={cn("relative h-7 w-12 rounded-full transition-colors duration-300", doneOnly ? "bg-espresso" : "bg-line")}
          >
            <span
              aria-hidden
              className={cn(
                "absolute left-1 top-1 size-5 rounded-full bg-surface transition-transform duration-300",
                doneOnly && "translate-x-5",
              )}
            />
          </button>
        </label>
      </div>

      <p aria-live="polite" className="t-mono mt-6 !text-[13px] text-ink-muted">
        Показано объектов: {shown.length} из {filtered.length}
      </p>

      {shown.length > 0 ? (
        <ul className="mt-8 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-ink-muted">По этому фильтру объектов пока нет — снимите фильтр «Только реализованные».</p>
      )}

      {rest > 0 && (
        <div className="mt-12 flex justify-center">
          <Button variant="ghost" onClick={() => change(() => setLimit((l) => l + PAGE))}>
            Показать ещё · {rest}
          </Button>
        </div>
      )}

      <dl className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[14px] sm:flex-row sm:flex-wrap sm:gap-x-10">
        {Object.values(projectStatuses).map((s, i) => (
          <div key={s.label} className="flex items-center gap-3">
            <span
              aria-hidden
              className={cn("size-2 rounded-full", i === 0 ? "bg-espresso" : i === 1 ? "border border-espresso" : "border border-dashed border-ink-muted")}
            />
            <dt className="font-medium">{s.label}</dt>
            <dd className="text-ink-muted">— {s.note}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
