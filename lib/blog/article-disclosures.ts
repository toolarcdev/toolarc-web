export type ArticleDisclosureChunk =
  | { kind: "markdown"; body: string }
  | { kind: "disclosure"; heading: string; body: string };

const START = "<!-- article-disclosure:start -->";
const END = "<!-- article-disclosure:end -->";

/** Opt-in section disclosure. Invalid markup stays visible as ordinary Markdown. */
export function splitArticleDisclosures(content: string): ArticleDisclosureChunk[] {
  const fallback: ArticleDisclosureChunk[] = [{ kind: "markdown", body: content }];
  if (!content.includes(START)) return fallback;
  const lines = content.split(/\r?\n/);
  const markers: { index: number; kind: "start" | "end" }[] = [];
  const outsideFence = new Set<number>();
  let fence: { char: string; length: number } | undefined;
  for (const [index, line] of lines.entries()) {
    const match = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(line);
    if (fence) {
      if (match && match[1][0] === fence.char && match[1].length >= fence.length && !match[2].trim()) {
        fence = undefined;
      }
      continue;
    }
    if (match) {
      fence = { char: match[1][0], length: match[1].length };
      continue;
    }
    outsideFence.add(index);
    if (line.trim() === START) markers.push({ index, kind: "start" });
    if (line.trim() === END) markers.push({ index, kind: "end" });
  }
  if (!markers.length || markers.length % 2) return fallback;
  const chunks: ArticleDisclosureChunk[] = [];
  let cursor = 0;
  for (let i = 0; i < markers.length; i += 2) {
    const start = markers[i];
    const end = markers[i + 1];
    if (start.kind !== "start" || end.kind !== "end") return fallback;
    let headingIndex = start.index + 1;
    while (headingIndex < end.index && !lines[headingIndex].trim()) headingIndex++;
    if (!outsideFence.has(headingIndex) || !/^##\s+\S/.test(lines[headingIndex] ?? "")) return fallback;
    const body = lines.slice(headingIndex + 1, end.index).join("\n");
    if (!body.trim()) return fallback;
    // One section only: a misplaced end marker must not hide later sections.
    for (let j = headingIndex + 1; j < end.index; j++) {
      if (outsideFence.has(j) && /^#{1,2}\s/.test(lines[j])) return fallback;
    }
    if (start.index > cursor) chunks.push({ kind: "markdown", body: lines.slice(cursor, start.index).join("\n") });
    chunks.push({ kind: "disclosure", heading: lines[headingIndex], body });
    cursor = end.index + 1;
  }
  if (cursor < lines.length) chunks.push({ kind: "markdown", body: lines.slice(cursor).join("\n") });
  return chunks;
}
