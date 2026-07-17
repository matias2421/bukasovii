"use client";

import { useEffect, useRef, useState } from "react";
import { Category, Dish } from "@/lib/types";
import DishCard from "./DishCard";
import DishSheet from "./DishSheet";
import CartBar from "./CartBar";
import { CartProvider } from "./CartContext";
import { ORDERING_ENABLED } from "@/lib/config";

export default function MenuExperience({
  categories,
}: {
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(categories[0]?.id);
  const [selected, setSelected] = useState<Dish | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const suppressSpy = useRef(false);

  const normalizedQuery = query.trim().toLowerCase();
  const visible = normalizedQuery
    ? categories
        .map((category) => ({
          ...category,
          dishes: category.dishes.filter(
            (dish) =>
              dish.name.toLowerCase().includes(normalizedQuery) ||
              dish.description.toLowerCase().includes(normalizedQuery),
          ),
        }))
        .filter((category) => category.dishes.length > 0)
    : categories;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressSpy.current) return;
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActiveId(hit.target.id.replace("cat-", ""));
      },
      { rootMargin: "-120px 0px -60% 0px" },
    );
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [visible.length]);

  const scrollTo = (id: string) => {
    setActiveId(id);
    suppressSpy.current = true;
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setTimeout(() => (suppressSpy.current = false), 700);
  };

  return (
    <CartProvider>
      <div className="mx-auto max-w-2xl">
        <div className="px-5 pt-5">
          <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 stroke-text-muted"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué se te antoja hoy?"
              className="w-full bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
            />
          </div>
        </div>

        <nav className="sticky top-0 z-20 bg-ink/95 backdrop-blur">
          <div className="flex gap-2 overflow-x-auto px-5 py-3">
            {visible.map((category) => {
              const isActive = category.id === activeId;
              return (
                <button
                  key={category.id}
                  onClick={() => scrollTo(category.id)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                    isActive
                      ? "bg-amber text-amber-dark"
                      : "border border-border bg-transparent text-text-muted"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </nav>

        <div className={ORDERING_ENABLED ? "px-5 pb-32" : "px-5 pb-12"}>
          {visible.length === 0 && (
            <p className="py-10 text-center text-sm text-text-muted">
              No encontramos platos para “{query}”.
            </p>
          )}
          {visible.map((category) => (
            <section
              key={category.id}
              id={`cat-${category.id}`}
              ref={(el) => {
                sectionRefs.current[category.id] = el;
              }}
              className="scroll-mt-16 pt-7"
            >
              <div className="flex items-center gap-3">
                <span className="h-6 w-1.5 rounded-full bg-amber" />
                <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-amber">
                  {category.name}
                </h2>
                <span className="h-px flex-1 bg-gradient-to-r from-amber/50 to-transparent" />
                <span className="text-[11px] text-text-muted">
                  {category.dishes.length} platos
                </span>
              </div>
              <div>
                {category.dishes.map((dish) => (
                  <DishCard key={dish.id} dish={dish} onSelect={setSelected} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <DishSheet dish={selected} onClose={() => setSelected(null)} />
      {ORDERING_ENABLED && <CartBar />}
    </CartProvider>
  );
}
