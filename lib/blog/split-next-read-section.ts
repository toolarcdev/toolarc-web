export type NextReadLink = {
  title: string;
  href: string;
};

const LINK_RE = /^-\s+\[([^\]]+)\]\(([^)]+)\)\s*$/gm;

/** `## 次に読む` セクションを本文から切り出す（MD 本文は変更しない・表示層のみ） */
export function splitNextReadSection(content: string): {
  before: string;
  links: NextReadLink[];
  after: string;
} | null {
  const header = "## 次に読む";
  const idx = content.indexOf(header);
  if (idx === -1) return null;

  const before = content.slice(0, idx).trimEnd();
  let rest = content.slice(idx + header.length).trimStart();

  const divider = rest.search(/\n---\s*\n/);
  if (divider === -1) return null;

  const linkBlock = rest.slice(0, divider).trim();
  const after = rest.slice(divider).replace(/^\n---\s*\n/, "").trim();

  const links: NextReadLink[] = [];
  let match: RegExpExecArray | null;
  const re = new RegExp(LINK_RE.source, "gm");
  while ((match = re.exec(linkBlock)) !== null) {
    links.push({ title: match[1].trim(), href: match[2].trim() });
  }

  if (links.length === 0) return null;

  return { before, links, after };
}

/** `/blog/slug` 形式の href から slug を抽出 */
export function hrefToBlogSlug(href: string): string | null {
  const match = href.match(/^\/blog\/([^/?#]+)\/?$/);
  return match?.[1] ?? null;
}
