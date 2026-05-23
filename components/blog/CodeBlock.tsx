"use client";

import { useRef } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function CodeBlock({ children, className }: Props) {
  const preRef = useRef<HTMLPreElement>(null);
  const language = className?.replace(/^language-/, "");
  const { copied, copy } = useCopyToClipboard({ language });

  const handleCopy = () => {
    copy(preRef.current?.textContent ?? "");
  };

  return (
    <div className="article-pre-wrapper">
      <pre ref={preRef} className="article-pre">
        {children}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="コードをコピー"
        className="article-copy-btn"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
