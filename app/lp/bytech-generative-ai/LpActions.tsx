"use client";

import { useEffect, useRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { pushEvent } from "@/lib/analytics/gtm";
import styles from "./page.module.css";

export type BytechCtaId = "CTA1" | "CTA2" | "CTA3" | "CTA4";
export type LpLink =
  | ({ href: string } & Pick<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      "target" | "rel" | "referrerPolicy"
    >)
  | null;

const eventContext = {
  lp_id: "bytech-generative-ai",
  program_id: "bytech",
  creative_id: "text",
};
const isPreview = process.env.NODE_ENV !== "production";

export function LpCta({
  id,
  label,
  link,
  children,
}: {
  id: BytechCtaId;
  label: string;
  link: LpLink;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const seen = useRef(false);
  const linkText = typeof children === "string" ? children : "無料カウンセリング";
  const fixedLabel = `${id} · ${label}`;

  useEffect(() => {
    if (isPreview || !link?.href) return;
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
  }, [id, link?.href]);

  if (!link?.href) {
    return (
      <span className={`${styles.cta} ${styles.ctaUnavailable}`} data-debug-id={id} aria-disabled="true">
        <span>カウンセリングの案内を確認しています</span>
        <span className={styles.ctaDebugLabel} aria-hidden="true">{fixedLabel}</span>
      </span>
    );
  }

  if (isPreview) {
    return (
      <span className={`${styles.cta} ${styles.ctaPreview}`} data-debug-id={id} aria-disabled="true">
        <span>{children}</span><span className={styles.ctaArrow} aria-hidden="true">→</span>
        <span className={styles.ctaDebugLabel} aria-hidden="true">{fixedLabel}</span>
        <small>プレビュー中は外部遷移を停止しています</small>
      </span>
    );
  }

  return (
    <a
      {...link}
      ref={ref}
      className={styles.cta}
      data-debug-id={id}
      data-affiliate-key="bytech:text"
      onClick={() => {
        pushEvent("outbound_click", {
          ...eventContext,
          cta_id: id,
          url: link.href,
          link_text: linkText,
        });
      }}
    >
      <span>{children}</span><span className={styles.ctaArrow} aria-hidden="true">→</span>
      <span className={styles.ctaDebugLabel} aria-hidden="true">{fixedLabel}</span>
    </a>
  );
}
