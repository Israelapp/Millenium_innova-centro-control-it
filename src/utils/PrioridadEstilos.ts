import type { Prioridad } from "../type/control-it";

export interface EstiloPrioridad {
  badge: string;
  borde: string;
  etiqueta: string;
}

export const ESTILOS_PRIORIDAD: Record<Prioridad, EstiloPrioridad> = {
  Baja: {
    etiqueta: "Baja",
    badge: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    borde: "border-l-4 border-l-emerald-500",
  },
  Media: {
    etiqueta: "Media",
    badge: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    borde: "border-l-4 border-l-amber-500",
  },
  Alta: {
    etiqueta: "Alta",
    badge: "bg-orange-500/15 text-orange-400 border border-orange-500/30",
    borde: "border-l-4 border-l-orange-500",
  },
  Urgente: {
    etiqueta: "Urgente",
    badge: "bg-red-500/20 text-red-400 border border-red-500/40 font-semibold",
    borde: "border-l-4 border-l-red-500",
  },
};