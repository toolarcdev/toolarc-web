"use client";

import { useEffect, useRef, useState, type AnchorHTMLAttributes } from "react";
import { pushEvent } from "@/lib/analytics/gtm";

type LpLink = ({ href: string } & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel" | "referrerPolicy">) | null;
type CtaId = "CTA1" | "CTA3" | "CTA4";
const context = { lp_id: "programming-hacks", program_id: "programming-hacks", creative_id: "text" };
const label = "ProgrammingHacksの学習内容とプランを見る";
const preview = process.env.NODE_ENV !== "production";

export function LpCta({ id, link }: { id: CtaId; link: LpLink }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const seen = useRef(false);
  const [notice, setNotice] = useState(false);
  useEffect(() => {
    if (preview || !link?.href || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= .5 && !seen.current) {
        seen.current = true;
        pushEvent("lp_cta_impression", { ...context, cta_id: id });
        observer.disconnect();
      }
    }, { threshold: .5 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [id, link?.href]);
  // Lucide ChevronRight; upstream license retained in public/images/lp/programming-hacks/lucide-LICENSE.txt.
  const content = <><span className="cta-label">{label}</span>
    <svg className="cta-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false"><path d="m9 18 6-6-6-6" /></svg></>;
  if (preview) return <>
    <button className="cta" type="button" data-cta-id={id} onClick={() => setNotice(true)}
      aria-describedby={notice ? id + "-notice" : undefined}>{content}</button>
    {notice ? <p className="cta-preview-note" role="status" id={id + "-notice"}>プレビューのため、リンク先への移動は停止しています。</p> : null}
  </>;
  if (!link) return <button className="cta" type="button" disabled data-cta-id={id}>{content}</button>;
  return <a {...link} ref={ref} className="cta" data-cta-id={id} data-affiliate-key="programming-hacks:text"
    onClick={() => pushEvent("outbound_click", { ...context, cta_id: id, url: link.href, link_text: label })}>{content}</a>;
}
