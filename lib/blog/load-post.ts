import { readFile } from "fs/promises";
import path from "path";
import type { BlogPost } from "./types";
import { getPostMeta, type BlogSlug } from "./posts";

/** 先頭の `# タイトル` 行からタイトルを取得 */
function extractTitle(raw: string): string {
  const match = raw.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() ?? "Blog";
}

/** `## メタディスクリプション` セクションの引用文を SEO 用に取得 */
function extractDescription(raw: string): string {
  const match = raw.match(
    /## メタディスクリプション\s*\n+>\s*([\s\S]*?)(?=\n---|\n##|$)/,
  );
  return match?.[1]?.trim() ?? "";
}

/** ページ表示用：メタ情報セクション以降を除く */
function stripMetaSections(raw: string): string {
  const marker = "## メタディスクリプション";
  const index = raw.indexOf(marker);
  if (index === -1) return raw.trim();
  return raw.slice(0, index).trim();
}

/** 本文表示用：先頭の h1 はヘッダーで表示するので除去 */
function stripTitleHeading(content: string): string {
  return content.replace(/^#\s+.+\n+/, "").trim();
}

export async function loadPost(slug: BlogSlug): Promise<BlogPost> {
  const meta = getPostMeta(slug);
  const filePath = path.join(process.cwd(), meta.markdownPath);
  const raw = await readFile(filePath, "utf-8");

  const title = extractTitle(raw);
  const description = extractDescription(raw);
  const content = stripTitleHeading(stripMetaSections(raw));

  return {
    ...meta,
    title,
    description,
    content,
  };
}
