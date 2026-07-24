import type { Metadata } from 'next';
import FormularioReserva from '@/components/reservas/FormularioReserva';
import { generarBreadcrumbSchema } from '@/lib/schema-jsonld';

export const metadata: Metadata = {
  title: 'Reservar Cita | Barbería Cusi - Sistema de Reservas Online',
  description: 'Reserva tu cita online en Barbería Cusi. Elige tu sucursal, servicio, barbero y horario. Confirmación inmediata por WhatsApp.',
  keywords: 'reserva barbería, cita barbería Ayacucho, reserva online, agendar corte de cabello',
  openGraph: {
    title: 'Reservar Cita | Barbería Cusi',
    description: 'Sistema de reservas online. Elige tu sucursal, servicio y horario preferido.',
    type: 'website',
  },
};

export default function ReservasPage() {
  // JSON-LD para breadcrumbs
  const breadcrumbSchema = generarBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Reservar Cita', url: '/reservas' },
  ]);

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-neutral-50">
        {/* Hero Section */}
        <section className="relative bg-brand-950 text-white py-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/images/inicio/principal-reservas.jpg"
              alt="Reserva tu cita en Barbería Cusi"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-950/90 via-brand-900/85 to-brand-950/90" />
          </div>

          <div className="container-default relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Reserva Tu Cita Online
              </h1>
              <p className="text-xl text-neutral-100 mb-6">
                Elige tu sucursal, servicio y horario preferido. Confirmación inmediata por WhatsApp.
              </p>
              <div className="flex flex-wrap gap-4 justify-center text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Confirmación instantánea</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Sin necesidad de registro</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>5 sucursales disponibles</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formulario de Reserva */}
        <section className="py-12 md:py-20">
          <div className="container-default">
            <FormularioReserva />
          </div>
        </section>

        {/* Información Adicional */}
        <section className="py-12 bg-white">
          <div className="container-default">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                ¿Cómo funciona el sistema de reservas?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Paso 1 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Selecciona</h3>
                  <p className="text-neutral-600 text-sm">
                    Elige tu sucursal, servicio, barbero preferido y horario disponible
                  </p>
                </div>

                {/* Paso 2 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Confirma</h3>
                  <p className="text-neutral-600 text-sm">
                    Completa tus datos y confirma la reserva. Recibirás un mensaje de WhatsApp
                  </p>
                </div>

                {/* Paso 3 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Asiste</h3>
                  <p className="text-neutral-600 text-sm">
                    Llega a tu cita a la hora acordada. ¡Disfruta de la experiencia Barbería Cusi!
                  </p>
                </div>
              </div>

              {/* Políticas de Reserva */}
              <div className="mt-12 p-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-accent-100 border-2 border-black flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-6 h-6 text-accent-600"
                    >
                      <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm4.5 9.5a.75.75 0 000 1.5h2a.75.75 0 000-1.5H9zM8.25 14a.75.75 0 01.75-.75h2a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-2xl text-black">Políticas de Reserva</h3>
                </div>
                <ul className="space-y-4 text-sm text-black font-semibold">
                  <li className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5"
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                    </svg>
                    <span>Las reservas deben realizarse con al menos 2 horas de anticipación</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5"
                    >
                      <path d="M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 015 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914z" />
                      <path d="M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 001.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0014 6z" />
                    </svg>
                    <span>Si necesitas cancelar o reprogramar, avísanos por WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5"
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h4.59l-2.1 1.95a.75.75 0 001.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 10-1.02 1.1l2.1 1.95H6.75z" clipRule="evenodd" />
                    </svg>
                    <span>Te recomendamos llegar 5 minutos antes de tu cita</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5"
                    >
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <span>Tolerancia de espera: 15 minutos. Después de ese tiempo, la cita puede ser asignada a otro cliente</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
