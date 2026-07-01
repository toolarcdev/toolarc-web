"use client";

import { AiOutputScroll } from "@/components/blog/AiOutputScroll";
import { MarkdownArticle } from "@/components/blog/MarkdownArticle";
import { AffiliateBanner } from "@/components/affiliate/AffiliateBanner";
import { AffiliateImpression } from "@/components/affiliate/AffiliateImpression";
import { collectAffiliateImpressions } from "@/lib/affiliate";
import { splitAffiliateSections } from "@/lib/affiliate/split-affiliate-sections";
import { splitScrollSections } from "@/lib/blog/split-scroll-sections";

type ArticleBodyProps = {
  content: string;
  imageBasePath: string;
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

export function ArticleBody({ content, imageBasePath }: ArticleBodyProps) {
  const textImpressions = collectAffiliateImpressions(content).filter(
    (ref) => ref.creativeId === "text",
  );
  const segments = splitScrollSections(content);

  const body =
    segments.length === 1 && segments[0].type === "markdown" ? (
      renderAffiliateSegments(segments[0].content, imageBasePath, "root")
    ) : (
      <>
        {segments.map((segment, index) => {
          if (segment.type === "markdown") {
            return (
              <div key={`scroll-md-wrap-${index}`}>
                {renderAffiliateSegments(
                  segment.content,
                  imageBasePath,
                  `seg-${index}`,
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
        })}
      </>
    );

  return (
    <>
      {body}
      {textImpressions.map((ref) => (
        <AffiliateImpression key={`${ref.programId}:${ref.creativeId}`} src={ref.impressionUrl} />
      ))}
    </>
  );
}
