/**
 * rail-pool の単体テスト
 *
 * ## テスト対象
 *
 * - `pickRailAffiliateForDate(dateKey)` … JST 日付キーで右レール1件を決定
 * - `pickNarrowAffiliateForDate(dateKey)` … 右レールを先に決め、同じ programId を狭い幅から除外
 * - `isRailPoolProgramId` / `isNarrowPoolProgramId`
 *
 * ## 排他の前提
 *
 * rail と narrow は **programId 単位**で重複しない（creativeId は見ない）。
 * techgym / zerosuku は両プールに入るため、右レールが該当案件の日は狭い幅から除外される。
 *
 * ```bash
 * npm run test:unit
 * ```
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  NARROW_AFFILIATE_POOL,
  RAIL_AFFILIATE_POOL,
  hashDateKey,
  isNarrowPoolProgramId,
  isRailPoolProgramId,
  pickNarrowAffiliateForDate,
  pickRailAffiliateForDate,
} from "./rail-pool";

/** テスト用: 指定期間内で rail の programId が一致する日付を1件探す */
function findDateKeyForRailProgramId(
  programId: (typeof RAIL_AFFILIATE_POOL)[number]["programId"],
): string {
  for (let month = 1; month <= 12; month += 1) {
    for (let day = 1; day <= 28; day += 1) {
      const dateKey = `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      if (pickRailAffiliateForDate(dateKey).programId === programId) {
        return dateKey;
      }
    }
  }
  throw new Error(`no dateKey found for rail programId: ${programId}`);
}

describe("hashDateKey", () => {
  it("returns the same hash for the same dateKey", () => {
    assert.equal(hashDateKey("2026-01-01"), hashDateKey("2026-01-01"));
  });

  it("returns different hashes for different dateKeys", () => {
    assert.notEqual(hashDateKey("2026-01-01"), hashDateKey("2026-01-02"));
  });
});

describe("pickRailAffiliateForDate", () => {
  it("returns a pool entry deterministically", () => {
    const first = pickRailAffiliateForDate("2026-01-04");
    const second = pickRailAffiliateForDate("2026-01-04");
    assert.deepEqual(first, second);
  });

  it("maps dateKey to an index in RAIL_AFFILIATE_POOL", () => {
    const dateKey = "2026-01-04";
    const entry = pickRailAffiliateForDate(dateKey);
    const index = hashDateKey(dateKey) % RAIL_AFFILIATE_POOL.length;
    assert.deepEqual(entry, RAIL_AFFILIATE_POOL[index]);
  });
});

describe("pickNarrowAffiliateForDate — rail/narrow programId exclusion", () => {
  const techgymDate = findDateKeyForRailProgramId("techgym");
  const zerosukuDate = findDateKeyForRailProgramId("zerosuku");
  const internetAcademyDate = findDateKeyForRailProgramId("internet-academy");

  it("excludes techgym from narrow when rail is techgym", () => {
    const rail = pickRailAffiliateForDate(techgymDate);
    const narrow = pickNarrowAffiliateForDate(techgymDate);

    assert.equal(rail.programId, "techgym");
    assert.notEqual(narrow.programId, "techgym");
    assert.ok(
      NARROW_AFFILIATE_POOL.some((entry) => entry.programId === narrow.programId),
    );
  });

  it("excludes zerosuku from narrow when rail is zerosuku", () => {
    const rail = pickRailAffiliateForDate(zerosukuDate);
    const narrow = pickNarrowAffiliateForDate(zerosukuDate);

    assert.equal(rail.programId, "zerosuku");
    assert.notEqual(narrow.programId, "zerosuku");
    assert.ok(
      NARROW_AFFILIATE_POOL.some((entry) => entry.programId === narrow.programId),
    );
  });

  it("allows techgym or zerosuku in narrow when rail is internet-academy", () => {
    const rail = pickRailAffiliateForDate(internetAcademyDate);
    const narrow = pickNarrowAffiliateForDate(internetAcademyDate);

    assert.equal(rail.programId, "internet-academy");
    assert.notEqual(narrow.programId, "internet-academy");
    assert.ok(
      NARROW_AFFILIATE_POOL.some((entry) => entry.programId === narrow.programId),
    );
  });

  it("never returns the same programId as rail for any day in 2026", () => {
    for (let month = 1; month <= 12; month += 1) {
      for (let day = 1; day <= 28; day += 1) {
        const dateKey = `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const rail = pickRailAffiliateForDate(dateKey);
        const narrow = pickNarrowAffiliateForDate(dateKey);
        assert.notEqual(
          narrow.programId,
          rail.programId,
          `overlap on ${dateKey}: rail=${rail.programId}, narrow=${narrow.programId}`,
        );
      }
    }
  });

  it("picks from filtered candidates using the narrow hash suffix", () => {
    const dateKey = techgymDate;
    const rail = pickRailAffiliateForDate(dateKey);
    const candidates = NARROW_AFFILIATE_POOL.filter(
      (entry) => entry.programId !== rail.programId,
    );
    const index =
      hashDateKey(`${dateKey}|narrow`) % Math.max(candidates.length, 1);
    const expected = candidates[index] ?? NARROW_AFFILIATE_POOL[0];

    assert.deepEqual(pickNarrowAffiliateForDate(dateKey), expected);
  });
});

describe("pool membership helpers", () => {
  it("marks techgym and zerosuku as rail pool members", () => {
    assert.equal(isRailPoolProgramId("techgym"), true);
    assert.equal(isRailPoolProgramId("zerosuku"), true);
    assert.equal(isRailPoolProgramId("udemy"), false);
  });

  it("marks techgym and zerosuku as narrow pool members", () => {
    assert.equal(isNarrowPoolProgramId("techgym"), true);
    assert.equal(isNarrowPoolProgramId("zerosuku"), true);
    assert.equal(isNarrowPoolProgramId("amazon-prime-video"), false);
  });
});
