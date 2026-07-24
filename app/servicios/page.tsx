import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { servicios, getServiciosByCategoria } from '@/data/servicios';
import Badge from '@/components/ui/Badge';
import { generarBreadcrumbSchema, generarServiceSchema } from '@/lib/schema-jsonld';

export const metadata: Metadata = {
  title: 'Servicios y Precios',
  description: 'Servicios profesionales de barbería en Ayacucho: Cortes clásicos y modernos, diseño de barba, afeitado tradicional, coloración y más. Precios desde S/. 25.',
};

const categorias = [
  { id: 'todos', label: 'Todos los Servicios' },
  { id: 'corte', label: 'Cortes' },
  { id: 'barba', label: 'Barba' },
  { id: 'combo', label: 'Combos' },
  { id: 'tratamiento', label: 'Tratamientos' },
  { id: 'premium', label: 'Premium' },
] as const;

export default function ServiciosPage() {
  const breadcrumbSchema = generarBreadcrumbSchema([
    { name: 'Inicio', url: 'https://barberiacusi.com' },
    { name: 'Servicios', url: 'https://barberiacusi.com/servicios' },
  ]);

  const serviceSchema = generarServiceSchema();

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-brand-950">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2000"
              alt="Servicios de Barbería Cusi"
              fill
              className="object-cover opacity-30"
              priority
              sizes="100vw"
            />
          </div>

          <div className="container-custom relative z-10 text-center text-white">
            <div className="inline-block px-4 py-2 bg-accent-600/20 backdrop-blur-sm rounded-full border border-accent-500/30 mb-6">
              <span className="text-sm font-semibold">Nuestros Servicios</span>
            </div>
            <h1 className="text-display-md font-display font-bold mb-6">
              Servicios Profesionales de Barbería
            </h1>
            <p className="text-xl text-neutral-200 max-w-3xl mx-auto">
              Desde cortes clásicos hasta estilos modernos, cada servicio es ejecutado con 
              precisión y dedicación
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicios.map((servicio) => (
                <div
                  key={servicio.id}
                  className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={servicio.imagen}
                      alt={servicio.nombre}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      {servicio.popular && (
                        <Badge variant="success" className="shadow-lg">
                          Popular
                        </Badge>
                      )}
                      <Badge variant="accent" className="text-lg px-4 py-2 shadow-lg ml-auto">
                        S/. {servicio.precio}
                      </Badge>
                    </div>
                  </div>

                  {/* Content - Orange Background */}
                  <div className="bg-accent-600 p-6">
                    <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-brand-950 transition-colors">
                      {servicio.nombre}
                    </h3>
                    <p className="text-white/90 mb-4 leading-relaxed">
                      {servicio.descripcion}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <div className="flex items-center gap-2 text-sm text-white/90">
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
                        <span>{servicio.duracion} min</span>
                      </div>
                      <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full">
                        {servicio.categoria === 'corte' && 'Corte'}
                        {servicio.categoria === 'barba' && 'Barba'}
                        {servicio.categoria === 'combo' && 'Combo'}
                        {servicio.categoria === 'tratamiento' && 'Tratamiento'}
                        {servicio.categoria === 'premium' && 'Premium'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-sm bg-accent-600 text-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-display font-bold mb-6">
                ¿Listo para tu transformación?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Agenda tu cita ahora y experimenta el servicio profesional que nos distingue
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/reservas" className="btn bg-white text-accent-700 hover:bg-neutral-100 text-lg">
                  Reservar Cita Online
                </Link>
                <a
                  href="https://wa.me/51912926255?text=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20sus%20servicios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-accent-700 text-white hover:bg-accent-800 border-2 border-white text-lg"
                >
                  WhatsApp Directo
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="section-sm bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-brand-900 mb-8 text-center">
                Información Importante
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card card-rotating-border">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
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
                          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-brand-900 text-lg mb-2">
                        Formas de Pago
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        Aceptamos efectivo, tarjetas y transferencias. El pago se realiza en el local 
                        después del servicio.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card card-rotating-border">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
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
                    <div>
                      <h3 className="font-display font-bold text-brand-900 text-lg mb-2">
                        Horarios
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        Lunes a Domingo de 9:00 AM a 8:00 PM en todas nuestras sucursales. 
                        Sin cita previa o con reserva online.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card card-rotating-border">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
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
                    <div>
                      <h3 className="font-display font-bold text-brand-900 text-lg mb-2">
                        Calidad Garantizada
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        Todos nuestros servicios incluyen productos premium y están respaldados 
                        por barberos con años de experiencia.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card card-rotating-border">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
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
                    <div>
                      <h3 className="font-display font-bold text-brand-900 text-lg mb-2">
                        Barbero Preferido
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        Puedes solicitar tu barbero preferido al momento de reservar o al llegar. 
                        Disponibilidad sujeta a horarios.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
