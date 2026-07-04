/**
 * Series configuration — the single source of truth for hub/spoke relationships.
 *
 * Adding a new series:
 * 1. Add an entry to `allSeries` below.
 * 2. Set `hubSlug` to the main overview article's slug.
 * 3. List spoke slugs in `spokeSlugOrder` (ordered for display).
 * That's it — all pages derive structure from this file automatically.
 */

export type SeriesConfig = {
  /** URL-safe identifier → /series/[slug] */
  slug: string;
  title: string;
  description: string;
  /** The hub (overview) article's blog slug */
  hubSlug: string;
  /** Spoke article slugs in display order (subset of blogPosts keys) */
  spokeSlugOrder?: readonly string[];
  publishedAt: string;
};

export const allSeries: readonly SeriesConfig[] = [
  {
    slug: "site-launch-series",
    title: "サイト公開シリーズ",
    description:
      "Next.js + Vercel でゼロから個人サイトを公開するまでの全工程。AI ワークフロー設計から DNS 設定トラブルまで、実際に詰まった箇所を含め記録。",
    hubSlug: "site-launch",
    spokeSlugOrder: [
      "ai-role-sharing-workflow",
      "chatgpt-cursor-claude-role-sharing-tips",
      "source-md-ai-writing",
      "vercel-domain-invalid-nameserver",
      "vercel-domain-connection-tips",
      "nextjs-canonical-settings-tips",
      "nextjs-og-image-fallback-tips",
      "nextjs-vercel-preview-check-tips",
      "nextjs-image-replace-not-reflecting",
      "nextjs-public-images-absolute-path",
      "reuse-same-image-alt-text",
      "blog-page-size-15-tips",
      "app-router-scroll-to-all-articles",
      "markdown-internal-link-relative-path-tips",
    ],
    publishedAt: "2026-05-20",
  },
  {
    slug: "claude-obsidian-workflow-series",
    title: "Claude + Obsidian Workflow シリーズ",
    description:
      "Claude と Obsidian を組み合わせた AI 活用ワークフローを深掘りするシリーズ。記事制作の効率化から知識管理まで幅広く扱います。",
    hubSlug: "claude-obsidian-workflow",
    spokeSlugOrder: [
      "captions-md-workflow",
      "captions-md-tips",
      "ai-screenshot-caption-tips",
      "source-md-tips",
      "claude-draft-review-before-publish",
      "obsidian-daily-notes-workflow",
      "obsidian-daily-notes-ai-log",
      "obsidian-mode-live-preview-source",
      "dailynote-context-compression",
      "dailynote-ai-log-source-reading-order",
      "ai-docs-duplication-tips",
      "obsidian-dashboard-focus-tips",
      "obsidian-checkbox-shortcut-ctrl-l",
      "windows-emoji-panel-shortcut",
      "obsidian-advanced-tables-source-mode",
      "obsidian-table-center-align",
      "obsidian-nested-codeblock-backticks",
      "claude-long-text-split-tips",
      "obsidian-internal-link-candidate-missing",
      "obsidian-dataview-dot-filename-fix",
      "obsidian-table-broken-live-preview-fix",
      "obsidian-checkmark-to-checkbox",
      "obsidian-checkbox-uncheck-3steps",
    ],
    publishedAt: "2026-05-20",
  },
  {
    slug: "cursor-free-series",
    title: "Cursor初心者トラブル解決シリーズ",
    description:
      "Cursorを使い始めた人向けに、無料枠・Ask/Plan/Rules・Agent停止・Git操作など、実務で詰まりやすいポイントを切り分けるシリーズ。",
    hubSlug: "cursor-free",
    spokeSlugOrder: [
      "cursor-token-heavy-tasks",
      "cursor-pro-total-usage-limit-reached",
      "cursor-rules-file-tips",
      "cursor-free-plan-tips",
      "cursor-agent-pause-recovery-tips",
      "cursor-ask-mode-tips",
      "cursor-reference-file-prompt-tips",
      "cursor-refactor-judgment-before-apply-tips",
      "cursor-plan-mode-modify-before-build-tips",
      "git-branch-basic-tips",
      "cursor-cursorignore-token-context",
      "cursor-implementation-plan-file-request",
      "ai-debug-keep-raw-error-info",
      "ai-prompt-beginner-friendly",
      "cursor-pre-dev-checklist",
      "cursor-error-triage-checklist",
      "cursor-file-check-before-edit",
      "cursor-terminal-error-first-3-lines",
      "cursor-diff-check-tips",
      "cursor-repeated-error-tips",
    ],
    publishedAt: "2026-05-25",
  },
  {
    slug: "chatgpt-account-migration-series",
    title:
      "ChatGPT機種変更・引き継ぎ｜移行シリーズ全体ガイドと読む順番",
    description:
      "機種変更やアカウント移行でChatGPTの引き継ぎ方法を知りたい方向けのシリーズ入口です。同じアカウントのスマホ変更から別アカウント移行まで、手順と注意点を読む順番つきでまとめています。",
    hubSlug: "chatgpt-account-migration",
    spokeSlugOrder: [
      "chatgpt-migration-md-checklist",
      "chatgpt-smartphone-account-migration-tips",
      "chatgpt-share-link-ai-cannot-read-url",
      "chatgpt-search-history-account-migration",
      "chatgpt-custom-instructions-for-beginners",
      "chatgpt-account-deletion-checklist",
      "chatgpt-account-migration-checklist",
      "chatgpt-history-missing-device-change",
      "chatgpt-migration-memory-check",
      "chatgpt-migration-plus-check",
      "chatgpt-plus-ios-android-transfer-tips",
      "chatgpt-migration-2fa-check",
      "chatgpt-migration-2fa-authenticator-tips",
    ],
    publishedAt: "2026-05-25",
  },
  {
    // contentFolder: 08-new-domain-seo
    slug: "new-domain-seo-series",
    title: "新規ドメインSEO・GSCシリーズ",
    description:
      "新規ドメインのSEOが進まない原因をGSCで4段階（発見→クロール→インデックス→順位）に切り分け、関連Tipsを順番に読めるシリーズ。",
    hubSlug: "new-domain-seo-troubleshooting-4steps",
    spokeSlugOrder: [
      "gsc-index-count-new-domain",
      "gsc-detected-not-indexed",
      "sitemap-index-checklist-tips",
      "gsc-image-url-404-tips",
      "gsc-image-404-vs-default-og-fallback",
      "deploy-check-image-basepath-og-file",
      "gsc-og-image-404-fixed-verify",
      "new-domain-seo-timeline-tips",
      "new-domain-seo-trouble-keyword-strategy-tips",
      "3layer-content-strategy-tips",
      "hub-series-update-timing-tips",
      "gsc-redirect-domain-normalization",
      "gsc-redirect-loop-check-tips",
      "new-domain-canonical-www-check-tips",
      "canonical-tag-setup-location",
      "gsc-index-request-priority-url",
      "gsc-index-weekly-check-tips",
      "new-domain-ymyl-avoid",
      "gsc-smartphone-googlebot-not-error",
    ],
    publishedAt: "2026-06-03",
  },
  {
    // contentFolder: 09-ai-tools-comparison
    slug: "ai-tools-comparison-series",
    title: "AIツール比較シリーズ",
    description:
      "ChatGPT・Claude・Cursorの違いと使い分けを、初心者が目的別に選べるように整理する比較シリーズ。",
    hubSlug: "ai-tools-comparison",
    spokeSlugOrder: [
      "cursor-chatgpt-usecase-comparison",
      "cursor-claude-usecase-comparison",
      "chatgpt-claude-comparison",
      "multi-generative-ai-comparison-business",
      "chatgpt-plus-free-comparison",
      "claude-pro-free-comparison",
      "cursor-strengths-weaknesses",
    ],
    publishedAt: "2026-06-28",
  },
] as const;

/** Keyed by series slug for O(1) lookup */
export const seriesMap: Record<string, SeriesConfig> = Object.fromEntries(
  allSeries.map((s) => [s.slug, s]),
);

/** Returns the SeriesConfig containing this post slug (as hub or spoke), or null. */
export function getSeriesForPost(postSlug: string): SeriesConfig | null {
  return (
    allSeries.find(
      (s) =>
        s.hubSlug === postSlug || s.spokeSlugOrder?.includes(postSlug),
    ) ?? null
  );
}

/** True if this slug is the hub article of any series. */
export function isHubPost(postSlug: string): boolean {
  return allSeries.some((s) => s.hubSlug === postSlug);
}

/** True if this slug is a spoke in any series. */
export function isSpokePost(postSlug: string): boolean {
  return allSeries.some((s) => s.spokeSlugOrder?.includes(postSlug));
}
