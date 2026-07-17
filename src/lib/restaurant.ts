// Datos del negocio. Los marcados con TODO son placeholders — reemplazar por los reales.
export type DayHours = { open: string; close: string } | null; // "HH:MM" 24h, null = cerrado

export const restaurant = {
  name: "Bukasovii",
  tagline: "Papas legendarias",

  // Contacto
  whatsapp: "573113278631", // número real (del logo)
  instagram: "", // TODO: @usuario de Instagram (vacío = no se muestra)
  address: "", // TODO: dirección real (vacío = no se muestra)
  mapsUrl: "", // TODO: link de Google Maps (vacío = no se muestra)

  // Horario semanal (hora de Colombia). Índice: 0=Domingo ... 6=Sábado.
  // TODO: confirmar el horario real. Placeholder: Mar–Dom 12:00–22:00, Lunes cerrado.
  hours: [
    { open: "12:00", close: "22:00" }, // Domingo
    null, // Lunes (cerrado)
    { open: "12:00", close: "22:00" }, // Martes
    { open: "12:00", close: "22:00" }, // Miércoles
    { open: "12:00", close: "22:00" }, // Jueves
    { open: "12:00", close: "22:00" }, // Viernes
    { open: "12:00", close: "22:00" }, // Sábado
  ] as DayHours[],
};
