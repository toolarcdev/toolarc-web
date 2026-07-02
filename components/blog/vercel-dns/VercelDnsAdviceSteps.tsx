export function VercelDnsAdviceSteps() {
  return (
    <div className="my-6 space-y-3">
      <div className="rounded-lg border border-[#dbeafe] bg-[#f8fbff] px-5 py-4">
        <p className="text-sm font-semibold text-slate-800">
          <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#2563eb] text-xs font-bold text-white">
            1
          </span>
          Vercelが要求しているDNSレコードを設定しているか
        </p>
        <p className="mt-1 pl-7 text-sm text-slate-600">
          Project Settings → Domains に表示されているAレコードまたはCNAMEを確認
        </p>
      </div>
      <div className="rounded-lg border border-[#1d4ed8] bg-[#eff6ff] px-5 py-4">
        <p className="text-sm font-semibold text-[#1d4ed8]">
          <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1d4ed8] text-xs font-bold text-white">
            2
          </span>
          ドメイン側のネームサーバー設定が正しいか
          <span className="ml-2 text-xs font-normal text-[#2563eb]">← 今回の原因</span>
        </p>
        <p className="mt-1 pl-7 text-sm text-slate-600">
          ドメイン管理画面（Xserver Domainなど）でネームサーバーを確認する
        </p>
      </div>
    </div>
  );
}
