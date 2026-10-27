"use client";

import type { ReactNode } from "react";
import { Button, type ButtonVariant } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useLeadModal } from "./LeadModal";

type Props = {
  source: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "md" | "lg";
  className?: string;
  /** Без оформления кнопки — для текстовых ссылок и карточек. */
  unstyled?: boolean;
};

/** Любая кнопка «Рассчитать» на сайте — открывает модалку с формой. */
export function LeadButton({ source, children, variant = "dark", size = "md", className, unstyled }: Props) {
  const { open } = useLeadModal();
  if (unstyled) {
    return (
      <button type="button" onClick={() => open(source)} aria-haspopup="dialog" className={cn("text-left", className)}>
        {children}
      </button>
    );
  }
  return (
    <Button variant={variant} size={size} onClick={() => open(source)} aria-haspopup="dialog" className={className}>
      {children}
    </Button>
  );
}
