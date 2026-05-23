"use client";

import { useState, useCallback } from "react";
import { pushEvent } from "@/lib/analytics/gtm";

type Options = {
  language?: string;
  timeout?: number;
};

export function useCopyToClipboard({ language, timeout = 2000 }: Options = {}) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        pushEvent("copy_code", { language });
        setTimeout(() => setCopied(false), timeout);
      } catch {
        // clipboard API not available
      }
    },
    [language, timeout],
  );

  return { copied, copy };
}
