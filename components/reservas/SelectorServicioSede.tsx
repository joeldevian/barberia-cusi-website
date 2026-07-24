'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { DatosReserva } from './FormularioReserva';

interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion_minutos: number;
  categoria: string;
  popular: boolean;
}

interface Sucursal {
  id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  es_principal: boolean;
}

interface Props {
  datos: DatosReserva;
  actualizarDatos: (datos: Partial<DatosReserva>) => void;
}

export default function SelectorServicioSede({ datos, actualizarDatos }: Props) {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        
        // Cargar servicios y sucursales en paralelo
        const [serviciosRes, sucursalesRes] = await Promise.all([
          fetch('/api/servicios'),
          fetch('/api/sucursales'),
        ]);

        if (!serviciosRes.ok || !sucursalesRes.ok) {
          throw new Error('Error al cargar los datos');
        }

        const serviciosData = await serviciosRes.json();
        const sucursalesData = await sucursalesRes.json();

        setServicios(serviciosData.filter((s: Servicio) => s));
        setSucursales(sucursalesData);
      } catch (err) {
        console.error('Error cargando datos:', err);
        setError('Error al cargar servicios y sucursales. Por favor, recarga la página.');
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const seleccionarServicio = (servicio: Servicio) => {
    actualizarDatos({
      servicioId: servicio.id,
      servicioNombre: servicio.nombre,
      servicioPrecio: servicio.precio,
      servicioDuracion: servicio.duracion_minutos,
    });
  };

  const seleccionarSucursal = (sucursal: Sucursal) => {
    actualizarDatos({
      sucursalId: sucursal.id,
      sucursalNombre: sucursal.nombre,
      // Reset barbero cuando cambia la sucursal
      barberoId: null,
      barberoNombre: '',
    });
  };

  if (cargando) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-neutral-600">Cargando servicios y sucursales...</p>
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

  return (
    <div className="space-y-8">
      {/* Selección de Servicio */}
      <div>
        <h2 className="text-2xl font-bold mb-4">1. Elige tu Servicio</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicios.map((servicio) => (
            <div
              key={servicio.id}
              className={`
                relative cursor-pointer transition-all duration-200 p-6 bg-white
                ${datos.servicioId === servicio.id
                  ? 'border-4 border-accent-600 shadow-[8px_8px_0px_0px_rgba(255,107,53,1)] translate-x-[-4px] translate-y-[-4px]'
                  : 'border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'
                }
              `}
              onClick={() => seleccionarServicio(servicio)}
            >
              {/* Badge Popular */}
              {servicio.popular && (
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="bg-accent-600 text-white px-3 py-1 text-xs font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    POPULAR
                  </div>
                </div>
              )}

              {/* Contenido */}
              <div className="space-y-4">
                <h3 className="font-bold text-xl text-black">
                  {servicio.nombre}
                </h3>
                <p className="text-sm text-neutral-700 line-clamp-2">
                  {servicio.descripcion}
                </p>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-sm text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-semibold">{servicio.duracion_minutos} min</span>
                  </div>
                  <span className="font-bold text-2xl text-black">
                    S/ {servicio.precio.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selección de Sucursal */}
      {datos.servicioId && (
        <div className="pt-6 border-t border-neutral-200">
          <h2 className="text-2xl font-bold mb-4">2. Elige tu Sucursal</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sucursales.map((sucursal) => (
              <div
                key={sucursal.id}
                className={`
                  relative cursor-pointer transition-all duration-200 p-6 bg-white
                  ${datos.sucursalId === sucursal.id
                    ? 'border-4 border-accent-600 shadow-[8px_8px_0px_0px_rgba(255,107,53,1)] translate-x-[-4px] translate-y-[-4px]'
                    : 'border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'
                  }
                `}
                onClick={() => seleccionarSucursal(sucursal)}
              >
                {/* Badge Principal */}
                {sucursal.es_principal && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className="bg-accent-600 text-white px-3 py-1 text-xs font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      PRINCIPAL
                    </div>
                  </div>
                )}

                {/* Contenido */}
                <div className="space-y-4">
                  <h3 className="font-bold text-xl text-black">
                    {sucursal.nombre}
                  </h3>
                  
                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 text-black flex-shrink-0 mt-0.5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-black">{sucursal.direccion}</p>
                      <p className="text-xs text-neutral-700 mt-1">{sucursal.ciudad}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
