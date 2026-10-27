"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { facadeSection, layers, type LayerKind } from "@/content/layers";
import { Mono } from "@/components/ui/Mono";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Plus } from "@/components/ui/Icons";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

/* ── Геометрия схемы (косоугольная проекция «взрыв-схемы» пирога) ── */
const VB = { w: 500, h: 600 };
const X0 = 8;
const W = 290;
const DX = 68;
const DY = -44;
const STEP = 112;
const TOP = 82;
const THICK: Record<LayerKind, number> = { wall: 26, brackets: 8, insulation: 22, gap: 3, cladding: 10 };

const plateY = (i: number) => TOP + i * STEP;
/** Точка выноски — середина правой грани плиты. */
const leaderY = (i: number, kind: LayerKind) => plateY(i) + DY + THICK[kind] / 2 + 6;

function pts(...p: [number, number][]) {
  return p.map(([x, y]) => `${x},${y}`).join(" ");
}

function Plate({ i, kind, active, dim }: { i: number; kind: LayerKind; active: boolean; dim: boolean }) {
  const y = plateY(i);
  const t = THICK[kind];
  const top = pts([X0, y], [X0 + W, y], [X0 + W + DX, y + DY], [X0 + DX, y + DY]);
  const front = pts([X0, y], [X0 + W, y], [X0 + W, y + t], [X0, y + t]);
  const side = pts([X0 + W, y], [X0 + W + DX, y + DY], [X0 + W + DX, y + DY + t], [X0 + W, y + t]);
  const stroke = active ? "var(--color-on-dark)" : "var(--color-ink)";
  const dashed = kind === "gap";
  const ly = leaderY(i, kind);

  // Узор на верхней грани
  const marks: React.ReactNode[] = [];
  if (kind === "wall") {
    for (let r = 1; r < 4; r++) {
      const fy = (r / 4) * DY;
      const fx = (r / 4) * DX;
      marks.push(<line key={`r${r}`} x1={X0 + fx} y1={y + fy} x2={X0 + W + fx} y2={y + fy} />);
      for (let c = 0; c < 6; c++) {
        const bx = X0 + fx + 25 + c * 50 + (r % 2 ? 25 : 0);
        if (bx < X0 + W + fx - 5) {
          marks.push(<line key={`b${r}-${c}`} x1={bx} y1={y + fy} x2={bx + DX / 4} y2={y + fy + DY / 4} />);
        }
      }
    }
  } else if (kind === "brackets") {
    for (let c = 0; c < 6; c++) {
      const bx = X0 + 22 + c * 52;
      marks.push(<line key={c} x1={bx} y1={y} x2={bx + DX} y2={y + DY} strokeWidth={1.6} />);
      marks.push(<polyline key={`l${c}`} points={pts([bx + 8, y - 6], [bx + 8, y + 2], [bx + 20, y + 2])} />);
    }
  } else if (kind === "insulation") {
    for (let r = 1; r < 6; r++) {
      const fy = (r / 6) * DY;
      const fx = (r / 6) * DX;
      const wave: [number, number][] = [];
      for (let k = 0; k <= 24; k++) wave.push([X0 + fx + (k * W) / 24, y + fy + (k % 2 ? -3 : 3)]);
      marks.push(<polyline key={r} points={pts(...wave)} />);
    }
  } else if (kind === "gap") {
    for (let c = 0; c < 5; c++) {
      const bx = X0 + 50 + c * 55 + DX / 2;
      const by = y + DY / 2;
      marks.push(<polyline key={c} points={pts([bx - 7, by + 4], [bx, by - 4], [bx + 7, by + 4])} />);
    }
  } else if (kind === "cladding") {
    for (let c = 1; c < 4; c++) {
      const bx = X0 + (c * W) / 4;
      marks.push(<line key={c} x1={bx} y1={y} x2={bx + DX} y2={y + DY} />);
    }
    marks.push(<line key="h" x1={X0 + DX / 2} y1={y + DY / 2} x2={X0 + W + DX / 2} y2={y + DY / 2} />);
  }

  return (
    <g
      className="transition-opacity duration-300"
      style={{ opacity: dim ? 0.45 : 1 }}
      stroke={stroke}
      strokeWidth={0.9}
      strokeDasharray={dashed ? "4 4" : undefined}
      vectorEffect="non-scaling-stroke"
    >
      <polygon
        points={top}
        className="transition-[fill] duration-300"
        fill={dashed ? (active ? "var(--color-espresso)" : "transparent") : active ? "var(--color-espresso)" : "var(--color-surface)"}
      />
      <polygon points={front} className="transition-[fill] duration-300" fill={active ? "var(--color-espresso-2)" : "#E6E1D8"} />
      <polygon points={side} className="transition-[fill] duration-300" fill={active ? "#2A221B" : "#D9D3C8"} />
      <g fill="none" strokeDasharray="none" strokeOpacity={0.75}>
        {marks}
      </g>
      {/* выноска */}
      <g strokeDasharray="none" stroke={active ? "var(--color-espresso)" : "var(--color-ink)"} strokeOpacity={active ? 1 : 0.55}>
        <line x1={X0 + W + DX + 4} y1={ly} x2={VB.w} y2={ly} />
        <circle cx={X0 + W + DX + 4} cy={ly} r={2.5} fill={active ? "var(--color-espresso)" : "var(--color-ink)"} />
      </g>
    </g>
  );
}

