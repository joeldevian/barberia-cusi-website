import { Metadata } from 'next';
import Link from 'next/link';
import { getSucursalPrincipal } from '@/data/sucursales';
import { formatearTelefono, generarEnlaceWhatsAppConsulta } from '@/lib/whatsapp';
import { generarBreadcrumbSchema } from '@/lib/schema-jsonld';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contáctanos: Jr. Unión 156, Ayacucho. Teléfono: +51 912 926 255. Email: richarcusi80@gmail.com. Síguenos en redes sociales.',
};

export default function ContactoPage() {
  const sucursalPrincipal = getSucursalPrincipal();
  
  const breadcrumbSchema = generarBreadcrumbSchema([
    { name: 'Inicio', url: 'https://barberiacusi.com' },
    { name: 'Contacto', url: 'https://barberiacusi.com/contacto' },
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
        <section className="relative section-sm bg-brand-950 text-white">
          <div className="absolute inset-0">
            <img
              src="/images/inicio/inicio_contacto.jpg"
              alt="Contacto Barbería Cusi - Estamos para atenderte"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="container-custom text-center relative z-10">
            <div className="inline-block px-4 py-2 bg-accent-600/20 backdrop-blur-sm rounded-full border border-accent-500/30 mb-6">
              <span className="text-sm font-semibold">Contacto</span>
            </div>
            <h1 className="text-display-md font-display font-bold mb-6">
              Estamos aquí para ti
            </h1>
            <p className="text-xl text-neutral-200 max-w-3xl mx-auto">
              Contáctanos por el medio que prefieras. Estamos listos para atenderte
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="section bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-display font-bold text-brand-900 mb-8">
                  Información de Contacto
                </h2>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="card">
                    <div className="flex items-start gap-4">
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
                        <h3 className="font-display font-bold text-brand-900 text-lg mb-2">
                          Sede Principal
                        </h3>
                        <p className="text-neutral-700 mb-1">
                          {sucursalPrincipal.direccion}
                        </p>
                        <p className="text-neutral-600 text-sm mb-3">
                          {sucursalPrincipal.ciudad}
                        </p>
                        <Link href="/sucursales" className="text-accent-600 hover:text-accent-700 text-sm font-semibold">
                          Ver todas las sucursales →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="card">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-6 h-6 text-accent-600"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-brand-900 text-lg mb-2">
                          Teléfono
                        </h3>
                        <a
                          href={`tel:${sucursalPrincipal.telefono}`}
                          className="text-neutral-700 hover:text-accent-600 transition-colors text-lg"
                        >
                          {formatearTelefono(sucursalPrincipal.telefono)}
                        </a>
                        <p className="text-neutral-600 text-sm mt-2">
                          Llámanos de lunes a domingo, 9:00 AM - 8:00 PM
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="card bg-green-50 border-green-200">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="white"
                          viewBox="0 0 24 24"
                        >
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-brand-900 text-lg mb-2">
                          WhatsApp
                        </h3>
                        <p className="text-neutral-700 mb-3">
                          Respuesta rápida y directa para tus consultas
                        </p>
                        <a
                          href={generarEnlaceWhatsAppConsulta()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                        >
                          Abrir WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="card">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-6 h-6 text-accent-600"
                        >
                          <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                          <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-brand-900 text-lg mb-2">
                          Email
                        </h3>
                        <a
                          href={`mailto:${sucursalPrincipal.email}`}
                          className="text-neutral-700 hover:text-accent-600 transition-colors break-all"
                        >
                          {sucursalPrincipal.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="card">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-6 h-6 text-accent-600"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-brand-900 text-lg mb-2">
                          Horario
                        </h3>
                        <p className="text-neutral-700">
                          {sucursalPrincipal.horario}
                        </p>
                        <p className="text-neutral-600 text-sm mt-2">
                          (Horario placeholder - verificar con el negocio)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h2 className="text-3xl font-display font-bold text-brand-900 mb-8">
                  Síguenos en Redes Sociales
                </h2>

                <p className="text-neutral-600 mb-8">
                  Mantente al día con nuestras promociones, tips de estilo y contenido exclusivo
                </p>

                <div className="space-y-4">
                  <a
                    href="https://www.instagram.com/cusi.barber"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card card-hover flex items-center gap-4 group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="white"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-brand-900 text-lg mb-1 group-hover:text-accent-600 transition-colors">
                        Instagram
                      </h3>
                      <p className="text-neutral-600 text-sm">@cusi.barber</p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 text-neutral-400 group-hover:text-accent-600 group-hover:translate-x-1 transition-all"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </a>

                  <a
                    href="https://www.facebook.com/BarberiaCusiAyacucho"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card card-hover flex items-center gap-4 group"
                  >
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="white"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-brand-900 text-lg mb-1 group-hover:text-accent-600 transition-colors">
                        Facebook
                      </h3>
                      <p className="text-neutral-600 text-sm">BarberiaCusiAyacucho</p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 text-neutral-400 group-hover:text-accent-600 group-hover:translate-x-1 transition-all"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </a>

                  <a
                    href="https://www.tiktok.com/@cusi.barber"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card card-hover flex items-center gap-4 group"
                  >
                    <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="white"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-brand-900 text-lg mb-1 group-hover:text-accent-600 transition-colors">
                        TikTok
                      </h3>
                      <p className="text-neutral-600 text-sm">@cusi.barber</p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 text-neutral-400 group-hover:text-accent-600 group-hover:translate-x-1 transition-all"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </a>
                </div>

                <div className="mt-12 card bg-accent-50 border-accent-200">
                  <h3 className="font-display font-bold text-brand-900 text-lg mb-3">
                    ¿Por qué seguirnos?
                  </h3>
                  <ul className="space-y-2 text-neutral-700">
                    <li className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Promociones exclusivas y descuentos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Tips y tendencias de estilo masculino</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Galería de nuestros mejores trabajos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Noticias y novedades de Barbería Cusi</span>
                    </li>
                  </ul>
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
                ¿Listo para tu próximo corte?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Reserva tu cita online o visítanos directamente en cualquiera de nuestras sucursales
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/reservas" className="btn bg-white text-accent-700 hover:bg-neutral-100 text-lg">
                  Reservar Cita
                </Link>
                <Link href="/sucursales" className="btn bg-accent-700 text-white hover:bg-accent-800 border-2 border-white text-lg">
                  Ver Sucursales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
