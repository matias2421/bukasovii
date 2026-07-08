"use client";

import { Dish } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "./CartContext";

export default function DishCard({
  dish,
  onSelect,
}: {
  dish: Dish;
  onSelect: (dish: Dish) => void;
}) {
  const { add } = useCart();

  return (
    <div
      onClick={() => onSelect(dish)}
      className={`flex cursor-pointer gap-3 border-b border-border py-3.5 ${
        dish.available ? "" : "opacity-50"
      }`}
    >
      <div className="min-w-0 flex-1 py-0.5">
        <p className="text-[15px] font-medium text-text">{dish.name}</p>
        <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-text-muted">
          {dish.description}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <p className="text-sm font-semibold text-text">
            {formatPrice(dish.price)}
          </p>
          {!dish.available && (
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-muted">
              Agotado
            </span>
          )}
        </div>
      </div>
      <div className="relative shrink-0">
        <div className="h-[88px] w-[88px] overflow-hidden rounded-xl bg-wood">
          {dish.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={dish.imageUrl}
              alt={dish.name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          )}
        </div>
        {dish.available && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              add(dish);
            }}
            aria-label={`Agregar ${dish.name}`}
            className="absolute -bottom-2 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-amber text-lg font-bold leading-none text-amber-dark shadow-md active:scale-95"
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}
