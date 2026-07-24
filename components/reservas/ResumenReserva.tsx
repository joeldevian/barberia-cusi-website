'use client';

import type { DatosReserva } from './FormularioReserva';

interface Props {
  datos: DatosReserva;
}

export default function ResumenReserva({ datos }: Props) {
  const formatearFecha = (fechaISO: string | null) => {
    if (!fechaISO) return '-';
    const fecha = new Date(fechaISO + 'T00:00:00');
    return fecha.toLocaleDateString('es-PE', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Resumen de tu Reserva</h2>

      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 space-y-6">
        {/* Servicio */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-accent-600"
            >
              <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" clipRule="evenodd" />
            </svg>
            <p className="text-xs font-bold text-neutral-600 uppercase tracking-wide">Servicio</p>
          </div>
          <p className="font-bold text-xl text-black">
            {datos.servicioNombre || '-'}
          </p>
          <p className="text-sm text-neutral-700 font-semibold mt-1">
            Duración: {datos.servicioDuracion} minutos
          </p>
        </div>

        <div className="border-t-4 border-dashed border-neutral-300" />

        {/* Sucursal */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-accent-600"
            >
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <p className="text-xs font-bold text-neutral-600 uppercase tracking-wide">Sucursal</p>
          </div>
          <p className="font-bold text-lg text-black">
            {datos.sucursalNombre || '-'}
          </p>
        </div>

        {/* Barbero */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-accent-600"
            >
              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
            </svg>
            <p className="text-xs font-bold text-neutral-600 uppercase tracking-wide">Barbero</p>
          </div>
          <p className="font-bold text-lg text-black">
            {datos.barberoNombre || '-'}
          </p>
        </div>

        <div className="border-t-4 border-dashed border-neutral-300" />

        {/* Fecha y Hora */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-accent-600"
            >
              <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
              <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
            </svg>
            <p className="text-xs font-bold text-neutral-600 uppercase tracking-wide">Fecha</p>
          </div>
          <p className="font-bold text-lg text-black capitalize">
            {formatearFecha(datos.fecha)}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-accent-600"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
            </svg>
            <p className="text-xs font-bold text-neutral-600 uppercase tracking-wide">Hora</p>
          </div>
          <p className="font-bold text-2xl text-black">
            {datos.hora || '-'}
          </p>
        </div>

        <div className="border-t-4 border-dashed border-neutral-300" />

        {/* Cliente */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-accent-600"
            >
              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
            </svg>
            <p className="text-xs font-bold text-neutral-600 uppercase tracking-wide">Cliente</p>
          </div>
          <p className="font-bold text-lg text-black">
            {datos.clienteNombre || '-'}
          </p>
          <div className="flex items-center gap-2 mt-2 text-sm text-neutral-700 font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-accent-600"
            >
              <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
            </svg>
            <span>+51 {datos.clienteTelefono || '-'}</span>
          </div>
          {datos.clienteEmail && (
            <div className="flex items-center gap-2 mt-1 text-sm text-neutral-700 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-accent-600"
              >
                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
              </svg>
              <span>{datos.clienteEmail}</span>
            </div>
          )}
        </div>

        {/* Notas */}
        {datos.notas && (
          <>
            <div className="border-t-4 border-dashed border-neutral-300" />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-accent-600"
                >
                  <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
                </svg>
                <p className="text-xs font-bold text-neutral-600 uppercase tracking-wide">Notas</p>
              </div>
              <p className="text-sm text-neutral-700 font-medium italic bg-neutral-50 p-3 border-l-4 border-accent-600">
                "{datos.notas}"
              </p>
            </div>
          </>
        )}

        <div className="border-t-4 border-black" />

        {/* Precio Total */}
        <div className="bg-accent-100 p-4 border-4 border-accent-600">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-black">Total a Pagar:</span>
            <span className="text-4xl font-bold text-accent-600">
              S/ {datos.servicioPrecio.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Nota de pago */}
        <div className="bg-neutral-100 p-4 border-3 border-black">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-black flex-shrink-0 mt-0.5"
            >
              <path d="M1 4.25a3.733 3.733 0 012.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0016.75 2H3.25A2.25 2.25 0 001 4.25zM1 7.25a3.733 3.733 0 012.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0016.75 5H3.25A2.25 2.25 0 001 7.25zM7 8a1 1 0 011 1 2 2 0 104 0 1 1 0 112 0 4 4 0 01-8 0 1 1 0 011-1z" />
            </svg>
            <p className="text-xs text-black font-bold">
              El pago se realiza <span className="text-accent-600">en la sucursal</span> después del servicio.
              Aceptamos efectivo, tarjetas y transferencias.
            </p>
          </div>
        </div>
      </div>

      {/* Recordatorio */}
      <div className="mt-6 p-6 bg-accent-50 border-4 border-accent-600 shadow-[6px_6px_0px_0px_rgba(255,107,53,1)]">
        <div className="flex items-start gap-3 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6 text-accent-600 flex-shrink-0"
          >
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-bold text-black mb-2">
              Recordatorios importantes:
            </p>
            <ul className="text-xs text-neutral-700 space-y-1.5 font-semibold">
              <li className="flex items-start gap-2">
                <span className="text-accent-600">•</span>
                <span>Llega 5 minutos antes de tu cita</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-600">•</span>
                <span>Recibirás confirmación por WhatsApp</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-600">•</span>
                <span>Si necesitas cancelar, avísanos con anticipación</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-600">•</span>
                <span>Tolerancia de espera: 15 minutos</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
