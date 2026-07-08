import { getDb } from "./db";
import { Category, Dish } from "./types";
import type { Row } from "@libsql/client";

function toDish(row: Row): Dish {
  return {
    id: String(row.id),
    name: String(row.name),
    description: String(row.description),
    price: Number(row.price),
    imageUrl: row.image_url ? String(row.image_url) : undefined,
    available: Number(row.available) === 1,
  };
}

export async function getMenu(): Promise<Category[]> {
  const db = await getDb();
  const [categories, dishes] = await Promise.all([
    db.execute("SELECT id, name FROM categories ORDER BY position"),
    db.execute("SELECT * FROM dishes ORDER BY position"),
  ]);

  return categories.rows.map((category) => ({
    id: String(category.id),
    name: String(category.name),
    dishes: dishes.rows
      .filter((d) => d.category_id === category.id)
      .map(toDish),
  }));
}
