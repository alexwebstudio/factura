"use client";

import { Fragment, useLayoutEffect, useRef, type CSSProperties } from "react";
import { EASE, gsap, prefersReducedMotion } from "@/lib/gsap";
import { plainText, splitWords } from "@/lib/splitWords";
import { cn } from "@/lib/utils";

type Props = {
  lines: readonly string[];
  level?: "h1" | "h2" | "h3";
  size?: "h1" | "h2" | "hero";
  /** Каскад: каждая следующая строка сдвигается вправо. */
  cascade?: boolean;
  id?: string;
  className?: string;
  delay?: number;
  /** Первый экран: CSS-анимация сразу при отрисовке, без ожидания JS и скролла. */
  instant?: boolean;
};

const sizes = { h1: "t-h1", h2: "t-h2", hero: "t-hero" };

/**
 * Двойной рендер заголовка: цельный sr-only `<h1>/<h2>` для SEO и скринридеров
 * + визуальная копия, разбитая на слова для word-by-word reveal.
 * `*слово*` в строке — курсивный акцент Petale Thin Italic.
 */
export function Heading({ lines, level = "h2", size, cascade, id, className, delay = 0, instant }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = level;

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || instant || prefersReducedMotion()) return;
    const words = root.querySelectorAll(".word-inner");
    const ctx = gsap.context(() => {
      gsap.to(words, {
        y: 0,
        duration: 0.9,
        ease: EASE,
        stagger: 0.04,
        delay,
        scrollTrigger: { trigger: root, start: "top 85%", toggleActions: "play none none none" },
      });
    }, root);
    return () => ctx.revert();
  }, [delay, instant]);

  let n = 0;

  return (
    <div ref={ref} className={cn(sizes[size ?? (level === "h1" ? "h1" : "h2")], className)}>
      <Tag id={id} className="sr-only">
        {plainText(lines)}
      </Tag>
      <span aria-hidden className="block">
        {lines.map((line, i) => (
          <span
            key={i}
            className="word-line"
            style={cascade && i > 0 ? { marginLeft: `calc(${i} * var(--cascade-step))` } : undefined}
          >
            {splitWords(line).map((w, j) => (
              <Fragment key={j}>
                <span className="word">
                  <span
                    className={cn("word-inner", w.italic && "italic", instant && "anim-word")}
                    style={instant ? ({ "--d": `${delay + n++ * 0.04}s` } as CSSProperties) : undefined}
                  >
                    {w.text}
                  </span>
                </span>{" "}
              </Fragment>
            ))}
          </span>
        ))}
      </span>
    </div>
  );
}
