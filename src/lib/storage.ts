import fs from "node:fs";
import path from "node:path";

// Producción: Vercel Blob (requiere BLOB_READ_WRITE_TOKEN).
// Local: archivos en public/uploads.
const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export async function saveDishImage(
  filename: string,
  file: File,
): Promise<string | null> {
  if (useBlob()) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`dishes/${filename}`, file, {
      access: "public",
      addRandomSuffix: false,
    });
    return blob.url;
  }

  // En Vercel el disco es de solo lectura: sin Blob configurado no se puede subir
  if (process.env.VERCEL) {
    console.error(
      "Upload de imagen omitido: falta BLOB_READ_WRITE_TOKEN (Storage → Blob en Vercel)",
    );
    return null;
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  fs.mkdirSync(uploadsDir, { recursive: true });
  fs.writeFileSync(
    path.join(uploadsDir, filename),
    Buffer.from(await file.arrayBuffer()),
  );
  return `/uploads/${filename}`;
}

export async function deleteDishImage(imageUrl: string | null | undefined) {
  if (!imageUrl) return;

  if (imageUrl.includes(".blob.vercel-storage.com/")) {
    if (!useBlob()) return;
    const { del } = await import("@vercel/blob");
    await del(imageUrl).catch(() => {});
    return;
  }

  if (imageUrl.startsWith("/uploads/")) {
    const filePath = path.join(process.cwd(), "public", imageUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
}
