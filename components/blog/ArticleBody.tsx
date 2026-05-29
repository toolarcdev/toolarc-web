"use client";

import { AiOutputScroll } from "@/components/blog/AiOutputScroll";
import { MarkdownArticle } from "@/components/blog/MarkdownArticle";
import { splitScrollSections } from "@/lib/blog/split-scroll-sections";

type ArticleBodyProps = {
  content: string;
  imageBasePath: string;
};

export function ArticleBody({ content, imageBasePath }: ArticleBodyProps) {
  const segments = splitScrollSections(content);

  if (segments.length === 1 && segments[0].type === "markdown") {
    return (
      <MarkdownArticle content={segments[0].content} imageBasePath={imageBasePath} />
    );
  }

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.type === "markdown") {
          return (
            <MarkdownArticle
              key={`md-${index}`}
              content={segment.content}
              imageBasePath={imageBasePath}
            />
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
}
