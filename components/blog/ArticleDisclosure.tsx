import type { ReactNode } from "react";

export function ArticleDisclosure({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  return (
    <details className="article-disclosure">
      <summary className="article-disclosure-summary">{heading}</summary>
      <div className="article-disclosure-body">{children}</div>
    </details>
  );
}
