import { Metadata } from 'next';
import Link from 'next/link';
import { sucursales } from '@/data/sucursales';
import { formatearTelefono } from '@/lib/whatsapp';
import { generarBreadcrumbSchema, generarLocalBusinessSchema } from '@/lib/schema-jsonld';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Nuestras Sucursales en Ayacucho',
  description: '5 sucursales estratégicamente ubicadas en Ayacucho: Jr. Unión 156 (Principal), Av. Mariscal Cáceres, Jr. Manco Cápac, Jr. Los Andes y Jr. Tres Máscaras.',
};

export default function SucursalesPage() {
  const breadcrumbSchema = generarBreadcrumbSchema([
    { name: 'Inicio', url: 'https://barberiacusi.com' },
    { name: 'Sucursales', url: 'https://barberiacusi.com/sucursales' },
  ]);

  // Generate JSON-LD for all locations
  const locationsSchemas = sucursales.map(sucursal => generarLocalBusinessSchema(sucursal));

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {locationsSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative section-sm bg-brand-950 text-white">
          <div className="absolute inset-0">
            <img
              src="/images/inicio/principal-sucursal.jpg"
              alt="Sucursales de Barbería Cusi en Ayacucho"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="container-custom text-center relative z-10">
            <div className="inline-block px-4 py-2 bg-accent-600/20 backdrop-blur-sm rounded-full border border-accent-500/30 mb-6">
              <span className="text-sm font-semibold">Nuestras Ubicaciones</span>
            </div>
            <h1 className="text-display-md font-display font-bold mb-6">
              5 Sucursales en Ayacucho
            </h1>
            <p className="text-xl text-neutral-200 max-w-3xl mx-auto">
              Ubicaciones estratégicas para estar siempre cerca de ti
            </p>
          </div>
        </section>

        {/* Sucursales List */}
        <section className="section bg-white">
          <div className="container-custom">
            <div className="space-y-12">
              {sucursales.map((sucursal, index) => (
                <div
                  key={sucursal.id}
                  className={`card ${index % 2 === 0 ? 'bg-accent-50' : 'bg-neutral-50'}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Info */}
                    <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-6 h-6 text-accent-600"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <h2 className="text-2xl font-display font-bold text-brand-900">
                              {sucursal.nombre}
                            </h2>
                            {sucursal.esPrincipal && (
                              <Badge variant="accent">
                                Sede Principal
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div>
                            <p className="text-brand-900 font-semibold">
                              {sucursal.direccion}
                            </p>
                            <p className="text-neutral-600 text-sm">
                              {sucursal.ciudad}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div>
                            <a
                              href={`tel:${sucursal.telefono}`}
                              className="text-brand-900 font-semibold hover:text-accent-600 transition-colors"
                            >
                              {formatearTelefono(sucursal.telefono)}
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div>
                            <p className="text-brand-900 font-semibold">
                              {sucursal.horario}
                            </p>
                            <p className="text-neutral-600 text-sm">
                              (Horario placeholder - verificar con el negocio)
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <Link
                          href={`/reservas?sede=${sucursal.id}`}
                          className="btn btn-primary flex-1"
                        >
                          Reservar en Esta Sede
                        </Link>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sucursal.direccion + ', ' + sucursal.ciudad)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline flex-1"
                        >
                          Cómo Llegar
                        </a>
                      </div>
                    </div>

                    {/* Map */}
                    <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="rounded-xl overflow-hidden shadow-lg h-full min-h-[400px]">
                        <iframe
                          src={sucursal.mapUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0, minHeight: '400px' }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`Mapa de ${sucursal.nombre}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="section-sm bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-brand-900 mb-8 text-center">
                Todas nuestras sucursales ofrecen
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card card-rotating-border text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-accent-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-brand-900 mb-2">
                    Misma Calidad
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Estándares uniformes en todas las sedes
                  </p>
                </div>

                <div className="card card-rotating-border text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-accent-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-brand-900 mb-2">
                    Equipo Profesional
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Barberos experimentados y capacitados
                  </p>
                </div>

                <div className="card card-rotating-border text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-accent-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-brand-900 mb-2">
                    Horario Amplio
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Lunes a domingo de 9 AM a 8 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-sm bg-accent-600 text-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-display font-bold mb-6">
                Visítanos en la sucursal más cercana
              </h2>
              <p className="text-xl text-white/90 mb-8">
                O reserva tu cita online y te esperamos
              </p>
              <Link href="/reservas" className="btn bg-white text-accent-700 hover:bg-neutral-100 text-lg">
                Reservar Cita Ahora
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
