import Image from 'next/image';
import Link from 'next/link';

const galeriaImagenes = [
  {
    id: 1,
    src: '/images/galeria/Corte moderno fade.jpg',
    alt: 'Corte moderno fade',
    categoria: 'Cortes',
  },
  {
    id: 2,
    src: '/images/galeria/Diseño de barba profesional.jpg',
    alt: 'Diseño de barba profesional',
    categoria: 'Barba',
  },
  {
    id: 3,
    src: '/images/galeria/Afeitado tradicional.jpg',
    alt: 'Afeitado tradicional',
    categoria: 'Afeitado',
  },
  {
    id: 4,
    src: '/images/galeria/Interior de barbería.jpg',
    alt: 'Interior de barbería',
    categoria: 'Local',
  },
  {
    id: 5,
    src: '/images/galeria/Equipo profesional.jpg',
    alt: 'Equipo profesional',
    categoria: 'Equipo',
  },
  {
    id: 6,
    src: '/images/galeria/Resultado final.jpg',
    alt: 'Resultado final',
    categoria: 'Resultado',
  },
];

export default function GaleriaPreview() {
  return (
    <section className="section bg-brand-950 text-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-accent-600/20 backdrop-blur-sm text-accent-400 rounded-full text-sm font-semibold mb-6 border border-accent-600/30">
            Galería
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Nuestro trabajo habla por sí mismo
          </h2>
          <p className="text-lg text-neutral-300">
            Cada corte es una obra de arte. Conoce algunos de nuestros trabajos recientes
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 stagger-container">
          {galeriaImagenes.map((imagen, index) => (
            <div
              key={imagen.id}
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer stagger-item hover-lift"
              style={{ '--stagger-index': index } as any}
            >
              <Image
                src={imagen.src}
                alt={imagen.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <span className="inline-block px-3 py-1 bg-accent-600 text-white text-xs font-semibold rounded-full mb-3">
                    {imagen.categoria}
                  </span>
                  <h3 className="text-white font-display font-bold text-center">
                    {imagen.alt}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="bg-brand-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-brand-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Síguenos en redes sociales
              </h3>
              <p className="text-neutral-300 text-lg">
                Entérate de nuestras promociones, tips de estilo y conoce más trabajos en 
                Instagram, TikTok y Facebook
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              <a
                href="https://www.instagram.com/cusi.barber"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white text-brand-900 hover:bg-neutral-100 justify-center hover-lift btn-press"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="mr-2"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg>
                @cusi.barber
              </a>
              <a
                href="https://www.facebook.com/BarberiaCusiAyacucho"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline border-white text-white hover:bg-white hover:text-brand-900 justify-center hover-lift btn-press"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
