import { useState, useEffect } from 'react';

interface BotonConfirmarProps {
  onConfirmar: () => void;
  children: React.ReactNode;
  textoConfirmar?: string;
  title?: string;
  className?: string;
  claseConfirmar?: string;
}

export function BotonConfirmar({
  onConfirmar,
  children,
  textoConfirmar = '¿Eliminar?',
  title = 'Eliminar',
  className = '',
  claseConfirmar = 'bg-red-600 hover:bg-red-500 text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold',
}: BotonConfirmarProps) {
  const [confirmando, setConfirmando] = useState(false);

  useEffect(() => {
    if (!confirmando) return;
    const timer = window.setTimeout(() => setConfirmando(false), 3500);
    return () => window.clearTimeout(timer);
  }, [confirmando]);

  const handleClick = () => {
    if (!confirmando) {
      setConfirmando(true);
      return;
    }
    setConfirmando(false);
    onConfirmar();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onBlur={() => setConfirmando(false)}
      title={confirmando ? 'Haz clic de nuevo para confirmar' : title}
      className={`transition cursor-pointer inline-flex items-center gap-1 ${
        confirmando ? claseConfirmar : className
      }`}
    >
      {confirmando ? textoConfirmar : children}
    </button>
  );
}