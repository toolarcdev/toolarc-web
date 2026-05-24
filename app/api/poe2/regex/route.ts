import { NextRequest, NextResponse } from "next/server";
import {
  fetchRegexFromApi,
  isPoe2ApiConfigured,
} from "@/lib/poe2/poe2-api-server";
import type { SearchMode } from "@/lib/poe2/types";

type Body = {
  ids?: number[];
  mode?: SearchMode;
};

export async function POST(request: NextRequest) {
  if (!isPoe2ApiConfigured()) {
    return NextResponse.json(
      { error: "PoE2 API is not configured" },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const ids = body.ids;
  const mode = body.mode ?? "or";

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json(
      { error: "ids must be a non-empty array" },
      { status: 400 },
    );
  }

  if (mode !== "or" && mode !== "and") {
    return NextResponse.json(
      { error: "mode must be or or and" },
      { status: 400 },
    );
  }

  try {
    const result = await fetchRegexFromApi(ids, mode);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to build regex" },
      { status: 502 },
    );
  }
}
