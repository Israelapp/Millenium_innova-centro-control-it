import React, { useState, useEffect } from 'react';
import { PhoneCall, X } from 'lucide-react';
import type { Prioridad } from '../type/control-it';
import type { LlamadaTaller } from '../hook/useLLamada';
import { TECNICOS_TALLER } from '../data/mockData';

interface ModalNuevaLlamadaProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLlamada: (nueva: LlamadaTaller) => void;
  onUpdateLlamada?: (actualizada: LlamadaTaller) => void;
  llamadaAEditar?: LlamadaTaller | null;
}

const PRIORIDADES: Prioridad[] = ['Baja', 'Media', 'Alta', 'Urgente'];

export const ModalNuevaLlamada: React.FC<ModalNuevaLlamadaProps> = ({
  isOpen,
  onClose,
  onAddLlamada,
  onUpdateLlamada,
  llamadaAEditar = null,
}) => {
  const [cliente, setCliente] = useState('');
  const [telefono, setTelefono] = useState('');
  const [empresa, setEmpresa] = useState('MILLENIUM');
  const [motivo, setMotivo] = useState('');
  const [prioridad, setPrioridad] = useState<Prioridad>('Media');
  const [tecnico, setTecnico] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    if (llamadaAEditar) {
      setCliente(llamadaAEditar.cliente);
      setTelefono(llamadaAEditar.telefono);
      setEmpresa(llamadaAEditar.empresa);
      setMotivo(llamadaAEditar.motivo);
      setPrioridad(llamadaAEditar.prioridad);
      setTecnico(llamadaAEditar.tecnicoAsignado ?? '');
    } else {
      setCliente('');
      setTelefono('');
      setEmpresa('MILLENIUM');
      setMotivo('');
      setPrioridad('Media');
      setTecnico('');
    }
  }, [isOpen, llamadaAEditar]);

  if (!isOpen) return null;

  const esEdicion = Boolean(llamadaAEditar);
  const opcionesTecnicos =
    tecnico && !TECNICOS_TALLER.includes(tecnico)
      ? [tecnico, ...TECNICOS_TALLER]
      : TECNICOS_TALLER;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliente.trim() || !motivo.trim()) return;

    const tecnicoFinal = tecnico.trim() ? tecnico.trim() : null;
    const telefonoFinal = telefono.trim() || 'Sin teléfono';
    const empresaFinal = empresa.trim() || 'MILLENIUM';

    if (llamadaAEditar && onUpdateLlamada) {
      onUpdateLlamada({
        ...llamadaAEditar,
        cliente: cliente.trim(),
        telefono: telefonoFinal,
        empresa: empresaFinal,
        motivo: motivo.trim(),
        prioridad,
        tecnicoAsignado: tecnicoFinal,
      });
    } else {
      const nuevaLlamada: LlamadaTaller = {
        id: `#LL-${Math.floor(1000 + Math.random() * 9000)}`,
        cliente: cliente.trim(),
        telefono: telefonoFinal,
        empresa: empresaFinal,
        motivo: motivo.trim(),
        prioridad,
        tecnicoAsignado: tecnicoFinal,
        estado: 'En proceso',
        fecha: new Date().toLocaleDateString(),
      };
      onAddLlamada(nuevaLlamada);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50 backdrop-blur-xs">
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              <PhoneCall className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-white">
              {esEdicion ? `Editar Llamada ${llamadaAEditar?.id}` : 'Registrar Llamada Entrante'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700/60 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Cliente / Contacto *
              </label>
              <input
                type="text"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                placeholder="Ej. Ana López"
                autoFocus
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Ej. 612 345 678"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Empresa / Sede
              </label>
              <input
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Prioridad
              </label>
              <select
                value={prioridad}
                onChange={(e) => setPrioridad(e.target.value as Prioridad)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                {PRIORIDADES.map((nivel) => (
                  <option key={nivel} value={nivel}>
                    {nivel}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Técnico Asignado
            </label>
            <select
              value={tecnico}
              onChange={(e) => setTecnico(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">-- Sin asignar --</option>
              {opcionesTecnicos.map((nombre) => (
                <option key={nombre} value={nombre}>
                  {nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Motivo de la llamada *
            </label>
            <textarea
              rows={2}
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Ej. Sin acceso a correo, piden devolver llamada o traer equipo..."
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
            >
              {esEdicion ? 'Guardar Cambios' : 'Guardar Llamada'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};