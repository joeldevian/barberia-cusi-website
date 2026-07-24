import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import LogoutButton from '@/components/admin/LogoutButton';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const metadata = {
  title: 'Dashboard | Admin - Barbería Cusi',
  robots: 'noindex, nofollow',
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/admin/login');
  }

  // Obtener estadísticas
  const hoy = new Date().toISOString().split('T')[0];
  
  const [
    { data: todasReservas },
    { data: reservasHoy },
    { data: reservasPendientes },
    { data: totalServicios },
    { data: totalBarberos },
    { data: totalSucursales },
  ] = await Promise.all([
    supabase.from('reservas').select('*'),
    supabase.from('reservas').select('*').eq('fecha', hoy),
    supabase.from('reservas').select('*').eq('estado', 'pendiente').gte('fecha', hoy),
    supabase.from('servicios').select('*').eq('activo', true),
    supabase.from('barberos').select('*').eq('disponible', true),
    supabase.from('sucursales').select('*').eq('activo', true),
  ]);

  const stats = {
    totalReservas: todasReservas?.length || 0,
    reservasHoy: reservasHoy?.length || 0,
    pendientes: reservasPendientes?.length || 0,
    servicios: totalServicios?.length || 0,
    barberos: totalBarberos?.length || 0,
    sucursales: totalSucursales?.length || 0,
  };

  // Últimas 5 reservas
  const ultimasReservas = (todasReservas || [])
    .sort((a, b) => new Date(b.creado_en!).getTime() - new Date(a.creado_en!).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
              <p className="text-sm text-neutral-600">Bienvenido, {session.user.name}</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Navegación Admin */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link
              href="/admin/dashboard"
              className="border-b-2 border-brand-600 text-brand-600 px-1 py-4 text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/reservas"
              className="border-b-2 border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 px-1 py-4 text-sm font-medium"
            >
              Reservas
            </Link>
            <Link
              href="/admin/barberos"
              className="border-b-2 border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 px-1 py-4 text-sm font-medium"
            >
              Barberos
            </Link>
            <Link
              href="/admin/servicios"
              className="border-b-2 border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 px-1 py-4 text-sm font-medium"
            >
              Servicios
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Reservas Totales */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-neutral-600">Total Reservas</h3>
              <svg className="w-8 h-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-neutral-900">{stats.totalReservas}</p>
            <p className="text-xs text-neutral-500 mt-1">Todas las reservas registradas</p>
          </div>

          {/* Reservas Hoy */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-neutral-600">Reservas Hoy</h3>
              <svg className="w-8 h-8 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-neutral-900">{stats.reservasHoy}</p>
            <p className="text-xs text-neutral-500 mt-1">Citas programadas para hoy</p>
          </div>

          {/* Pendientes */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-neutral-600">Pendientes</h3>
              <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-neutral-900">{stats.pendientes}</p>
            <p className="text-xs text-neutral-500 mt-1">Requieren confirmación</p>
          </div>

          {/* Servicios */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-neutral-600">Servicios Activos</h3>
              <svg className="w-8 h-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-neutral-900">{stats.servicios}</p>
            <p className="text-xs text-neutral-500 mt-1">Servicios disponibles</p>
          </div>

          {/* Barberos */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-neutral-600">Barberos Activos</h3>
              <svg className="w-8 h-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-neutral-900">{stats.barberos}</p>
            <p className="text-xs text-neutral-500 mt-1">Profesionales disponibles</p>
          </div>

          {/* Sucursales */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-neutral-600">Sucursales</h3>
              <svg className="w-8 h-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-neutral-900">{stats.sucursales}</p>
            <p className="text-xs text-neutral-500 mt-1">Ubicaciones en Ayacucho</p>
          </div>
        </div>

        {/* Últimas Reservas */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-900">Últimas Reservas</h2>
              <Link
                href="/admin/reservas"
                className="text-sm text-brand-600 hover:text-brand-700 font-medium"
              >
                Ver todas →
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Hora</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {ultimasReservas.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">
                      No hay reservas registradas aún
                    </td>
                  </tr>
                ) : (
                  ultimasReservas.map((reserva) => (
                    <tr key={reserva.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-neutral-900">
                            {reserva.cliente_nombre}
                          </div>
                          <div className="text-xs text-neutral-500">
                            {reserva.cliente_telefono}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-900">
                        {new Date(reserva.fecha + 'T00:00:00').toLocaleDateString('es-PE', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-900">{reserva.hora}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            reserva.estado === 'confirmada'
                              ? 'bg-green-100 text-green-800'
                              : reserva.estado === 'pendiente'
                              ? 'bg-amber-100 text-amber-800'
                              : reserva.estado === 'cancelada'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-neutral-100 text-neutral-800'
                          }`}
                        >
                          {reserva.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                        S/ {parseFloat(reserva.precio || '0').toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
