import { Layers, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { EntradaTaller } from '../type/control-it';

interface TarjetasMetricasProps {
  entradas: EntradaTaller[];
}

export function TarjetasMetricas({ entradas }: TarjetasMetricasProps) {
  const total = entradas.length;
  const enProceso = entradas.filter((item) => item.estado === 'En proceso').length;
  const finalizadas = entradas.filter((item) => item.estado === 'Finalizada').length;
  const prioridadAlta = entradas.filter((item) => item.prioridad === 'Alta').length;

  const metricas = [
    {
      etiqueta: 'Total Registros',
      valor: total,
      icono: Layers,
      estilosIcono: 'bg-blue-950/80 text-blue-400 border-blue-800/60',
      estilosValor: 'text-white',
    },
    {
      etiqueta: 'En Proceso',
      valor: enProceso,
      icono: Clock,
      estilosIcono: 'bg-amber-950/80 text-amber-400 border-amber-800/60',
      estilosValor: 'text-amber-300',
    },
    {
      etiqueta: 'Finalizadas',
      valor: finalizadas,
      icono: CheckCircle2,
      estilosIcono: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60',
      estilosValor: 'text-emerald-300',
    },
    {
      etiqueta: 'Prioridad Alta',
      valor: prioridadAlta,
      icono: AlertTriangle,
      estilosIcono: 'bg-rose-950/80 text-rose-400 border-rose-800/60',
      estilosValor: 'text-rose-300',
    },
  ];

  return (
    <section
      aria-label="Métricas del taller"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    >
      {metricas.map(({ etiqueta, valor, icono: Icono, estilosIcono, estilosValor }) => (
        <div
          key={etiqueta}
          className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-md flex items-center justify-between gap-3"
        >
          <div>
            <p className="text-xs font-medium text-slate-400">{etiqueta}</p>
            <p className={`text-2xl font-bold mt-1 ${estilosValor}`}>{valor}</p>
          </div>
          <div className={`p-2.5 rounded-lg border ${estilosIcono}`}>
            <Icono className="w-5 h-5" />
          </div>
        </div>
      ))}
    </section>
  );
}