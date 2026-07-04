import type { AnchorHTMLAttributes } from "react";

export function buildA8AnchorProps(
  href: string,
): AnchorHTMLAttributes<HTMLAnchorElement> {
  return {
    href,
    target: "_blank",
    rel: "nofollow noopener noreferrer",
    referrerPolicy: "no-referrer-when-downgrade",
  };
}
