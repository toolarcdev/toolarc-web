import type { AnchorHTMLAttributes } from "react";

export function buildGenericAnchorProps(
  href: string,
): AnchorHTMLAttributes<HTMLAnchorElement> {
  return {
    href,
    target: "_blank",
    rel: "nofollow noopener noreferrer",
  };
}
