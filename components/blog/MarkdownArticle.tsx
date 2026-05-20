import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import type { Element } from "hast";

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
        return <figure className="article-figure">{children}</figure>;
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
        return (
          <a
            href={href}
            className="article-link"
            target="_blank"
            rel="noopener noreferrer"
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
    strong: ({ children }) => <strong className="font-semibold text-zinc-100">{children}</strong>,
    em: ({ children }) => <em className="italic text-zinc-400">{children}</em>,
    img: ({ src, alt }) => {
      const resolved = resolveImageSrc(typeof src === "string" ? src : undefined, imageBasePath);
      if (!resolved) return null;
      return (
        <Image
          src={resolved}
          alt={alt ?? ""}
          width={1200}
          height={675}
          className="article-img"
          sizes="(max-width: 768px) 100vw, 720px"
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
