'use client';

import type { DatosReserva } from './FormularioReserva';

interface Props {
  datos: DatosReserva;
  actualizarDatos: (datos: Partial<DatosReserva>) => void;
}

export default function DatosCliente({ datos, actualizarDatos }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Tus Datos</h2>
      <p className="text-neutral-600 mb-8">
        Completa tu información para confirmar la reserva
      </p>

      <div className="space-y-6">
        {/* Nombre Completo */}
        <div>
          <label htmlFor="nombre" className="flex items-center gap-2 text-sm font-bold text-black mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-accent-600"
            >
              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
            </svg>
            Nombre Completo <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="nombre"
            value={datos.clienteNombre}
            onChange={(e) => actualizarDatos({ clienteNombre: e.target.value })}
            placeholder="Ej: Juan Pérez García"
            className="w-full px-4 py-3 border-4 border-black font-medium focus:outline-none focus:border-accent-600 focus:shadow-[4px_4px_0px_0px_rgba(255,107,53,1)] transition-all"
            required
          />
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="telefono" className="flex items-center gap-2 text-sm font-bold text-black mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-accent-600"
            >
              <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
            </svg>
            Teléfono / WhatsApp <span className="text-red-600">*</span>
          </label>
          <div className="flex gap-0">
            <span className="inline-flex items-center px-4 py-3 bg-neutral-100 text-black font-bold border-4 border-black border-r-0 text-sm">
              +51
            </span>
            <input
              type="tel"
              id="telefono"
              value={datos.clienteTelefono}
              onChange={(e) => actualizarDatos({ clienteTelefono: e.target.value })}
              placeholder="912 345 678"
              className="flex-1 px-4 py-3 border-4 border-black font-medium focus:outline-none focus:border-accent-600 focus:shadow-[4px_4px_0px_0px_rgba(255,107,53,1)] transition-all"
              pattern="[0-9]{9}"
              required
            />
          </div>
          <p className="text-xs text-neutral-600 mt-2 font-medium">
            Te enviaremos la confirmación por WhatsApp a este número
          </p>
        </div>

        {/* Email (Opcional) */}
        <div>
          <label htmlFor="email" className="flex items-center gap-2 text-sm font-bold text-black mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-accent-600"
            >
              <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
              <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
            </svg>
            Email <span className="text-neutral-500 font-normal">(opcional)</span>
          </label>
          <input
            type="email"
            id="email"
            value={datos.clienteEmail}
            onChange={(e) => actualizarDatos({ clienteEmail: e.target.value })}
            placeholder="tu@email.com"
            className="w-full px-4 py-3 border-4 border-black font-medium focus:outline-none focus:border-accent-600 focus:shadow-[4px_4px_0px_0px_rgba(255,107,53,1)] transition-all"
          />
        </div>

        {/* Notas Adicionales */}
        <div>
          <label htmlFor="notas" className="flex items-center gap-2 text-sm font-bold text-black mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-accent-600"
            >
              <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
            </svg>
            Notas Adicionales <span className="text-neutral-500 font-normal">(opcional)</span>
          </label>
          <textarea
            id="notas"
            value={datos.notas}
            onChange={(e) => actualizarDatos({ notas: e.target.value })}
            placeholder="¿Algún pedido especial o preferencia?"
            rows={4}
            className="w-full px-4 py-3 border-4 border-black font-medium resize-none focus:outline-none focus:border-accent-600 focus:shadow-[4px_4px_0px_0px_rgba(255,107,53,1)] transition-all"
          />
          <p className="text-xs text-neutral-600 mt-2 font-medium">
            Ejemplo: "Prefiero que me dejen la barba más corta" o "Primera vez que vengo"
          </p>
        </div>
      </div>

      {/* Información de Privacidad */}
      <div className="mt-8 p-6 bg-accent-50 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-start gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6 text-accent-600 flex-shrink-0"
          >
            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-bold text-black mb-2">Tu privacidad es importante</p>
            <p className="text-sm text-neutral-700">
              Tus datos personales serán utilizados únicamente para gestionar tu reserva y
              enviarte la confirmación por WhatsApp. No compartimos tu información con terceros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
