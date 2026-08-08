import { isRailPoolProgramId } from "./rail-pool";
import type { AffiliateProgramId } from "./types";
import { getProgram } from "./registry";

/**
 * Direct-affiliate allow/deny for a slug × program.
 * Human-facing placement notes: docs/ai-context/affiliate-registry.md
 * General CTA rules: docs/ai-context/writing-rules.md（収益導線）
 *
 * Scope: **本文 Markdown** の `affiliate:` のみ。
 * 右レール共通枠は {@link isRailAffiliateAllowed}（本文禁止と独立）。
 */

/** ai-tools-comparison-series の hub + spoke（本文の直アフィ禁止） */
export const DIRECT_AFFILIATE_BLOCKED_SLUGS = new Set([
  "ai-tools-comparison",
  "cursor-chatgpt-usecase-comparison",
  "cursor-claude-usecase-comparison",
  "chatgpt-claude-comparison",
  "chatgpt-plus-free-comparison",
  "claude-pro-free-comparison",
  "cursor-strengths-weaknesses",
]);

export function isDirectAffiliateAllowed(
  slug: string | undefined,
  programId: string,
): boolean {
  const program = getProgram(programId);
  if (!program) return false;

  if (program.placement === "disabled") return false;
  if (program.placement === "peripheral-only") return false;

  if (slug && DIRECT_AFFILIATE_BLOCKED_SLUGS.has(slug)) {
    return false;
  }

  return program.placement === "direct";
}

/**
 * Site-wide right-rail pool (TOC下の余白埋め)。
 * 比較Seriesを含む全記事で可。プール外・disabled は不可。
 */
export function isRailAffiliateAllowed(programId: string): boolean {
  const program = getProgram(programId);
  if (!program) return false;
  if (program.placement === "disabled") return false;
  return isRailPoolProgramId(programId);
}

export function isKnownProgramId(programId: string): programId is AffiliateProgramId {
  return Boolean(getProgram(programId));
}
