import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/inicio/hero-banner.jpg"
          alt="Barbería Cusi - Interior de la barbería en Ayacucho"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/90 via-brand-950/80 to-brand-900/85" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-24 md:pt-0">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Kicker */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-600/20 backdrop-blur-sm rounded-full border border-accent-500/30 mb-8 animate-fade-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-accent-400"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-semibold text-white">
              5 Sucursales en Ayacucho
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-display-lg font-display font-bold mb-6 animate-fade-in-up animate-delay-100 tracking-tight">
            BARBERÍA CUSI
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl lg:text-3xl text-neutral-100 mb-4 font-medium leading-tight animate-fade-in-up animate-delay-200">
            La barbería familiar que define el estilo masculino en Ayacucho
          </p>

          <p className="text-lg md:text-xl text-neutral-300 mb-8 md:mb-12 max-w-2xl mx-auto animate-fade-in-up animate-delay-300">
            Tradición, calidad y confianza desde hace décadas
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-400">
            <Link
              href="/reservas"
              className="btn btn-accent text-lg px-8 py-4 shadow-xl hover-lift btn-press"
            >
              Reserva tu Cita
            </Link>
            <Link
              href="/servicios"
              className="btn bg-white text-brand-900 hover:bg-neutral-100 text-lg px-8 py-4 shadow-xl hover-lift btn-press"
            >
              Ver Servicios
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto animate-fade-in animate-delay-500">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-accent-400 mb-1 md:mb-2">5</div>
              <div className="text-xs md:text-sm text-neutral-300">Sucursales</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-accent-400 mb-1 md:mb-2">20+</div>
              <div className="text-xs md:text-sm text-neutral-300">Años de experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-accent-400 mb-1 md:mb-2">1000+</div>
              <div className="text-xs md:text-sm text-neutral-300">Clientes satisfechos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on mobile */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-xs uppercase tracking-wider">Descubre más</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
