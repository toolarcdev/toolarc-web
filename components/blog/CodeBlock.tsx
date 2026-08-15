"use client";

import { useRef } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type Props = {
  children: React.ReactNode;
  className?: string;
  copyLabel?: string;
  copiedLabel?: string;
  filename?: string;
};

export function CodeBlock({
  children,
  className,
  copyLabel = "Copy",
  copiedLabel = "Copied!",
  filename,
}: Props) {
  const preRef = useRef<HTMLPreElement>(null);
  const language = className?.replace(/^language-/, "");
  const { copied, copy } = useCopyToClipboard({ language });

  const handleCopy = () => {
    copy(preRef.current?.textContent ?? "");
  };

  return (
    <div className="article-pre-wrapper">
      {filename ? (
        <p className="article-pre-filename">ファイル: {filename}</p>
      ) : null}
      <pre
        ref={preRef}
        className={filename ? "article-pre article-pre--named" : "article-pre"}
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="コードをコピー"
        className="article-copy-btn"
      >
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}
