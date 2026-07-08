"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomBytes } from "node:crypto";
import { getDb } from "@/lib/db";
import { deleteDishImage, saveDishImage } from "@/lib/storage";
import {
  checkPassword,
  createSession,
  destroySession,
  isAdmin,
} from "@/lib/adminAuth";

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

function refresh() {
  revalidatePath("/carta");
  revalidatePath("/admin");
}

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

export async function updateDish(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Math.max(0, Math.round(Number(formData.get("price")) || 0));
  if (!name) return;
  const db = await getDb();
  await db.execute({
    sql: "UPDATE dishes SET name = ?, description = ?, price = ? WHERE id = ?",
    args: [name, description, price, id],
  });
  refresh();
}

export async function toggleDish(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const db = await getDb();
  await db.execute({
    sql: "UPDATE dishes SET available = 1 - available WHERE id = ?",
    args: [id],
  });
  refresh();
}

export async function deleteDish(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const db = await getDb();
  const prev = await db.execute({
    sql: "SELECT image_url FROM dishes WHERE id = ?",
    args: [id],
  });
  await db.execute({ sql: "DELETE FROM dishes WHERE id = ?", args: [id] });
  await deleteDishImage(prev.rows[0]?.image_url as string | null);
  refresh();
}

export async function createDish(formData: FormData) {
  await requireAdmin();
  const categoryId = String(formData.get("categoryId"));
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Math.max(0, Math.round(Number(formData.get("price")) || 0));
  if (!name) return;
  const id = `${name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}-${randomBytes(3).toString("hex")}`;
  const db = await getDb();
  const maxPos = await db.execute({
    sql: "SELECT COALESCE(MAX(position), -1) AS p FROM dishes WHERE category_id = ?",
    args: [categoryId],
  });
  await db.execute({
    sql: "INSERT INTO dishes (id, category_id, name, description, price, position) VALUES (?, ?, ?, ?, ?, ?)",
    args: [id, categoryId, name, description, price, Number(maxPos.rows[0].p) + 1],
  });
  refresh();
}

export async function uploadDishImage(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return;
  if (file.size > 5 * 1024 * 1024) return; // máx 5 MB

  const ext = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp" }[
    file.type
  ];
  if (!ext) return;

  const db = await getDb();
  const prev = await db.execute({
    sql: "SELECT image_url FROM dishes WHERE id = ?",
    args: [id],
  });
  if (prev.rows.length === 0) return;

  const imageUrl = await saveDishImage(`${id}-${Date.now()}${ext}`, file);
  if (!imageUrl) return;
  await db.execute({
    sql: "UPDATE dishes SET image_url = ? WHERE id = ?",
    args: [imageUrl, id],
  });
  await deleteDishImage(prev.rows[0].image_url as string | null);
  refresh();
}
