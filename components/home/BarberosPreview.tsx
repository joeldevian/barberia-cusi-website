import Link from 'next/link';
import Image from 'next/image';
import { getBarberosDisponibles } from '@/data/barberos';

export default function BarberosPreview() {
  const barberos = getBarberosDisponibles().slice(0, 4);

  return (
    <section className="section bg-white scroll-reveal">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-accent-100 text-accent-800 rounded-full text-sm font-semibold mb-6">
            Nuestro Equipo
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-brand-900 mb-6">
            Barberos profesionales
          </h2>
          <p className="text-lg text-neutral-600">
            Cada miembro de nuestro equipo es un experto en su área, dedicado a brindarte 
            el mejor servicio y estilo
          </p>
        </div>

        {/* Barberos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 stagger-container">
          {barberos.map((barbero, index) => (
            <div
              key={barbero.id}
              className="group text-center stagger-item"
              style={{ '--stagger-index': index } as any}
            >
              {/* Image */}
              <div className="relative h-80 mb-6 rounded-2xl overflow-hidden shadow-lg hover-lift">
                <Image
                  src={barbero.imagen}
                  alt={barbero.nombre}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover CTA */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Link
                    href={`/reservas?barbero=${barbero.id}`}
                    className="btn btn-accent btn-sm w-full hover-lift btn-press"
                  >
                    Reservar
                  </Link>
                </div>
              </div>

              {/* Info */}
              <h3 className="text-xl font-display font-bold text-brand-900 mb-2">
                {barbero.nombre}
              </h3>
              <p className="text-accent-600 font-semibold text-sm mb-2">
                {barbero.especialidad}
              </p>
              <p className="text-neutral-500 text-sm">
                {barbero.experiencia} de experiencia
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in-up">
          <Link href="/barberos" className="btn btn-outline hover-lift btn-press">
            Conocer al Equipo Completo
          </Link>
        </div>
      </div>
    </section>
  );
}
