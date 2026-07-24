'use client';

import { useState } from 'react';
import SelectorServicioSede from './SelectorServicioSede';
import SelectorBarbero from './SelectorBarbero';
import CalendarioHorario from './CalendarioHorario';
import DatosCliente from './DatosCliente';
import ResumenReserva from './ResumenReserva';
import BotonWhatsApp from './BotonWhatsApp';

export interface DatosReserva {
  // Paso 1: Servicio y Sede
  servicioId: string | null;
  servicioNombre: string;
  servicioPrecio: number;
  servicioDuracion: number;
  sucursalId: string | null;
  sucursalNombre: string;
  
  // Paso 2: Barbero
  barberoId: string | null;
  barberoNombre: string;
  
  // Paso 3: Fecha y Hora
  fecha: string | null;
  hora: string | null;
  
  // Paso 4: Datos del Cliente
  clienteNombre: string;
  clienteTelefono: string;
  clienteEmail: string;
  notas: string;
}

const datosIniciales: DatosReserva = {
  servicioId: null,
  servicioNombre: '',
  servicioPrecio: 0,
  servicioDuracion: 30,
  sucursalId: null,
  sucursalNombre: '',
  barberoId: null,
  barberoNombre: '',
  fecha: null,
  hora: null,
  clienteNombre: '',
  clienteTelefono: '',
  clienteEmail: '',
  notas: '',
};

export default function FormularioReserva() {
  const [pasoActual, setPasoActual] = useState(1);
  const [datos, setDatos] = useState<DatosReserva>(datosIniciales);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reservaExitosa, setReservaExitosa] = useState(false);

  const actualizarDatos = (nuevosDatos: Partial<DatosReserva>) => {
    setDatos(prev => ({ ...prev, ...nuevosDatos }));
  };

  const avanzarPaso = () => {
    setPasoActual(prev => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const retrocederPaso = () => {
    setPasoActual(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const puedeAvanzar = () => {
    switch (pasoActual) {
      case 1:
        return datos.servicioId && datos.sucursalId;
      case 2:
        return datos.barberoId;
      case 3:
        return datos.fecha && datos.hora;
      case 4:
        return datos.clienteNombre.trim() && datos.clienteTelefono.trim();
      default:
        return false;
    }
  };

  const confirmarReserva = async () => {
    setEnviando(true);
    setError(null);

    try {
      // Llamar a la API para crear la reserva
      const response = await fetch('/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          servicioId: datos.servicioId,
          sucursalId: datos.sucursalId,
          barberoId: datos.barberoId,
          fecha: datos.fecha,
          hora: datos.hora,
          clienteNombre: datos.clienteNombre,
          clienteTelefono: datos.clienteTelefono,
          clienteEmail: datos.clienteEmail || null,
          notas: datos.notas || null,
          precio: datos.servicioPrecio,
          duracionMinutos: datos.servicioDuracion,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear la reserva');
      }

      const reserva = await response.json();
      console.log('Reserva creada:', reserva);
      
      setReservaExitosa(true);
    } catch (err) {
      console.error('Error al confirmar reserva:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al crear la reserva');
    } finally {
      setEnviando(false);
    }
  };

  // Si la reserva fue exitosa, mostrar mensaje de éxito con botón de WhatsApp
  if (reservaExitosa) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          {/* Icono de éxito */}
          <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-accent-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
            ¡Reserva Confirmada!
          </h2>
          <p className="text-neutral-700 mb-8">
            Tu cita ha sido registrada exitosamente. Ahora confirma por WhatsApp para recibir todos los detalles.
          </p>

          {/* Resumen de la reserva */}
          <div className="bg-neutral-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold mb-4">📅 Detalles de tu Reserva</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Servicio:</span>
                <span className="font-medium">{datos.servicioNombre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Sucursal:</span>
                <span className="font-medium">{datos.sucursalNombre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Barbero:</span>
                <span className="font-medium">{datos.barberoNombre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Fecha:</span>
                <span className="font-medium">{datos.fecha}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Hora:</span>
                <span className="font-medium">{datos.hora}</span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 pt-2 mt-2">
                <span className="text-neutral-600">Precio:</span>
                <span className="font-bold text-brand-600">S/ {datos.servicioPrecio.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Botón de WhatsApp */}
          <BotonWhatsApp datos={datos} />

          <button
            onClick={() => {
              setReservaExitosa(false);
              setDatos(datosIniciales);
              setPasoActual(1);
            }}
            className="mt-4 text-brand-600 hover:text-brand-700 underline text-sm"
          >
            Hacer otra reserva
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Indicador de Pasos */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {[
            { num: 1, label: 'Servicio y Sede' },
            { num: 2, label: 'Barbero' },
            { num: 3, label: 'Fecha y Hora' },
            { num: 4, label: 'Confirmar' },
          ].map((paso, index) => (
            <div key={paso.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                    transition-colors duration-200
                    ${pasoActual > paso.num ? 'bg-accent-500 text-white' : ''}
                    ${pasoActual === paso.num ? 'bg-brand-600 text-white ring-4 ring-brand-100' : ''}
                    ${pasoActual < paso.num ? 'bg-neutral-200 text-neutral-500' : ''}
                  `}
                >
                  {pasoActual > paso.num ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    paso.num
                  )}
                </div>
                <span className="text-xs mt-2 text-center hidden sm:block">{paso.label}</span>
              </div>
              {index < 3 && (
                <div
                  className={`
                    h-1 flex-1 mx-2 transition-colors duration-200
                    ${pasoActual > paso.num ? 'bg-accent-500' : 'bg-neutral-200'}
                  `}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Contenido del Paso Actual */}
      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
        {pasoActual === 1 && (
          <SelectorServicioSede
            datos={datos}
            actualizarDatos={actualizarDatos}
          />
        )}

        {pasoActual === 2 && (
          <SelectorBarbero
            sucursalId={datos.sucursalId!}
            datos={datos}
            actualizarDatos={actualizarDatos}
          />
        )}

        {pasoActual === 3 && (
          <CalendarioHorario
            barberoId={datos.barberoId!}
            sucursalId={datos.sucursalId!}
            servicioDuracion={datos.servicioDuracion}
            datos={datos}
            actualizarDatos={actualizarDatos}
          />
        )}

        {pasoActual === 4 && (
          <div className="grid md:grid-cols-2 gap-8">
            <DatosCliente
              datos={datos}
              actualizarDatos={actualizarDatos}
            />
            <ResumenReserva datos={datos} />
          </div>
        )}

        {/* Botones de Navegación */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-200">
          {pasoActual > 1 ? (
            <button
              onClick={retrocederPaso}
              className="btn btn-secondary"
              disabled={enviando}
            >
              ← Anterior
            </button>
          ) : (
            <div />
          )}

          {pasoActual < 4 ? (
            <button
              onClick={avanzarPaso}
              disabled={!puedeAvanzar()}
              className="btn btn-primary"
            >
              Siguiente →
            </button>
          ) : (
            <button
              onClick={confirmarReserva}
              disabled={!puedeAvanzar() || enviando}
              className="btn btn-primary"
            >
              {enviando ? 'Confirmando...' : 'Confirmar Reserva'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
