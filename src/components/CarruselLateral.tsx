import { useEffect, useState } from 'react';

interface DiapositivaVertical {
  id: string;
  src: string;
  alt: string;
  titulo: string;
  rol: string;
}

const DIAPOSITIVAS_VERTICALES: DiapositivaVertical[] = [
  {
    id: 'israel',
    // Usamos .png y "Gta" con minúscula para coincidir exactamente con tu archivo
    src: '/israelGta.png',
    alt: 'Israel Castillo - Soporte IT y Sistemas',
    titulo: 'Israel Castillo',
    rol: 'Soporte IT y Sistemas',
  },
  {
    id: 'taller-pc',
    // Llama al archivo de la captura (si le quitas el "public_" con Rename, usa '/taller-pc.jpg')
    src: '/public_taller-pc.jpg',
    alt: 'Hardware y mantenimiento de ordenadores',
    titulo: 'Taller Hardware',
    rol: 'Montaje y reparación',
  },
  {
    id: 'redes',
    // Apunta exactamente a tu archivo de redes que aparece en el explorador
    src: '/redes.jpg',
    alt: 'Infraestructura de redes y telecomunicaciones',
    titulo: 'Telecom y Redes',
    rol: 'Conectividad y servidores',
  },
];

export function CarruselLateral() {
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      setIndiceActual((prev) => (prev + 1) % DIAPOSITIVAS_VERTICALES.length);
    }, 3800);

    return () => window.clearInterval(intervalo);
  }, []);

  const activa = DIAPOSITIVAS_VERTICALES[indiceActual];

  return (
    <aside
      aria-label="Marca y equipo técnico"
      className="fixed top-0 left-0 bottom-0 w-28 sm:w-36 z-20 bg-slate-950/95 border-r border-sky-500/35 flex flex-col justify-between items-center py-4 px-2.5 shadow-2xl select-none"
    >
      {/* Logo fijo arriba */}
      <div className="flex flex-col items-center gap-1.5 shrink-0">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-sky-400/40 bg-slate-900 shadow-md shadow-sky-950/70 flex items-center justify-center">
          <img
            src="/Milleium.png"
            alt="Millenium Innova"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              // Si falla Milleium.png por alguna letra, intenta buscar el logo de reserva o avatar
              e.currentTarget.src = '/israelGta.png';
            }}
          />
        </div>
        <span className="text-[10px] font-bold tracking-wider uppercase text-sky-400 text-center leading-tight">
          Millenium Innova
        </span>
      </div>

      {/* Carrusel vertical */}
      <div className="flex-1 w-full my-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-900/90 relative flex flex-col">
        <div className="flex-1 w-full overflow-hidden relative">
          <div
            className="w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateY(-${indiceActual * 100}%)` }}
          >
            {DIAPOSITIVAS_VERTICALES.map((slide) => (
              <div key={slide.id} className="w-full h-full relative shrink-0 bg-slate-950">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  onError={(e) => {
                    // Si no encuentra la imagen del carrusel, muestra el logo para evitar el icono roto
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/Milleium.png';
                  }}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-2 text-center">
                  <p className="text-[11px] font-semibold text-white leading-tight truncate">
                    {slide.titulo}
                  </p>
                  <p className="text-[10px] text-sky-300/90 leading-tight truncate mt-0.5">
                    {slide.rol}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores */}
        <div className="py-2 bg-slate-950/90 border-t border-slate-800 flex justify-center items-center gap-1.5 shrink-0">
          {DIAPOSITIVAS_VERTICALES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setIndiceActual(idx)}
              aria-label={`Ver ${slide.titulo}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === indiceActual ? 'w-5 bg-sky-400' : 'w-1.5 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Pie vertical */}
      <div className="text-center shrink-0 w-full px-1">
        <p className="text-[10px] font-medium text-slate-300 leading-tight truncate">
          {activa.titulo}
        </p>
        <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">
          IT · 24/7
        </p>
      </div>
    </aside>
  );
}