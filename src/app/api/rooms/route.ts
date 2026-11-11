import { createRoom, listRooms } from "@/db/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json(await listRooms(10));
  } catch {
    return Response.json([]);
  }
}

export async function POST(req: Request) {
  const b = await req.json();
  const code = await createRoom(String(b.map || "0"), String(b.name || "Pilot").slice(0, 16));
  return Response.json({ code });
}
