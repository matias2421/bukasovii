// Datos del negocio. Los marcados con TODO son placeholders — reemplazar por los reales.
export type DayHours = { open: string; close: string } | null; // "HH:MM" 24h, null = cerrado

export const restaurant = {
  name: "Bukasovii",
  tagline: "Papas legendarias",

  // Contacto
  whatsapp: "573113278631", // número real (del logo)
  instagram: "", // @usuario de Instagram (vacío = no se muestra)
  address: "Parque principal, Manguruma – Frontino, Antioquia",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Parque+principal+Manguruma+Frontino+Antioquia",

  // Horario semanal (hora de Colombia). Índice: 0=Domingo ... 6=Sábado.
  // Abren 6:00 pm – 10:30 pm todos los días menos lunes.
  hours: [
    { open: "18:00", close: "22:30" }, // Domingo
    null, // Lunes (cerrado)
    { open: "18:00", close: "22:30" }, // Martes
    { open: "18:00", close: "22:30" }, // Miércoles
    { open: "18:00", close: "22:30" }, // Jueves
    { open: "18:00", close: "22:30" }, // Viernes
    { open: "18:00", close: "22:30" }, // Sábado
  ] as DayHours[],
};
