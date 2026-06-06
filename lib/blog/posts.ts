import path from "path";
import type { BlogPostMeta } from "./types";

/**
 * 公開記事レジストリ
 *
 * キー = 公開 URL の slug（/blog/[slug]）
 * contentId = 管理用フォルダ名（content/blog/[contentId]/）
 *
 * フォルダ運用（3層）・markdownFile 命名: docs/ai-context/content-folders.md
 * - 新規1分Tips: contentId "20-investigate-something"（量産インボックス）
 * - シリーズ確定: A層（01, 02, 03, 04, 08 等）へ昇格時は contentId のみ更新（slug 不変）
 *
 * 新規記事の追加手順:
 * 1. content/blog/20-investigate-something/ に Markdown を置く（昇格済みシリーズは該当 A層）
 * 2. public/images/blog/... に画像を置く（imageBasePath）
 * 3. 下記に1件追加
 */
export const blogPosts = {
  "site-launch": {
    contentId: "01-site-launch",
    markdownFile: "001-site-launch-draft-v3.md",
    imageBasePath: "/images/blog/site-launch",
    publishedAt: "2026-05-20",
    ogImage: "01-success-webpage.png",
    category: "devops",
  },
  "claude-obsidian-workflow": {
    contentId: "02-claude-obsidian-workflow",
    markdownFile: "001-claude-obsidian-workflow-published.md",
    imageBasePath: "/images/blog/claude-obsidian-workflow",
    publishedAt: "2026-05-20",
    ogImage: "08-cursor-create-webpage.png",
    category: "ai-workflow",
  },
  "ai-role-sharing-workflow": {
    contentId: "01-site-launch",
    markdownFile: "002-claude-ai-role-sharing-workflow-revised.md",
    imageBasePath: "/images/blog/ai-role-sharing-workflow",
    publishedAt: "2026-05-22",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "source-md-ai-writing": {
    contentId: "01-site-launch",
    markdownFile: "003-source-md-ai-writing-revised.md",
    imageBasePath: "/images/blog/source-md-ai-writing",
    publishedAt: "2026-05-22",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "vercel-domain-invalid-nameserver": {
    contentId: "01-site-launch",
    markdownFile: "004-vercel-domain-invalid-nameserver.md",
    imageBasePath: "/images/blog/vercel-domain-invalid-nameserver",
    publishedAt: "2026-05-22",
    ogImage: "og.png",
    category: "devops",
  },
  "captions-md-workflow": {
    contentId: "02-claude-obsidian-workflow",
    markdownFile: "002-captions-md-workflow.md",
    imageBasePath: "/images/blog/captions-md-workflow",
    publishedAt: "2026-05-24",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "obsidian-daily-notes-workflow": {
    contentId: "02-claude-obsidian-workflow",
    markdownFile: "006-obsidian-daily-notes-workflow-final.md",
    imageBasePath: "/images/blog/obsidian-daily-notes-workflow",
    publishedAt: "2026-05-24",
    ogImage: "06-image1.png",
    category: "ai-workflow",
  },
  "ai-docs-duplication-tips": {
    contentId: "02-claude-obsidian-workflow",
    markdownFile: "008-ai-docs-duplication-tips.md",
    imageBasePath: "/images/blog/claude-obsidian-workflow",
    publishedAt: "2026-05-27",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "obsidian-daily-notes-ai-log": {
    contentId: "02-claude-obsidian-workflow",
    markdownFile: "007-obsidian-daily-notes-ai-log.md",
    imageBasePath: "/images/blog/obsidian-daily-notes-ai-log",
    publishedAt: "2026-05-27",
    ogImage: "og.svg",
    category: "ai-workflow",
  },
  "obsidian-checkbox-shortcut-ctrl-l": {
    contentId: "02-claude-obsidian-workflow",
    markdownFile: "009-obsidian-checkbox-shortcut-ctrl-l.md",
    imageBasePath: "/images/blog/obsidian-checkbox-shortcut-ctrl-l",
    publishedAt: "2026-05-27",
    ogImage: "og.svg",
    category: "ai-workflow",
  },
  "captions-md-tips": {
    contentId: "02-claude-obsidian-workflow",
    markdownFile: "003-captions-md-tips.md",
    imageBasePath: "/images/blog/claude-obsidian-workflow",
    publishedAt: "2026-05-28",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "source-md-tips": {
    contentId: "02-claude-obsidian-workflow",
    markdownFile: "005-source-md-tips.md",
    imageBasePath: "/images/blog/claude-obsidian-workflow",
    publishedAt: "2026-05-28",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "ai-screenshot-caption-tips": {
    contentId: "02-claude-obsidian-workflow",
    markdownFile: "004-screenshots-captions-tips.md",
    imageBasePath: "/images/blog/claude-obsidian-workflow",
    publishedAt: "2026-05-28",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "cursor-free": {
    contentId: "03-cursor-free",
    markdownFile: "001-cursor-free-plan-review_20260525.md",
    imageBasePath: "/images/blog/030-cursor-free",
    publishedAt: "2026-05-25",
    ogImage: "ss-01_plan-comparison.png",
    category: "tool",
  },
  "cursor-free-plan-tips": {
    contentId: "03-cursor-free",
    markdownFile: "004-cursor-free-plan-tips.md",
    imageBasePath: "/images/blog/030-cursor-free",
    publishedAt: "2026-05-26",
    ogImage: "ss-01_plan-comparison.png",
    category: "tool",
  },
  "cursor-token-heavy-tasks": {
    contentId: "03-cursor-free",
    markdownFile: "002-cursor-token-heavy-tasks.md",
    imageBasePath: "/images/blog/030-cursor-free",
    publishedAt: "2026-05-27",
    ogImage: "ss-01_plan-comparison.png",
    category: "tool",
  },
  "cursor-agent-pause-recovery-tips": {
    contentId: "03-cursor-free",
    markdownFile: "005-cursor-agent-pause-recovery-tips.md",
    imageBasePath: "/images/blog/030-cursor-free",
    publishedAt: "2026-05-29",
    ogImage: "ss-01_plan-comparison.png",
    category: "tool",
  },
  "cursor-rules-file-tips": {
    contentId: "03-cursor-free",
    markdownFile: "003-cursor-rules-file-tips.md",
    imageBasePath: "/images/blog/030-cursor-free",
    publishedAt: "2026-05-29",
    ogImage: "ss-01_plan-comparison.png",
    category: "tool",
  },
  "chatgpt-account-migration": {
    contentId: "04-chatgpt_account_migration",
    markdownFile: "001-chatgpt_account_migration.md",
    imageBasePath: "/images/blog/040-chatgpt_account_migration",
    publishedAt: "2026-05-25",
    ogImage: "ss-01-chatgpt-export.png",
    category: "ai-workflow",
  },
  "chatgpt-migration-md-checklist": {
    contentId: "04-chatgpt_account_migration",
    markdownFile: "002-chatgpt-migration-md-checklist.md",
    imageBasePath: "/images/blog/040-chatgpt_account_migration",
    publishedAt: "2026-05-28",
    ogImage: "ss-01-chatgpt-export.png",
    category: "ai-workflow",
  },
  "nextjs-image-replace-not-reflecting": {
    contentId: "05-nextjs-image-cache",
    markdownFile: "001-nextjs-image-replace-not-reflecting-tips.md",
    imageBasePath: "/images/blog/05-nextjs-image-cache",
    publishedAt: "2026-05-28",
    ogImage: "og.png",
    category: "tool",
  },
  "nextjs-canonical-settings-tips": {
    contentId: "01-site-launch",
    markdownFile: "005-canonical-settings-tips.md",
    imageBasePath: "/images/blog/01-site-launch",
    publishedAt: "2026-05-28",
    ogImage: "og.png",
    category: "devops",
  },
  "nextjs-og-image-fallback-tips": {
    contentId: "01-site-launch",
    markdownFile: "006-og-image-fallback-tips.md",
    imageBasePath: "/images/blog/01-site-launch",
    publishedAt: "2026-05-29",
    ogImage: "og.png",
    category: "devops",
  },
  "nextjs-vercel-preview-check-tips": {
    contentId: "01-site-launch",
    markdownFile: "007-vercel-preview-check-tips.md",
    imageBasePath: "/images/blog/01-site-launch",
    publishedAt: "2026-05-29",
    ogImage: "og.png",
    category: "devops",
  },
  "chatgpt-context-upload-order": {
    contentId: "06-chatgpt-how-to",
    markdownFile: "001-chatgpt-context-order-tips.md",
    imageBasePath: "/images/blog/06-chatgpt-how-to",
    publishedAt: "2026-05-28",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "ai-chat-context-reset-tips": {
    contentId: "06-chatgpt-how-to",
    markdownFile: "002-ai-chat-context-reset-tips.md",
    imageBasePath: "/images/blog/06-chatgpt-how-to",
    publishedAt: "2026-05-29",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "chatgpt-new-chat-template": {
    contentId: "06-chatgpt-how-to",
    markdownFile: "003-chatgpt-new-chat-template.md",
    imageBasePath: "/images/blog/06-chatgpt-how-to",
    publishedAt: "2026-06-02",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "compare-ai-models-opus48-tips": {
    contentId: "20-investigate-something",
    markdownFile: "200-compare-ai-models-opus48-tips.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-05-29",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "cursor-ask-mode-tips": {
    contentId: "20-investigate-something",
    markdownFile: "201-cursor-ask-mode-tips.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-05-30",
    ogImage: "og.png",
    category: "tool",
  },
  "context-repost-tips": {
    contentId: "20-investigate-something",
    markdownFile: "202-context-repost-tips.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-05-30",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "fallback-tips": {
    contentId: "20-investigate-something",
    markdownFile: "203-fallback-tips.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-05-30",
    ogImage: "og.png",
    category: "tool",
  },
  "obsidian-dashboard-focus-tips": {
    contentId: "20-investigate-something",
    markdownFile: "204-dashboard-focus-tips.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-05-30",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "hub-series-update-timing-tips": {
    contentId: "08-new-domain-seo",
    markdownFile: "012-hub-series-update-timing.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-05-31",
    ogImage: "og.png",
    category: "devops",
  },
  "dailynote-context-compression": {
    contentId: "07-daily-note-obsidian",
    markdownFile: "001-dailynote-context-compression.md",
    imageBasePath: "/images/blog/07-daily-note-obsidian",
    publishedAt: "2026-05-31",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "dailynote-ai-log-source-reading-order": {
    contentId: "07-daily-note-obsidian",
    markdownFile: "002-dailynote-ai-log-source-reading-order.md",
    imageBasePath: "/images/blog/07-daily-note-obsidian",
    publishedAt: "2026-05-31",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "new-domain-seo-timeline-tips": {
    contentId: "08-new-domain-seo",
    markdownFile: "009-new-domain-seo-timeline.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-05-31",
    ogImage: "og.png",
    category: "devops",
  },
  "cursor-reference-file-prompt-tips": {
    contentId: "20-investigate-something",
    markdownFile: "207-cursor-reference-file-prompt-tips.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-01",
    ogImage: "og.png",
    category: "tool",
  },
  "gpt-claude-two-stage-ai-workflow-tips": {
    contentId: "20-investigate-something",
    markdownFile: "208-gpt-claude-two-stage-ai-workflow-tips.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-01",
    ogImage: "og.png",
    category: "ai-workflow",
  },
  "cursor-refactor-judgment-before-apply-tips": {
    contentId: "20-investigate-something",
    markdownFile: "209-cursor-refactor-judgment-before-apply-tips.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-01",
    ogImage: "og.png",
    category: "tool",
  },
  "new-domain-seo-trouble-keyword-strategy-tips": {
    contentId: "08-new-domain-seo",
    markdownFile: "010-new-domain-seo-trouble-keyword-strategy-tips.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-01",
    ogImage: "og.png",
    category: "devops",
  },
  "curl-localhost-api-check": {
    contentId: "20-investigate-something",
    markdownFile: "211-curl-localhost-api-check.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-02",
    ogImage: "og.png",
    category: "devops",
  },
  "gsc-index-count-new-domain": {
    contentId: "08-new-domain-seo",
    markdownFile: "002-gsc-index-count-new-domain.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-02",
    ogImage: "og.png",
    category: "devops",
  },
  "gsc-detected-not-indexed": {
    contentId: "08-new-domain-seo",
    markdownFile: "003-gsc-detected-not-indexed.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-02",
    ogImage: "og.png",
    category: "devops",
  },
  "3layer-content-strategy-tips": {
    contentId: "08-new-domain-seo",
    markdownFile: "011-tips-3layer-content-strategy.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-03",
    ogImage: "og.png",
    category: "devops",
  },
  "curl-nextjs-cors-tips": {
    contentId: "20-investigate-something",
    markdownFile: "215-tips-curl-nextjs-cors.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-03",
    ogImage: "og.png",
    category: "devops",
  },
  "new-domain-seo-troubleshooting-4steps": {
    contentId: "08-new-domain-seo",
    markdownFile: "001-tips-new-domain-seo-4steps.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-03",
    ogImage: "og.png",
    category: "devops",
  },
  "sitemap-index-checklist-tips": {
    contentId: "08-new-domain-seo",
    markdownFile: "004-tips-sitemap-index-checklist.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-03",
    ogImage: "og.png",
    category: "devops",
  },
  "gsc-image-url-404-tips": {
    contentId: "08-new-domain-seo",
    markdownFile: "005-gsc-image-url-404-tips.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-04",
    ogImage: "og.png",
    category: "devops",
  },
  "gsc-og-image-404-fixed-verify": {
    contentId: "08-new-domain-seo",
    markdownFile: "008-gsc-og-image-404-fixed-verify.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-04",
    ogImage: "og.png",
    category: "devops",
  },
  "deploy-check-image-basepath-og-file": {
    contentId: "08-new-domain-seo",
    markdownFile: "007-deploy-check-image-basepath-og-file.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-04",
    ogImage: "og.png",
    category: "devops",
  },
  "gsc-image-404-vs-default-og-fallback": {
    contentId: "08-new-domain-seo",
    markdownFile: "006-gsc-image-404-vs-default-og-fallback.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-04",
    ogImage: "og.png",
    category: "devops",
  },
  "blog-page-size-15-tips": {
    contentId: "20-investigate-something",
    markdownFile: "222-blog-page-size-15-tips.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-05",
    ogImage: "og.png",
    category: "devops",
  },
  "markdown-internal-link-relative-path-tips": {
    contentId: "20-investigate-something",
    markdownFile: "223-markdown-internal-link-relative-path-tips.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-05",
    ogImage: "og.png",
    category: "devops",
  },
  "cursor-plan-mode-modify-before-build-tips": {
    contentId: "20-investigate-something",
    markdownFile: "224-cursor-plan-mode-modify-before-build-tips.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-05",
    ogImage: "og.png",
    category: "tool",
  },
  "internal-link-draft-label-update": {
    contentId: "20-investigate-something",
    markdownFile: "226-internal-link-draft-label-update.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-06",
    ogImage: "og.png",
    category: "devops",
  },
  "gsc-article-ui-change-disclaimer": {
    contentId: "20-investigate-something",
    markdownFile: "227-gsc-article-ui-change-disclaimer.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-06",
    ogImage: "og.png",
    category: "devops",
  },
  "source-md-note-disclaimer-reflection": {
    contentId: "20-investigate-something",
    markdownFile: "228-source-md-note-disclaimer-reflection.md",
    imageBasePath: "/images/blog/20-investigate-something",
    publishedAt: "2026-06-06",
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
