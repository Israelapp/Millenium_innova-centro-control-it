import {
  CheckCircle2,
  Clock,
  Laptop,
  Building2,
  UserCheck,
  UserX,
  Pencil,
  Trash2,
} from 'lucide-react';
import type { EntradaTaller } from '../type/control-it';
import { BotonConfirmar } from './BotonConfirmar';
import { ESTILOS_PRIORIDAD } from '../utils/PrioridadEstilos';

interface TarjetaEntradaProps {
  entrada: EntradaTaller;
  onAlternarEstado: (id: string) => void;
  onEditar: (entrada: EntradaTaller) => void;
  onEliminar: (id: string) => void;
}

export function TarjetaEntrada({
  entrada,
  onAlternarEstado,
  onEditar,
  onEliminar,
}: TarjetaEntradaProps) {
  const esFinalizada = entrada.estado === 'Finalizada';
  const estiloPrioridad = ESTILOS_PRIORIDAD[entrada.prioridad];

  return (
    <div
      className={`bg-slate-900 p-4 rounded-lg border border-slate-700 ${estiloPrioridad.borde} flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow hover:border-slate-600 transition`}
    >
      <div>
        <div className="flex items-center gap-2">
          <span className="text-blue-400 font-mono font-bold text-sm">{entrada.id}</span>
          <span className={`text-xs px-2 py-0.5 rounded ${estiloPrioridad.badge}`}>
            Prioridad: {estiloPrioridad.etiqueta}
          </span>
        </div>

        <h3 className="text-base font-medium mt-1">Cliente: {entrada.cliente}</h3>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400 mt-1">
          <span className="flex items-center gap-1">
            <Laptop className="w-3.5 h-3.5 text-slate-500" />
            {entrada.dispositivo}
          </span>
          <span className="flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            {entrada.para}
          </span>
          {entrada.tecnicoAsignado ? (
            <span className="flex items-center gap-1 text-slate-300">
              <UserCheck className="w-3.5 h-3.5 text-blue-400" />
              {entrada.tecnicoAsignado}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-amber-400/90 font-medium">
              <UserX className="w-3.5 h-3.5" />
              Sin asignar
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center">
        <button
          type="button"
          onClick={() => onAlternarEstado(entrada.id)}
          title="Haz clic para cambiar el estado"
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition ${
            esFinalizada
              ? 'bg-emerald-900/80 text-emerald-300 hover:bg-emerald-900 border border-emerald-700/50'
              : 'bg-amber-900/80 text-amber-300 hover:bg-amber-900 border border-amber-700/50'
          }`}
        >
          {esFinalizada ? (
            <CheckCircle2 className="w-3.5 h-3.5" />
          ) : (
            <Clock className="w-3.5 h-3.5" />
          )}
          {entrada.estado}
        </button>

        <button
          type="button"
          onClick={() => onEditar(entrada)}
          title="Editar registro"
          className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition cursor-pointer"
        >
          <Pencil className="w-4 h-4" />
        </button>

        <BotonConfirmar
          onConfirmar={() => onEliminar(entrada.id)}
          textoConfirmar="¿Borrar?"
          title="Eliminar registro"
          className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg"
        >
          <Trash2 className="w-4 h-4" />
        </BotonConfirmar>
      </div>
    </div>
  );
}