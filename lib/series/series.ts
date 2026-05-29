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
      "ai-docs-duplication-tips",
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
      "cursor-free-plan-tips",
      "cursor-agent-pause-recovery-tips",
    ],
    publishedAt: "2026-05-25",
  },
  {
    slug: "chatgpt-account-migration-series",
    title: "ChatGPTアカウント移行シリーズ",
    description:
      "ChatGPTやClaudeを長期運用している人向けに、会話履歴ではなく再利用可能な知識資産を移行する考え方と実践手順を解説します。",
    hubSlug: "chatgpt-account-migration",
    spokeSlugOrder: ["chatgpt-migration-md-checklist"],
    publishedAt: "2026-05-25",
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
