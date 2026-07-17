import { restaurant } from "@/lib/restaurant";
import { to12h } from "@/lib/hours";

const DAY_NAMES = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
// Orden de visualización: Lunes → Domingo
const ORDER = [1, 2, 3, 4, 5, 6, 0];

function ContactButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-surface px-4 py-3 text-xs font-medium text-text active:scale-95"
    >
      <span className="text-amber">{children}</span>
      {label}
    </a>
  );
}

export default function SiteFooter() {
  const { whatsapp, instagram, address, mapsUrl, hours } = restaurant;
  const igUser = instagram.replace(/^@/, "");

  return (
    <footer className="mx-auto max-w-2xl px-5 pb-10 pt-4">
      <div className="rounded-3xl border border-border bg-surface/40 p-5">
        <h2 className="text-center font-[family-name:var(--font-brand)] text-2xl text-text">
          {restaurant.name}
        </h2>
        <p className="mt-0.5 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-amber">
          {restaurant.tagline}
        </p>

        {/* Botones de contacto */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {whatsapp && (
            <ContactButton
              href={`https://wa.me/${whatsapp}`}
              label="WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
              </svg>
            </ContactButton>
          )}
          {whatsapp && (
            <ContactButton href={`tel:+${whatsapp}`} label="Llamar">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
              </svg>
            </ContactButton>
          )}
          {mapsUrl && (
            <ContactButton href={mapsUrl} label="Cómo llegar">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </ContactButton>
          )}
          {igUser && (
            <ContactButton
              href={`https://instagram.com/${igUser}`}
              label="Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </ContactButton>
          )}
        </div>

        {address && (
          <p className="mt-4 text-center text-xs text-text-muted">{address}</p>
        )}

        {/* Horario */}
        <div className="mt-5 border-t border-border pt-4">
          <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-amber">
            Horario
          </p>
          <ul className="mx-auto max-w-xs space-y-1 text-xs text-text-muted">
            {ORDER.map((d) => (
              <li key={d} className="flex justify-between">
                <span>{DAY_NAMES[d]}</span>
                <span>
                  {hours[d]
                    ? `${to12h(hours[d]!.open)} – ${to12h(hours[d]!.close)}`
                    : "Cerrado"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] text-text-muted">
        Carta digital · {restaurant.name} © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
