"use client";

import { useEffect, useSyncExternalStore } from "react";

const blockIds = ["B00", "B01", "B07", "B02", "B03", "B04", "B05", "B06", "B08"];
const subscribe = (callback: () => void) => {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
};
const getSearch = () => window.location.search;
const getServerSearch = () => "";

export function LpDebugMode() {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const development = process.env.NODE_ENV === "development";
  const params = new URLSearchParams(search);
  const debug = development && params.get("lpDebug") === "1";
  const detail = params.get("blocks") !== "off";
  useEffect(() => {
    const page = document.querySelector<HTMLElement>('[data-lp="internet-academy-generative-ai"]');
    if (page) { page.dataset.debug = String(debug); page.dataset.detail = String(detail); }
  }, [debug, detail]);

  if (!development) return null;
  function update(show: boolean, elements: boolean) {
    const url = new URL(window.location.href);
    if (show) url.searchParams.set("lpDebug", "1");
    else url.searchParams.delete("lpDebug");
    if (show && !elements) url.searchParams.set("blocks", "off");
    else url.searchParams.delete("blocks");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
  function supplements(open: boolean) {
    document.querySelectorAll<HTMLDetailsElement>('[data-lp="internet-academy-generative-ai"] main details.disclosure').forEach(el => { el.open = open; });
  }
  return <aside className="preview-tools" aria-label="プレビュー操作">
    <details id="preview-panel"><summary>表示確認 <span>番号 {debug ? "ON" : "OFF"}</span></summary>
      <div className="preview-panel">
        <label><input type="checkbox" checked={debug} onChange={e => update(e.currentTarget.checked, detail)} />構成番号を表示</label>
        <label><input type="checkbox" checked={detail} disabled={!debug} onChange={e => update(debug, e.currentTarget.checked)} />要素番号も表示</label>
        <p className="preview-help">B番号・画像番号・CTA番号で修正箇所を指定できます。B02-01は削除済みの欠番です。</p>
        <label htmlFor="debug-jump">構成へ移動</label>
        <select id="debug-jump" defaultValue="" onChange={e => {
          const page = document.querySelector('[data-lp="internet-academy-generative-ai"]');
          page?.querySelector(`[data-ref="${e.currentTarget.value}"]`)?.scrollIntoView({ block: "start" });
          const panel = document.querySelector<HTMLDetailsElement>("#preview-panel");
          if (panel) panel.open = false;
          e.currentTarget.value = "";
        }}><option value="">選択してください</option>{blockIds.map(id => <option key={id} value={id}>{id}</option>)}</select>
        <button type="button" onClick={() => supplements(true)}>補足をすべて開く</button>
        <button type="button" onClick={() => supplements(false)}>補足をすべて閉じる</button>
        <p className="preview-help">予約ボタンの外部遷移・計測は停止中です。</p>
      </div>
    </details>
  </aside>;
}
