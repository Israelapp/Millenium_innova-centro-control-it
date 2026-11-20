import { TarjetaEntrada } from './TarjetaEntrada';
import { TarjetaLlamada } from './TarjetaLlamada';
import type { EntradaTaller } from '../type/control-it';
import type { LlamadaTaller } from '../hook/useLLamada';

interface ListadoRegistrosProps {
  esVistaLlamadas: boolean;
  terminoBusqueda: string;
  hayFiltrosActivos: boolean;
  onLimpiarFiltros: () => void;
  entradasFiltradas: EntradaTaller[];
  llamadasFiltradas: LlamadaTaller[];
  onAlternarEstadoEntrada: (id: string) => void;
  onEditarEntrada: (entrada: EntradaTaller) => void;
  onEliminarEntrada: (id: string) => void;
  onAlternarEstadoLlamada: (id: string) => void;
  onEditarLlamada: (llamada: LlamadaTaller) => void;
  onEliminarLlamada: (id: string) => void;
}

export function ListadoRegistros({
  esVistaLlamadas,
  terminoBusqueda,
  hayFiltrosActivos,
  onLimpiarFiltros,
  entradasFiltradas,
  llamadasFiltradas,
  onAlternarEstadoEntrada,
  onEditarEntrada,
  onEliminarEntrada,
  onAlternarEstadoLlamada,
  onEditarLlamada,
  onEliminarLlamada,
}: ListadoRegistrosProps) {
  const total = esVistaLlamadas ? llamadasFiltradas.length : entradasFiltradas.length;

  if (total === 0) {
    return (
      <div className="text-center py-10 space-y-3">
        <p className="text-slate-400 text-sm">
          {terminoBusqueda
            ? `No se encontraron registros para "${terminoBusqueda}".`
            : esVistaLlamadas
              ? 'No hay llamadas registradas con estos filtros.'
              : 'No hay entradas de taller con los filtros seleccionados.'}
        </p>
        {hayFiltrosActivos && (
          <button
            type="button"
            onClick={onLimpiarFiltros}
            className="text-xs text-blue-400 hover:text-blue-300 underline cursor-pointer"
          >
            Limpiar búsqueda y filtros
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {esVistaLlamadas
        ? llamadasFiltradas.map((item) => (
            <TarjetaLlamada
              key={item.id}
              llamada={item}
              onAlternarEstado={onAlternarEstadoLlamada}
              onEditar={onEditarLlamada}
              onEliminar={onEliminarLlamada}
            />
          ))
        : entradasFiltradas.map((item) => (
            <TarjetaEntrada
              key={item.id}
              entrada={item}
              onAlternarEstado={onAlternarEstadoEntrada}
              onEditar={onEditarEntrada}
              onEliminar={onEliminarEntrada}
            />
          ))}
    </div>
  );
}