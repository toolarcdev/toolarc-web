export const GITHUB_URL = "https://github.com/toolarcdev/toolarc-web";

export type NavLink = {
  href: string;
  label: string;
};

/**
 * Top-level navigation links.
 * Keep this list short — the logo already links Home.
 * Add new top-level sections here; never list individual articles.
 */
export const NAV_LINKS: readonly NavLink[] = [
  { href: "/blog", label: "Blog" },
  { href: "/series", label: "Series" },
  { href: "/tools/poe2-regex", label: "PoE2 Regex" },
] as const;
