import { Search, X } from 'lucide-react';
import { TECNICOS_TALLER } from '../data/mockData';
import type { Prioridad } from '../type/control-it';

export type FiltroEstado = 'Todos' | 'En proceso' | 'Finalizada';
export type FiltroPrioridad = 'Todas' | Prioridad;

interface BarraFiltrosProps {
  totalFiltrados: number;
  terminoBusqueda: string;
  onBusquedaChange: (valor: string) => void;
  filtroActual: FiltroEstado;
  onFiltroChange: (filtro: FiltroEstado) => void;
  filtroTecnico: string;
  onFiltroTecnicoChange: (tecnico: string) => void;
  filtroPrioridad: FiltroPrioridad;
  onFiltroPrioridadChange: (prioridad: FiltroPrioridad) => void;
}

const FILTROS: FiltroEstado[] = ['Todos', 'En proceso', 'Finalizada'];
const PRIORIDADES: Prioridad[] = ['Baja', 'Media', 'Alta', 'Urgente'];

export function BarraFiltros({
  totalFiltrados,
  terminoBusqueda,
  onBusquedaChange,
  filtroActual,
  onFiltroChange,
  filtroTecnico,
  onFiltroTecnicoChange,
  filtroPrioridad,
  onFiltroPrioridadChange,
}: BarraFiltrosProps) {
  return (
    <div className="flex flex-col xl:flex-row justify-between items-stretch xl:items-center gap-4 mb-6 pb-4 border-b border-slate-700">
      <h2 className="text-lg font-semibold shrink-0">
        Registros ({totalFiltrados})
      </h2>

      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full xl:w-auto">
        <div className="relative flex-1 sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={terminoBusqueda}
            onChange={(e) => onBusquedaChange(e.target.value)}
            placeholder="Buscar por ID, cliente, equipo..."
            aria-label="Buscar registros"
            className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none rounded-lg pl-9 pr-8 py-1.5 text-sm text-white placeholder-slate-500 transition"
          />
          {terminoBusqueda && (
            <button
              type="button"
              onClick={() => onBusquedaChange('')}
              title="Limpiar búsqueda"
              className="text-slate-400 hover:text-white absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <select
          value={filtroTecnico}
          onChange={(e) => onFiltroTecnicoChange(e.target.value)}
          aria-label="Filtrar por técnico"
          className="bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none rounded-lg px-3 py-1.5 text-sm text-slate-200 cursor-pointer"
        >
          <option value="Todos">Todos los técnicos</option>
          <option value="Sin asignar">Sin asignar</option>
          {TECNICOS_TALLER.map((tecnico) => (
            <option key={tecnico} value={tecnico}>
              {tecnico}
            </option>
          ))}
        </select>

        <select
          value={filtroPrioridad}
          onChange={(e) => onFiltroPrioridadChange(e.target.value as FiltroPrioridad)}
          aria-label="Filtrar por prioridad"
          className="bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none rounded-lg px-3 py-1.5 text-sm text-slate-200 cursor-pointer"
        >
          <option value="Todas">Todas las prioridades</option>
          {PRIORIDADES.map((prioridad) => (
            <option key={prioridad} value={prioridad}>
              {prioridad}
            </option>
          ))}
        </select>

        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700 self-start sm:self-auto">
          {FILTROS.map((filtro) => (
            <button
              key={filtro}
              type="button"
              onClick={() => onFiltroChange(filtro)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer whitespace-nowrap ${
                filtroActual === filtro
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {filtro}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}