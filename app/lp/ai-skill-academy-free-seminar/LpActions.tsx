"use client";

import { useEffect, useRef, useState, type AnchorHTMLAttributes } from "react";
import { pushEvent } from "@/lib/analytics/gtm";

type CtaId = "cta-1" | "cta-2" | "cta-3" | "sticky";
export type LpLink = Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel" | "referrerPolicy"> | null;
const label = "無料セミナーの日程を見る";
const eventContext = { lp_id: "ai-skill-academy-free-seminar", program_id: "ai-skill-academy", creative_id: "text-main" };

export function LpCta({ id, link }: { id: CtaId; link: LpLink; }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const seen = useRef(false);
  useEffect(() => {
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

  if (!link?.href) return <span className="cta-unavailable">現在、セミナーの案内を確認しています。</span>;
  return <a {...link} ref={ref} id={id} className={`cta ${id === "sticky" ? "" : "body-cta"}`}
    data-affiliate-key="ai-skill-academy:text-main" onClick={() => {
      pushEvent("outbound_click", { ...eventContext, cta_id: id, url: link.href!, link_text: label });
    }}>{label}<span aria-hidden="true">→</span></a>;
}

export function StickyCta({ link }: { link: LpLink; }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const buttons = [...document.querySelectorAll<HTMLElement>('[data-lp] .body-cta')];
    const footer = document.querySelector<HTMLElement>('[data-lp] footer');
    if (!buttons.length || !footer) return;
    let frame = 0;
    const update = () => {
      const first = buttons[0].getBoundingClientRect();
      const anyVisible = buttons.some(button => {
        const rect = button.getBoundingClientRect();
        return rect.bottom > 0 && rect.top < innerHeight;
      });
      setVisible(innerWidth < 768 && first.bottom < 0 && !anyVisible && footer.getBoundingClientRect().top >= innerHeight);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(schedule);
    const root = document.querySelector('[data-lp]');
    if (root) resize.observe(root);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
    };
  }, []);
  return <aside className="sticky" hidden={!visible || !link} aria-label="無料セミナーの参加案内"><LpCta id="sticky" link={link} /></aside>;
}
