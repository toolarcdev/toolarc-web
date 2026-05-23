/**
 * 日本語テキストの読了時間を推定する（400字/分）
 * @returns 読了時間（分、最低1分）
 */
export function estimateReadingTime(content: string): number {
  const chars = content.replace(/\s/g, "").length;
  return Math.max(1, Math.ceil(chars / 400));
}
