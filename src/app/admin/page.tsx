import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/adminAuth";
import { getMenu } from "@/lib/menu";
import { logout } from "./actions";
import AdminCategory from "@/components/admin/AdminCategory";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const categories = await getMenu();

  return (
    <main className="mx-auto min-h-screen max-w-3xl bg-ink px-5 pb-20 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-text">Panel Bukasovii</h1>
          <p className="mt-0.5 text-sm text-text-muted">
            Edita platos, precios, fotos y disponibilidad. Los cambios salen de
            inmediato en la carta.
          </p>
        </div>
        <form action={logout}>
          <button className="rounded-full border border-border px-4 py-1.5 text-xs text-text-muted">
            Salir
          </button>
        </form>
      </div>

      <div className="mt-6 flex flex-col gap-8">
        {categories.map((category) => (
          <AdminCategory key={category.id} category={category} />
        ))}
      </div>
    </main>
  );
}
