import { useState, useEffect } from 'react';
import type { EntradaTaller } from '../type/control-it';
import { initialEntradas } from '../data/mockData';

const STORAGE_KEY = 'centro_control_it_entradas_v1';

function cargarEntradasIniciales(): EntradaTaller[] {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (!guardado) return initialEntradas;
    const parsed = JSON.parse(guardado);
    return Array.isArray(parsed) ? parsed : initialEntradas;
  } catch {
    return initialEntradas;
  }
}

export function useEntradasTaller() {
  const [entradas, setEntradas] = useState<EntradaTaller[]>(cargarEntradasIniciales);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entradas));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }, [entradas]);

  const agregarEntrada = (nueva: EntradaTaller) => setEntradas((prev) => [nueva, ...prev]);

  const editarEntrada = (actualizada: EntradaTaller) =>
    setEntradas((prev) => prev.map((item) => (item.id === actualizada.id ? actualizada : item)));

  const alternarEstado = (id: string) =>
    setEntradas((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, estado: item.estado === 'En proceso' ? 'Finalizada' : 'En proceso' }
          : item
      )
    );

  const eliminarEntrada = (id: string) =>
    setEntradas((prev) => prev.filter((item) => item.id !== id));

  const restaurarDatosEjemplo = () => {
    setEntradas(initialEntradas);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialEntradas));
  };

  return {
    entradas,
    agregarEntrada,
    editarEntrada,
    alternarEstado,
    eliminarEntrada,
    restaurarDatosEjemplo,
  };
}