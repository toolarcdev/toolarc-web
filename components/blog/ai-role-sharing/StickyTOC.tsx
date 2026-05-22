"use client";

import { useEffect, useState } from "react";

export type TocItem = {
  id: string;
  label: string;
};

type StickyTOCProps = {
  items: TocItem[];
};

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
      { rootMargin: "-8% 0px -80% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="記事の目次">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
        目次
      </p>
      <ol className="space-y-0.5" role="list">
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
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
