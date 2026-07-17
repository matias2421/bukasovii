"use client";

import { useEffect, useState } from "react";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";

// Calcula el estado en el cliente (hora de Colombia, en vivo), evitando que
// quede "congelado" por el cacheo estático de la página.
export default function OpenStatusBadge() {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    setStatus(getOpenStatus());
    const id = setInterval(() => setStatus(getOpenStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) {
    // marcador neutro mientras hidrata (evita parpadeo de estado incorrecto)
    return <span className="inline-flex items-center gap-1 opacity-0">·</span>;
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status.open ? "bg-green" : "bg-text-muted"
        }`}
      />
      {status.label}
    </span>
  );
}
