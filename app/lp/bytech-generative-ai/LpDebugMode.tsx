"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import styles from "./page.module.css";

const blockIds = ["B01", "B02", "B03", "B05", "B06", "B07", "B08", "B09", "B10"] as const;

function subscribeToLocation(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

function getLocationSearch() {
  return window.location.search;
}

function getServerLocationSearch() {
  return "";
}

function writeDebugQuery(labelsOn: boolean, hiddenBlocks: string[]) {
  const url = new URL(window.location.href);
  url.searchParams.set("lpDebug", "1");
  url.searchParams.set("blocks", labelsOn ? "on" : "off");
  if (hiddenBlocks.length) url.searchParams.set("hide", hiddenBlocks.join(","));
  else url.searchParams.delete("hide");
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function LpDebugMode() {
  const search = useSyncExternalStore(subscribeToLocation, getLocationSearch, getServerLocationSearch);
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const enabled = process.env.NODE_ENV === "development" && params.get("lpDebug") === "1";
  const labelsOn = params.get("blocks") !== "off";
  const hiddenBlocks = (params.get("hide") ?? "")
    .split(",")
    .filter((id) => blockIds.includes(id as typeof blockIds[number]));

  useEffect(() => {
    const page = document.querySelector<HTMLElement>('[data-lp="bytech-generative-ai"]');
    if (!page) return;
    page.dataset.blockLabels = enabled && labelsOn ? "on" : "off";
    page.dataset.hiddenBlocks = enabled ? hiddenBlocks.join(" ") : "";
  }, [enabled, hiddenBlocks, labelsOn]);

  if (!enabled) return null;

  const toggleBlock = (blockId: string) => {
    const next = hiddenBlocks.includes(blockId)
      ? hiddenBlocks.filter((id) => id !== blockId)
      : [...hiddenBlocks, blockId];
    writeDebugQuery(labelsOn, next);
  };

  const toggleLabels = (checked: boolean) => writeDebugQuery(checked, hiddenBlocks);
  const showAll = () => writeDebugQuery(labelsOn, []);
  const exitDebug = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("lpDebug");
    url.searchParams.delete("blocks");
    url.searchParams.delete("hide");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <details className={styles.debugDock} open>
      <summary>LPデバッグ <span>ON</span></summary>
      <aside className={styles.debugPanel} role="toolbar" aria-label="LPデバッグ操作">
        <div className={styles.debugPanelHead}>
          <strong>固定番号の表示</strong>
          <button type="button" onClick={exitDebug}>終了</button>
        </div>
        <label className={styles.debugToggle}>
          <input type="checkbox" checked={labelsOn} onChange={(event) => toggleLabels(event.currentTarget.checked)} />
          B・CTA・画像番号を表示
        </label>
        <details className={styles.debugSections}>
          <summary>ブロック表示を切り替える</summary>
          <div className={styles.debugSectionList}>
            {blockIds.map((blockId) => (
              <label key={blockId}>
                <input
                  type="checkbox"
                  checked={!hiddenBlocks.includes(blockId)}
                  onChange={() => toggleBlock(blockId)}
                />
                {blockId}
              </label>
            ))}
            <button type="button" onClick={showAll}>すべて表示</button>
          </div>
        </details>
        <p>CTAの外部遷移・計測は開発モードでは停止しています。</p>
      </aside>
    </details>
  );
}
