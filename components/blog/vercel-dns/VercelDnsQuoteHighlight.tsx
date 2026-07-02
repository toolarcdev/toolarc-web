import { QuoteHighlight } from "@/components/blog/ai-role-sharing/QuoteHighlight";

export function VercelDnsQuoteHighlight() {
  return (
    <QuoteHighlight
      quote="DNSレコードを書くだけでは不十分。ドメインがどのDNSを使うかも設定が必要だった"
      context="「DNSレコードを追加した」ことと「ドメインがそのDNSを参照している」ことは別の話。この違いが分かっていなかった。"
    />
  );
}
