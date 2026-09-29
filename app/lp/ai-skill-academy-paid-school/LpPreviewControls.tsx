"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import styles from "./page.module.css";

const blockIds = ["B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B10"] as const;

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

function writePreviewQuery(labelsOn: boolean, hiddenBlocks: string[]) {
  const url = new URL(window.location.href);
  url.searchParams.set("lpDebug", "1");
  url.searchParams.set("blocks", labelsOn ? "on" : "off");
  if (hiddenBlocks.length) url.searchParams.set("hide", hiddenBlocks.join(","));
  else url.searchParams.delete("hide");
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function LpPreviewControls() {
  const search = useSyncExternalStore(subscribeToLocation, getLocationSearch, getServerLocationSearch);
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const enabled = process.env.NODE_ENV === "development" && params.get("lpDebug") === "1";
  const labelsOn = params.get("blocks") === "on";
  const hiddenBlocks = (params.get("hide") ?? "")
    .split(",")
    .filter((id) => blockIds.includes(id as typeof blockIds[number]));

  useEffect(() => {
    if (!enabled) return;
    const page = document.querySelector<HTMLElement>('[data-lp="ai-skill-academy-paid-school"]');
    if (!page) return;
    page.dataset.blockLabels = labelsOn ? "on" : "off";
    page.dataset.hiddenBlocks = hiddenBlocks.join(" ");
  }, [enabled, hiddenBlocks, labelsOn]);

  if (process.env.NODE_ENV !== "development" || !enabled) return null;

  const toggleBlock = (blockId: string) => {
    const nextHiddenBlocks = hiddenBlocks.includes(blockId)
      ? hiddenBlocks.filter((id) => id !== blockId)
      : [...hiddenBlocks, blockId];
    writePreviewQuery(labelsOn, nextHiddenBlocks);
  };

  const toggleLabels = (checked: boolean) => {
    writePreviewQuery(checked, hiddenBlocks);
  };

  const showAll = () => {
    writePreviewQuery(labelsOn, []);
  };

  return (
    <details className={styles.previewDock}>
      <summary className={styles.previewDockToggle}>LPプレビュー操作</summary>
      <aside className={styles.previewToolbar} role="toolbar" aria-label="LPプレビュー操作">
        <div className={styles.previewToolbarTop}>
          <strong>LPプレビュー</strong>
          <span>CTAの外部遷移・クリック計測は停止中</span>
        </div>
        <label className={styles.labelToggle}>
          <input type="checkbox" checked={labelsOn} onChange={(event) => toggleLabels(event.currentTarget.checked)} />
          ブロックラベルを表示
        </label>
        <details className={styles.blockControls}>
          <summary>ブロック表示（各セクションをON/OFF）</summary>
          <div className={styles.blockControlList}>
            {blockIds.map((blockId) => (
              <label key={blockId}>
                <input type="checkbox" checked={!hiddenBlocks.includes(blockId)} onChange={() => toggleBlock(blockId)} />
                {blockId}
              </label>
            ))}
            <button type="button" onClick={showAll}>すべて表示</button>
          </div>
        </details>
      </aside>
    </details>
  );
}
