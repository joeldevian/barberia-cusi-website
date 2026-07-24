import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { generarBreadcrumbSchema } from '@/lib/schema-jsonld';

export const metadata: Metadata = {
  title: 'Nuestra Historia',
  description: 'Barbería Cusi nació del esfuerzo de una familia ayacuchana. Lo que empezó como un pequeño local se convirtió en un referente de estilo y confianza para generaciones en Ayacucho.',
};

export default function HistoriaPage() {
  const breadcrumbSchema = generarBreadcrumbSchema([
    { name: 'Inicio', url: 'https://barberiacusi.com' },
    { name: 'Nuestra Historia', url: 'https://barberiacusi.com/historia' },
  ]);

  return (
    <>
      {/* JSON-LD Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2000"
              alt="Interior histórico de Barbería Cusi"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-950/90 via-brand-950/85 to-brand-900/80" />
          </div>

          <div className="container-custom relative z-10 text-center text-white">
            <div className="inline-block px-4 py-2 bg-accent-600/20 backdrop-blur-sm rounded-full border border-accent-500/30 mb-6">
              <span className="text-sm font-semibold">Nuestra Historia</span>
            </div>
            <h1 className="text-display-md font-display font-bold mb-6">
              Un Legado Familiar Ayacuchano
            </h1>
            <p className="text-xl text-neutral-200 max-w-3xl mx-auto">
              Más de dos décadas dedicadas al arte de la barbería en el corazón de Ayacucho
            </p>
          </div>
        </section>

        {/* Historia Content */}
        <section className="section bg-white">
          <div className="container-custom">
            {/* Introduction with Image */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <div className="inline-block px-4 py-2 bg-accent-100 text-accent-800 rounded-full text-sm font-semibold mb-6">
                  Nuestros Orígenes
                </div>
                <h2 className="text-4xl font-display font-bold text-brand-900 mb-6">
                  Del <span className="text-accent-600">esfuerzo familiar</span> al referente de estilo
                </h2>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  Barbería Cusi nació en el corazón de Ayacucho, en <strong className="text-brand-900">Jr. Unión 156, Parque Magdalena</strong>, del sueño de una familia ayacuchana que encontró en la barbería una forma de salir adelante.
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  Lo que empezó como un pequeño local se ha convertido en un <span className="text-accent-600 font-semibold">referente de estilo y confianza</span> para generaciones de clientes en Ayacucho.
                </p>
              </div>
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/historia/Nuestros Orígenes.jpg"
                  alt="Historia Barbería Cusi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Three Pillars - Accordion Style */}
            <div className="mb-20">
              <h2 className="text-3xl font-display font-bold text-center text-brand-900 mb-12">
                Los <span className="text-accent-600">3 pilares</span> de nuestro éxito
              </h2>
              <div className="flex gap-4 h-[500px]">
                {/* Calidad Card */}
                <div className="accordion-card group relative flex-1 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:flex-[3] cursor-pointer">
                  <Image
                    src="/images/historia/Calidad.jpg"
                    alt="Calidad"
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/60 to-brand-950/30"></div>
                  
                  {/* Title - Always Visible */}
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <h3 className="text-3xl font-display font-bold text-white mb-4">
                      Calidad
                    </h3>
                    
                    {/* Description - Visible on Hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="w-16 h-1 bg-accent-600 mb-4"></div>
                      <p className="text-lg text-neutral-200 leading-relaxed mb-4">
                        Técnicas perfeccionadas durante <span className="font-semibold text-accent-400">más de 20 años</span> de experiencia en el arte de la barbería.
                      </p>
                      <p className="text-neutral-300">
                        Utilizamos solo <span className="text-accent-400 font-semibold">productos premium</span> para garantizar resultados excepcionales en cada servicio.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Confianza Card */}
                <div className="accordion-card group relative flex-1 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:flex-[3] cursor-pointer">
                  <Image
                    src="/images/historia/Confianza.jpg"
                    alt="Confianza"
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/60 to-brand-950/30"></div>
                  
                  {/* Title - Always Visible */}
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <h3 className="text-3xl font-display font-bold text-white mb-4">
                      Confianza
                    </h3>
                    
                    {/* Description - Visible on Hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="w-16 h-1 bg-accent-600 mb-4"></div>
                      <p className="text-lg text-neutral-200 leading-relaxed mb-4">
                        Un <span className="font-semibold text-accent-400">negocio 100% familiar</span> con valores sólidos transmitidos de generación en generación.
                      </p>
                      <p className="text-neutral-300">
                        Nuestro <span className="text-accent-400 font-semibold">compromiso inquebrantable</span> es tratar a cada cliente con dedicación y profesionalismo.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tradición Card */}
                <div className="accordion-card group relative flex-1 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:flex-[3] cursor-pointer">
                  <Image
                    src="/images/historia/Tradición.jpg"
                    alt="Tradición"
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/60 to-brand-950/30"></div>
                  
                  {/* Title - Always Visible */}
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <h3 className="text-3xl font-display font-bold text-white mb-4">
                      Tradición
                    </h3>
                    
                    {/* Description - Visible on Hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="w-16 h-1 bg-accent-600 mb-4"></div>
                      <p className="text-lg text-neutral-200 leading-relaxed mb-4">
                        <span className="font-semibold text-accent-400">Orgullosamente ayacuchanos</span> desde nuestros inicios, arraigados en el corazón de Parque Magdalena.
                      </p>
                      <p className="text-neutral-300">
                        Mantenemos vivas las <span className="text-accent-400 font-semibold">técnicas clásicas</span> mientras incorporamos las tendencias modernas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Final */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
                <h2 className="text-4xl font-display font-bold mb-4">
                  Forma parte de nuestra historia
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Visítanos y experimenta el servicio que ha conquistado a generaciones de ayacuchanos
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/reservas" className="btn bg-white text-accent-600 hover:bg-neutral-100 border-0 font-bold">
                    Reserva tu Cita Ahora
                  </Link>
                  <Link href="/barberos" className="btn bg-brand-950 text-white hover:bg-brand-900 border-0">
                    Conocer al Equipo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
