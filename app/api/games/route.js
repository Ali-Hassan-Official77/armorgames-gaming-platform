import { NextResponse } from "next/server";
import { freeToGameFetch } from "@/lib/freetogame";

export const runtime = 'edge';
// GET /api/games?platform=&category=&sort-by=
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  try {
    const data = await freeToGameFetch("/games", {
      platform: searchParams.get("platform") || undefined,
      category: searchParams.get("category") || undefined,
      "sort-by": searchParams.get("sort-by") || undefined,
    });

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
