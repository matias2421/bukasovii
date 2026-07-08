import { Category } from "@/lib/types";
import { createDish } from "@/app/admin/actions";
import AdminDishRow from "./AdminDishRow";

export default function AdminCategory({ category }: { category: Category }) {
  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="h-5 w-1.5 rounded-full bg-amber" />
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-amber">
          {category.name}
        </h2>
        <span className="text-[11px] text-text-muted">
          {category.dishes.length} platos
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {category.dishes.map((dish) => (
          <AdminDishRow key={dish.id} dish={dish} />
        ))}
      </div>

      <form
        action={createDish}
        className="mt-3 flex flex-wrap items-end gap-2 rounded-2xl border border-dashed border-border p-3"
      >
        <input type="hidden" name="categoryId" value={category.id} />
        <div className="min-w-40 flex-1">
          <label className="text-[11px] text-text-muted">Nuevo plato</label>
          <input
            name="name"
            required
            placeholder="Nombre"
            className="mt-1 w-full rounded-lg border border-border bg-ink px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-amber focus:outline-none"
          />
        </div>
        <div className="min-w-48 flex-[2]">
          <label className="text-[11px] text-text-muted">Descripción</label>
          <input
            name="description"
            placeholder="Descripción corta"
            className="mt-1 w-full rounded-lg border border-border bg-ink px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-amber focus:outline-none"
          />
        </div>
        <div className="w-28">
          <label className="text-[11px] text-text-muted">Precio</label>
          <input
            name="price"
            type="number"
            min="0"
            step="500"
            required
            placeholder="16000"
            className="mt-1 w-full rounded-lg border border-border bg-ink px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-amber focus:outline-none"
          />
        </div>
        <button className="rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-amber-dark">
          Agregar
        </button>
      </form>
    </section>
  );
}
