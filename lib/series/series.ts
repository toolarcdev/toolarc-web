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
      "source-md-ai-writing",
      "vercel-domain-invalid-nameserver",
      "nextjs-canonical-settings-tips",
      "nextjs-og-image-fallback-tips",
      "nextjs-vercel-preview-check-tips",
      "nextjs-image-replace-not-reflecting",
      "blog-page-size-15-tips",
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
      "obsidian-daily-notes-workflow",
      "obsidian-daily-notes-ai-log",
      "dailynote-context-compression",
      "dailynote-ai-log-source-reading-order",
      "ai-docs-duplication-tips",
      "obsidian-dashboard-focus-tips",
      "obsidian-checkbox-shortcut-ctrl-l",
    ],
    publishedAt: "2026-05-20",
  },
  {
    slug: "cursor-free-series",
    title: "Cursor無料版シリーズ",
    description:
      "Cursor無料版の実測レビューと、枠を長持ちさせる実践Tips。",
    hubSlug: "cursor-free",
    spokeSlugOrder: [
      "cursor-token-heavy-tasks",
      "cursor-rules-file-tips",
      "cursor-free-plan-tips",
      "cursor-agent-pause-recovery-tips",
      "cursor-ask-mode-tips",
      "cursor-reference-file-prompt-tips",
      "cursor-refactor-judgment-before-apply-tips",
      "cursor-plan-mode-modify-before-build-tips",
    ],
    publishedAt: "2026-05-25",
  },
  {
    slug: "chatgpt-account-migration-series",
    title: "ChatGPTアカウント移行シリーズ",
    description:
      "ChatGPTやClaudeを長期運用している人向けに、会話履歴ではなく再利用可能な知識資産を移行する考え方と実践手順を解説します。",
    hubSlug: "chatgpt-account-migration",
    spokeSlugOrder: [
      "chatgpt-migration-md-checklist",
      "chatgpt-smartphone-account-migration-tips",
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
      "gsc-index-request-priority-url",
      "gsc-index-weekly-check-tips",
      "new-domain-ymyl-avoid",
    ],
    publishedAt: "2026-06-03",
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
