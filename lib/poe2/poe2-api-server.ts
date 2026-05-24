import { DEFAULT_SEARCH_LIMIT } from "./constants";

const DEFAULT_API_URL = "http://localhost:3001";

function getApiConfig(): { baseUrl: string; apiKey: string } | null {
  const apiKey = process.env.POE2_API_KEY;
  const baseUrl = process.env.POE2_API_URL ?? DEFAULT_API_URL;

  if (!apiKey) return null;
  return { baseUrl: baseUrl.replace(/\/$/, ""), apiKey };
}

function authHeaders(apiKey: string): HeadersInit {
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
}

export function isPoe2ApiConfigured(): boolean {
  return getApiConfig() !== null;
}

export async function fetchModSearchFromApi(
  query: string,
  limit = DEFAULT_SEARCH_LIMIT,
): Promise<{ mods: { id: number; text: { ja: string } }[] }> {
  const config = getApiConfig();
  if (!config) {
    throw new Error("POE2_API_KEY is not configured");
  }

  const url = new URL(`${config.baseUrl}/v1/mods/search`);
  url.searchParams.set("q", query);
  url.searchParams.set("limit", String(limit));

  const response = await fetch(url, {
    headers: authHeaders(config.apiKey),
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error(`PoE2 search API error: ${response.status}`);
  }

  return response.json();
}

export async function fetchRegexFromApi(
  ids: number[],
  mode: "or" | "and",
): Promise<{ regex: string; length: number; overLimit: boolean }> {
  const config = getApiConfig();
  if (!config) {
    throw new Error("POE2_API_KEY is not configured");
  }

  const response = await fetch(`${config.baseUrl}/v1/regex`, {
    method: "POST",
    headers: authHeaders(config.apiKey),
    body: JSON.stringify({ ids, mode }),
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error(`PoE2 regex API error: ${response.status}`);
  }

  return response.json();
}
