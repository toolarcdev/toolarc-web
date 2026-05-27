"use client";

import { useCallback, useEffect, useState } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import {
  MAX_REGEX_LENGTH,
  POE2_SEARCH_DEBOUNCE_MS,
} from "@/lib/poe2/constants";
import type {
  ModSearchResult,
  RegexBuildResponse,
  SearchMode,
  SelectedMod,
} from "@/lib/poe2/types";

export function Poe2RegexBuilder() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<SearchMode>("or");
  const [searchResults, setSearchResults] = useState<ModSearchResult[]>([]);
  const [selectedMods, setSelectedMods] = useState<SelectedMod[]>([]);
  const [regexOutput, setRegexOutput] = useState<RegexBuildResponse | null>(
    null,
  );
  const [searchLoading, setSearchLoading] = useState(false);
  const [regexLoading, setRegexLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [regexError, setRegexError] = useState<string | null>(null);
  const { copied, copy } = useCopyToClipboard();

  const runSearch = useCallback(async (searchQuery: string) => {
    setSearchLoading(true);
    setSearchError(null);

    try {
      const params = new URLSearchParams({ q: searchQuery });
      const response = await fetch(`/api/poe2/search?${params}`);
      if (!response.ok) {
        throw new Error("search failed");
      }
      const data = (await response.json()) as { mods: ModSearchResult[] };
      setSearchResults(data.mods);
    } catch {
      setSearchError("モッドの検索に失敗しました");
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void runSearch(query);
    }, POE2_SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [query, runSearch]);

  useEffect(() => {
    if (selectedMods.length === 0) {
      return;
    }

    const ids = selectedMods.map((mod) => mod.id);
    const controller = new AbortController();

    async function buildRegex() {
      setRegexLoading(true);
      setRegexError(null);

      try {
        const response = await fetch("/api/poe2/regex", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids, mode }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("regex failed");
        }

        const data = (await response.json()) as RegexBuildResponse;
        setRegexOutput(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setRegexError("regex の生成に失敗しました");
        setRegexOutput(null);
      } finally {
        setRegexLoading(false);
      }
    }

    void buildRegex();
    return () => controller.abort();
  }, [selectedMods, mode]);

  function toggleMod(mod: ModSearchResult) {
    setSelectedMods((prev) => {
      const exists = prev.some((item) => item.id === mod.id);
      if (exists) {
        const next = prev.filter((item) => item.id !== mod.id);
        if (next.length === 0) {
          setRegexOutput(null);
          setRegexError(null);
        }
        return next;
      }
      return [...prev, mod];
    });
  }

  function removeMod(id: number) {
    setSelectedMods((prev) => {
      const next = prev.filter((item) => item.id !== id);
      if (next.length === 0) {
        setRegexOutput(null);
        setRegexError(null);
      }
      return next;
    });
  }

  function clearSelection() {
    setSelectedMods([]);
    setRegexOutput(null);
    setRegexError(null);
  }

  const output = regexOutput?.regex ?? "";
  const charCount = regexOutput?.length ?? 0;
  const overLimit = regexOutput?.overLimit ?? false;

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-[#dbeafe] bg-[#f8fbff] p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-700">検索モード</p>
            <p className="mt-0.5 text-xs text-slate-500">
              OR はどれか一致、AND はすべて一致
            </p>
          </div>
          <div
            className="inline-flex rounded-lg border border-[#dbeafe] bg-white p-1"
            role="group"
            aria-label="検索モード"
          >
            {(
              [
                ["or", "OR検索"],
                ["and", "AND検索"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  mode === value
                    ? "bg-[#2563eb] text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <label
          htmlFor="mod-search"
          className="block text-sm font-medium text-slate-700"
        >
          モッドを検索
        </label>
        <input
          id="mod-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="例: 物理ダメージ、レベル、ライフ"
          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-[#60a5fa] focus:ring-2 focus:ring-[#dbeafe]"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">モッド一覧</h2>
            <span className="text-xs text-slate-500">
              {searchLoading ? "検索中…" : `${searchResults.length} 件`}
            </span>
          </div>
          {searchError && (
            <p className="text-xs text-red-600">{searchError}</p>
          )}
          <ul className="max-h-[420px] space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2">
            {!searchLoading && searchResults.length === 0 ? (
              <li className="px-3 py-6 text-center text-sm text-slate-500">
                該当するモッドがありません
              </li>
            ) : (
              searchResults.map((mod) => {
                const checked = selectedMods.some((item) => item.id === mod.id);
                return (
                  <li key={mod.id}>
                    <label
                      className={`flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                        checked ? "bg-[#eff6ff]" : "hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleMod(mod)}
                        className="mt-1 h-4 w-4 shrink-0 accent-[#2563eb]"
                      />
                      <span className="block text-sm text-slate-800">
                        {mod.text.ja}
                      </span>
                    </label>
                  </li>
                );
              })
            )}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">選択中</h2>
              {selectedMods.length > 0 && (
                <button
                  type="button"
                  onClick={clearSelection}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  すべて解除
                </button>
              )}
            </div>
            {selectedMods.length === 0 ? (
              <p className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
                モッドを選択すると regex が生成されます
              </p>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {selectedMods.map((mod) => (
                  <li key={mod.id}>
                    <button
                      type="button"
                      onClick={() => removeMod(mod.id)}
                      className="inline-flex max-w-full items-center gap-1 rounded-full border border-[#dbeafe] bg-[#f8fbff] px-3 py-1.5 text-left text-xs text-slate-700 hover:bg-[#eff6ff]"
                      title="クリックで解除"
                    >
                      <span className="truncate">{mod.text.ja}</span>
                      <span aria-hidden="true" className="text-slate-400">
                        ×
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-slate-900">
                出力 regex
              </h2>
              <span
                className={`text-xs font-medium ${
                  overLimit ? "text-red-600" : "text-slate-500"
                }`}
              >
                {regexLoading ? "生成中…" : `${charCount} / ${MAX_REGEX_LENGTH} 文字`}
              </span>
            </div>
            {regexError && (
              <p className="text-xs text-red-600">{regexError}</p>
            )}
            <textarea
              readOnly
              value={output}
              rows={4}
              className={`w-full resize-none rounded-xl border px-4 py-3 font-mono text-sm outline-none ${
                overLimit
                  ? "border-red-300 bg-red-50 text-red-900"
                  : "border-slate-200 bg-white text-slate-800"
              }`}
              placeholder="ここに regex が表示されます"
            />
            {overLimit && (
              <p className="text-xs text-red-600">
                50文字を超えています。ゲーム内のアイテム検索欄への貼り付けは拒否されます。
              </p>
            )}
            <button
              type="button"
              onClick={() => copy(output)}
              disabled={!output || regexLoading}
              className="w-full rounded-lg bg-[#2563eb] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {copied ? "コピーしました" : "regex をコピー"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
