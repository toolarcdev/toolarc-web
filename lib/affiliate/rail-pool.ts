import type { AffiliateCreativeId, AffiliateProgramId } from "./types";

/**
 * Site-wide right-rail affiliate pool (whitespace fill, not primary CTA).
 * Day-keyed rotation in Asia/Tokyo for GA4-friendly daily aggregation.
 */
export type RailAffiliatePoolEntry = {
  programId: AffiliateProgramId;
  /** Prefer creatives that fit the ~220px rail (e.g. 200×200). */
  creativeId: AffiliateCreativeId;
  linkText: string;
};

export const RAIL_AFFILIATE_POOL = [
  {
    programId: "udemy",
    creativeId: "banner-200x200",
    linkText: "Udemyで学ぶ",
  },
  {
    programId: "audible",
    creativeId: "banner-200x200",
    linkText: "Audible",
  },
  {
    programId: "kinokuniya",
    creativeId: "banner-234x60",
    linkText: "紀伊國屋書店",
  },
  {
    programId: "amazon-prime-video",
    creativeId: "banner-200x200",
    linkText: "Prime Video",
  },
  {
    programId: "yahoo-shopping",
    creativeId: "banner-200x200",
    linkText: "Yahoo!ショッピング",
  },
] as const satisfies readonly RailAffiliatePoolEntry[];

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
): RailAffiliatePoolEntry {
  const index = hashDateKey(dateKey) % RAIL_AFFILIATE_POOL.length;
  return RAIL_AFFILIATE_POOL[index];
}

export function isRailPoolProgramId(programId: string): boolean {
  return RAIL_AFFILIATE_POOL.some((entry) => entry.programId === programId);
}
