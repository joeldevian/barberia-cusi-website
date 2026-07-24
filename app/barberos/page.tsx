import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { barberos } from '@/data/barberos';
import { generarBreadcrumbSchema } from '@/lib/schema-jsonld';

export const metadata: Metadata = {
  title: 'Nuestro Equipo de Barberos',
  description: 'Conoce a nuestro equipo de barberos profesionales en Ayacucho. Expertos en cortes modernos, diseño de barba, afeitado tradicional y más.',
};

export default function BarberosPage() {
  const breadcrumbSchema = generarBreadcrumbSchema([
    { name: 'Inicio', url: 'https://barberiacusi.com' },
    { name: 'Barberos', url: 'https://barberiacusi.com/barberos' },
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
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-brand-950">
          <div className="absolute inset-0">
            <Image
              src="/images/inicio/principal_barberos.jpg"
              alt="Equipo de Barbería Cusi - Barberos profesionales en Ayacucho"
              fill
              className="object-cover opacity-30"
              priority
              sizes="100vw"
            />
          </div>

          <div className="container-custom relative z-10 text-center text-white">
            <div className="inline-block px-4 py-2 bg-accent-600/20 backdrop-blur-sm rounded-full border border-accent-500/30 mb-6">
              <span className="text-sm font-semibold">Nuestro Equipo</span>
            </div>
            <h1 className="text-display-md font-display font-bold mb-6">
              Barberos Profesionales
            </h1>
            <p className="text-xl text-neutral-200 max-w-3xl mx-auto">
              Cada miembro de nuestro equipo es un experto dedicado a ofrecerte el mejor servicio
            </p>
          </div>
        </section>

        {/* Barberos Grid */}
        <section className="section bg-white">
          <div className="container-custom">
            {/* Primera fila: 4 barberos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 stagger-container">
              {barberos.slice(0, 4).map((barbero, index) => (
                <div
                  key={barbero.id}
                  className="group stagger-item"
                  style={{ '--stagger-index': index } as any}
                >
                  {/* Image */}
                  <div className="relative h-96 mb-6 rounded-2xl overflow-hidden shadow-xl hover-lift">
                    <Image
                      src={barbero.imagen}
                      alt={barbero.nombre}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Hover Content */}
                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white text-sm mb-4">
                        {barbero.descripcion}
                      </p>
                      <Link
                        href={`/reservas?barbero=${barbero.id}`}
                        className="btn btn-accent btn-sm w-full"
                      >
                        Reservar con {barbero.nombre.split(' ')[0]}
                      </Link>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-display font-bold text-brand-900 mb-2">
                      {barbero.nombre}
                    </h3>
                    <p className="text-accent-600 font-semibold mb-2">
                      {barbero.especialidad}
                    </p>
                    <p className="text-neutral-500 text-sm">
                      {barbero.experiencia} de experiencia
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Segunda fila: 2 barberos centrados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-3xl mx-auto stagger-container">
              {barberos.slice(4, 6).map((barbero, index) => (
                <div
                  key={barbero.id}
                  className="group lg:col-span-2 stagger-item"
                  style={{ '--stagger-index': index + 4 } as any}
                >
                  {/* Image */}
                  <div className="relative h-96 mb-6 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={barbero.imagen}
                      alt={barbero.nombre}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Hover Content */}
                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white text-sm mb-4">
                        {barbero.descripcion}
                      </p>
                      <Link
                        href={`/reservas?barbero=${barbero.id}`}
                        className="btn btn-accent btn-sm w-full"
                      >
                        Reservar con {barbero.nombre.split(' ')[0]}
                      </Link>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-display font-bold text-brand-900 mb-2">
                      {barbero.nombre}
                    </h3>
                    <p className="text-accent-600 font-semibold mb-2">
                      {barbero.especialidad}
                    </p>
                    <p className="text-neutral-500 text-sm">
                      {barbero.experiencia} de experiencia
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Values */}
        <section className="section-sm bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-display font-bold text-brand-900 mb-6">
                Lo que nos hace diferentes
              </h2>
              <p className="text-lg text-neutral-600">
                Nuestro equipo comparte los mismos valores que han hecho de Barbería Cusi 
                un referente en Ayacucho
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="relative bg-accent-50 border-2 border-accent-300 rounded-2xl p-8 text-center transition-all duration-300 hover:border-accent-400 hover:shadow-lg hover:scale-[1.02]">
                {/* Esquina doblada efecto */}
                <div 
                  className="absolute bottom-0 right-0 w-16 h-16 bg-accent-200 transition-colors duration-300"
                  style={{
                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                    borderBottomRightRadius: '1rem'
                  }}
                />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-accent-200 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 text-accent-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-display font-bold text-brand-900 mb-3">
                    Formación Continua
                  </h3>
                  <p className="text-neutral-800 font-medium">
                    Nuestro equipo se mantiene actualizado con las últimas técnicas y tendencias 
                    del mundo de la barbería
                  </p>
                </div>
              </div>

              <div className="relative bg-accent-50 border-2 border-accent-300 rounded-2xl p-8 text-center transition-all duration-300 hover:border-accent-400 hover:shadow-lg hover:scale-[1.02]">
                {/* Esquina doblada efecto */}
                <div 
                  className="absolute bottom-0 right-0 w-16 h-16 bg-accent-200 transition-colors duration-300"
                  style={{
                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                    borderBottomRightRadius: '1rem'
                  }}
                />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-accent-200 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 text-accent-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-display font-bold text-brand-900 mb-3">
                    Pasión por el Oficio
                  </h3>
                  <p className="text-neutral-800 font-medium">
                    Cada corte es realizado con dedicación y atención al detalle, porque amamos 
                    lo que hacemos
                  </p>
                </div>
              </div>

              <div className="relative bg-accent-50 border-2 border-accent-300 rounded-2xl p-8 text-center transition-all duration-300 hover:border-accent-400 hover:shadow-lg hover:scale-[1.02]">
                {/* Esquina doblada efecto */}
                <div 
                  className="absolute bottom-0 right-0 w-16 h-16 bg-accent-200 transition-colors duration-300"
                  style={{
                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                    borderBottomRightRadius: '1rem'
                  }}
                />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-accent-200 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 text-accent-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-display font-bold text-brand-900 mb-3">
                    Atención Personalizada
                  </h3>
                  <p className="text-neutral-800 font-medium">
                    Escuchamos tus necesidades y te asesoramos para lograr el estilo que buscas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-sm bg-brand-950 text-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-display font-bold mb-6">
                Agenda con tu barbero preferido
              </h2>
              <p className="text-xl text-neutral-300 mb-8">
                Reserva tu cita online y elige al barbero con el que prefieres atenderte
              </p>
              <Link href="/reservas" className="btn btn-accent text-lg">
                Reservar Cita Ahora
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
