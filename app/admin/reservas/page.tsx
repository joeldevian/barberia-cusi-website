import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import LogoutButton from '@/components/admin/LogoutButton';
import ReservasTable from '@/components/admin/ReservasTable';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const metadata = {
  title: 'Gestión de Reservas | Admin - Barbería Cusi',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

export default async function ReservasAdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/admin/login');
  }

  // Obtener todas las reservas con datos relacionados
  const [
    { data: todasReservas },
    { data: todosServicios },
    { data: todosBarberos },
    { data: todasSucursales },
  ] = await Promise.all([
    supabase.from('reservas').select('*'),
    supabase.from('servicios').select('*'),
    supabase.from('barberos').select('*'),
    supabase.from('sucursales').select('*'),
  ]);

  // Enriquecer reservas con datos relacionados
  const reservasEnriquecidas = (todasReservas || []).map((reserva) => {
    const servicio = todosServicios?.find((s) => s.id === reserva.servicio_id);
    const barbero = todosBarberos?.find((b) => b.id === reserva.barbero_id);
    const sucursal = todasSucursales?.find((s) => s.id === reserva.sucursal_id);

    return {
      ...reserva,
      servicioNombre: servicio?.nombre || 'Servicio eliminado',
      barberoNombre: barbero ? `${barbero.nombre} ${barbero.apellido}` : 'Sin asignar',
      sucursalNombre: sucursal?.nombre || 'Sucursal eliminada',
    };
  }).sort((a, b) => {
    // Ordenar por fecha y hora descendente
    const fechaA = new Date(`${a.fecha}T${a.hora}`);
    const fechaB = new Date(`${b.fecha}T${b.hora}`);
    return fechaB.getTime() - fechaA.getTime();
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Gestión de Reservas</h1>
              <p className="text-sm text-neutral-600">
                Total: {reservasEnriquecidas.length} reservas
              </p>
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
              className="border-b-2 border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 px-1 py-4 text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/reservas"
              className="border-b-2 border-brand-600 text-brand-600 px-1 py-4 text-sm font-medium"
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
        <ReservasTable reservas={reservasEnriquecidas} />
      </main>
    </div>
  );
}
