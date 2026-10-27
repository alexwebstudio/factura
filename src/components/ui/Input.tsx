import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  error?: string;
  hint?: ReactNode;
  dark?: boolean;
};

const fieldBase =
  "w-full rounded-[16px] border bg-transparent px-4 text-[16px] outline-none transition-colors duration-300 placeholder:opacity-60";

function fieldTone(dark?: boolean, error?: string) {
  if (dark) {
    return cn(
      "border-on-dark/25 text-on-dark placeholder:text-on-dark/60 focus:border-on-dark/80",
      error && "border-[#e6a48c]",
    );
  }
  return cn("border-line text-ink placeholder:text-ink-muted focus:border-ink/60", error && "border-[#b3462d]");
}

function Shell({ id, label, error, hint, dark, children }: FieldProps & { id: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={cn("text-[14px] font-medium", dark ? "text-on-dark/85" : "text-ink")}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className={cn("text-[13px]", dark ? "text-[#f0b9a5]" : "text-[#b3462d]")}>
          {error}
        </p>
      ) : hint ? (
        <p className={cn("text-[13px]", dark ? "text-on-dark/60" : "text-ink-muted")}>{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({ id, label, error, hint, dark, className, ...props }: FieldProps & ComponentProps<"input"> & { id: string }) {
  return (
    <Shell id={id} label={label} error={error} hint={hint} dark={dark}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldBase, "h-14", fieldTone(dark, error), className)}
        {...props}
      />
    </Shell>
  );
}

export function Textarea({ id, label, error, hint, dark, className, ...props }: FieldProps & ComponentProps<"textarea"> & { id: string }) {
  return (
    <Shell id={id} label={label} error={error} hint={hint} dark={dark}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldBase, "min-h-[104px] resize-y py-3.5", fieldTone(dark, error), className)}
        {...props}
      />
    </Shell>
  );
}
