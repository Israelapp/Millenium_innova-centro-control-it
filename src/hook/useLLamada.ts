import { useState, useEffect } from 'react';
import type { EntradaTaller, Prioridad } from '../type/control-it';

export interface LlamadaTaller {
  id: string;
  cliente: string;
  telefono: string;
  empresa: string;
  motivo: string;
  prioridad: Prioridad;
  tecnicoAsignado: string | null;
  estado: EntradaTaller['estado'];
  fecha: string;
}

const KEY = 'centro_control_it_llamadas_v1';

const leerLlamadas = (): LlamadaTaller[] => {
  try {
    const raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

export function useLlamadasTaller() {
  const [llamadas, setLlamadas] = useState<LlamadaTaller[]>(leerLlamadas);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(llamadas));
    } catch (e) {
      console.error(e);
    }
  }, [llamadas]);

  const agregarLlamada = (nueva: LlamadaTaller) => setLlamadas((p) => [nueva, ...p]);

  const editarLlamada = (actualizada: LlamadaTaller) =>
    setLlamadas((p) => p.map((l) => (l.id === actualizada.id ? actualizada : l)));

  const alternarEstadoLlamada = (id: string) =>
    setLlamadas((p) =>
      p.map((l) =>
        l.id === id
          ? { ...l, estado: l.estado === 'En proceso' ? 'Finalizada' : 'En proceso' }
          : l
      )
    );

  const eliminarLlamada = (id: string) =>
    setLlamadas((p) => p.filter((l) => l.id !== id));

  return {
    llamadas,
    agregarLlamada,
    editarLlamada,
    alternarEstadoLlamada,
    eliminarLlamada,
  };
}