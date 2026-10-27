"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

type Props = {
  before: string;
  after: string;
  alt: string;
  sizes: string;
  preload?: boolean;
};

/** Шторка «до / после»: перетаскивание мышью/пальцем и стрелками с клавиатуры. */
export function BeforeAfter({ before, after, alt, sizes, preload }: Props) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const fromClientX = useCallback((x: number) => {
    const rect = box.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(100, Math.max(0, ((x - rect.left) / rect.width) * 100)));
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    fromClientX(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) fromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") setPos((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") setPos((p) => Math.min(100, p + step));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={box}
      className="relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded-[var(--radius-section)] bg-surface-2"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <Image src={after} alt={`${alt} — после`} fill sizes={sizes} quality={85} preload={preload} className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={`${alt} — до`} fill sizes={sizes} quality={85} className="object-cover" />
      </div>

      <span className="t-mono pointer-events-none absolute left-4 top-4 rounded-full bg-ink/55 px-3 py-1.5 !text-[12px] text-on-dark">
        до
      </span>
      <span className="t-mono pointer-events-none absolute right-4 top-4 rounded-full bg-ink/55 px-3 py-1.5 !text-[12px] text-on-dark">
        после
      </span>

      <div
        role="slider"
        tabIndex={0}
        aria-label="Сравнение: до и после реконструкции"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% — фото «до»`}
        onKeyDown={onKeyDown}
        className="absolute inset-y-0 -ml-6 flex w-12 cursor-ew-resize items-center justify-center focus-visible:outline-none [&:focus-visible>span]:ring-2 [&:focus-visible>span]:ring-on-dark"
        style={{ left: `${pos}%` }}
      >
        <span aria-hidden className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-on-dark" />
        <span
          aria-hidden
          className="relative inline-flex size-12 items-center justify-center rounded-full border border-on-dark/60 bg-ink/60 text-on-dark"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
            <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>
    </div>
  );
}
