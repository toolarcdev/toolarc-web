import { SourceMdBlock } from "@/components/blog/source-md-ai-writing/SourceMdBlock";

const SOURCE_MD_EXAMPLE = `# 記事テーマ
Claude記事生成は source.md で変わった

# 読者
AIで記事を書いている個人開発者

# 問題
daily notes をそのまま渡すと記事構造が崩れる

# 原因
時系列ログになっていて、情報構造がない

# 改善
source.md で整理してから渡す

# 読者に伝えたいこと
AIより先に、入力素材の構造を見直したほうがいい`;

const LABEL =
  "実際に使っている設計メモの形式。毎回フォーマットは少し変わるが、「何を伝える記事なのか」を先に整理することが重要。";

export function SourceMdBlockEmbed() {
  return (
    <SourceMdBlock filename="source.md" code={SOURCE_MD_EXAMPLE} label={LABEL} />
  );
}
