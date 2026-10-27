"use client";

import { useRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { useReveal, type RevealOptions } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLElement> &
  RevealOptions & {
    as?: "div" | "ul" | "ol" | "dl" | "section" | "article" | "header";
    /** Анимировать сам контейнер, а не `[data-reveal]` внутри. */
    self?: boolean;
    /** Первый экран: CSS-анимация сразу при отрисовке (только вместе с `self`). */
    instant?: boolean;
    children: ReactNode;
  };

/**
 * Обёртка появления по скроллу. Внутри помечайте элементы `data-reveal` —
 * они появятся каскадом (stagger .07) при входе контейнера в экран.
 */
export function Reveal({ as = "div", self, instant, selector, stagger, delay = 0, start, duration, children, className, style, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, { selector, stagger, delay, start, duration, disabled: instant });
  const Tag = as as "div";
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      data-reveal={self && !instant ? "" : undefined}
      className={cn(instant && "anim-in", className)}
      style={instant ? ({ ...style, "--d": `${delay}s` } as CSSProperties) : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
