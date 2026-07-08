import fs from "node:fs";
import path from "node:path";
import { restaurant } from "@/lib/restaurant";
import FriesMark from "./FriesMark";

function findLogo() {
  for (const file of ["logo.jpg", "logo.jpeg", "logo.png", "logo.webp"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", file))) {
      return `/${file}`;
    }
  }
  return null;
}

function CoverFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-paper text-ink">
      {/* salpicaduras del logo */}
      <span className="absolute left-[12%] top-[22%] h-2 w-2 rounded-full bg-ink/80" />
      <span className="absolute left-[20%] top-[60%] h-1.5 w-1.5 rounded-full bg-ink/70" />
      <span className="absolute right-[14%] top-[30%] h-2.5 w-2.5 rounded-full bg-ink/80" />
      <span className="absolute right-[24%] bottom-[24%] h-1.5 w-1.5 rounded-full bg-ink/60" />
      <span className="absolute left-[32%] bottom-[16%] h-1 w-6 -rotate-12 rounded-full bg-ink/50" />
      <span className="absolute right-[8%] top-[12%] h-1 w-8 -rotate-45 rounded-full bg-ink/50" />
      <div className="flex items-center gap-4">
        <FriesMark className="h-16 w-16" />
        <div>
          <p className="font-[family-name:var(--font-brand)] text-4xl">
            {restaurant.name}
          </p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.3em]">
            {restaurant.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CoverHeader() {
  const logoUrl = findLogo();

  return (
    <header>
      <div className="relative h-44 w-full overflow-hidden sm:h-56">
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt={`Logo de ${restaurant.name}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <CoverFallback />
        )}
        {/* difuminado negro hacia los bordes */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/60" />
      </div>

      <div className="relative mx-auto -mt-12 flex max-w-2xl flex-col items-center px-5 text-center">
        <div className="h-21 w-21 overflow-hidden rounded-full border-4 border-ink bg-paper shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/perfil.webp"
            alt={`Perfil de ${restaurant.name}`}
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="mt-2 font-[family-name:var(--font-brand)] text-3xl tracking-tight text-text">
          {restaurant.name}
        </h1>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber">
          {restaurant.tagline}
        </p>
        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-text-muted">
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-green" />
            Abierto
          </span>
          <span>{restaurant.schedule}</span>
          <span>{restaurant.address}</span>
        </div>
      </div>
    </header>
  );
}
