"use client";

import { useEffect, useRef, useState, type AnchorHTMLAttributes } from "react";
import { pushEvent } from "@/lib/analytics/gtm";

type LpLink = ({ href: string } & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel" | "referrerPolicy">) | null;
type CtaId = "CTA1" | "CTA2" | "CTA3";
const context = { lp_id: "internet-academy-generative-ai", program_id: "internet-academy", creative_id: "text-business-ai" };
const isPreview = process.env.NODE_ENV !== "production";
const label = "無料カウンセリングを予約する";

export function LpCta({ id, link }: { id: CtaId; link: LpLink }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const seen = useRef(false);
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    if (isPreview || !link?.href || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !seen.current) {
        seen.current = true;
        pushEvent("lp_cta_impression", { ...context, cta_id: id });
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [id, link?.href]);

  const content = <>{label}<span className="cta-arrow" aria-hidden="true">↗</span></>;
  if (!link) return <span className="cta-button" aria-disabled="true">カウンセリングの案内を確認しています</span>;
  if (isPreview) return <>
    <button type="button" className="cta-button" onClick={() => setNotice(true)}>{content}</button>
    {notice ? <p role="status" className="cta-note">プレビュー中は予約ボタンの外部遷移・計測を停止しています。</p> : null}
  </>;

  return <a {...link} ref={ref} className="cta-button" data-affiliate-key="internet-academy:text-business-ai" onClick={() => {
    pushEvent("outbound_click", { ...context, cta_id: id, url: link.href, link_text: label });
  }}>{content}</a>;
}
