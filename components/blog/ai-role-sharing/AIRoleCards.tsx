type AIRole = {
  tool: string;
  persona: string;
  tagline: string;
  uses: string[];
};

const ROLES: AIRole[] = [
  {
    tool: "ChatGPT",
    persona: "相談相手",
    tagline: "壁打ち・アイデア整理",
    uses: [
      "ふわっとした相談",
      "SEO・検索意図の相談",
      "初心者向け説明の確認",
      "ワークフロー相談",
    ],
  },
  {
    tool: "Claude",
    persona: "編集者",
    tagline: "長文整理・構成づくり",
    uses: [
      "source.md からの記事構成",
      "情報の構造化",
      "長文の意図を拾う",
      "温度感・読者ターゲット指定",
    ],
  },
  {
    tool: "Cursor",
    persona: "職人",
    tagline: "実装・コード修正",
    uses: [
      "Next.js 実装",
      "Tailwind UI 調整",
      "軽微なエラー修正",
      "コンポーネント単位の修正",
    ],
  },
];

export function AIRoleCards() {
  return (
    <div className="my-8" aria-label="AI役割分担カード">
      <ul
        className="grid gap-4 sm:grid-cols-3"
        role="list"
        aria-label="各AIツールの役割"
      >
        {ROLES.map((role) => (
          <li
            key={role.tool}
            className="flex flex-col rounded-xl border border-[#dbeafe] bg-white p-5"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-block rounded-full bg-[#dbeafe] px-3 py-0.5 text-xs font-semibold text-[#1e40af]">
                {role.tool}
              </span>
            </div>
            <p className="text-lg font-bold leading-tight text-slate-900">
              {role.tagline}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">{role.persona}</p>
            <ul className="mt-4 space-y-1.5" role="list">
              {role.uses.map((use) => (
                <li
                  key={use}
                  className="flex items-start gap-2 text-sm leading-relaxed text-slate-600"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#93c5fd]"
                    aria-hidden="true"
                  />
                  {use}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
