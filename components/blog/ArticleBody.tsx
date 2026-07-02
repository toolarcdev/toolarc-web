"use client";

import { AiOutputScroll } from "@/components/blog/AiOutputScroll";
import { EmbedRenderer } from "@/components/blog/EmbedRenderer";
import { MarkdownArticle } from "@/components/blog/MarkdownArticle";
import { AffiliateBanner } from "@/components/affiliate/AffiliateBanner";
import { AffiliateImpression } from "@/components/affiliate/AffiliateImpression";
import { collectAffiliateImpressions } from "@/lib/affiliate";
import { splitAffiliateSections } from "@/lib/affiliate/split-affiliate-sections";
import { splitEmbedSections } from "@/lib/blog/split-embed-sections";
import { splitScrollSections } from "@/lib/blog/split-scroll-sections";
import type { BlogSlug } from "@/lib/blog/posts";

type ArticleBodyProps = {
  content: string;
  imageBasePath: string;
  slug?: BlogSlug;
};

function renderAffiliateSegments(
  content: string,
  imageBasePath: string,
  keyPrefix: string,
) {
  const segments = splitAffiliateSections(content);

  return segments.map((segment, index) => {
    if (segment.type === "banner") {
      return (
        <AffiliateBanner
          key={`${keyPrefix}-banner-${index}`}
          programId={segment.programId}
          creativeId={segment.creativeId}
        />
      );
    }

    return (
      <MarkdownArticle
        key={`${keyPrefix}-md-${index}`}
        content={segment.content}
        imageBasePath={imageBasePath}
      />
    );
  });
}

function renderMarkdownWithEmbeds(
  content: string,
  imageBasePath: string,
  keyPrefix: string,
  slug?: BlogSlug,
) {
  const embedSegments = splitEmbedSections(content);

  return embedSegments.map((segment, index) => {
    if (segment.type === "embed") {
      if (!slug) return null;
      return (
        <EmbedRenderer
          key={`${keyPrefix}-embed-${index}`}
          slug={slug}
          componentName={segment.componentName}
        />
      );
    }

    return (
      <div key={`${keyPrefix}-embed-md-${index}`}>
        {renderAffiliateSegments(
          segment.content,
          imageBasePath,
          `${keyPrefix}-${index}`,
        )}
      </div>
    );
  });
}

function renderScrollAwareContent(
  content: string,
  imageBasePath: string,
  keyPrefix: string,
  slug?: BlogSlug,
) {
  const segments = splitScrollSections(content);

  if (segments.length === 1 && segments[0].type === "markdown") {
    return renderMarkdownWithEmbeds(
      segments[0].content,
      imageBasePath,
      keyPrefix,
      slug,
    );
  }

  return segments.map((segment, index) => {
    if (segment.type === "markdown") {
      return (
        <div key={`scroll-md-wrap-${index}`}>
          {renderMarkdownWithEmbeds(
            segment.content,
            imageBasePath,
            `seg-${index}`,
            slug,
          )}
        </div>
      );
    }
    return (
      <AiOutputScroll key={`scroll-${index}`} label={segment.label}>
        <MarkdownArticle
          content={segment.content}
          imageBasePath={imageBasePath}
        />
      </AiOutputScroll>
    );
  });
}

export function ArticleBody({ content, imageBasePath, slug }: ArticleBodyProps) {
  const textImpressions = collectAffiliateImpressions(content).filter(
    (ref) => ref.creativeId === "text",
  );

  return (
    <>
      {renderScrollAwareContent(content, imageBasePath, "root", slug)}
      {textImpressions.map((ref) => (
        <AffiliateImpression key={`${ref.programId}:${ref.creativeId}`} src={ref.impressionUrl} />
      ))}
    </>
  );
}
