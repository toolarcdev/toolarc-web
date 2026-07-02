const BEFORE_ITEMS = [
  "全部ChatGPT",
  "プロンプト迷子",
  "AIの返答がズレる",
  "毎回説明し直す",
  "作業フローが不安定",
];

const AFTER_ITEMS = [
  "ChatGPT → 壁打ち",
  "Claude → 構成整理",
  "Cursor → 実装",
  "AIごとの得意分野を使う",
  "workflowがかなり安定",
];

export function RoleSharingBeforeAfter() {
  return (
    <div className="my-8 grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-[#dbeafe] bg-white p-5">
        <p className="mb-3 text-sm font-semibold text-slate-500">Before</p>
        <ul className="space-y-2 text-sm text-slate-600">
          {BEFORE_ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-[#dbeafe] bg-[#f8fbff] p-5">
        <p className="mb-3 text-sm font-semibold text-[#2563eb]">After</p>
        <ul className="space-y-2 text-sm text-slate-600">
          {AFTER_ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#60a5fa]"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
