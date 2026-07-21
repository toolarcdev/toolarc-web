"use client";

import { useEffect, useState } from "react";
import { pushEvent } from "@/lib/analytics/gtm";

export type TocItem = {
  id: string;
  label: string;
};

type StickyTOCProps = {
  items: TocItem[];
};

/** sticky header 下（.article-h2 の scroll-margin-top: 4.5rem と揃える） */
const HEADER_OFFSET_PX = 72;

export function StickyTOC({ items }: StickyTOCProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const elements = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: `-${HEADER_OFFSET_PX}px 0px -70% 0px`,
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="記事の目次"
      className="max-h-[calc(100vh-5.5rem)] overflow-y-auto pr-1"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
        目次
      </p>
      <ol className="space-y-0.5" role="list">
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={() =>
                pushEvent("toc_click", { toc_label: label, toc_id: id })
              }
              className={[
                "block border-l-2 py-1 pl-3 pr-2 text-sm leading-snug transition-colors duration-150",
                activeId === id
                  ? "border-[#60a5fa] font-medium text-[#2563eb]"
                  : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700",
              ].join(" ")}
            >
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
