"use client";

import { useState, useRef } from "react";
import { pushEvent } from "@/lib/analytics/gtm";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function CodeBlock({ children, className }: Props) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const language = className?.replace(/^language-/, "");

  const handleCopy = async () => {
    const text = preRef.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      pushEvent("copy_code", { language });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API not available
    }
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
