"use client";

import { useRef } from "react";
import { Dish } from "@/lib/types";
import {
  deleteDish,
  toggleDish,
  updateDish,
  uploadDishImage,
} from "@/app/admin/actions";

export default function AdminDishRow({ dish }: { dish: Dish }) {
  const fileInput = useRef<HTMLInputElement>(null);
  const imageForm = useRef<HTMLFormElement>(null);

  return (
    <div
      className={`rounded-2xl border border-border bg-surface p-3 ${
        dish.available ? "" : "opacity-60"
      }`}
    >
      <div className="flex gap-3">
        {/* imagen */}
        <form action={uploadDishImage} ref={imageForm} className="shrink-0">
          <input type="hidden" name="id" value={dish.id} />
          <input
            ref={fileInput}
            type="file"
            name="image"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={() => imageForm.current?.requestSubmit()}
          />
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="group relative block h-20 w-20 overflow-hidden rounded-xl bg-wood"
            title="Cambiar foto"
          >
            {dish.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={dish.imageUrl}
                alt={dish.name}
                className="h-full w-full object-cover"
              />
            )}
            <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-[10px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
              Cambiar foto
            </span>
          </button>
        </form>

        {/* campos */}
        <form action={updateDish} className="flex min-w-0 flex-1 flex-col gap-2">
          <input type="hidden" name="id" value={dish.id} />
          <div className="flex gap-2">
            <input
              name="name"
              defaultValue={dish.name}
              required
              className="min-w-0 flex-1 rounded-lg border border-border bg-ink px-3 py-1.5 text-sm text-text focus:border-amber focus:outline-none"
            />
            <input
              name="price"
              type="number"
              min="0"
              step="500"
              defaultValue={dish.price}
              className="w-24 rounded-lg border border-border bg-ink px-3 py-1.5 text-sm text-text focus:border-amber focus:outline-none"
            />
          </div>
          <input
            name="description"
            defaultValue={dish.description}
            className="rounded-lg border border-border bg-ink px-3 py-1.5 text-sm text-text-muted focus:border-amber focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <button className="rounded-lg bg-amber px-3 py-1.5 text-xs font-semibold text-amber-dark">
              Guardar
            </button>
            <button
              formAction={toggleDish}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                dish.available
                  ? "border-border text-text-muted"
                  : "border-green text-green"
              }`}
            >
              {dish.available ? "Marcar agotado" : "Activar"}
            </button>
            <button
              formAction={deleteDish}
              onClick={(e) => {
                if (!confirm(`¿Eliminar "${dish.name}" de la carta?`)) {
                  e.preventDefault();
                }
              }}
              className="ml-auto rounded-lg border border-red-900/60 px-3 py-1.5 text-xs text-red-400"
            >
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
