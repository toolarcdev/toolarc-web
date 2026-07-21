export const GITHUB_URL = "https://github.com/toolarcdev/toolarc-web";

export type NavLink = {
  href: string;
  label: string;
};

/**
 * Top-level navigation links.
 * Keep this list short — the logo already links Home.
 * Add new top-level sections here; never list individual articles.
 * GitHub is About-only (site design D3 / C5) — do not put in the header.
 */
export const NAV_LINKS: readonly NavLink[] = [
  { href: "/blog", label: "Blog" },
  { href: "/series", label: "Series" },
  { href: "/tools/poe2-regex", label: "PoE2 Regex" },
  { href: "/about", label: "About" },
] as const;

/** 当面の検索入口（本格検索は記事増後に別ゲート） */
export const SEARCH_ENTRY_HREF = "/blog";
export const SEARCH_ENTRY_LABEL = "検索";
