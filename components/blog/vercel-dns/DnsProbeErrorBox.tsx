export function DnsProbeErrorBox() {
  return (
    <div className="my-5 rounded-lg border border-red-200 bg-red-50 px-5 py-4">
      <p className="font-mono text-base font-bold text-red-700 sm:text-lg">
        DNS_PROBE_FINISHED_NXDOMAIN
      </p>
      <p className="mt-1 text-sm text-red-600">
        「このサイトにアクセスできません」— Chromeのエラー画面
      </p>
    </div>
  );
}
