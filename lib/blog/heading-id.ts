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
  let openFence: string | undefined;

  for (const line of markdown.split(/\r\n|[\r\n]/)) {
    const fence = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(line);
    if (openFence) {
      if (
        fence &&
        fence[1].startsWith(openFence) &&
        /^[ \t]*$/.test(fence[2])
      ) {
        openFence = undefined;
      }
      continue;
    }
    if (fence && (fence[1][0] === "~" || !fence[2].includes("`"))) {
      openFence = fence[1];
      continue;
    }

    const heading = /^## (.+)$/.exec(line);
    if (!heading) continue;
    const label = heading[1].trim();
    items.push({ id: headingToId(label), label });
  }
  return items;
}
