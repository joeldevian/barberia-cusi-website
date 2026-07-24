'use client';

import { useEffect, useState } from 'react';
import type { DatosReserva } from './FormularioReserva';

interface HorarioDisponible {
  hora: string;
  disponible: boolean;
}

interface Props {
  barberoId: string;
  sucursalId: string;
  servicioDuracion: number;
  datos: DatosReserva;
  actualizarDatos: (datos: Partial<DatosReserva>) => void;
}

export default function CalendarioHorario({
  barberoId,
  sucursalId,
  servicioDuracion,
  datos,
  actualizarDatos,
}: Props) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string | null>(datos.fecha);
  const [horariosDisponibles, setHorariosDisponibles] = useState<HorarioDisponible[]>([]);
  const [cargandoHorarios, setCargandoHorarios] = useState(false);
  const [diasDisponibles, setDiasDisponibles] = useState<string[]>([]);

  // Generar próximos 14 días
  useEffect(() => {
    const dias: string[] = [];
    const hoy = new Date();
    
    for (let i = 0; i < 14; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + i);
      dias.push(fecha.toISOString().split('T')[0]);
    }
    
    setDiasDisponibles(dias);
  }, []);

  // Cargar horarios cuando selecciona una fecha
  useEffect(() => {
    if (!fechaSeleccionada) return;

    const cargarHorarios = async () => {
      try {
        setCargandoHorarios(true);
        
        const params = new URLSearchParams({
          fecha: fechaSeleccionada,
          barberoId,
          sucursalId,
          duracionMinutos: servicioDuracion.toString(),
        });

        const response = await fetch(`/api/disponibilidad?${params}`);
        
        if (!response.ok) {
          throw new Error('Error al cargar horarios');
        }

        const data = await response.json();
        setHorariosDisponibles(data.horarios || []);
      } catch (err) {
        console.error('Error cargando horarios:', err);
        setHorariosDisponibles([]);
      } finally {
        setCargandoHorarios(false);
      }
    };

    cargarHorarios();
  }, [fechaSeleccionada, barberoId, sucursalId, servicioDuracion]);

  const seleccionarFecha = (fecha: string) => {
    setFechaSeleccionada(fecha);
    actualizarDatos({ fecha, hora: null });
  };

  const seleccionarHora = (hora: string) => {
    actualizarDatos({ hora });
  };

  const formatearFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO + 'T00:00:00');
    const opciones: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    };
    return fecha.toLocaleDateString('es-PE', opciones);
  };

  const esHoy = (fechaISO: string) => {
    const hoy = new Date().toISOString().split('T')[0];
    return fechaISO === hoy;
  };

  const esMañana = (fechaISO: string) => {
    const mañana = new Date();
    mañana.setDate(mañana.getDate() + 1);
    return fechaISO === mañana.toISOString().split('T')[0];
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Elige Fecha y Hora</h2>
      <p className="text-neutral-600 mb-8">
        Selecciona el día y horario de tu preferencia
      </p>

      {/* Selector de Fechas */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-accent-100 border-2 border-black flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-accent-600"
            >
              <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
              <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="font-bold text-xl text-black">Fecha</h3>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {diasDisponibles.map((fecha) => {
            const esSeleccionada = fechaSeleccionada === fecha;
            
            return (
              <button
                key={fecha}
                onClick={() => seleccionarFecha(fecha)}
                className={`
                  p-4 text-center transition-all duration-200 bg-white border-3
                  ${esSeleccionada
                    ? 'border-accent-600 shadow-[4px_4px_0px_0px_rgba(255,107,53,1)] translate-x-[-2px] translate-y-[-2px]'
                    : 'border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                  }
                `}
              >
                <div className={`text-xs font-bold mb-1 uppercase ${esSeleccionada ? 'text-accent-600' : 'text-black'}`}>
                  {esHoy(fecha) ? 'Hoy' : esMañana(fecha) ? 'Mañana' : formatearFecha(fecha).split(',')[0]}
                </div>
                <div className={`text-2xl font-bold ${esSeleccionada ? 'text-accent-600' : 'text-black'}`}>
                  {new Date(fecha + 'T00:00:00').getDate()}
                </div>
                <div className={`text-xs font-semibold ${esSeleccionada ? 'text-accent-600' : 'text-neutral-700'}`}>
                  {formatearFecha(fecha).split(' ')[1]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selector de Horarios */}
      {fechaSeleccionada && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent-100 border-2 border-black flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-accent-600"
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-black">Horario</h3>
          </div>
          
          {cargandoHorarios ? (
            <div className="text-center py-12 bg-white border-4 border-black p-8">
              <div className="inline-block w-8 h-8 border-4 border-accent-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-sm font-semibold text-black">Cargando horarios disponibles...</p>
            </div>
          ) : horariosDisponibles.length === 0 ? (
            <div className="text-center py-12 bg-white border-4 border-black p-8">
              <p className="font-bold text-black mb-2">No hay horarios disponibles para esta fecha</p>
              <p className="text-sm text-neutral-700">Intenta seleccionar otra fecha</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {horariosDisponibles.map((horario) => (
                <button
                  key={horario.hora}
                  onClick={() => horario.disponible && seleccionarHora(horario.hora)}
                  disabled={!horario.disponible}
                  className={`
                    p-4 text-center font-bold transition-all duration-200 bg-white border-3
                    ${datos.hora === horario.hora
                      ? 'border-accent-600 text-accent-600 shadow-[4px_4px_0px_0px_rgba(255,107,53,1)] translate-x-[-2px] translate-y-[-2px]'
                      : horario.disponible
                        ? 'border-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                        : 'border-neutral-300 text-neutral-400 cursor-not-allowed line-through shadow-none'
                    }
                  `}
                >
                  {horario.hora}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Información adicional */}
      {fechaSeleccionada && datos.hora && (
        <div className="mt-8 p-6 bg-accent-50 border-4 border-accent-600 shadow-[6px_6px_0px_0px_rgba(255,107,53,1)]">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6 text-accent-600 flex-shrink-0"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-bold text-black mb-1">
                Tu cita será el <span className="text-accent-600">{formatearFecha(fechaSeleccionada)}</span> a las <span className="text-accent-600">{datos.hora}</span>
              </p>
              <p className="text-xs font-semibold text-neutral-700">
                Duración aproximada: {servicioDuracion} minutos
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
