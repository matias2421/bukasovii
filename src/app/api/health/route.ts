import { getDb } from "@/lib/db";
import { useBlob } from "@/lib/storage";

// Diagnóstico: reporta si los servicios están configurados (sin exponer secretos)
export async function GET() {
  let db = "error";
  try {
    const client = await getDb();
    const r = await client.execute("SELECT COUNT(*) AS n FROM dishes");
    db = `ok (${r.rows[0].n} platos)`;
  } catch {
    // db queda en "error"
  }

  return Response.json({
    db,
    blob: useBlob(),
    adminPassword: Boolean(process.env.ADMIN_PASSWORD),
  });
}
