import { useState } from 'react';
import { PhoneCall, Laptop } from 'lucide-react';
import { CarruselLateral } from './components/CarruselLateral';
import { CabeceraApp } from './components/CabeceraApp';
import { ModalNuevaEntrada } from './components/ModalNuevaEntrada';
import { ModalNuevaLlamada } from './components/ModalNuevaLlamada';
import { BarraFiltros } from './components/BarraFiltros';
import { TarjetasMetricas } from './components/TarjetasMetricas';
import { ListadoRegistros } from './components/ListadoRegistros';
import { useEntradasTaller } from './hook/useEntradaTaller';
import { useLlamadasTaller, type LlamadaTaller } from './hook/useLLamada';
import { useFiltrosTaller } from './hook/useFiltrosTaller';
import type { EntradaTaller } from './type/control-it';
import { exportarWord, exportarPDF } from './utils/exportarDatos';
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

  const esVistaLlamadas = vistaActiva === 'llamadas';

  const {
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
  } = useFiltrosTaller({ vistaActiva, entradas, llamadas });

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

  const manejarExportarWord = () =>
    esVistaLlamadas
      ? void exportarWord(llamadasFiltradas, 'Llamadas', 'llamadas-taller')
      : void exportarWord(entradasFiltradas, 'Entradas de Taller', 'entradas-taller');

  const manejarExportarPDF = () =>
    esVistaLlamadas
      ? exportarPDF(llamadasFiltradas, 'Llamadas', 'llamadas-taller')
      : exportarPDF(entradasFiltradas, 'Entradas de Taller', 'entradas-taller');

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-x-hidden">
      {/* Marca de agua en toda la página */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none fixed inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: "url('/Milleium.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: '210px 210px',
          backgroundPosition: '0 0',
        }}
      />

      {/* Franja vertical izquierda de arriba hasta el final con logo y carrusel de técnicos */}
      <CarruselLateral />

      {/* Contenedor desplazado exactamente el ancho de la franja lateral */}
      <div className="pl-28 sm:pl-36 pr-4 sm:pr-6 py-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <CabeceraApp
            esVistaLlamadas={esVistaLlamadas}
            totalFiltrados={totalFiltrados}
            onExportarWord={manejarExportarWord}
            onExportarPDF={manejarExportarPDF}
            onRestaurarDatos={restaurarDatosEjemplo}
            onAbrirNuevaLlamada={abrirNuevaLlamada}
            onAbrirNuevaEntrada={abrirNuevaEntrada}
          />

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

          <div className="bg-slate-800/90 rounded-lg p-6 shadow-lg border border-slate-700">
            <BarraFiltros
              totalFiltrados={totalFiltrados}
              terminoBusqueda={terminoBusqueda}
              onBusquedaChange={setTerminoBusqueda}
              filtroActual={filtroActual}
              onFiltroChange={setFiltroActual}
              filtroTecnico={filtroTecnico}
              onFiltroTecnicoChange={setFiltroTecnico}
              filtroPrioridad={filtroPrioridad}
              onFiltroPrioridadChange={setFiltroPrioridad}
            />

            <ListadoRegistros
              esVistaLlamadas={esVistaLlamadas}
              terminoBusqueda={terminoBusqueda}
              hayFiltrosActivos={hayFiltrosActivos}
              onLimpiarFiltros={limpiarFiltros}
              entradasFiltradas={entradasFiltradas}
              llamadasFiltradas={llamadasFiltradas}
              onAlternarEstadoEntrada={alternarEstado}
              onEditarEntrada={abrirEditarEntrada}
              onEliminarEntrada={eliminarEntrada}
              onAlternarEstadoLlamada={alternarEstadoLlamada}
              onEditarLlamada={abrirEditarLlamada}
              onEliminarLlamada={eliminarLlamada}
            />
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