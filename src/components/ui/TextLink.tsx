import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Текстовая ссылка-выход на хаб: «Все проекты →». */
export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn("link-underline inline-flex items-center gap-2 pb-1 text-[15px] font-medium", className)}
    >
      {children}
    </Link>
  );
}
