export type AffiliateProgramId =
  | "rakurin"
  | "tenbin-ai"
  | "doraverse"
  | "ai-skill-academy";

export type AffiliateCreativeId = string;

export type AffiliateAsp = "moshimo" | "a8" | "accesstrade" | "generic";

export type AffiliatePlacement = "direct" | "peripheral-only" | "disabled";

export type AffiliateCreative = {
  href: string;
  impressionUrl?: string;
  bannerImageUrl?: string;
  width?: number;
  height?: number;
};

export type AffiliateProgram = {
  id: AffiliateProgramId;
  displayName: string;
  asp: AffiliateAsp;
  placement: AffiliatePlacement;
  creatives: Partial<Record<AffiliateCreativeId, AffiliateCreative>>;
};

export type ResolvedAffiliateLink = {
  href: string;
  asp: AffiliateAsp;
  impressionUrl?: string;
  programId: AffiliateProgramId;
  creativeId: AffiliateCreativeId;
};
