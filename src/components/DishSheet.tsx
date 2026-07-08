"use client";

import { Dish } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "./CartContext";

export default function DishSheet({
  dish,
  onClose,
}: {
  dish: Dish | null;
  onClose: () => void;
}) {
  const { add } = useCart();

  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-x-0 bottom-0 mx-auto max-w-2xl rounded-t-3xl bg-surface p-5 pb-8"
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
        <div className="h-44 w-full overflow-hidden rounded-2xl bg-wood">
          {dish.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={dish.imageUrl}
              alt={dish.name}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <h3 className="mt-4 text-xl font-semibold text-text">{dish.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
          {dish.description}
        </p>
        <p className="mt-3 text-lg font-semibold text-text">
          {formatPrice(dish.price)}
        </p>
        {dish.available ? (
          <button
            onClick={() => {
              add(dish);
              onClose();
            }}
            className="mt-5 w-full rounded-full bg-amber py-3.5 text-sm font-semibold text-amber-dark active:scale-[0.99]"
          >
            Agregar al pedido
          </button>
        ) : (
          <p className="mt-5 w-full rounded-full border border-border py-3.5 text-center text-sm font-semibold text-text-muted">
            Agotado por hoy
          </p>
        )}
      </div>
    </div>
  );
}
