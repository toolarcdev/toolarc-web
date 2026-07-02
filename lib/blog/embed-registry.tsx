import type { ComponentType } from "react";
import { BeforeAfterComparison } from "@/components/blog/source-md-ai-writing/BeforeAfterComparison";
import { KeyPointsCards } from "@/components/blog/source-md-ai-writing/KeyPointsCards";
import { SourceMdBlockEmbed } from "@/components/blog/source-md-ai-writing/SourceMdBlockEmbed";
import { SourceMdQuoteHighlight } from "@/components/blog/source-md-ai-writing/SourceMdQuoteHighlight";
import { SourceWorkflowDiagram } from "@/components/blog/source-md-ai-writing/SourceWorkflowDiagram";
import type { BlogSlug } from "@/lib/blog/posts";

export const EMBED_COMPONENTS: Record<string, ComponentType> = {
  BeforeAfterComparison,
  KeyPointsCards,
  SourceMdBlock: SourceMdBlockEmbed,
  SourceWorkflowDiagram,
  QuoteHighlight: SourceMdQuoteHighlight,
};

export type EmbedComponentName = keyof typeof EMBED_COMPONENTS;
const SLUG_EMBEDS: Partial<Record<BlogSlug, EmbedComponentName[]>> = {
  "source-md-ai-writing": [
    "BeforeAfterComparison",
    "KeyPointsCards",
    "SourceMdBlock",
    "SourceWorkflowDiagram",
    "QuoteHighlight",
  ],
};

export function isEmbedAllowed(
  slug: BlogSlug,
  componentName: string,
): componentName is EmbedComponentName {
  const allowed = SLUG_EMBEDS[slug];
  if (!allowed) return false;
  return allowed.includes(componentName as EmbedComponentName);
}

export function getEmbedComponent(
  slug: BlogSlug,
  componentName: string,
): ComponentType | null {
  if (!isEmbedAllowed(slug, componentName)) return null;
  return EMBED_COMPONENTS[componentName];
}
