import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_SEARCH_LIMIT } from "@/lib/poe2/constants";
import {
  fetchModSearchFromApi,
  isPoe2ApiConfigured,
} from "@/lib/poe2/poe2-api-server";

export async function GET(request: NextRequest) {
  if (!isPoe2ApiConfigured()) {
    return NextResponse.json(
      { error: "PoE2 API is not configured" },
      { status: 503 },
    );
  }

  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q") ?? "";
  const limitParam = searchParams.get("limit");
  const limit = limitParam
    ? Number.parseInt(limitParam, 10)
    : DEFAULT_SEARCH_LIMIT;

  try {
    const data = await fetchModSearchFromApi(
      q,
      Number.isNaN(limit) ? DEFAULT_SEARCH_LIMIT : limit,
    );
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to search mods" },
      { status: 502 },
    );
  }
}
