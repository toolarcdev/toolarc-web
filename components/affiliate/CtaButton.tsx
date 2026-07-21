"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

type CtaButtonVariant = "solid" | "outline";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: CtaButtonVariant;
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children" | "onClick" | "className"
>;

const VARIANT_CLASS: Record<CtaButtonVariant, string> = {
  solid:
    "border border-[#1d4ed8] bg-[#2563eb] text-white hover:bg-[#1d4ed8] hover:shadow-sm",
  outline:
    "border border-[#2563eb] bg-white text-[#2563eb] hover:bg-[#eff6ff] hover:shadow-sm",
};

/**
 * Full-width-leaning text CTA for revenue articles (site design D1).
 * Immediate hover only — no delay / pulse loops.
 */
export function CtaButton({
  href,
  children,
  variant = "solid",
  onClick,
  ...anchorProps
}: CtaButtonProps) {
  return (
    <a
      {...anchorProps}
      href={href}
      onClick={onClick}
      className={`my-6 flex w-full max-w-xl items-center justify-center rounded-lg px-5 py-3.5 text-center text-sm font-semibold leading-6 transition-colors sm:text-base ${VARIANT_CLASS[variant]}`}
    >
      {children}
    </a>
  );
}
