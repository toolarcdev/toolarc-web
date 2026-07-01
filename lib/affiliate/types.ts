export type AffiliateProgramId = "rakurin" | "tenbin-ai";

export type AffiliateCreativeId =
  | "text"
  | "banner-120x60"
  | "banner-300x250"
  | "banner-336x280";

export type AffiliateAsp = "moshimo" | "generic";

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
