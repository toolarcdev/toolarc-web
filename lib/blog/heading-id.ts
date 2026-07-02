/** Markdown 見出しテキストから StickyTOC / h2 id 用の slug を生成 */
export function headingToId(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u3040-\u30ff\u4e00-\u9faf-]/g, "");
}

/** `## 見出し` 行から目次アイテムを抽出 */
export function extractTocHeadings(
  markdown: string,
): { id: string; label: string }[] {
  const items: { id: string; label: string }[] = [];
  const re = /^## (.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = re.exec(markdown)) !== null) {
    const label = match[1].trim();
    items.push({ id: headingToId(label), label });
  }
  return items;
}
