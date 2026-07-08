import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/adminAuth";
import { login } from "../actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-5">
      <form
        action={login}
        className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6"
      >
        <h1 className="text-lg font-semibold text-text">Panel Bukasovii</h1>
        <p className="mt-1 text-sm text-text-muted">
          Ingresa la contraseña de administrador.
        </p>
        <input
          type="password"
          name="password"
          required
          autoFocus
          placeholder="Contraseña"
          className="mt-4 w-full rounded-xl border border-border bg-ink px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-amber focus:outline-none"
        />
        {error && (
          <p className="mt-2 text-xs text-red-400">Contraseña incorrecta.</p>
        )}
        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-amber py-2.5 text-sm font-semibold text-amber-dark"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
