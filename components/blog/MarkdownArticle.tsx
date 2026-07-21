"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import type { Element } from "hast";
import type { ReactNode } from "react";
import { CodeBlock } from "@/components/blog/CodeBlock";
import { CtaButton } from "@/components/affiliate/CtaButton";
import { pushEvent } from "@/lib/analytics/gtm";
import { headingToId } from "@/lib/blog/heading-id";
import {
  buildAffiliateAnchorProps,
  parseAffiliateHref,
  resolveAffiliateLink,
} from "@/lib/affiliate";

type MarkdownArticleProps = {
  content: string;
  imageBasePath: string;
};

/** react-markdown の defaultUrlTransform は affiliate: スキームを空文字にするため通過させる */
function urlTransform(url: string): string {
  if (url.startsWith("affiliate:")) return url;
  return defaultUrlTransform(url);
}

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
  "ss-01_plan-comparison.png": {
    alt: "Cursorの無料プランと有料プランの機能比較画面",
    caption:
      "CursorのHobbyプラン（無料）とProプランの機能比較。プレミアムモデルの利用・プライバシーモード・優先サポートなどがProプランで解放される",
  },
  "ss-02_chat-history.png": {
    alt: "CursorでWebサイト制作を依頼したチャット履歴の一覧",
    caption:
      "Cursorのチャット画面。左にプロジェクトのファイルツリー、右にエディタが表示され、AIとのやりとりが進む様子。design-system.md・project-overview.md などのdocsファイルも参照させながら作業していた",
  },
  "ss-03_usage-limit-screen.png": {
    alt: "Cursor無料版の使用上限に達したときに表示されるメッセージ",
    caption:
      "使用上限に達すると表示される「You've hit your usage limit」メッセージ。チャット入力欄がグレーアウトし、「Upgrade to Pro」ボタンが表示される",
  },
  "ss-04_limit-no-reset-timeline.png": {
    alt: "制限到達から21時間後に確認した画面の記録",
    caption:
      "制限到達から21時間後に確認した画面。依然として「You've hit your usage limit」が表示されたままで、解除は確認できなかった。画面右下のチャット入力欄も引き続き無効化されている",
  },
  "ss-01-chatgpt-export.png": {
    alt: "ChatGPTのData ControlsにあるExport Data画面",
    caption:
      "ChatGPTでは会話履歴をZIP形式でExportできます。ただし、これは「会話ログの保存」であり、AIの記憶そのものを移行する機能ではありません。",
  },
  "ss-02-chatgpt-memory.png": {
    alt: "ChatGPTのMemory設定画面",
    caption:
      "ChatGPTのMemoryは、会話内容の一部を保持する仕組みです。ただし、別アカウントへの移行機能は提供されていません。",
  },
  "ss-03-export-zip.png": {
    alt: "ChatGPT Export ZIPファイル",
    caption:
      "Exportデータには会話ログが含まれていますが、そのまま新しいChatGPTへ学習データとして引き継げるわけではありません。",
  },
  "ss-04-obsidian-vault.png": {
    alt: "Obsidianで整理されたAI知識管理フォルダ",
    caption:
      "AI運用では、会話ログよりも「再利用できるMarkdown資産」を整理しておく方が重要です。",
  },
  "ss-05-dailynote.png": {
    alt: "AI運用ログとして活用しているDailyNote",
    caption:
      "DailyNoteを積み上げることで、AIとの試行錯誤や運用ノウハウを「知識資産」として蓄積できます。",
  },
  "pattern-comparison-both.png": {
    alt: "パターン1（同アカウント・新スマホ）とパターン2（A→B移行）の違いを比較した図解",
    caption:
      "機種変更（同アカウント）と別アカウント移行（A→B）では手順が異なります。まずどちらのケースかを確認してください。",
  },
  "pattern1-same-account-new-smartphone.png": {
    alt: "同じChatGPTアカウントで新スマホにログインすると履歴が同期される図解",
    caption:
      "会話履歴は端末ではなくアカウント側に保存されています。同じログイン方法・同じアカウントなら新スマホでも履歴は同期されます。",
  },
  "pattern2-account-a-to-b-same-phone.png": {
    alt: "同じスマホでアカウントAからBへ移行する場合、公式の履歴移行は不可で手動引き継ぎが必要な図解",
    caption:
      "ChatGPTにはアカウント間の公式履歴移行機能はありません。重要な内容は手動で引継ぎ資料としてコピーする必要があります。",
  },
  "01-vercel-invalid.png": {
    alt: "Vercelダッシュボードに「Invalid Configuration」と表示されている画面",
    caption:
      "「Invalid Configuration」の表示が消えない。設定は合っているはずなのに、なぜ？",
  },
  "02-dns-probe-finished-nxdomain.png": {
    alt: "ChromeブラウザにDNS_PROBE_FINISHED_NXDOMAINエラーが表示されている画面",
    caption:
      "DNS_PROBE_FINISHED_NXDOMAIN — ドメインのDNSが解決できない状態。設定の問題であり、サイトが壊れているわけではない。",
  },
  "04-nameserver-setting.png": {
    alt: "Xserver Domainのネームサーバー設定画面。デフォルトのネームサーバーが設定されたままになっている",
    caption:
      "Xserver Domainのネームサーバー設定。ここがデフォルト（Xserver）のまま変更されていなかった",
  },
  "05-vercel-valid.png": {
    alt: "Vercelダッシュボードでドメインが「Valid Configuration」になり、青いチェックマークが表示されている",
    caption:
      "「Invalid Configuration」が消えた。両方のドメインに青いチェックマークがついた状態",
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

function flattenText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join("");
  if (node && typeof node === "object" && "props" in node) {
    const element = node as { props: { children?: ReactNode } };
    return flattenText(element.props.children);
  }
  return "";
}

export function MarkdownArticle({ content, imageBasePath }: MarkdownArticleProps) {
  const components: Components = {
    h2: ({ children }) => {
      const id = headingToId(flattenText(children));
      return (
        <h2 id={id} className="article-h2">
          {children}
        </h2>
      );
    },
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
      const affiliateRef = parseAffiliateHref(href);
      if (affiliateRef) {
        const resolved = resolveAffiliateLink(
          affiliateRef.programId,
          affiliateRef.creativeId,
        );
        if (resolved) {
          const linkText =
            typeof children === "string" ? children : undefined;
          const anchorProps = buildAffiliateAnchorProps(resolved);
          const onAffiliateClick = () =>
            pushEvent("outbound_click", {
              url: resolved.href,
              link_text: linkText,
            });

          if (affiliateRef.asCta) {
            return (
              <CtaButton
                {...anchorProps}
                href={resolved.href}
                onClick={onAffiliateClick}
              >
                {children}
              </CtaButton>
            );
          }

          return (
            <a
              {...anchorProps}
              className="article-link"
              onClick={onAffiliateClick}
            >
              {children}
            </a>
          );
        }
        return <span className="article-link">{children}</span>;
      }

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
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      urlTransform={urlTransform}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}
