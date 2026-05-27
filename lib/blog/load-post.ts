import { readFile } from "fs/promises";
import path from "path";
import { loadPostMetadata } from "./metadata";
import type { BlogPost } from "./types";
import { getPostMeta, type BlogSlug } from "./posts";

/** YAML frontmatter（--- で囲まれた先頭ブロック）を除去 */
function stripFrontmatter(raw: string): string {
  if (!raw.startsWith("---")) return raw;
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return raw;
  return raw.slice(end + 4).trimStart();
}

/** frontmatter 内の description / date を取得 */
function extractFrontmatterFields(raw: string): {
  description: string;
  date: string;
  lastUpdate: string;
  tags: string[];
} {
  if (!raw.startsWith("---")) {
    return { description: "", date: "", lastUpdate: "", tags: [] };
  }
  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    return { description: "", date: "", lastUpdate: "", tags: [] };
  }
  const block = raw.slice(3, end);
  const description =
    block.match(/^description:\s*(.+)$/m)?.[1]?.trim() ?? "";
  const date = block.match(/^date:\s*(.+)$/m)?.[1]?.trim() ?? "";
  const lastUpdate = block.match(/^last_update:\s*(.+)$/m)?.[1]?.trim() ?? "";
  const tags = [...block.matchAll(/^  - (.+)$/gm)].map((m) => m[1].trim());
  return { description, date, lastUpdate, tags };
}

/** 先頭の `# タイトル` 行からタイトルを取得 */
function extractTitle(raw: string): string {
  const match = raw.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() ?? "Blog";
}

/** `## メタディスクリプション` セクションの本文を SEO 用に取得 */
function extractDescription(raw: string): string {
  const match = raw.match(
    /## メタディスクリプション\s*\n+(?:>\s*)?([\s\S]*?)(?=\n---|\n##|$)/,
  );
  return match?.[1]?.trim() ?? "";
}

/** ページ表示用：編集用メタセクション（`## 導入` より前）を除去 */
function stripEditorialPreamble(raw: string): string {
  const introIndex = raw.search(/^## 導入$/m);
  if (introIndex !== -1) {
    return raw.slice(introIndex).trim();
  }

  const marker = "## メタディスクリプション";
  const index = raw.indexOf(marker);
  if (index === -1) return raw.trim();
  return raw.slice(0, index).trim();
}

/** 本文表示用：先頭の h1 はヘッダーで表示するので除去 */
function stripTitleHeading(content: string): string {
  return content.replace(/^#\s+.+\n+/, "").trim();
}

/** Obsidian の `![[image.png]]` を標準 Markdown 画像に変換 */
function normalizeObsidianImages(raw: string): string {
  return raw.replace(/!\[\[([^\]]+)\]\]/g, "![]($1)");
}

export async function loadPost(slug: BlogSlug): Promise<BlogPost> {
  const meta = getPostMeta(slug);
  const filePath = path.join(process.cwd(), meta.markdownPath);
  const raw = await readFile(filePath, "utf-8");
  const fileMetadata = await loadPostMetadata(meta.contentId);
  const frontmatter = extractFrontmatterFields(raw);

  const body = stripFrontmatter(raw);
  const title = extractTitle(body) || fileMetadata?.title || "Blog";
  const description =
    extractDescription(body) ||
    frontmatter.description ||
    fileMetadata?.description ||
    "";
  const publishedAt = frontmatter.date || meta.publishedAt;
  const updatedAt = frontmatter.lastUpdate || undefined;
  const tags =
    fileMetadata?.tags ??
    (frontmatter.tags.length > 0 ? frontmatter.tags : []);

  let content = stripTitleHeading(stripEditorialPreamble(body));
  content = normalizeObsidianImages(content);

  return {
    ...meta,
    publishedAt,
    updatedAt,
    title,
    description,
    content,
    tags,
  };
}
