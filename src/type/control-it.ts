export type EstadoTaller = 'Finalizada' | 'En proceso' | 'Sin iniciar';

export type Prioridad = 'Baja' | 'Media' | 'Alta' | 'Urgente';

export interface EntradaTaller {
  id: string;             
  para: string;            
  fechaAlta: string;       
  cliente: string;
  prioridad: Prioridad;
  dispositivo: string;   
  tecnicoAsignado: string | null; 
  estado: EstadoTaller;
}