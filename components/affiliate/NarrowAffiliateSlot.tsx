"use client";

import { useEffect, useState } from "react";
import { AffiliateImpression } from "@/components/affiliate/AffiliateImpression";
import { pushEvent } from "@/lib/analytics/gtm";
import {
  NARROW_AFFILIATE_POOL,
  buildAffiliateAnchorProps,
  getCreative,
  getJstDateKey,
  getProgram,
  isNarrowAffiliateAllowed,
  pickNarrowAffiliateForDate,
  resolveAffiliateLink,
  type AffiliatePoolEntry,
} from "@/lib/affiliate";

type NarrowSlotState = {
  entries: readonly AffiliatePoolEntry[];
  poolDate: string;
};

/**
 * lg未満向け横長バナー（本文直後・インフロー）。
 * 右レールと同日でも別案件（rail 先・narrow 後で除外）。
 * 画像は引き延ばし禁止（intrinsic 以下のみ）。開発時は4件全量。
 */
export function NarrowAffiliateSlot() {
  const [slot, setSlot] = useState<NarrowSlotState | null>(null);

  useEffect(() => {
    const poolDate = getJstDateKey();
    if (process.env.NODE_ENV === "development") {
      const entries = NARROW_AFFILIATE_POOL.filter((entry) =>
        isNarrowAffiliateAllowed(entry.programId),
      );
      if (entries.length === 0) return;
      setSlot({ entries, poolDate });
      return;
    }

    const entry = pickNarrowAffiliateForDate(poolDate);
    if (!isNarrowAffiliateAllowed(entry.programId)) return;
    setSlot({ entries: [entry], poolDate });
  }, []);

  useEffect(() => {
    if (!slot) return;
    for (const entry of slot.entries) {
      pushEvent("rail_affiliate_impression", {
        program_id: entry.programId,
        creative_id: entry.creativeId,
        pool_date: slot.poolDate,
        placement: "narrow",
      });
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <div
      className="mt-10 border-t border-slate-100 pt-6 lg:hidden"
      aria-label="おすすめリソース"
    >
      <p className="mb-2 text-xs font-medium tracking-wide text-slate-400">
        こちらも
        {process.env.NODE_ENV === "development" ? (
          <span className="ml-1 font-normal text-amber-600">（dev: 横長全件）</span>
        ) : null}
      </p>
      <ul className="space-y-4">
        {slot.entries.map((entry) => (
          <li key={`${entry.programId}:${entry.creativeId}`}>
            <NarrowAffiliateItem entry={entry} poolDate={slot.poolDate} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function NarrowAffiliateItem({
  entry,
  poolDate,
}: {
  entry: AffiliatePoolEntry;
  poolDate: string;
}) {
  const resolved = resolveAffiliateLink(entry.programId, entry.creativeId);
  const creative = getCreative(entry.programId, entry.creativeId);
  const program = getProgram(entry.programId);

  if (!resolved || !program || !creative?.bannerImageUrl) return null;

  const anchorProps = buildAffiliateAnchorProps(resolved);
  const width = creative.width ?? 234;
  const height = creative.height ?? 60;

  return (
    <a
      {...anchorProps}
      className="group block w-full max-w-full rounded-md transition hover:opacity-90"
      onClick={() => {
        pushEvent("rail_affiliate_click", {
          program_id: entry.programId,
          creative_id: entry.creativeId,
          pool_date: poolDate,
          placement: "narrow",
          url: resolved.href,
        });
        pushEvent("outbound_click", {
          url: resolved.href,
          link_text: `${entry.linkText} (narrow)`,
        });
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={creative.bannerImageUrl}
        width={width}
        height={height}
        alt={entry.linkText}
        className="block h-auto w-full max-w-full transition group-hover:opacity-95"
        style={{ border: "none" }}
      />
      <span className="mt-1.5 block text-xs leading-snug text-slate-500 group-hover:text-slate-700">
        {entry.linkText}
        {process.env.NODE_ENV === "development" ? (
          <span className="ml-1 text-slate-400">
            ({width}×{height})
          </span>
        ) : null}
      </span>
      {creative.impressionUrl && (
        <AffiliateImpression src={creative.impressionUrl} />
      )}
    </a>
  );
}
