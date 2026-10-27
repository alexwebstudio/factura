"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

let hydrated = false;

/**
 * Мягкий fade 300ms при переходе между страницами. На первой загрузке не играет:
 * контент с opacity 0 выпадает из кандидатов LCP и задерживает отрисовку первого экрана.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [fade] = useState(() => hydrated);
  useEffect(() => {
    hydrated = true;
  }, []);
  return <div className={cn("page-stack pt-[var(--page-gutter)]", fade && "page-fade")}>{children}</div>;
}
