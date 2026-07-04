import type { AnchorHTMLAttributes } from "react";
import { buildA8AnchorProps } from "./asp/a8";
import { buildGenericAnchorProps } from "./asp/generic";
import { buildMoshimoAnchorProps } from "./asp/moshimo";
import { getCreative, getProgram } from "./registry";
import type {
  AffiliateCreativeId,
  AffiliateProgramId,
  ResolvedAffiliateLink,
} from "./types";

const AFFILIATE_HREF_PREFIX = "affiliate:";
const AFFILIATE_HREF_RE = /^affiliate:([a-z0-9-]+):([a-z0-9-]+)$/;
/** Markdown リンク `[text](affiliate:program:creative)` のみ */
export const AFFILIATE_LINK_RE = /\(affiliate:([a-z0-9-]+):([a-z0-9-]+)\)/g;
export const AFFILIATE_BANNER_MARKER_RE =
  /<!--\s*affiliate:banner:([a-z0-9-]+):([a-z0-9-]+)\s*-->/g;

export function parseAffiliateHref(
  href: string | undefined,
): { programId: AffiliateProgramId; creativeId: AffiliateCreativeId } | null {
  if (!href?.startsWith(AFFILIATE_HREF_PREFIX)) return null;
  const match = href.match(AFFILIATE_HREF_RE);
  if (!match) return null;
  return {
    programId: match[1] as AffiliateProgramId,
    creativeId: match[2] as AffiliateCreativeId,
  };
}

export function resolveAffiliateLink(
  programId: string,
  creativeId: string,
): ResolvedAffiliateLink | null {
  const creative = getCreative(programId, creativeId);
  const program = getProgram(programId);
  if (!creative || !program) return null;

  return {
    href: creative.href,
    asp: program.asp,
    impressionUrl: creative.impressionUrl,
    programId: programId as AffiliateProgramId,
    creativeId: creativeId as AffiliateCreativeId,
  };
}

export function buildAffiliateAnchorProps(
  resolved: ResolvedAffiliateLink,
): AnchorHTMLAttributes<HTMLAnchorElement> {
  if (resolved.asp === "a8") {
    return buildA8AnchorProps(resolved.href);
  }
  if (resolved.asp === "moshimo") {
    return buildMoshimoAnchorProps(resolved.href);
  }
  return buildGenericAnchorProps(resolved.href);
}

export type AffiliateImpressionRef = {
  programId: AffiliateProgramId;
  creativeId: AffiliateCreativeId;
  impressionUrl: string;
};

export function collectAffiliateImpressions(
  content: string,
): AffiliateImpressionRef[] {
  const seen = new Set<string>();
  const impressions: AffiliateImpressionRef[] = [];

  const addRef = (programId: string, creativeId: string) => {
    const key = `${programId}:${creativeId}`;
    if (seen.has(key)) return;
    const creative = getCreative(programId, creativeId);
    if (!creative?.impressionUrl) return;
    seen.add(key);
    impressions.push({
      programId: programId as AffiliateProgramId,
      creativeId: creativeId as AffiliateCreativeId,
      impressionUrl: creative.impressionUrl,
    });
  };

  for (const match of content.matchAll(AFFILIATE_LINK_RE)) {
    addRef(match[1], match[2]);
  }
  for (const match of content.matchAll(AFFILIATE_BANNER_MARKER_RE)) {
    addRef(match[1], match[2]);
  }

  return impressions;
}
