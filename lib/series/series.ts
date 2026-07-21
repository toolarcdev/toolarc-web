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
      "vercel-production-not-reflecting-tips",
      "vercel-promote-to-production-tips",
      "vercel-auto-deploy-not-working-tips",
      "create-next-app-current-folder",
      "nextjs-301-redirect-legacy-url-tips",
      "series-ts-get-series-for-post-first-win-same-commit-tips",
      "blog-rewrite-published-date-rule-tips",
      "git-add-u-tracked-file-gitignore",
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
      "obsidian-ai-log-codeblock-fix",
      "obsidian-wikilink-file-heading-syntax",
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
    title: "Cursor 開発シリーズ",
    description:
      "Cursor の Rules・Agent・Plan・MCP・GitHub 連携から比較・トラブルシュートまで、開発者向けに読む順番つきで整理したシリーズ。",
    hubSlug: "cursor-free",
    spokeSlugOrder: [
      "cursor-rules-file-tips",
      "cursor-recommended-settings-tips", // A-5 Settings（#1直後）
      "cursor-plan-mode-modify-before-build-tips",
      "cursor-ask-mode-tips",
      "cursor-agent-scope-tips",
      "cursor-agent-pause-recovery-tips",
      "cursor-agent-unintended-edit-git-restore-tips",
      "cursor-plan-mode-md-save-tips",
      "cursor-reference-file-prompt-tips",
      "cursor-cursorignore-token-context",
      "claude-cursor-2step-workflow-tips",
      "cursor-pre-dev-checklist",
      "cursor-agent-gh-pr-create-fill",
      "cursor-workspace-multi-repo-tips",
      "git-branch-basic-tips",
      "cursor-strengths-weaknesses",
      "cursor-claude-usecase-comparison",
      "cursor-chatgpt-usecase-comparison",
      "cursor-auto-manual-model-quality-tips",
      "cursor-free-plan-tips",
      "cursor-token-heavy-tasks",
      "cursor-pro-total-usage-limit-reached",
      "cursor-usage-limit-reached-3-steps",
      "cursor-agent-failed-tips",
      "cursor-error-triage-checklist",
      "cursor-slow-troubleshoot-tips",
      "cursor-windows-slow-check-tips",
      "cursor-diff-check-tips",
      "cursor-diff-shortcut-tips",
      "cursor-file-check-before-edit",
      "cursor-terminal-error-first-3-lines",
      "cursor-repeated-error-tips",
      "cursor-refactor-judgment-before-apply-tips",
      "cursor-implementation-plan-file-request",
      "git-stash-pop-tips",
      "cursor-chatgpt-review-tips",
      "ai-debug-keep-raw-error-info",
      "ai-prompt-beginner-friendly",
      "cursor-theme-color-change-tips",
      "cursor-review-keep-all-stale-diff",
    ],
    publishedAt: "2026-05-25",
  },
  {
    // contentFolder: 10-claude-developer
    slug: "claude-developer-series",
    title: "Claude 開発シリーズ（Claude Code / API）",
    description:
      "Claude Code / API を開発・実装の入口から読むシリーズ。Obsidian執筆ワークフローは別シリーズ。",
    hubSlug: "claude-code-guide",
    spokeSlugOrder: [
      "chatgpt-claude-comparison",
      "claude-pro-free-comparison",
      "gpt-claude-two-stage-ai-workflow-tips",
      "compare-ai-models-opus48-tips",
      "ai-prompt-engineering-beginner-roadmap",
    ],
    publishedAt: "2026-07-16",
  },
  {
    // contentFolder: 11-mcp
    slug: "mcp-series",
    title: "Model Context Protocol（MCP）シリーズ",
    description:
      "MCP（Model Context Protocol）の用語・接続の入口。Client別 How-to は Spoke で拡充する。",
    hubSlug: "mcp-guide",
    spokeSlugOrder: [],
    publishedAt: "2026-07-16",
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
      "chatgpt-long-text-h1-h2-format-tips",
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
      "chatgpt-device-change-handover-tips",
      "chatgpt-device-change-3-screens-tips",
      "chatgpt-account-migration-3-checkpoints",
      "chatgpt-pdf-attachment-order-tips",
      "chatgpt-device-change-account-migration-3-points",
      "chatgpt-device-change-wrong-login-history-empty",
      "chatgpt-web-app-login-mismatch-fix",
      "chatgpt-device-change-google-login-tips",
      "chatgpt-projects-device-change-restore-tips",
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
      "1min-tips-ai-seo-fit-tips",
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
      "ChatGPT・Claude・Cursorの使い分けの入口。ツール別の詳細は Cursor / Claude / MCP 各開発シリーズから読めます。",
    hubSlug: "ai-tools-comparison",
    spokeSlugOrder: [
      "multi-generative-ai-comparison-business",
      "chatgpt-plus-free-comparison",
      "ai-basics-before-chatgpt-claude-checklist",
      "chatgpt-claude-prompt-writing-comparison",
      "chatgpt-claude-business-writing-comparison",
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
