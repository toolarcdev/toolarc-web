export type {
  AffiliateAsp,
  AffiliateCreative,
  AffiliateCreativeId,
  AffiliatePlacement,
  AffiliateProgram,
  AffiliateProgramId,
  ResolvedAffiliateLink,
} from "./types";
export { getCreative, getProgram, isKnownAffiliateRef, listProgramIds } from "./registry";
export {
  AFFILIATE_BANNER_MARKER_RE,
  AFFILIATE_LINK_RE,
  buildAffiliateAnchorProps,
  collectAffiliateImpressions,
  parseAffiliateHref,
  resolveAffiliateLink,
  type AffiliateImpressionRef,
} from "./resolve";
export { splitAffiliateSections, type AffiliateBodySegment } from "./split-affiliate-sections";
export {
  DIRECT_AFFILIATE_BLOCKED_SLUGS,
  isDirectAffiliateAllowed,
  isNarrowAffiliateAllowed,
  isRailAffiliateAllowed,
} from "./policy";
export {
  NARROW_AFFILIATE_POOL,
  RAIL_AFFILIATE_POOL,
  getJstDateKey,
  hashDateKey,
  isNarrowPoolProgramId,
  isRailPoolProgramId,
  pickNarrowAffiliateForDate,
  pickRailAffiliateForDate,
  type AffiliatePoolEntry,
  type RailAffiliatePoolEntry,
} from "./rail-pool";
