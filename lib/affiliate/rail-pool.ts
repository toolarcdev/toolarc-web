import type { AffiliateCreativeId, AffiliateProgramId } from "./types";

/**
 * Site-wide affiliate pools (whitespace fill, not primary CTA).
 * Day-keyed rotation in Asia/Tokyo for GA4-friendly daily aggregation.
 *
 * - Rail (`lg+` TOC aside): square-ish creatives; JST日替わり1件
 * - Narrow (`lg` 未満): landscape height≤100 only; no Prime / no text fallback
 * - Same day → rail and narrow pick **different** programIds (rail first)
 */
export type AffiliatePoolEntry = {
  programId: AffiliateProgramId;
  creativeId: AffiliateCreativeId;
  linkText: string;
};

/** @deprecated Use AffiliatePoolEntry */
export type RailAffiliatePoolEntry = AffiliatePoolEntry;

export const RAIL_AFFILIATE_POOL = [
  {
    programId: "internet-academy",
    creativeId: "banner-300x250-business-ai",
    linkText: "インターネット・アカデミー",
  },
  {
    programId: "internet-academy",
    creativeId: "banner-300x250-business-ai-b",
    linkText: "インターネット・アカデミー",
  },
  {
    programId: "internet-academy",
    creativeId: "banner-300x250-ai-20s",
    linkText: "インターネット・アカデミー（20代向け）",
  },
  {
    programId: "techgym",
    creativeId: "banner-336x280",
    linkText: "テックジム",
  },
  {
    programId: "zerosuku",
    creativeId: "banner-300x300",
    linkText: "0円スクール",
  },
] as const satisfies readonly AffiliatePoolEntry[];

/** Landscape banners for viewports below lg (height ≤ 100).
 * Prefer largest available landscape ≥468px wide (typically 728×90), scale down to fit.
 * No Prime / Udemy / Audible. */
export const NARROW_AFFILIATE_POOL = [
  {
    programId: "kinokuniya",
    creativeId: "banner-728x90",
    linkText: "紀伊國屋書店",
  },
  {
    programId: "yahoo-shopping",
    creativeId: "banner-728x90",
    linkText: "Yahoo!ショッピング",
  },
  {
    programId: "techgym",
    creativeId: "banner-728x90",
    linkText: "テックジム",
  },
  {
    programId: "programming-hacks",
    creativeId: "banner-728x90",
    linkText: "ProgrammingHacks",
  },
  {
    programId: "fjord-boot-camp",
    creativeId: "banner-728x90",
    linkText: "FJORD BOOT CAMP",
  },
  {
    programId: "zerosuku",
    creativeId: "banner-728x90",
    linkText: "0円スクール",
  },
] as const satisfies readonly AffiliatePoolEntry[];

/** JST calendar date `YYYY-MM-DD` (en-CA is ISO-like). */
export function getJstDateKey(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** Stable non-crypto hash for day → pool index. */
export function hashDateKey(dateKey: string): number {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i += 1) {
    hash = (hash * 31 + dateKey.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function pickRailAffiliateForDate(
  dateKey: string = getJstDateKey(),
): AffiliatePoolEntry {
  const index = hashDateKey(dateKey) % RAIL_AFFILIATE_POOL.length;
  return RAIL_AFFILIATE_POOL[index];
}

/**
 * Narrow (mobile / below lg) pick. Rail is chosen first; narrow excludes that programId.
 */
export function pickNarrowAffiliateForDate(
  dateKey: string = getJstDateKey(),
): AffiliatePoolEntry {
  const rail = pickRailAffiliateForDate(dateKey);
  const candidates = NARROW_AFFILIATE_POOL.filter(
    (entry) => entry.programId !== rail.programId,
  );
  const index =
    hashDateKey(`${dateKey}|narrow`) % Math.max(candidates.length, 1);
  return candidates[index] ?? NARROW_AFFILIATE_POOL[0];
}

export function isRailPoolProgramId(programId: string): boolean {
  return RAIL_AFFILIATE_POOL.some((entry) => entry.programId === programId);
}

export function isNarrowPoolProgramId(programId: string): boolean {
  return NARROW_AFFILIATE_POOL.some((entry) => entry.programId === programId);
}
