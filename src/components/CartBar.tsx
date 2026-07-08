"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { restaurant } from "@/lib/restaurant";
import { useCart } from "./CartContext";

export default function CartBar() {
  const { items, count, total, add, remove, clear } = useCart();
  const [open, setOpen] = useState(false);

  if (count === 0) return null;

  const orderText = encodeURIComponent(
    `Hola ${restaurant.name}, quiero pedir:\n` +
      items
        .map(
          (item) =>
            `• ${item.quantity}x ${item.dish.name} — ${formatPrice(
              item.quantity * item.dish.price,
            )}`,
        )
        .join("\n") +
      `\nTotal: ${formatPrice(total)}`,
  );

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-2xl px-5 pb-5">
        <button
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between rounded-full bg-amber px-5 py-3.5 text-sm font-semibold text-amber-dark shadow-lg active:scale-[0.99]"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-dark/15 text-xs">
            {count}
          </span>
          <span>Ver pedido</span>
          <span>{formatPrice(total)}</span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 mx-auto max-w-2xl rounded-t-3xl bg-surface p-5 pb-8"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text">Tu pedido</h3>
              <button
                onClick={() => {
                  clear();
                  setOpen(false);
                }}
                className="text-xs text-text-muted underline"
              >
                Vaciar
              </button>
            </div>

            <div className="mt-3 flex max-h-72 flex-col gap-3 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.dish.id}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-text">
                      {item.dish.name}
                    </p>
                    <p className="text-xs text-text-muted">
                      {formatPrice(item.dish.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => remove(item.dish.id)}
                      aria-label={`Quitar ${item.dish.name}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-text"
                    >
                      −
                    </button>
                    <span className="w-4 text-center text-sm font-medium text-text">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => add(item.dish)}
                      aria-label={`Agregar ${item.dish.name}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-text"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-text-muted">Total</span>
              <span className="text-lg font-semibold text-text">
                {formatPrice(total)}
              </span>
            </div>

            {restaurant.whatsapp ? (
              <a
                href={`https://wa.me/${restaurant.whatsapp}?text=${orderText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full rounded-full bg-green py-3.5 text-center text-sm font-semibold text-ink active:scale-[0.99]"
              >
                Enviar pedido por WhatsApp
              </a>
            ) : (
              <p className="mt-4 text-center text-xs text-text-muted">
                Muestra este pedido al mesero para ordenar.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
