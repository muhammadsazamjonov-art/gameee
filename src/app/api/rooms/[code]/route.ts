import { getRoom, syncRoom } from "@/db/storage";

export const dynamic = "force-dynamic";

export async function GET(_: Request, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params;
  const r = await getRoom(code.toUpperCase());
  if (!r) return Response.json({ error: "not found" }, { status: 404 });
  return Response.json(r);
}

// sync: upsert my state, return others
export async function POST(req: Request, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params;
  const b = await req.json();
  const others = await syncRoom(code.toUpperCase(), String(b.pid).slice(0, 40), String(b.name || "Pilot").slice(0, 16), b.state ?? {});
  return Response.json(others);
}
