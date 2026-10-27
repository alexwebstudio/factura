import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Все числа, сроки и ТТХ — моноширинные с табличными цифрами. */
export function Mono({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn("t-mono", className)} {...props} />;
}
