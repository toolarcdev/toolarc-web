"use client";

import { useEffect, useState } from "react";
import { AffiliateImpression } from "@/components/affiliate/AffiliateImpression";
import { pushEvent } from "@/lib/analytics/gtm";
import {
  buildAffiliateAnchorProps,
  getCreative,
  getJstDateKey,
  getProgram,
  isRailAffiliateAllowed,
  pickRailAffiliateForDate,
  resolveAffiliateLink,
  type AffiliatePoolEntry,
} from "@/lib/affiliate";

type RailSlotState = {
  entry: AffiliatePoolEntry;
  poolDate: string;
};

/**
 * TOC 下の共通アフィ1枠（余白埋め）。
 * JST日替わり1件。サーバー乱数なし（マウント後確定・hydration安全）。
 */
export function RailAffiliateSlot() {
  const [slot, setSlot] = useState<RailSlotState | null>(null);

  useEffect(() => {
    const poolDate = getJstDateKey();
    const entry = pickRailAffiliateForDate(poolDate);
    if (!isRailAffiliateAllowed(entry.programId)) return;
    setSlot({ entry, poolDate });
  }, []);

  useEffect(() => {
    if (!slot) return;
    pushEvent("rail_affiliate_impression", {
      program_id: slot.entry.programId,
      creative_id: slot.entry.creativeId,
      pool_date: slot.poolDate,
      placement: "rail",
    });
  }, [slot]);

  if (!slot) return null;

  const { entry, poolDate } = slot;
  const resolved = resolveAffiliateLink(entry.programId, entry.creativeId);
  const creative = getCreative(entry.programId, entry.creativeId);
  const program = getProgram(entry.programId);

  if (!resolved || !program || !creative?.bannerImageUrl) return null;

  const anchorProps = buildAffiliateAnchorProps(resolved);

  return (
    <div
      className="mt-4 shrink-0 border-t border-slate-100 pt-4"
      aria-label="おすすめリソース"
    >
      <p className="mb-2 text-xs font-medium tracking-wide text-slate-400">
        こちらも
      </p>
      <a
        {...anchorProps}
        className="group block rounded-md transition hover:opacity-90"
        onClick={() => {
          pushEvent("rail_affiliate_click", {
            program_id: entry.programId,
            creative_id: entry.creativeId,
            pool_date: poolDate,
            placement: "rail",
            url: resolved.href,
          });
          pushEvent("outbound_click", {
            url: resolved.href,
            link_text: `${entry.linkText} (rail)`,
          });
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={creative.bannerImageUrl}
          width={creative.width ?? 200}
          height={creative.height ?? 200}
          alt={entry.linkText}
          className="h-auto w-full max-w-full transition group-hover:opacity-95"
          style={{ border: "none" }}
        />
        <span className="mt-1.5 block text-xs leading-snug text-slate-500 group-hover:text-slate-700">
          {entry.linkText}
        </span>
      </a>
      {creative.impressionUrl && (
        <AffiliateImpression src={creative.impressionUrl} />
      )}
    </div>
  );
}
