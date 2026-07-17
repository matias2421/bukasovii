import { createClient, type Client } from "@libsql/client";
import fs from "node:fs";
import path from "node:path";
import { catalogSeed } from "./catalogSeed";

// Local: archivo SQLite en data/menu.db (sin cuentas ni servicios).
// Producción: Turso, configurando TURSO_DATABASE_URL y TURSO_AUTH_TOKEN.
const url = process.env.TURSO_DATABASE_URL ?? "file:data/menu.db";

if (url.startsWith("file:")) {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
}

const client = createClient({
  url,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function init() {
  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      position INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS dishes (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      price INTEGER NOT NULL,
      image_url TEXT,
      available INTEGER NOT NULL DEFAULT 1,
      position INTEGER NOT NULL DEFAULT 0
    );
  `);

  const count = await client.execute("SELECT COUNT(*) AS n FROM categories");
  if (Number(count.rows[0].n) > 0) return;

  const statements = [];
  for (const [catIndex, category] of catalogSeed.entries()) {
    statements.push({
      sql: "INSERT INTO categories (id, name, position) VALUES (?, ?, ?)",
      args: [category.id, category.name, catIndex],
    });
    for (const [dishIndex, dish] of category.dishes.entries()) {
      statements.push({
        sql: "INSERT INTO dishes (id, category_id, name, description, price, image_url, position) VALUES (?, ?, ?, ?, ?, ?, ?)",
        args: [
          dish.id,
          category.id,
          dish.name,
          dish.description,
          dish.price,
          dish.imageUrl,
          dishIndex,
        ],
      });
    }
  }
  await client.batch(statements, "write");
}

let ready: Promise<void> | null = null;

export async function getDb(): Promise<Client> {
  if (!ready) ready = init();
  await ready;
  return client;
}
