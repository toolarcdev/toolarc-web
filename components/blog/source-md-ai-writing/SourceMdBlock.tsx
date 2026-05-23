"use client";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type SourceMdBlockProps = {
  filename?: string;
  code: string;
  label?: string;
};

export function SourceMdBlock({
  filename = "source.md",
  code,
  label,
}: SourceMdBlockProps) {
  const { copied, copy } = useCopyToClipboard({ timeout: 1800 });

  function handleCopy() {
    copy(code);
  }

  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-[#dbeafe] bg-white shadow-sm">
      {/* File header bar */}
      <div className="flex items-center justify-between border-b border-[#dbeafe] bg-[#f8fbff] px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          {/* Traffic-light dots — purely decorative */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#fca5a5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#fde68a]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#86efac]" />
          </div>
          <span className="font-mono text-xs font-medium text-slate-500">
            {filename}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="コードをコピー"
          className="rounded px-2 py-1 text-xs text-slate-400 transition-colors hover:bg-[#dbeafe] hover:text-[#2563eb]"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code body */}
      <pre className="overflow-x-auto p-5 font-mono text-sm leading-[1.8] text-slate-700">
        <code>{code}</code>
      </pre>

      {label && (
        <figcaption className="border-t border-[#dbeafe] bg-[#f8fbff] px-4 py-2 text-xs text-slate-500">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
