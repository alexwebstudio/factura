import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn, isExternal } from "@/lib/utils";

export type ButtonVariant = "dark" | "light" | "ghost" | "ghost-dark";

const variants: Record<ButtonVariant, string> = {
  dark: "bg-espresso text-on-dark hover:bg-espresso-2",
  light: "bg-surface text-ink hover:bg-surface-2",
  ghost: "border border-line text-ink hover:border-ink/40 hover:bg-surface-2",
  "ghost-dark": "border border-on-dark/30 text-on-dark hover:border-on-dark/70 hover:bg-on-dark/5",
};

const sizes = {
  md: "h-12 px-6",
  lg: "h-14 px-7",
};

export function buttonClass(variant: ButtonVariant = "dark", size: keyof typeof sizes = "md", className?: string) {
  return cn(
    "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full text-[15px] font-medium leading-none",
    "transition-colors duration-300 disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

type Common = { variant?: ButtonVariant; size?: keyof typeof sizes; children: ReactNode; className?: string };

export function ButtonLink({ href, variant, size, className, children, ...rest }: Common & ComponentProps<typeof Link>) {
  const cls = buttonClass(variant, size, className);
  const h = String(href);
  if (isExternal(h)) {
    return (
      <a href={h} className={cls} target={h.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Button({ variant, size, className, children, type = "button", ...rest }: Common & ComponentProps<"button">) {
  return (
    <button type={type} className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
