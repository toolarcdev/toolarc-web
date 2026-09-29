"use client";

import { useEffect, useRef, type AnchorHTMLAttributes } from "react";
import { pushEvent } from "@/lib/analytics/gtm";
import styles from "./page.module.css";

type CtaId = "cta-1" | "cta-2";
export type LpLink = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "target" | "rel" | "referrerPolicy"
> | null;

const label = "無料オンラインセミナーの日程確認";
const eventContext = {
  lp_id: "ai-skill-academy-paid-school",
  program_id: "ai-skill-academy",
  creative_id: "text-main",
};
const isPreview = process.env.NODE_ENV !== "production";

export function LpCta({ id, link }: { id: CtaId; link: LpLink }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const seen = useRef(false);

  useEffect(() => {
    if (isPreview) return;
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !seen.current) {
        seen.current = true;
        pushEvent("lp_cta_impression", { ...eventContext, cta_id: id });
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [id, link]);

  if (!link?.href) {
    return <span className={styles.ctaUnavailable}>現在、セミナーの案内を確認しています。</span>;
  }

  if (isPreview) {
    return (
      <span className={`${styles.cta} ${styles.ctaPreview}`} aria-disabled="true">
        {label}<span aria-hidden="true">→</span>
      </span>
    );
  }

  return (
    <a
      {...link}
      ref={ref}
      id={id}
      className={styles.cta}
      data-affiliate-key="ai-skill-academy:text-main"
      onClick={() => {
        pushEvent("outbound_click", {
          ...eventContext,
          cta_id: id,
          url: link.href!,
          link_text: label,
        });
      }}
    >
      {label}<span aria-hidden="true">→</span>
    </a>
  );
}
