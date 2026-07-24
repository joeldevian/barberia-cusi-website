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
  title: 'Gestión de Servicios | Admin - Barbería Cusi',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string;
  duracion_minutos: number;
  categoria: string;
  activo: boolean;
  popular: boolean;
  orden_visualizacion: number;
}

export default async function ServiciosAdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/admin/login');
  }

  const { data: todosServicios } = await supabase
    .from('servicios')
    .select('*')
    .order('orden_visualizacion');

  // Agrupar por categoría
  const serviciosPorCategoria = (todosServicios || []).reduce((acc, servicio: Servicio) => {
    const cat = servicio.categoria;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(servicio);
    return acc;
  }, {} as Record<string, Servicio[]>);

  const categorias = [
    { value: 'corte', label: 'Cortes de Cabello', icon: '✂️' },
    { value: 'barba', label: 'Barba y Afeitado', icon: '🪒' },
    { value: 'combo', label: 'Paquetes Combo', icon: '📦' },
    { value: 'tratamiento', label: 'Tratamientos', icon: '💆' },
    { value: 'premium', label: 'Servicios Premium', icon: '⭐' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Gestión de Servicios</h1>
              <p className="text-sm text-neutral-600">
                Total: {todosServicios?.length || 0} servicios ({(todosServicios || []).filter(s => s.activo).length} activos)
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
              className="border-b-2 border-brand-600 text-brand-600 px-1 py-4 text-sm font-medium"
            >
              Servicios
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {categorias.map((categoria) => {
            const serviciosCategoria = serviciosPorCategoria[categoria.value] || [];
            if (serviciosCategoria.length === 0) return null;

            return (
              <div key={categoria.value} className="bg-white rounded-lg shadow">
                {/* Header de Categoría */}
                <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
                  <h2 className="text-lg font-semibold text-neutral-900">
                    {categoria.icon} {categoria.label} ({serviciosCategoria.length})
                  </h2>
                </div>

                {/* Grid de Servicios */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {serviciosCategoria.map((servicio: Servicio) => (
                      <div
                        key={servicio.id}
                        className={`
                          border-2 rounded-lg p-4 transition-all
                          ${servicio.activo
                            ? 'border-neutral-200 hover:border-brand-300'
                            : 'border-red-200 bg-red-50 opacity-60'
                          }
                        `}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-neutral-900 flex-1">
                            {servicio.nombre}
                          </h3>
                          {servicio.popular && (
                            <span className="px-2 py-1 bg-accent-100 text-accent-800 text-xs font-semibold rounded">
                              Popular
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                          {servicio.descripcion}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                          <div>
                            <p className="text-2xl font-bold text-brand-600">
                              S/ {parseFloat(servicio.precio).toFixed(2)}
                            </p>
                            <p className="text-xs text-neutral-500">
                              ⏱️ {servicio.duracion_minutos} min
                            </p>
                          </div>
                          <div>
                            <span
                              className={`
                                px-3 py-1 rounded text-xs font-semibold
                                ${servicio.activo
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                                }
                              `}
                            >
                              {servicio.activo ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nota al final */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <p className="text-sm text-neutral-600">
            💡 Para editar servicios (precios, descripciones, duración), accede a la base de datos en Supabase o contacta al desarrollador.
          </p>
        </div>
      </main>
    </div>
  );
}
