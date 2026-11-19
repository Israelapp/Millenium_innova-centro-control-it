import { useState } from 'react';
import { Plus, PhoneCall, Laptop, RotateCcw } from 'lucide-react';
import { ModalNuevaEntrada } from './components/ModalNuevaEntrada';
import { ModalNuevaLlamada } from './components/ModalNuevaLlamada';
import { BarraFiltros, type FiltroEstado } from './components/BarraFiltros';
import { TarjetaEntrada } from './components/TarjetaEntrada';
import { TarjetaLlamada } from './components/TarjetaLlamada';
import { TarjetasMetricas } from './components/TarjetasMetricas';
import { BotonConfirmar } from './components/BotonConfirmar';
import { useEntradasTaller } from './hook/useEntradaTaller';
import { useLlamadasTaller, type LlamadaTaller } from './hook/useLLamada';
import type { EntradaTaller } from './type/control-it';
import './App.css';

type VistaActiva = 'taller' | 'llamadas';

function App() {
  const {
    entradas,
    agregarEntrada,
    editarEntrada,
    alternarEstado,
    eliminarEntrada,
    restaurarDatosEjemplo,
  } = useEntradasTaller();

  const {
    llamadas,
    agregarLlamada,
    editarLlamada,
    alternarEstadoLlamada,
    eliminarLlamada,
  } = useLlamadasTaller();

  const [vistaActiva, setVistaActiva] = useState<VistaActiva>('taller');

  const [modalEntradaAbierto, setModalEntradaAbierto] = useState(false);
  const [entradaEnEdicion, setEntradaEnEdicion] = useState<EntradaTaller | null>(null);

  const [modalLlamadaAbierto, setModalLlamadaAbierto] = useState(false);
  const [llamadaEnEdicion, setLlamadaEnEdicion] = useState<LlamadaTaller | null>(null);

  const [filtroActual, setFiltroActual] = useState<FiltroEstado>('Todos');
  const [filtroTecnico, setFiltroTecnico] = useState<string>('Todos');
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>('');

  const esVistaLlamadas = vistaActiva === 'llamadas';

  const abrirNuevaEntrada = () => {
    setEntradaEnEdicion(null);
    setModalEntradaAbierto(true);
  };

  const abrirEditarEntrada = (entrada: EntradaTaller) => {
    setEntradaEnEdicion(entrada);
    setModalEntradaAbierto(true);
  };

  const abrirNuevaLlamada = () => {
    setLlamadaEnEdicion(null);
    setModalLlamadaAbierto(true);
  };

  const abrirEditarLlamada = (llamada: LlamadaTaller) => {
    setLlamadaEnEdicion(llamada);
    setModalLlamadaAbierto(true);
  };

  const limpiarFiltros = () => {
    setTerminoBusqueda('');
    setFiltroActual('Todos');
    setFiltroTecnico('Todos');
  };

  const hayFiltrosActivos =
    Boolean(terminoBusqueda) || filtroActual !== 'Todos' || filtroTecnico !== 'Todos';

  const busqueda = terminoBusqueda.trim().toLowerCase();

  const entradasFiltradas = entradas.filter((item) => {
    if (filtroActual !== 'Todos' && item.estado !== filtroActual) return false;
    if (filtroTecnico !== 'Todos') {
      if (filtroTecnico === 'Sin asignar' && item.tecnicoAsignado) return false;
      if (filtroTecnico !== 'Sin asignar' && item.tecnicoAsignado !== filtroTecnico) return false;
    }
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
    if (filtroActual !== 'Todos' && item.estado !== filtroActual) return false;
    if (filtroTecnico !== 'Todos') {
      if (filtroTecnico === 'Sin asignar' && item.tecnicoAsignado) return false;
      if (filtroTecnico !== 'Sin asignar' && item.tecnicoAsignado !== filtroTecnico) return false;
    }
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

  const totalFiltrados = esVistaLlamadas ? llamadasFiltradas.length : entradasFiltradas.length;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Centro de Control y Gestión IT</h1>
            <p className="text-slate-400 text-sm">Panel de Entradas, Llamadas y Soporte Técnico</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {!esVistaLlamadas && (
              <BotonConfirmar
                onConfirmar={restaurarDatosEjemplo}
                textoConfirmar="¿Restaurar?"
                title="Restaurar registros iniciales"
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5"
                claseConfirmar="bg-amber-600 hover:bg-amber-500 text-white px-3 py-2 rounded-lg text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Restaurar
              </BotonConfirmar>
            )}

            <button
              type="button"
              onClick={abrirNuevaLlamada}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-lg text-sm font-medium transition cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <PhoneCall className="w-4 h-4" />
              Nueva Llamada
            </button>

            <button
              type="button"
              onClick={abrirNuevaEntrada}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Nueva Entrada
            </button>
          </div>
        </header>

        <div className="flex gap-2 mb-6 bg-slate-800/80 p-1 rounded-xl border border-slate-700 w-fit">
          <button
            type="button"
            onClick={() => setVistaActiva('taller')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer flex items-center gap-2 ${
              !esVistaLlamadas
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Laptop className="w-4 h-4" />
            Entradas de Taller ({entradas.length})
          </button>

          <button
            type="button"
            onClick={() => setVistaActiva('llamadas')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer flex items-center gap-2 ${
              esVistaLlamadas
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            Llamadas ({llamadas.length})
          </button>
        </div>

        <TarjetasMetricas entradas={elementosMetricas} />

        <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
          <BarraFiltros
            totalFiltrados={totalFiltrados}
            terminoBusqueda={terminoBusqueda}
            onBusquedaChange={setTerminoBusqueda}
            filtroActual={filtroActual}
            onFiltroChange={setFiltroActual}
            filtroTecnico={filtroTecnico}
            onFiltroTecnicoChange={setFiltroTecnico}
          />

          <div className="space-y-4">
            {totalFiltrados === 0 ? (
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
                    onClick={limpiarFiltros}
                    className="text-xs text-blue-400 hover:text-blue-300 underline cursor-pointer"
                  >
                    Limpiar búsqueda y filtros
                  </button>
                )}
              </div>
            ) : esVistaLlamadas ? (
              llamadasFiltradas.map((item) => (
                <TarjetaLlamada
                  key={item.id}
                  llamada={item}
                  onAlternarEstado={alternarEstadoLlamada}
                  onEditar={abrirEditarLlamada}
                  onEliminar={eliminarLlamada}
                />
              ))
            ) : (
              entradasFiltradas.map((item) => (
                <TarjetaEntrada
                  key={item.id}
                  entrada={item}
                  onAlternarEstado={alternarEstado}
                  onEditar={abrirEditarEntrada}
                  onEliminar={eliminarEntrada}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <ModalNuevaEntrada
        isOpen={modalEntradaAbierto}
        onClose={() => {
          setModalEntradaAbierto(false);
          setEntradaEnEdicion(null);
        }}
        onAddEntrada={agregarEntrada}
        onUpdateEntrada={editarEntrada}
        entradaAEditar={entradaEnEdicion}
      />

      <ModalNuevaLlamada
        isOpen={modalLlamadaAbierto}
        onClose={() => {
          setModalLlamadaAbierto(false);
          setLlamadaEnEdicion(null);
        }}
        onAddLlamada={agregarLlamada}
        onUpdateLlamada={editarLlamada}
        llamadaAEditar={llamadaEnEdicion}
      />
    </div>
  );
}

export default App;