"use client";

import { useEffect, useSyncExternalStore } from "react";

const sections = ["S01", "S02", "S06", "S03", "S04", "S05"];
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
    const page = document.querySelector<HTMLElement>('[data-lp="programming-hacks"]');
    if (page) { page.dataset.debug = String(debug); page.dataset.detail = String(detail); }
  }, [debug, detail]);
  if (!development || !debug) return null;
  function update(show: boolean, elements: boolean) {
    const url = new URL(window.location.href);
    if (show) url.searchParams.set("lpDebug", "1");
    else url.searchParams.delete("lpDebug");
    if (show && !elements) url.searchParams.set("blocks", "off");
    else url.searchParams.delete("blocks");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
  function supplement(open: boolean) {
    document.querySelectorAll<HTMLDetailsElement>('[data-lp="programming-hacks"] main details').forEach(el => { el.open = open; });
  }
  return <aside className="preview-tools" aria-label="開発専用の表示確認">
    <details className="preview-tools-panel"><summary>表示確認・番号 {debug ? "ON" : "OFF"}</summary>
      <div className="preview-controls">
        <label><input type="checkbox" checked={debug} onChange={e => update(e.currentTarget.checked, detail)} />構成番号を表示</label>
        <label><input type="checkbox" checked={detail} disabled={!debug} onChange={e => update(debug, e.currentTarget.checked)} />要素番号も表示</label>
        <label htmlFor="ph-debug-jump">構成へ移動</label>
        <select id="ph-debug-jump" defaultValue="" onChange={e => {
          document.querySelector('[data-lp="programming-hacks"]')?.querySelector('[data-ref="' + e.currentTarget.value + '"]')?.scrollIntoView({ block: "start" });
          const panel = document.querySelector<HTMLDetailsElement>(".preview-tools-panel");
          if (panel) panel.open = false;
          e.currentTarget.value = "";
        }}><option value="">選択してください</option>{sections.map(id => <option key={id} value={id}>{id}</option>)}</select>
        <button type="button" onClick={() => supplement(true)}>用語説明を開く</button>
        <button type="button" onClick={() => supplement(false)}>用語説明を閉じる</button>
        <p>R3は継続中。画像は候補です。CTA遷移・LP計測は停止中。</p>
      </div>
    </details>
  </aside>;
}
