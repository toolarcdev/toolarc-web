import type { AnchorHTMLAttributes } from "react";

export function buildMoshimoAnchorProps(
  href: string,
): AnchorHTMLAttributes<HTMLAnchorElement> {
  return {
    href,
    target: "_blank",
    rel: "nofollow noopener noreferrer",
    referrerPolicy: "no-referrer-when-downgrade",
    ...({ attributionsrc: "" } as AnchorHTMLAttributes<HTMLAnchorElement>),
  };
}
