import { restaurant, type DayHours } from "./restaurant";

const DAYS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

// "22:00" -> "10:00 pm"
export function to12h(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

// Hora actual en Colombia, sin depender de la zona horaria del servidor/dispositivo.
function bogotaNow() {
  const s = new Date().toLocaleString("en-US", { timeZone: "America/Bogota" });
  const d = new Date(s);
  return { day: d.getDay(), minutes: d.getHours() * 60 + d.getMinutes() };
}

export type OpenStatus = {
  open: boolean;
  label: string; // texto corto para el badge
};

export function getOpenStatus(): OpenStatus {
  const hours = restaurant.hours;
  const { day, minutes } = bogotaNow();

  const today: DayHours = hours[day];
  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, label: `Abierto · cierra ${to12h(today.close)}` };
  }

  // ¿abre más tarde hoy?
  if (today && minutes < toMinutes(today.open)) {
    return { open: false, label: `Cerrado · abre hoy ${to12h(today.open)}` };
  }

  // buscar el próximo día que abre (hasta 7 días adelante)
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const h = hours[d];
    if (h) {
      const when = i === 1 ? "mañana" : DAYS[d];
      return { open: false, label: `Cerrado · abre ${when} ${to12h(h.open)}` };
    }
  }

  return { open: false, label: "Cerrado" };
}
