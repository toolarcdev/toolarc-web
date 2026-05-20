export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.toolarc.jp";

export function blogPostUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}
