import { materialsSection } from "@/content/materials";
import { LeadButton } from "@/components/forms/LeadButton";
import { cn } from "@/lib/utils";
import { ArrowButton } from "./ArrowButton";

/** Карточка-вопрос — последняя в сетке материалов, визуально отличается (тёмная). */
export function QuestionCard({ className }: { className?: string }) {
  const q = materialsSection.question;
  return (
    <LeadButton
      unstyled
      source="Подбор материала"
      className={cn(
        "group card flex flex-col justify-between gap-8 bg-espresso p-7 text-on-dark transition-colors duration-300 hover:bg-espresso-2 lg:flex-row lg:items-end lg:p-10",
        className,
      )}
    >
      <span className="flex max-w-2xl flex-col gap-4">
        <span className="font-display text-[clamp(38px,3.6vw,56px)] font-[200] leading-[1.05]">{q.title}</span>
        <span className="text-[16px] leading-relaxed text-on-dark/80">{q.text}</span>
      </span>
      <span className="inline-flex items-center gap-4 text-[15px] font-medium">
        {q.action}
        <ArrowButton tone="dark" />
      </span>
    </LeadButton>
  );
}
