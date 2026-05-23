declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

type AnalyticsEventMap = {
  toc_click: {
    toc_label: string;
    toc_id: string;
  };
  series_click: {
    series_slug: string;
    target_slug: string;
    link_type: "hub" | "spoke" | "badge" | "related";
  };
  scroll_75: {
    slug: string;
    series_slug: string | null;
    reading_time: number;
    category: string;
  };
  outbound_click: {
    url: string;
    link_text?: string;
  };
  copy_code: {
    language?: string;
  };
};

export function pushEvent<T extends keyof AnalyticsEventMap>(
  eventName: T,
  params: AnalyticsEventMap[T],
): void {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event: eventName, ...params });
}
