import Link from "next/link";
import { SITE_URL } from "@/lib/blog/constants";

export type BreadcrumbItem = {
  label: string;
  /** Omit for the current (last) item */
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

/**
 * Renders an accessible breadcrumb trail and injects BreadcrumbList JSON-LD.
 * Pass the full path including the current page as the last item (no href).
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="パンくずリスト">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-slate-500">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-x-1.5">
              {i > 0 && (
                <span aria-hidden="true" className="select-none text-slate-300">
                  /
                </span>
              )}
              {item.href ? (
                <Link href={item.href} className="hover:text-[#2563eb]">
                  {item.label}
                </Link>
              ) : (
                <span
                  className="max-w-48 truncate text-slate-700 sm:max-w-xs"
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
