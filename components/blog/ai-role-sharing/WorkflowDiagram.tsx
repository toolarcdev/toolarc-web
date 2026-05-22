type WorkflowStep = {
  tool: string;
  role: string;
  color: string;
  borderColor: string;
  badgeColor: string;
};

const STEPS: WorkflowStep[] = [
  {
    tool: "ChatGPT",
    role: "アイデア整理・壁打ち",
    color: "bg-[#f8fbff]",
    borderColor: "border-[#dbeafe]",
    badgeColor: "bg-[#dbeafe] text-[#1e40af]",
  },
  {
    tool: "Claude",
    role: "記事構成・長文整理",
    color: "bg-[#f8fbff]",
    borderColor: "border-[#dbeafe]",
    badgeColor: "bg-[#dbeafe] text-[#1e40af]",
  },
  {
    tool: "Cursor",
    role: "実装・コード修正",
    color: "bg-[#f8fbff]",
    borderColor: "border-[#dbeafe]",
    badgeColor: "bg-[#dbeafe] text-[#1e40af]",
  },
];

export function WorkflowDiagram() {
  return (
    <div
      className="my-8 rounded-xl border border-[#dbeafe] bg-[#f8fbff] p-6 sm:p-8"
      aria-label="AIワークフロー図"
    >
      <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-400">
        ToolArc AI Workflow
      </p>
      <ol className="flex flex-col items-center gap-0" role="list">
        {STEPS.map((step, i) => (
          <li key={step.tool} className="flex w-full flex-col items-center">
            <div
              className={`flex w-full max-w-xs flex-col items-center gap-1 rounded-xl border ${step.borderColor} ${step.color} px-6 py-4 text-center shadow-sm`}
            >
              <span
                className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${step.badgeColor}`}
              >
                {step.tool}
              </span>
              <span className="mt-1 text-sm font-medium text-slate-700">
                {step.role}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                aria-hidden="true"
                className="flex h-8 flex-col items-center justify-center gap-0.5"
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
                  <path
                    d="M6 8L0.803848 0.5H11.1962L6 8Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
