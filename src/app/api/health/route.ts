import { healthCheck, storageKind } from "@/db/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await healthCheck();
    return Response.json({ ok: true, storage: storageKind });
  } catch {
    return Response.json({ ok: false, storage: storageKind }, { status: 500 });
  }
}
