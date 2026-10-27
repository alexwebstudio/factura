import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SpecColumn<T> = {
  key: string;
  label: string;
  mono?: boolean;
  render: (row: T) => ReactNode;
  className?: string;
};

type Props<T> = {
  caption: string;
  columns: SpecColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  rowHref?: (row: T) => string;
};

/**
 * Спецификация на хэйрлайнах, без зебры, цифры моноширинные.
 * На мобилке — стопка карточек «ключ — значение», а не горизонтальный скролл.
 */
export function SpecTable<T>({ caption, columns, rows, rowKey, rowHref }: Props<T>) {
  const [first, ...rest] = columns;
  return (
    <>
      <table className="hidden w-full border-collapse text-left md:table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line">
            {columns.map((c) => (
              <th key={c.key} scope="col" className={cn("t-caption pb-4 pr-6 font-normal text-ink-muted", c.className)}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="group border-b border-line" data-reveal>
              {columns.map((c, i) => {
                const content = c.render(row);
                return i === 0 ? (
                  <th key={c.key} scope="row" className={cn("py-5 pr-6 align-top font-medium lg:text-[18px]", c.className)}>
                    {rowHref ? (
                      <Link href={rowHref(row)} className="link-underline">
                        {content}
                      </Link>
                    ) : (
                      content
                    )}
                  </th>
                ) : (
                  <td key={c.key} className={cn("py-5 pr-6 align-top", c.mono ? "t-mono !text-[15px]" : "text-ink-muted", c.className)}>
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="flex flex-col gap-3 md:hidden" aria-label={caption}>
        {rows.map((row) => (
          <li key={rowKey(row)} className="card bg-surface-2 p-5" data-reveal>
            <p className="mb-4 text-[18px] font-medium">
              {first && rowHref ? (
                <Link href={rowHref(row)} className="link-underline">
                  {first.render(row)}
                </Link>
              ) : (
                first?.render(row)
              )}
            </p>
            <dl className="flex flex-col">
              {rest.map((c) => (
                <div key={c.key} className="flex items-baseline justify-between gap-4 border-t border-line py-2.5">
                  <dt className="t-caption shrink-0 text-ink-muted">{c.label}</dt>
                  <dd className={cn("text-right", c.mono ? "t-mono" : "text-[15px]")}>{c.render(row)}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

/** Таблица «ключ — значение» на хэйрлайнах (паспорт объекта, ТТХ материала). */
export function KeyValueTable({ rows, caption }: { rows: { label: string; value: ReactNode; mono?: boolean }[]; caption?: string }) {
  return (
    <dl className="border-t border-line" aria-label={caption}>
      {rows.map((r) => (
        <div
          key={r.label}
          data-reveal
          className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-[minmax(160px,1fr)_2fr] sm:gap-6 lg:py-5"
        >
          <dt className="t-caption text-ink-muted sm:pt-1">{r.label}</dt>
          <dd className={r.mono ? "t-mono !text-[15px]" : "text-[16px]"}>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
