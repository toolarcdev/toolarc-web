import type { ComponentType } from "react";
import { AIRoleCards } from "@/components/blog/ai-role-sharing/AIRoleCards";
import { RoleSharingBeforeAfter } from "@/components/blog/ai-role-sharing/RoleSharingBeforeAfter";
import { RoleSharingQuoteHighlight } from "@/components/blog/ai-role-sharing/RoleSharingQuoteHighlight";
import { WorkflowDiagram } from "@/components/blog/ai-role-sharing/WorkflowDiagram";
import { BeforeAfterComparison } from "@/components/blog/source-md-ai-writing/BeforeAfterComparison";
import { KeyPointsCards } from "@/components/blog/source-md-ai-writing/KeyPointsCards";
import { SourceMdBlockEmbed } from "@/components/blog/source-md-ai-writing/SourceMdBlockEmbed";
import { SourceMdQuoteHighlight } from "@/components/blog/source-md-ai-writing/SourceMdQuoteHighlight";
import { SourceWorkflowDiagram } from "@/components/blog/source-md-ai-writing/SourceWorkflowDiagram";
import { DnsChecklist } from "@/components/blog/vercel-dns/DnsChecklist";
import { DnsFlowDiagram } from "@/components/blog/vercel-dns/DnsFlowDiagram";
import { DnsProbeErrorBox } from "@/components/blog/vercel-dns/DnsProbeErrorBox";
import { VercelConclusionBox } from "@/components/blog/vercel-dns/VercelConclusionBox";
import { VercelDnsAdviceSteps } from "@/components/blog/vercel-dns/VercelDnsAdviceSteps";
import { VercelDnsIntroAside } from "@/components/blog/vercel-dns/VercelDnsIntroAside";
import { VercelDnsQuoteHighlight } from "@/components/blog/vercel-dns/VercelDnsQuoteHighlight";
import type { BlogSlug } from "@/lib/blog/posts";

export const EMBED_COMPONENTS: Record<string, ComponentType> = {
  BeforeAfterComparison,
  KeyPointsCards,
  SourceMdBlock: SourceMdBlockEmbed,
  SourceWorkflowDiagram,
  QuoteHighlight: SourceMdQuoteHighlight,
  WorkflowDiagram,
  AIRoleCards,
  RoleSharingBeforeAfter,
  RoleSharingQuoteHighlight,
  DnsFlowDiagram,
  DnsChecklist,
  VercelConclusionBox,
  DnsProbeErrorBox,
  VercelDnsQuoteHighlight,
  VercelDnsAdviceSteps,
  VercelDnsIntroAside,
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
  "ai-role-sharing-workflow": [
    "WorkflowDiagram",
    "AIRoleCards",
    "RoleSharingBeforeAfter",
    "RoleSharingQuoteHighlight",
  ],
  "vercel-domain-invalid-nameserver": [
    "VercelDnsIntroAside",
    "VercelConclusionBox",
    "DnsProbeErrorBox",
    "VercelDnsQuoteHighlight",
    "DnsFlowDiagram",
    "DnsChecklist",
    "VercelDnsAdviceSteps",
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
