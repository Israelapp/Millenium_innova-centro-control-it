import { Plus, PhoneCall, RotateCcw, FileText, FileSpreadsheet } from 'lucide-react';
import { BotonConfirmar } from './BotonConfirmar';

interface CabeceraAppProps {
  esVistaLlamadas: boolean;
  totalFiltrados: number;
  onExportarWord: () => void;
  onExportarPDF: () => void;
  onRestaurarDatos: () => void;
  onAbrirNuevaLlamada: () => void;
  onAbrirNuevaEntrada: () => void;
}

export function CabeceraApp({
  esVistaLlamadas,
  totalFiltrados,
  onExportarWord,
  onExportarPDF,
  onRestaurarDatos,
  onAbrirNuevaLlamada,
  onAbrirNuevaEntrada,
}: CabeceraAppProps) {
  return (
    <header className="mb-6 rounded-2xl bg-slate-800/90 border border-slate-700/80 border-l-4 border-l-sky-400 p-4 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 shadow-lg">
      <div className="min-w-0">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-sky-400">
          Millenium Innova · Informática y Telecomunicaciones
        </span>
        <h1 className="text-xl sm:text-2xl font-bold truncate">
          Centro de Control y Gestión IT
        </h1>
        <p className="text-slate-400 text-sm">
          Panel de Entradas, Llamadas y Soporte Técnico
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onExportarWord}
          disabled={totalFiltrados === 0}
          title="Exportar vista actual a Word (.docx)"
          className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 border border-slate-700 px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer flex items-center gap-1.5"
        >
          <FileText className="w-4 h-4 text-blue-400" />
          Word
        </button>

        <button
          type="button"
          onClick={onExportarPDF}
          disabled={totalFiltrados === 0}
          title="Exportar vista actual a PDF"
          className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 border border-slate-700 px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer flex items-center gap-1.5"
        >
          <FileSpreadsheet className="w-4 h-4 text-rose-400" />
          PDF
        </button>

        {!esVistaLlamadas && (
          <BotonConfirmar
            onConfirmar={onRestaurarDatos}
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
          onClick={onAbrirNuevaLlamada}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-lg text-sm font-medium transition cursor-pointer shadow-md flex items-center gap-1.5"
        >
          <PhoneCall className="w-4 h-4" />
          Nueva Llamada
        </button>

        <button
          type="button"
          onClick={onAbrirNuevaEntrada}
          className="bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded-lg text-sm font-medium transition cursor-pointer shadow-md flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Nueva Entrada
        </button>
      </div>
    </header>
  );
}