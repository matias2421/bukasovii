// Trazo estilo dibujado a mano, tomado del motivo de papas del logo.
export default function FriesMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* papas */}
      <path d="M26 30 L18 12" />
      <path d="M31 29 L30 8" />
      <path d="M36 29 L42 10" />
      <path d="M41 31 L52 16" />
      <path d="M22 31 L10 20" />
      {/* caja */}
      <path d="M16 30 L20 54 L44 54 L48 30 Z" />
      <path d="M16 30 L48 30" />
      <path d="M22 38 L42 38" strokeWidth="2" opacity="0.55" />
    </svg>
  );
}
