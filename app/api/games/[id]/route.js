import { NextResponse } from "next/server";
import { freeToGameFetch } from "@/lib/freetogame";

export const runtime = 'edge';
// GET /api/games/[id]
export async function GET(_request, { params }) {
  try {
    const data = await freeToGameFetch("/game", { id: params.id });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
