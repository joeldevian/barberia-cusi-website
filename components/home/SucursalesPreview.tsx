import Link from 'next/link';
import { sucursales } from '@/data/sucursales';
import { formatearTelefono } from '@/lib/whatsapp';

export default function SucursalesPreview() {
  return (
    <section className="section bg-neutral-50 scroll-reveal">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-accent-100 text-accent-800 rounded-full text-sm font-semibold mb-6">
            Nuestras Ubicaciones
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-brand-900 mb-6">
            5 sucursales en Ayacucho
          </h2>
          <p className="text-lg text-neutral-600">
            Encuentra la sucursal más cercana a ti. Todas nuestras sedes mantienen los mismos 
            estándares de calidad y profesionalismo
          </p>
        </div>

        {/* Map placeholder + Sucursales list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Map area with background image */}
          <div className="relative rounded-2xl shadow-lg overflow-hidden min-h-[400px]">
            {/* Background image of Ayacucho */}
            <div className="absolute inset-0">
              <img
                src="/images/secciones/seccion-ubicacion.jpg"
                alt="Ayacucho"
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-900/85 via-accent-700/80 to-brand-950/90"></div>
            </div>
            
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 flex items-center justify-center h-full">
              <div className="text-center text-white">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold mb-3">
                  Ubicaciones Estratégicas
                </h3>
                <p className="text-white/90 mb-6 max-w-sm mx-auto">
                  Todas nuestras sucursales están ubicadas en zonas de fácil acceso en Ayacucho
                </p>
                <Link href="/sucursales" className="btn bg-white text-brand-900 hover:bg-neutral-100 hover-lift btn-press border-0">
                  Ver Mapa Completo
                </Link>
              </div>
            </div>
          </div>

          {/* Sucursales list */}
          <div className="space-y-4 stagger-container">
            {sucursales.map((sucursal, index) => (
              <div
                key={sucursal.id}
                className="relative bg-accent-50 border-2 border-accent-300 rounded-2xl p-6 transition-all duration-300 hover:border-accent-400 hover:shadow-lg hover:scale-[1.02] stagger-item"
                style={{ '--stagger-index': index } as any}
              >
                {/* Esquina doblada efecto */}
                <div 
                  className="absolute bottom-0 right-0 w-16 h-16 bg-accent-200 transition-colors duration-300"
                  style={{
                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                    borderBottomRightRadius: '1rem'
                  }}
                />

                <div className="flex items-start gap-4 relative z-10">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-accent-200 rounded-lg flex items-center justify-center border-2 border-accent-400">
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

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-display font-bold text-brand-900 text-lg">
                        {sucursal.nombre}
                      </h3>
                      {sucursal.esPrincipal && (
                        <span className="inline-flex items-center px-3 py-1 bg-accent-600 text-white text-xs font-bold rounded-full shadow-md">
                          PRINCIPAL
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-800 font-medium text-sm mb-2">
                      {sucursal.direccion}
                    </p>
                    <div className="flex items-center gap-2 text-neutral-700 text-sm font-medium">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 text-accent-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <a
                        href={`tel:${sucursal.telefono}`}
                        className="hover:text-accent-600 transition-colors"
                      >
                        {formatearTelefono(sucursal.telefono)}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/sucursales" className="btn btn-primary">
            Ver Todas las Sucursales
          </Link>
        </div>
      </div>
    </section>
  );
}
