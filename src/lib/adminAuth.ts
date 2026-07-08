import { createHmac } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "bk_admin";

function getPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

function sessionToken() {
  return createHmac("sha256", "bukasovii-admin-v1")
    .update(getPassword())
    .digest("hex");
}

export function checkPassword(password: string) {
  return getPassword() !== "" && password === getPassword();
}

export async function createSession() {
  const store = await cookies();
  store.set(COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isAdmin() {
  const store = await cookies();
  return (
    getPassword() !== "" && store.get(COOKIE)?.value === sessionToken()
  );
}
