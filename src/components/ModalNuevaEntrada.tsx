import React, { useState, useEffect } from 'react';
import type { EntradaTaller, Prioridad } from '../type/control-it';
import { TECNICOS_TALLER } from '../data/mockData';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEntrada: (nueva: EntradaTaller) => void;
  onUpdateEntrada: (actualizada: EntradaTaller) => void;
  entradaAEditar?: EntradaTaller | null;
}

const PRIORIDADES: Prioridad[] = ['Baja', 'Media', 'Alta', 'Urgente'];

export const ModalNuevaEntrada: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onAddEntrada,
  onUpdateEntrada,
  entradaAEditar = null,
}) => {
  const [cliente, setCliente] = useState<string>('');
  const [dispositivo, setDispositivo] = useState<string>('');
  const [empresa, setEmpresa] = useState<string>('MILLENIUM');
  const [prioridad, setPrioridad] = useState<Prioridad>('Media');
  const [tecnico, setTecnico] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;

    if (entradaAEditar) {
      setCliente(entradaAEditar.cliente);
      setDispositivo(entradaAEditar.dispositivo);
      setEmpresa(entradaAEditar.para);
      setPrioridad(entradaAEditar.prioridad);
      setTecnico(entradaAEditar.tecnicoAsignado ?? '');
    } else {
      setCliente('');
      setDispositivo('');
      setEmpresa('MILLENIUM');
      setPrioridad('Media');
      setTecnico('');
    }
  }, [isOpen, entradaAEditar]);

  if (!isOpen) return null;

  const esEdicion = Boolean(entradaAEditar);

  // Si un ticket antiguo tiene un técnico que no está en la lista fija, lo incluimos para no perderlo al editar
  const opcionesTecnicos =
    tecnico && !TECNICOS_TALLER.includes(tecnico)
      ? [tecnico, ...TECNICOS_TALLER]
      : TECNICOS_TALLER;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliente.trim() || !dispositivo.trim()) return;

    const tecnicoFinal = tecnico.trim() ? tecnico.trim() : null;

    if (entradaAEditar) {
      onUpdateEntrada({
        ...entradaAEditar,
        cliente: cliente.trim(),
        dispositivo: dispositivo.trim(),
        para: empresa.trim() || 'MILLENIUM',
        prioridad,
        tecnicoAsignado: tecnicoFinal,
      });
    } else {
      const nuevaEntrada: EntradaTaller = {
        id: `#${Math.floor(100000 + Math.random() * 900000)}`,
        para: empresa.trim() || 'MILLENIUM',
        fechaAlta: new Date().toLocaleDateString(),
        cliente: cliente.trim(),
        prioridad,
        dispositivo: dispositivo.trim(),
        tecnicoAsignado: tecnicoFinal,
        estado: 'En proceso',
      };
      onAddEntrada(nuevaEntrada);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50 backdrop-blur-xs">
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-lg shadow-2xl">
        <h3 className="text-xl font-bold mb-4 text-white">
          {esEdicion ? `Editar Entrada ${entradaAEditar?.id}` : 'Registrar Nueva Entrada'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Cliente</label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Ej. María García"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Dispositivo / Equipo</label>
            <input
              type="text"
              value={dispositivo}
              onChange={(e) => setDispositivo(e.target.value)}
              placeholder="Ej. Portátil HP / Sobremesa"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Empresa / Sede</label>
              <input
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Prioridad</label>
              <select
                value={prioridad}
                onChange={(e) => setPrioridad(e.target.value as Prioridad)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
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
            <label className="block text-sm text-slate-300 mb-1">Técnico Asignado</label>
            <select
              value={tecnico}
              onChange={(e) => setTecnico(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">-- Sin asignar (pendiente de técnico) --</option>
              {opcionesTecnicos.map((nombre) => (
                <option key={nombre} value={nombre}>
                  {nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-2 rounded-lg font-medium transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition cursor-pointer"
            >
              {esEdicion ? 'Guardar Cambios' : 'Guardar Entrada'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};