function Schema({ highlight }: { highlight: number | null }) {
  return (
    <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="block h-auto w-full" aria-hidden focusable="false">
      {layers.map((l, i) => (
        <Plate key={l.kind} i={i} kind={l.kind} active={highlight === i} dim={highlight !== null && highlight !== i} />
      ))}
    </svg>
  );
}

export function FacadeSection() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [hovered, setHovered] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState<number | null>(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const highlight = isDesktop ? hovered : mobileOpen;

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = layers.length;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    buttons.current[next]?.focus();
  };

  return (
    <SectionCard tone="surface-2" aria-labelledby="facade-title" className="lg:!py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:order-2 lg:col-span-5 lg:self-center xl:col-span-4 xl:col-start-9">
          <SectionHeader id="facade-title" eyebrow={facadeSection.eyebrow} lines={facadeSection.lines} lead={facadeSection.lead} cascade={false} />
        </div>

        <Reveal self className="lg:order-1 lg:col-span-7 xl:col-span-8">
          {/* Десктоп: схема + подписи-кнопки справа от выносок */}
          <div className="relative hidden grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:grid" onPointerLeave={() => setHovered(null)}>
            <div onPointerMove={(e) => {
              const svg = e.currentTarget.querySelector("svg");
              if (!svg) return;
              const r = svg.getBoundingClientRect();
              const y = ((e.clientY - r.top) / r.height) * VB.h;
              const i = Math.round((y - TOP - DY / 2) / STEP);
              setHovered(i >= 0 && i < layers.length ? i : null);
            }}>
              <Schema highlight={highlight} />
            </div>
            <ul className="relative" aria-label="Слои фасада">
              {layers.map((l, i) => {
                const active = hovered === i;
                return (
                  <li
                    key={l.kind}
                    className="absolute left-0 right-0 -translate-y-[11px] pl-3"
                    style={{ top: `${(leaderY(i, l.kind) / VB.h) * 100}%` }}
                  >
                    <button
                      ref={(el) => {
                        buttons.current[i] = el;
                      }}
                      type="button"
                      aria-expanded={active}
                      aria-controls="layer-desc"
                      onPointerEnter={() => setHovered(i)}
                      onFocus={() => setHovered(i)}
                      onBlur={() => setHovered(null)}
                      onClick={() => setHovered(active ? null : i)}
                      onKeyDown={(e) => onKey(e, i)}
                      className={cn(
                        "grid w-full grid-cols-[28px_1fr] items-baseline rounded-[10px] text-left transition-opacity duration-300",
                        hovered !== null && !active && "opacity-45",
                      )}
                    >
                      <Mono className="!text-[12px] text-ink-muted">{String(i + 1).padStart(2, "0")}</Mono>
                      <span className={cn("text-[16px] font-medium leading-tight transition-colors duration-300 xl:text-[17px]", active ? "text-espresso" : "text-ink")}>
                        {l.title}
                      </span>
                      <span className="col-start-2 truncate text-[13px] leading-snug text-ink-muted xl:text-[14px]">{l.role}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Описание активного слоя — одна панель под схемой */}
          <div id="layer-desc" aria-live="polite" className="mt-8 hidden min-h-[76px] border-t border-line pt-5 lg:block">
            {hovered === null ? (
              <p className="max-w-xl text-[15px] leading-relaxed text-ink-muted">{facadeSection.caption}</p>
            ) : (
              <p className="max-w-xl text-[15px] leading-relaxed">
                <span className="font-medium">{layers[hovered]!.title}.</span> {layers[hovered]!.text}
              </p>
            )}
          </div>

          {/* Мобилка: схема + аккордеон, первый слой раскрыт */}
          <div className="lg:hidden">
            <div className="mx-auto max-w-[420px]">
              <Schema highlight={highlight} />
            </div>
            <ul className="mt-8 border-t border-line" aria-label="Слои фасада">
              {layers.map((l, i) => {
                const open = mobileOpen === i;
                return (
                  <li key={l.kind} className="border-b border-line">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`layer-m-${i}`}
                      onClick={() => setMobileOpen(open ? null : i)}
                      onKeyDown={(e) => {
                        const list = e.currentTarget.closest("ul")?.querySelectorAll("button");
                        if (!list) return;
                        const n = list.length;
                        if (e.key === "ArrowDown") (list[(i + 1) % n] as HTMLButtonElement).focus();
                        else if (e.key === "ArrowUp") (list[(i - 1 + n) % n] as HTMLButtonElement).focus();
                        else return;
                        e.preventDefault();
                      }}
                      className="flex w-full items-center gap-4 py-4 text-left"
                    >
                      <Mono className="!text-[12px] text-ink-muted">{String(i + 1).padStart(2, "0")}</Mono>
                      <span className="flex-1">
                        <span className="block text-[16px] font-medium">{l.title}</span>
                        <span className="block text-[13px] text-ink-muted">{l.role}</span>
                      </span>
                      <span aria-hidden className={cn("inline-flex size-9 items-center justify-center rounded-full border border-line transition-transform duration-300", open && "rotate-45")}>
                        <Plus size={16} />
                      </span>
                    </button>
                    <div
                      id={`layer-m-${i}`}
                      inert={!open}
                      className={cn("grid transition-[grid-template-rows] duration-300", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 pl-9 text-[14px] leading-relaxed text-ink-muted">{l.text}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-muted">{facadeSection.caption}</p>
          </div>
        </Reveal>
      </div>
    </SectionCard>
  );
}
