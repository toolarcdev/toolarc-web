"use client";

import { pushEvent } from "@/lib/analytics/gtm";
import {
  buildAffiliateAnchorProps,
  getCreative,
  getProgram,
  resolveAffiliateLink,
} from "@/lib/affiliate";
import { AffiliateImpression } from "./AffiliateImpression";

type AffiliateBannerProps = {
  programId: string;
  creativeId: string;
};

export function AffiliateBanner({ programId, creativeId }: AffiliateBannerProps) {
  const resolved = resolveAffiliateLink(programId, creativeId);
  const creative = getCreative(programId, creativeId);
  const program = getProgram(programId);

  if (!resolved || !creative?.bannerImageUrl || !program) {
    return null;
  }

  const anchorProps = buildAffiliateAnchorProps(resolved);

  return (
    <figure className="article-figure my-6">
      <a
        {...anchorProps}
        className="article-link inline-block"
        onClick={() =>
          pushEvent("outbound_click", {
            url: resolved.href,
            link_text: `${program.displayName} banner`,
          })
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={creative.bannerImageUrl}
          width={creative.width ?? 300}
          height={creative.height ?? 250}
          alt={program.displayName}
          className="max-w-full h-auto"
          style={{ border: "none" }}
        />
      </a>
      {creative.impressionUrl && (
        <AffiliateImpression src={creative.impressionUrl} />
      )}
    </figure>
  );
}
