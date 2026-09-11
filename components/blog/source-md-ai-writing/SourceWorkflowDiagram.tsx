type WorkflowStep = {
  id: string;
  label: string;
  sublabel?: string;
  isHighlighted?: boolean;
};

const STEPS: WorkflowStep[] = [
  {
    id: "source-md",
    label: "Step1 source.md",
    sublabel: "読者・結論・構成を先に固める",
    isHighlighted: true,
  },
  {
    id: "claude",
    label: "Step2 Claude 初稿",
    sublabel: "source.md を渡して初稿を依頼",
  },
  {
    id: "review",
    label: "Step3 人間レビュー",
    sublabel: "事実・文体・導線・内部リンクを確認",
  },
  {
    id: "cursor",
    label: "Step4 Cursor 公開",
    sublabel: "実装・posts.ts・ビルド確認",
  },
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
      aria-label="source.mdから公開までの4段階ワークフロー図"
    >
      <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-400">
        4-step workflow
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
