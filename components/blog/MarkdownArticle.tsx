"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import type { Element } from "hast";
import { CodeBlock } from "@/components/blog/CodeBlock";
import { pushEvent } from "@/lib/analytics/gtm";

type MarkdownArticleProps = {
  content: string;
  imageBasePath: string;
};

function resolveImageSrc(src: string | undefined, imageBasePath: string): string {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
    return src;
  }
  return `${imageBasePath}/${src}`;
}

/** 本文幅いっぱいだと不自然に見えるスクリーンショット（ファイル名で判定） */
const COMPACT_IMAGE_FILES = new Set(["02-example-source-claude.png"]);

/** 画像ごとの alt / キャプション（読者向けの説明） */
const IMAGE_META: Record<string, { alt: string; caption: string }> = {
  "08-cursor-create-webpage.png": {
    alt: "Cursorで実装したブログ記事ページのスクリーンショット",
    caption:
      "published.md を Cursor に渡して実装した、当該記事のブログページ（開発環境での表示）",
  },
};

function getImageFileName(src: string | undefined): string {
  if (!src) return "";
  return src.split("/").pop() ?? src;
}

function getImageMeta(src: string | undefined) {
  return IMAGE_META[getImageFileName(src)];
}

function isCompactImage(src: string | undefined): boolean {
  if (!src) return false;
  const name = src.split("/").pop() ?? src;
  return COMPACT_IMAGE_FILES.has(name);
}

function getImageSrcFromParagraph(node: unknown): string | undefined {
  if (!node || typeof node !== "object" || !("children" in node)) {
    return undefined;
  }
  const children = (node as Element).children;
  const img = children[0];
  if (img?.type !== "element" || img.tagName !== "img") return undefined;
  const src = img.properties?.src;
  return typeof src === "string" ? src : undefined;
}

/** 段落が画像1枚だけかどうか（<p> の中に <figure> を入れないため） */
function isImageOnlyParagraph(node: unknown): boolean {
  if (!node || typeof node !== "object" || !("children" in node)) {
    return false;
  }
  const children = (node as Element).children;
  return (
    children.length === 1 &&
    children[0].type === "element" &&
    children[0].tagName === "img"
  );
}

export function MarkdownArticle({ content, imageBasePath }: MarkdownArticleProps) {
  const components: Components = {
    h2: ({ children }) => (
      <h2 className="article-h2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="article-h3">{children}</h3>
    ),
    p: ({ node, children }) => {
      if (isImageOnlyParagraph(node)) {
        const src = getImageSrcFromParagraph(node);
        const compact = isCompactImage(src);
        const caption = getImageMeta(src)?.caption;
        return (
          <figure
            className={
              compact ? "article-figure article-figure--compact" : "article-figure"
            }
          >
            {children}
            {caption && (
              <figcaption className="article-figcaption">{caption}</figcaption>
            )}
          </figure>
        );
      }
      return <p className="article-p">{children}</p>;
    },
    ul: ({ children }) => <ul className="article-ul">{children}</ul>,
    ol: ({ children }) => <ol className="article-ol">{children}</ol>,
    li: ({ children }) => <li className="article-li">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="article-blockquote">{children}</blockquote>
    ),
    hr: () => <hr className="article-hr" />,
    a: ({ href, children }) => {
      const isExternal = href?.startsWith("http");
      if (isExternal) {
        const linkText =
          typeof children === "string" ? children : undefined;
        return (
          <a
            href={href}
            className="article-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              pushEvent("outbound_click", { url: href ?? "", link_text: linkText })
            }
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href ?? "#"} className="article-link">
          {children}
        </Link>
      );
    },
    table: ({ children }) => (
      <div className="article-table-wrap">
        <table className="article-table">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="article-thead">{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr className="article-tr">{children}</tr>,
    th: ({ children }) => <th className="article-th">{children}</th>,
    td: ({ children }) => <td className="article-td">{children}</td>,
    strong: ({ children }) => (
      <strong className="font-semibold text-slate-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-slate-600">{children}</em>
    ),
    pre: ({ children, ...props }) => {
      const codeChild = (props as { node?: Element }).node?.children?.[0];
      const codeClassName =
        codeChild?.type === "element"
          ? (codeChild.properties?.className as string[] | undefined)?.[0]
          : undefined;
      return (
        <CodeBlock className={codeClassName}>{children}</CodeBlock>
      );
    },
    code: ({ className, children }) => {
      const isBlock = Boolean(className);
      if (isBlock) {
        return <code className={className}>{children}</code>;
      }
      return <code className="article-code-inline">{children}</code>;
    },
    img: ({ src, alt }) => {
      const rawSrc = typeof src === "string" ? src : undefined;
      const resolved = resolveImageSrc(rawSrc, imageBasePath);
      if (!resolved) return null;
      const compact = isCompactImage(rawSrc);
      const meta = getImageMeta(rawSrc);
      const imageAlt = alt?.trim() || meta?.alt || "";
      return (
        <Image
          src={resolved}
          alt={imageAlt}
          width={1200}
          height={675}
          className={compact ? "article-img article-img--compact" : "article-img"}
          sizes={
            compact
              ? "(max-width: 768px) 92vw, 448px"
              : "(max-width: 768px) 100vw, 720px"
          }
        />
      );
    },
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
