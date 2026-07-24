import Link from 'next/link';
import Image from 'next/image';
import { getServiciosPopulares } from '@/data/servicios';
import Badge from '@/components/ui/Badge';

export default function ServiciosPreview() {
  const serviciosDestacados = getServiciosPopulares();

  return (
    <section className="section bg-neutral-50 scroll-reveal">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-block px-4 py-2 bg-accent-100 text-accent-800 rounded-full text-sm font-semibold mb-6">
            Nuestros Servicios
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-brand-900 mb-6">
            Servicios profesionales para tu estilo
          </h2>
          <p className="text-lg text-neutral-600">
            Desde cortes clásicos hasta estilos modernos, ofrecemos servicios de barbería premium 
            con la experiencia de décadas
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 stagger-container">
          {serviciosDestacados.map((servicio, index) => (
            <div
              key={servicio.id}
              className="card-split group cursor-pointer stagger-item hover-lift overflow-hidden"
              style={{ '--stagger-index': index } as any}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={servicio.imagen}
                  alt={servicio.nombre}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 to-transparent" />
                
                {/* Price badge */}
                <div className="absolute top-4 right-4">
                  <Badge variant="accent" className="text-base px-4 py-2 shadow-lg">
                    S/. {servicio.precio}
                  </Badge>
                </div>

                {/* Popular badge */}
                {servicio.popular && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="success" className="shadow-lg">
                      Popular
                    </Badge>
                  </div>
                )}
              </div>

              {/* Content - Orange Background */}
              <div className="bg-accent-600 p-6">
                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-brand-950 transition-colors">
                  {servicio.nombre}
                </h3>
                <p className="text-white/90 mb-4 text-sm leading-relaxed">
                  {servicio.descripcion}
                </p>

                {/* Duration */}
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{servicio.duracion} min</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in-up">
          <Link href="/servicios" className="btn btn-primary btn-lg hover-lift btn-press">
            Ver Todos los Servicios
          </Link>
        </div>
      </div>
    </section>
  );
}
