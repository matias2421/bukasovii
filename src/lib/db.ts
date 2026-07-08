import { createClient, type Client } from "@libsql/client";
import fs from "node:fs";
import path from "node:path";

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

const seed: [string, string, [string, string, string, number][]][] = [
  [
    "entradas",
    "Entradas",
    [
      ["papas-queso", "Papas con queso", "Papas criollas, queso fundido y tocineta", 16000],
      ["aros-cebolla", "Aros de cebolla", "Crocantes, con salsa ranch de la casa", 14000],
      ["nachos", "Nachos Bukasovii", "Guacamole, pico de gallo y queso cheddar", 19000],
    ],
  ],
  [
    "fuertes",
    "Fuertes",
    [
      ["burger-clasica", "Burger clásica", "Carne, queso, lechuga y salsa de la casa", 28000],
      ["burger-bacon", "Burger bacon BBQ", "Doble carne, tocineta, cheddar y salsa BBQ", 34000],
      ["sandwich-pollo", "Sándwich de pollo crocante", "Pollo apanado, col morada y mayo picante", 26000],
      ["hot-dog", "Hot dog especial", "Salchicha ahumada, papas hilo y salsas", 18000],
    ],
  ],
  [
    "bebidas",
    "Bebidas",
    [
      ["limonada-coco", "Limonada de coco", "Refrescante, con hielo", 9000],
      ["malteada-vainilla", "Malteada de vainilla", "Cremosa, hecha al momento", 13000],
      ["gaseosa", "Gaseosa", "350 ml, varios sabores", 6000],
    ],
  ],
  [
    "postres",
    "Postres",
    [
      ["brownie", "Brownie con helado", "Brownie tibio, helado de vainilla", 15000],
      ["cheesecake", "Cheesecake de maracuyá", "Porción individual", 14000],
    ],
  ],
];

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
  for (const [catIndex, [catId, catName, dishes]] of seed.entries()) {
    statements.push({
      sql: "INSERT INTO categories (id, name, position) VALUES (?, ?, ?)",
      args: [catId, catName, catIndex],
    });
    for (const [dishIndex, [id, name, description, price]] of dishes.entries()) {
      statements.push({
        sql: "INSERT INTO dishes (id, category_id, name, description, price, position) VALUES (?, ?, ?, ?, ?, ?)",
        args: [id, catId, name, description, price, dishIndex],
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
