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
  title: 'Gestión de Barberos | Admin - Barbería Cusi',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

export default async function BarberosAdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/admin/login');
  }

  const { data: todosBarberos } = await supabase.from('barberos').select('*');
  const { data: todasSucursales } = await supabase.from('sucursales').select('*');

  // Enriquecer barberos con sucursal
  const barberosEnriquecidos = (todosBarberos || []).map((barbero) => {
    const sucursal = todasSucursales?.find((s) => s.id === barbero.sucursal_id);
    return {
      ...barbero,
      sucursalNombre: sucursal?.nombre || 'Sin sucursal',
    };
  }).sort((a, b) => (a.orden_visualizacion || 0) - (b.orden_visualizacion || 0));

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Gestión de Barberos</h1>
              <p className="text-sm text-neutral-600">
                Total: {barberosEnriquecidos.length} barberos
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
              className="border-b-2 border-brand-600 text-brand-600 px-1 py-4 text-sm font-medium"
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
        <div className="bg-white rounded-lg shadow">
          {/* Header con nota */}
          <div className="p-6 border-b border-neutral-200">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-amber-800">
                <strong>⚠️ Nota importante:</strong> Actualmente los datos de barberos son placeholder. 
                Actualiza con datos reales en Supabase o edita el archivo <code className="bg-amber-100 px-1 rounded">supabase/02_seed_data.sql</code>
              </p>
            </div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Lista de Barberos Profesionales
            </h2>
          </div>

          {/* Grid de Barberos */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {barberosEnriquecidos.map((barbero) => (
                <div
                  key={barbero.id}
                  className={`
                    border-2 rounded-lg p-6 transition-all
                    ${barbero.disponible
                      ? 'border-neutral-200 hover:border-brand-300 hover:shadow-md'
                      : 'border-red-200 bg-red-50 opacity-75'
                    }
                  `}
                >
                  {/* Foto */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {barbero.nombre.charAt(0)}{barbero.apellido.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-neutral-900">
                        {barbero.nombre} {barbero.apellido}
                      </h3>
                      <p className="text-sm text-brand-600 font-medium">
                        {barbero.especialidad}
                      </p>
                    </div>
                  </div>

                  {/* Información */}
                  <div className="space-y-2 text-sm">
                    {barbero.descripcion && (
                      <p className="text-neutral-600">{barbero.descripcion}</p>
                    )}
                    
                    <div className="pt-2 border-t border-neutral-200 space-y-1">
                      <p className="text-neutral-700">
                        <span className="font-medium">Sucursal:</span> {barbero.sucursalNombre}
                      </p>
                      <p className="text-neutral-700">
                        <span className="font-medium">Experiencia:</span> {barbero.anos_experiencia} {barbero.anos_experiencia === 1 ? 'año' : 'años'}
                      </p>
                      {barbero.telefono && (
                        <p className="text-neutral-700">
                          <span className="font-medium">Teléfono:</span> {barbero.telefono}
                        </p>
                      )}
                      <p className="text-neutral-700">
                        <span className="font-medium">Estado:</span>{' '}
                        <span
                          className={`font-semibold ${
                            barbero.disponible ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {barbero.disponible ? '✓ Disponible' : '✗ No disponible'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
            <p className="text-sm text-neutral-600">
              💡 Para editar barberos, accede directamente a la base de datos en Supabase o contacta al desarrollador.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
