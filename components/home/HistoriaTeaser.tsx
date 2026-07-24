import Link from 'next/link';
import Image from 'next/image';

export default function HistoriaTeaser() {
  return (
    <section className="section bg-white scroll-reveal">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl hover-lift">
            <Image
              src="/images/secciones/seccion-legado.jpg"
              alt="Interior de Barbería Cusi - Un legado familiar ayacuchano"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 to-transparent" />
            
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg">
              <div className="text-3xl font-display font-bold text-brand-900">20+</div>
              <div className="text-sm text-neutral-600">Años de tradición</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-block px-4 py-2 bg-accent-100 text-accent-800 rounded-full text-sm font-semibold mb-6">
              Nuestra Historia
            </div>

            <h2 className="text-4xl lg:text-5xl font-display font-bold text-brand-900 mb-6">
              Un legado familiar ayacuchano
            </h2>

            <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
              <p>
                Barbería Cusi nació del esfuerzo de una familia ayacuchana que encontró en el oficio 
                de la barbería una forma de salir adelante.
              </p>

              <p>
                Lo que empezó como un pequeño local se convirtió, con los años, en un referente de 
                estilo y confianza para generaciones de clientes en Ayacucho.
              </p>

              <p className="font-semibold text-brand-900">
                Un negocio que hoy sigue siendo manejado por la misma familia que lo fundó, 
                con la misma dedicación del primer día.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/historia" className="btn btn-primary hover-lift btn-press">
                Conocer más
              </Link>
              <Link href="/sucursales" className="btn btn-outline hover-lift btn-press">
                Nuestras Sucursales
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="border-l-4 border-accent-600 pl-4">
                <div className="text-3xl font-display font-bold text-brand-900 mb-1">
                  Jr. Unión 156
                </div>
                <div className="text-sm text-neutral-600">
                  Nuestra sede principal histórica
                </div>
              </div>
              <div className="border-l-4 border-accent-600 pl-4">
                <div className="text-3xl font-display font-bold text-brand-900 mb-1">
                  5 Sedes
                </div>
                <div className="text-sm text-neutral-600">
                  En ubicaciones estratégicas
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
