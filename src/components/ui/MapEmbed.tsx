"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Карта (2ГИС/Яндекс iframe) подключается, только когда блок подходит к экрану:
 * сторонние скрипты и cookie не грузятся на старте. Размер задан заранее — layout не прыгает.
 */
export function MapEmbed({ src, title }: { src: string; title: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className="absolute inset-0">
      {show ? (
        <iframe src={src} title={title} referrerPolicy="no-referrer-when-downgrade" className="size-full border-0 grayscale-[0.4]" />
      ) : (
        <div className="flex size-full items-center justify-center">
          <span className="t-caption text-ink-muted">Загружаем карту…</span>
        </div>
      )}
    </div>
  );
}
