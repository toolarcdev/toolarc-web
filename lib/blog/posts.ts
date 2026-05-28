import path from "path";
import type { BlogPostMeta } from "./types";

/**
 * 公開記事レジストリ
 *
 * キー = 公開 URL の slug（/blog/[slug]）
 * contentId = 管理用フォルダ名（content/blog/[contentId]/）
 *
 * 新規記事の追加手順:
 * 1. content/blog/XX-my-post/ に Markdown を置く
 * 2. public/images/blog/my-post/ に画像を置く
 * 3. 下記に1件追加
 */
export const blogPosts = {
  "site-launch": {
    contentId: "01-site-launch",
    markdownFile: "site-launch-draft-v3.md",
    imageBasePath: "/images/blog/site-launch",
    publishedAt: "2026-05-20",
    ogImage: "01-success-webpage.png",
    category: "devops",
  },
  "claude-obsidian-workflow": {
    contentId: "02-claude-obsidian-workflow",
    markdownFile: "020-claude-obsidian-workflow-published.md",
    imageBasePath: "/images/blog/claude-obsidian-workflow",
    publishedAt: "2026-05-20",
    ogImage: "08-cursor-create-webpage.png",
    category: "ai-workflow",
  },
  "ai-role-sharing-workflow": {
    contentId: "01-site-launch",
    markdownFile: "02-claude-ai-role-sharing-workflow-revised.md",
    imageBasePath: "/images/blog/ai-role-sharing-workflow",
    publishedAt: "2026-05-22",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "source-md-ai-writing": {
    contentId: "01-site-launch",
    markdownFile: "03-source-md-ai-writing-revised.md",
    imageBasePath: "/images/blog/source-md-ai-writing",
    publishedAt: "2026-05-22",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "vercel-domain-invalid-nameserver": {
    contentId: "01-site-launch",
    markdownFile: "01-vercel-domain-invalid-nameserver.md",
    imageBasePath: "/images/blog/vercel-domain-invalid-nameserver",
    publishedAt: "2026-05-22",
    ogImage: "og.png",
    category: "devops",
  },
  "captions-md-workflow": {
    contentId: "02-claude-obsidian-workflow",
    markdownFile: "022-captions-md-workflow.md",
    imageBasePath: "/images/blog/captions-md-workflow",
    publishedAt: "2026-05-24",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "obsidian-daily-notes-workflow": {
    contentId: "02-claude-obsidian-workflow",
    markdownFile: "023-obsidian-daily-notes-workflow-final.md",
    imageBasePath: "/images/blog/obsidian-daily-notes-workflow",
    publishedAt: "2026-05-24",
    ogImage: "06-image1.png",
    category: "ai-workflow",
  },
  "ai-docs-duplication-tips": {
    contentId: "02-claude-obsidian-workflow",
    markdownFile: "024-ai-docs-duplication-tips.md",
    imageBasePath: "/images/blog/claude-obsidian-workflow",
    publishedAt: "2026-05-27",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "obsidian-daily-notes-ai-log": {
    contentId: "02-claude-obsidian-workflow",
    markdownFile: "025-obsidian-daily-notes-ai-log.md",
    imageBasePath: "/images/blog/obsidian-daily-notes-ai-log",
    publishedAt: "2026-05-27",
    ogImage: "og.svg",
    category: "ai-workflow",
  },
  "obsidian-checkbox-shortcut-ctrl-l": {
    contentId: "02-claude-obsidian-workflow",
    markdownFile: "026-obsidian-checkbox-shortcut-ctrl-l.md",
    imageBasePath: "/images/blog/obsidian-checkbox-shortcut-ctrl-l",
    publishedAt: "2026-05-27",
    ogImage: "og.svg",
    category: "ai-workflow",
  },
  "captions-md-tips": {
    contentId: "02-claude-obsidian-workflow",
    markdownFile: "027-captions-md-tips.md",
    imageBasePath: "/images/blog/claude-obsidian-workflow",
    publishedAt: "2026-05-28",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "source-md-tips": {
    contentId: "02-claude-obsidian-workflow",
    markdownFile: "028-source-md-tips.md",
    imageBasePath: "/images/blog/claude-obsidian-workflow",
    publishedAt: "2026-05-28",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "ai-screenshot-caption-tips": {
    contentId: "02-claude-obsidian-workflow",
    markdownFile: "029-screenshots-captions-tips.md",
    imageBasePath: "/images/blog/claude-obsidian-workflow",
    publishedAt: "2026-05-28",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "cursor-free": {
    contentId: "03-cursor-free",
    markdownFile: "030-cursor-free-plan-review_20260525.md",
    imageBasePath: "/images/blog/030-cursor-free",
    publishedAt: "2026-05-25",
    ogImage: "ss-01_plan-comparison.png",
    category: "tool",
  },
  "cursor-free-plan-tips": {
    contentId: "03-cursor-free",
    markdownFile: "031-cursor-free-plan-tips.md",
    imageBasePath: "/images/blog/030-cursor-free",
    publishedAt: "2026-05-26",
    ogImage: "ss-01_plan-comparison.png",
    category: "tool",
  },
  "cursor-token-heavy-tasks": {
    contentId: "03-cursor-free",
    markdownFile: "032-cursor-token-heavy-tasks.md",
    imageBasePath: "/images/blog/030-cursor-free",
    publishedAt: "2026-05-27",
    ogImage: "ss-01_plan-comparison.png",
    category: "tool",
  },
  "chatgpt-account-migration": {
    contentId: "04-chatgpt_account_migration",
    markdownFile: "040-chatgpt_account_migration.md",
    imageBasePath: "/images/blog/040-chatgpt_account_migration",
    publishedAt: "2026-05-25",
    ogImage: "ss-01-chatgpt-export.png",
    category: "ai-workflow",
  },
  "chatgpt-migration-md-checklist": {
    contentId: "04-chatgpt_account_migration",
    markdownFile: "041-chatgpt-migration-md-checklist.md",
    imageBasePath: "/images/blog/040-chatgpt_account_migration",
    publishedAt: "2026-05-28",
    ogImage: "ss-01-chatgpt-export.png",
    category: "ai-workflow",
  },
  "nextjs-image-replace-not-reflecting": {
    contentId: "05-nextjs-image-cache",
    markdownFile: "050-nextjs-image-replace-not-reflecting-tips.md",
    imageBasePath: "/images/blog/05-nextjs-image-cache",
    publishedAt: "2026-05-28",
    ogImage: "og.png",
    category: "tool",
  },
  "nextjs-canonical-settings-tips": {
    contentId: "01-site-launch",
    markdownFile: "04-canonical-settings-tips.md",
    imageBasePath: "/images/blog/01-site-launch",
    publishedAt: "2026-05-28",
    ogImage: "og.png",
    category: "devops",
  },
  "chatgpt-context-upload-order": {
    contentId: "06-chatgpt-how-to",
    markdownFile: "061-chatgpt-context-order-tips.md",
    imageBasePath: "/images/blog/06-chatgpt-how-to",
    publishedAt: "2026-05-28",
    ogImage: "og.png",
    category: "ai-workflow",
  },
} as const satisfies Record<string, import("./types").BlogPostConfig>;

/** 公開 URL の slug 型（blogPosts のキーから自動生成） */
export type BlogSlug = keyof typeof blogPosts;

export const blogSlugs = Object.keys(blogPosts) as BlogSlug[];

export function isBlogSlug(slug: string): slug is BlogSlug {
  return slug in blogPosts;
}

function buildMarkdownPath(contentId: string, markdownFile: string): string {
  return path.join("content", "blog", contentId, markdownFile);
}

export function getPostMeta(slug: BlogSlug): BlogPostMeta {
  const config = blogPosts[slug];
  return {
    slug,
    ...config,
    markdownPath: buildMarkdownPath(config.contentId, config.markdownFile),
  };
}

export function getAllPostMeta(): BlogPostMeta[] {
  return blogSlugs.map(getPostMeta);
}
