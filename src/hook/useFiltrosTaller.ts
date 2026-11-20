import { useState } from 'react';
import type { FiltroEstado, FiltroPrioridad } from '../components/BarraFiltros';
import type { LlamadaTaller } from './useLLamada';
import type { EntradaTaller } from '../type/control-it';

type VistaActiva = 'taller' | 'llamadas';

interface ParamsFiltrosTaller {
  vistaActiva: VistaActiva;
  entradas: EntradaTaller[];
  llamadas: LlamadaTaller[];
}

export function useFiltrosTaller({
  vistaActiva,
  entradas,
  llamadas,
}: ParamsFiltrosTaller) {
  const [filtroActual, setFiltroActual] = useState<FiltroEstado>('Todos');
  const [filtroTecnico, setFiltroTecnico] = useState<string>('Todos');
  const [filtroPrioridad, setFiltroPrioridad] = useState<FiltroPrioridad>('Todas');
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>('');

  const esVistaLlamadas = vistaActiva === 'llamadas';
  const busqueda = terminoBusqueda.trim().toLowerCase();

  const limpiarFiltros = () => {
    setTerminoBusqueda('');
    setFiltroActual('Todos');
    setFiltroTecnico('Todos');
    setFiltroPrioridad('Todas');
  };

  const hayFiltrosActivos =
    Boolean(terminoBusqueda) ||
    filtroActual !== 'Todos' ||
    filtroTecnico !== 'Todos' ||
    filtroPrioridad !== 'Todas';

  const coincideFiltrosBase = (
    item: { estado: string; prioridad: string; tecnicoAsignado?: string | null }
  ) => {
    if (filtroActual !== 'Todos' && item.estado !== filtroActual) return false;
    if (filtroPrioridad !== 'Todas' && item.prioridad !== filtroPrioridad) return false;
    if (filtroTecnico !== 'Todos') {
      if (filtroTecnico === 'Sin asignar' && item.tecnicoAsignado) return false;
      if (filtroTecnico !== 'Sin asignar' && item.tecnicoAsignado !== filtroTecnico) {
        return false;
      }
    }
    return true;
  };

  const entradasFiltradas = entradas.filter((item) => {
    if (!coincideFiltrosBase(item)) return false;
    if (!busqueda) return true;
    return [
      item.id,
      item.cliente,
      item.dispositivo,
      item.para,
      item.tecnicoAsignado,
      item.prioridad,
    ].some((c) => String(c ?? '').toLowerCase().includes(busqueda));
  });

  const llamadasFiltradas = llamadas.filter((item) => {
    if (!coincideFiltrosBase(item)) return false;
    if (!busqueda) return true;
    return [
      item.id,
      item.cliente,
      item.telefono,
      item.empresa,
      item.motivo,
      item.tecnicoAsignado,
      item.prioridad,
    ].some((c) => String(c ?? '').toLowerCase().includes(busqueda));
  });

  const elementosMetricas: EntradaTaller[] = esVistaLlamadas
    ? llamadas.map((l) => ({
        id: l.id,
        para: l.empresa,
        fechaAlta: l.fecha,
        cliente: l.cliente,
        prioridad: l.prioridad,
        dispositivo: l.motivo,
        tecnicoAsignado: l.tecnicoAsignado,
        estado: l.estado,
      }))
    : entradas;

  const totalFiltrados = esVistaLlamadas
    ? llamadasFiltradas.length
    : entradasFiltradas.length;

  return {
    filtroActual,
    setFiltroActual,
    filtroTecnico,
    setFiltroTecnico,
    filtroPrioridad,
    setFiltroPrioridad,
    terminoBusqueda,
    setTerminoBusqueda,
    limpiarFiltros,
    hayFiltrosActivos,
    entradasFiltradas,
    llamadasFiltradas,
    elementosMetricas,
    totalFiltrados,
  };
}