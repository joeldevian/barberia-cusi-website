'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ReservaEnriquecida {
  id: string;
  clienteNombre: string;
  clienteTelefono: string;
  clienteEmail: string | null;
  fecha: string;
  hora: string;
  estado: string;
  precio: string | null;
  notas: string | null;
  servicioNombre: string;
  barberoNombre: string;
  sucursalNombre: string;
  confirmadaWhatsapp: boolean | null;
  duracionMinutos: number | null;
}

interface Props {
  reservas: ReservaEnriquecida[];
}

export default function ReservasTable({ reservas: reservasIniciales }: Props) {
  const router = useRouter();
  const [reservas, setReservas] = useState(reservasIniciales);
  const [filtroEstado, setFiltroEstado] = useState<string>('todas');
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState<string | null>(null);

  const actualizarEstado = async (id: string, nuevoEstado: string) => {
    if (!confirm(`¿Confirmar cambio de estado a "${nuevoEstado}"?`)) return;

    setCargando(id);
    try {
      const response = await fetch('/api/reservas', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          estado: nuevoEstado,
          confirmadaWhatsapp: nuevoEstado === 'confirmada' ? true : undefined,
        }),
      });

      if (!response.ok) throw new Error('Error al actualizar');

      // Actualizar estado local
      setReservas((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, estado: nuevoEstado, confirmadaWhatsapp: nuevoEstado === 'confirmada' ? true : r.confirmadaWhatsapp }
            : r
        )
      );

      router.refresh();
    } catch (error) {
      alert('Error al actualizar la reserva');
    } finally {
      setCargando(null);
    }
  };

  const reservasFiltradas = reservas.filter((reserva) => {
    // Filtro por estado
    if (filtroEstado !== 'todas' && reserva.estado !== filtroEstado) {
      return false;
    }

    // Filtro por búsqueda
    if (busqueda) {
      const busquedaLower = busqueda.toLowerCase();
      return (
        reserva.clienteNombre.toLowerCase().includes(busquedaLower) ||
        reserva.clienteTelefono.includes(busqueda) ||
        reserva.servicioNombre.toLowerCase().includes(busquedaLower) ||
        reserva.barberoNombre.toLowerCase().includes(busquedaLower)
      );
    }

    return true;
  });

  const conteos = {
    todas: reservas.length,
    pendiente: reservas.filter((r) => r.estado === 'pendiente').length,
    confirmada: reservas.filter((r) => r.estado === 'confirmada').length,
    completada: reservas.filter((r) => r.estado === 'completada').length,
    cancelada: reservas.filter((r) => r.estado === 'cancelada').length,
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Filtros */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Búsqueda */}
          <div className="w-full md:w-96">
            <input
              type="text"
              placeholder="Buscar por nombre, teléfono, servicio..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Filtros de Estado */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {[
              { value: 'todas', label: 'Todas', count: conteos.todas },
              { value: 'pendiente', label: 'Pendientes', count: conteos.pendiente },
              { value: 'confirmada', label: 'Confirmadas', count: conteos.confirmada },
              { value: 'completada', label: 'Completadas', count: conteos.completada },
              { value: 'cancelada', label: 'Canceladas', count: conteos.cancelada },
            ].map((filtro) => (
              <button
                key={filtro.value}
                onClick={() => setFiltroEstado(filtro.value)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                  ${filtroEstado === filtro.value
                    ? 'bg-brand-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }
                `}
              >
                {filtro.label} ({filtro.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Servicio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Barbero</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Sucursal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Fecha/Hora</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {reservasFiltradas.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-neutral-500">
                  {busqueda || filtroEstado !== 'todas'
                    ? 'No se encontraron reservas con los filtros aplicados'
                    : 'No hay reservas registradas aún'}
                </td>
              </tr>
            ) : (
              reservasFiltradas.map((reserva) => (
                <tr key={reserva.id} className="hover:bg-neutral-50">
                  {/* Cliente */}
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-neutral-900">{reserva.clienteNombre}</div>
                      <div className="text-xs text-neutral-500">
                        📱 {reserva.clienteTelefono}
                        {reserva.confirmadaWhatsapp && (
                          <span className="ml-2 text-green-600">✓ WhatsApp</span>
                        )}
                      </div>
                      {reserva.clienteEmail && (
                        <div className="text-xs text-neutral-500">📧 {reserva.clienteEmail}</div>
                      )}
                    </div>
                  </td>

                  {/* Servicio */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-900">{reserva.servicioNombre}</div>
                    {reserva.duracionMinutos && (
                      <div className="text-xs text-neutral-500">{reserva.duracionMinutos} min</div>
                    )}
                  </td>

                  {/* Barbero */}
                  <td className="px-6 py-4 text-sm text-neutral-900">{reserva.barberoNombre}</td>

                  {/* Sucursal */}
                  <td className="px-6 py-4 text-sm text-neutral-900">{reserva.sucursalNombre}</td>

                  {/* Fecha/Hora */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-900">
                      {new Date(reserva.fecha + 'T00:00:00').toLocaleDateString('es-PE', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                    <div className="text-xs text-neutral-500">{reserva.hora}</div>
                  </td>

                  {/* Estado */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        reserva.estado === 'confirmada'
                          ? 'bg-green-100 text-green-800'
                          : reserva.estado === 'pendiente'
                          ? 'bg-amber-100 text-amber-800'
                          : reserva.estado === 'completada'
                          ? 'bg-blue-100 text-blue-800'
                          : reserva.estado === 'cancelada'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-neutral-100 text-neutral-800'
                      }`}
                    >
                      {reserva.estado}
                    </span>
                  </td>

                  {/* Precio */}
                  <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                    S/ {parseFloat(reserva.precio || '0').toFixed(2)}
                  </td>

                  {/* Acciones */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {reserva.estado === 'pendiente' && (
                        <button
                          onClick={() => actualizarEstado(reserva.id, 'confirmada')}
                          disabled={cargando === reserva.id}
                          className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                        >
                          {cargando === reserva.id ? '...' : 'Confirmar'}
                        </button>
                      )}
                      {reserva.estado === 'confirmada' && (
                        <button
                          onClick={() => actualizarEstado(reserva.id, 'completada')}
                          disabled={cargando === reserva.id}
                          className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                          {cargando === reserva.id ? '...' : 'Completar'}
                        </button>
                      )}
                      {(reserva.estado === 'pendiente' || reserva.estado === 'confirmada') && (
                        <button
                          onClick={() => actualizarEstado(reserva.id, 'cancelada')}
                          disabled={cargando === reserva.id}
                          className="text-xs px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                        >
                          {cargando === reserva.id ? '...' : 'Cancelar'}
                        </button>
                      )}
                      {reserva.notas && (
                        <button
                          onClick={() => alert(`Notas:\n${reserva.notas}`)}
                          className="text-xs px-3 py-1 bg-neutral-100 text-neutral-700 rounded hover:bg-neutral-200"
                          title="Ver notas"
                        >
                          📝
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer con info */}
      <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
        <p className="text-sm text-neutral-600">
          Mostrando {reservasFiltradas.length} de {reservas.length} reservas
        </p>
      </div>
    </div>
  );
}
