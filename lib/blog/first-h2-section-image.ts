/**
 * 記事本文で「最初の H2 〜 次の H2」区間の最初の画像 src を返す。
 * LCP 向けに next/image の priority 対象を決める（ファイル名には依存しない）。
 */

const FENCED_CODE_RE = /```[\s\S]*?```|~~~[\s\S]*?~~~/g;
const H2_LINE_RE = /^##[ \t]+.+$/gm;
/** インライン画像。参照定義は対象外 */
const IMAGE_RE = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/;

/** コードフェンスを空白化して、見出し・画像の誤検出を防ぐ */
export function stripFencedCodeForScan(markdown: string): string {
  return markdown.replace(FENCED_CODE_RE, (block) => "\n".repeat(block.split("\n").length - 1));
}

/**
 * @returns markdown に書かれた画像パス（例: `/images/blog/…/h2-1.png` または相対名）。無ければ null
 */
export function getFirstH2SectionImageSrc(markdown: string): string | null {
  if (!markdown.trim()) return null;

  const scanned = stripFencedCodeForScan(markdown);
  const h2Matches = [...scanned.matchAll(H2_LINE_RE)];
  if (h2Matches.length === 0) return null;

  const first = h2Matches[0];
  const start = (first.index ?? 0) + first[0].length;
  const second = h2Matches[1];
  const end = second?.index ?? scanned.length;
  const section = scanned.slice(start, end);

  const image = IMAGE_RE.exec(section);
  if (!image) return null;

  const src = image[2]?.trim();
  return src || null;
}
