type WorkflowStep = {
  id: string;
  label: string;
  sublabel?: string;
  isHighlighted?: boolean;
};

const STEPS: WorkflowStep[] = [
  { id: "daily-notes", label: "Obsidian daily notes", sublabel: "思考ログ・時系列メモ" },
  {
    id: "source-md",
    label: "source.md で構造整理",
    sublabel: "記事テーマ・読者・問題・改善を整理",
    isHighlighted: true,
  },
  { id: "claude", label: "Claude で記事生成", sublabel: "構造化された素材を渡す" },
  { id: "chatgpt", label: "ChatGPT でレビュー", sublabel: "客観的なチェック" },
  { id: "cursor", label: "Cursor でサイト反映", sublabel: "実装・コンポーネント化" },
  { id: "final", label: "自分で最終調整", sublabel: "トーン・細部の確認" },
];

function Arrow() {
  return (
    <div
      aria-hidden="true"
      className="flex h-8 flex-col items-center justify-center"
    >
      <div className="h-5 w-px bg-[#93c5fd]" />
      <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        className="text-[#93c5fd]"
        aria-hidden="true"
      >
        <path d="M6 8L0.803848 0.5H11.1962L6 8Z" fill="currentColor" />
      </svg>
    </div>
  );
}

export function SourceWorkflowDiagram() {
  return (
    <div
      className="my-8 rounded-xl border border-[#dbeafe] bg-[#f8fbff] p-6 sm:p-8"
      aria-label="記事制作ワークフロー図"
    >
      <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-400">
        Current Workflow
      </p>
      <ol className="flex flex-col items-center gap-0" role="list">
        {STEPS.map((step, i) => (
          <li key={step.id} className="flex w-full flex-col items-center">
            <div
              className={[
                "flex w-full max-w-xs flex-col items-center gap-0.5 rounded-xl border px-5 py-3.5 text-center shadow-sm",
                step.isHighlighted
                  ? "border-[#60a5fa] bg-white ring-1 ring-[#60a5fa]/30"
                  : "border-[#dbeafe] bg-white",
              ].join(" ")}
            >
              {step.isHighlighted && (
                <span className="mb-1 inline-block rounded-full bg-[#dbeafe] px-2.5 py-0.5 text-xs font-semibold text-[#1e40af]">
                  key step
                </span>
              )}
              <span className="text-sm font-semibold text-slate-800">
                {step.label}
              </span>
              {step.sublabel && (
                <span className="text-xs text-slate-500">{step.sublabel}</span>
              )}
            </div>
            {i < STEPS.length - 1 && <Arrow />}
          </li>
        ))}
      </ol>
    </div>
  );
}
