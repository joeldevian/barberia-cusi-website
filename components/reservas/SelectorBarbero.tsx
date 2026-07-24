'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import type { DatosReserva } from './FormularioReserva';

interface Barbero {
  id: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  descripcion: string | null;
  foto_url: string | null;
  anos_experiencia: number;
  disponible: boolean;
}

interface Props {
  sucursalId: string;
  datos: DatosReserva;
  actualizarDatos: (datos: Partial<DatosReserva>) => void;
}

export default function SelectorBarbero({ sucursalId, datos, actualizarDatos }: Props) {
  const [barberos, setBarberos] = useState<Barbero[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarBarberos = async () => {
      try {
        setCargando(true);
        const response = await fetch(`/api/barberos?sucursalId=${sucursalId}`);
        
        if (!response.ok) {
          throw new Error('Error al cargar barberos');
        }

        const data = await response.json();
        setBarberos(data.filter((b: Barbero) => b.disponible));
      } catch (err) {
        console.error('Error cargando barberos:', err);
        setError('Error al cargar barberos disponibles. Por favor, intenta nuevamente.');
      } finally {
        setCargando(false);
      }
    };

    if (sucursalId) {
      cargarBarberos();
    }
  }, [sucursalId]);

  const seleccionarBarbero = (barbero: Barbero) => {
    actualizarDatos({
      barberoId: barbero.id,
      barberoNombre: `${barbero.nombre} ${barbero.apellido}`,
      // Reset fecha y hora cuando cambia el barbero
      fecha: null,
      hora: null,
    });
  };

  if (cargando) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-neutral-600">Cargando barberos disponibles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (barberos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600">No hay barberos disponibles en esta sucursal actualmente.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Elige tu Barbero</h2>
      <p className="text-neutral-600 mb-6">
        Selecciona el barbero de tu preferencia. Todos nuestros profesionales están altamente capacitados.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        {barberos.map((barbero) => (
          <div
            key={barbero.id}
            className={`
              cursor-pointer transition-all duration-200 p-6 bg-white
              ${datos.barberoId === barbero.id
                ? 'border-4 border-accent-600 shadow-[8px_8px_0px_0px_rgba(255,107,53,1)] translate-x-[-4px] translate-y-[-4px]'
                : 'border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'
              }
            `}
            onClick={() => seleccionarBarbero(barbero)}
          >
            <div className="flex gap-4">
              {/* Foto del barbero */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-neutral-200 overflow-hidden border-4 border-black">
                  {barbero.foto_url ? (
                    <img
                      src={barbero.foto_url}
                      alt={`${barbero.nombre} ${barbero.apellido}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-500 to-brand-700 text-white text-2xl font-bold">
                      {barbero.nombre.charAt(0)}{barbero.apellido.charAt(0)}
                    </div>
                  )}
                </div>
              </div>

              {/* Información del barbero */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg mb-1 text-black">
                  {barbero.nombre} {barbero.apellido}
                </h3>
                <p className="text-sm text-accent-600 font-bold mb-2 uppercase">
                  {barbero.especialidad}
                </p>
                {barbero.descripcion && (
                  <p className="text-sm text-neutral-700 line-clamp-2 mb-2">
                    {barbero.descripcion}
                  </p>
                )}
                <div className="flex items-center gap-1 text-xs text-black font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-accent-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{barbero.anos_experiencia} {barbero.anos_experiencia === 1 ? 'año' : 'años'} de experiencia</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Opción de "Sin preferencia" */}
      <div className="mt-6">
        <div
          className={`
            cursor-pointer transition-all duration-200 p-6 bg-white border-4 border-dashed
            ${datos.barberoId === 'cualquiera'
              ? 'border-accent-600 shadow-[8px_8px_0px_0px_rgba(255,107,53,1)] translate-x-[-4px] translate-y-[-4px]'
              : 'border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'
            }
          `}
          onClick={() => actualizarDatos({
            barberoId: 'cualquiera',
            barberoNombre: 'Sin preferencia',
            fecha: null,
            hora: null,
          })}
        >
          <div className="text-center py-4">
            <p className="font-bold text-lg text-black mb-2">
              Sin preferencia - Asignar barbero disponible
            </p>
            <p className="text-sm text-neutral-700">
              El sistema asignará el primer barbero disponible en tu horario elegido
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
