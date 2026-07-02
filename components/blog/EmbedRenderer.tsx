"use client";

import { getEmbedComponent } from "@/lib/blog/embed-registry";
import type { BlogSlug } from "@/lib/blog/posts";

type EmbedRendererProps = {
  slug: BlogSlug;
  componentName: string;
};

export function EmbedRenderer({ slug, componentName }: EmbedRendererProps) {
  const Component = getEmbedComponent(slug, componentName);
  if (!Component) return null;
  return <Component />;
}
