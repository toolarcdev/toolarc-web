"use client";

import type { ReactNode } from "react";

type AiOutputScrollProps = {
  label: string;
  children: ReactNode;
};

export function AiOutputScroll({ label, children }: AiOutputScrollProps) {
  return (
    <figure className="ai-output-scroll-figure">
      <figcaption className="ai-output-scroll-label">{label}</figcaption>
      <div className="ai-output-scroll" tabIndex={0} aria-label={label}>
        <div className="ai-output-scroll-inner">{children}</div>
      </div>
    </figure>
  );
}
