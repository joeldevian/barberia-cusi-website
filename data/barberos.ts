export interface Barbero {
  id: string;
  nombre: string;
  especialidad: string;
  descripcion: string;
  experiencia: string;
  imagen: string;
  disponible: boolean;
}

export const barberos: Barbero[] = [
  {
    id: 'barbero-1',
    nombre: 'Carlos Mendoza',
    especialidad: 'Fade y Degradados Modernos',
    descripcion: 'Especialista en cortes modernos y técnicas de fade. Más de 10 años de experiencia.',
    experiencia: '10+ años',
    imagen: '/images/barberos/barbero_uno.jpg',
    disponible: true,
  },
  {
    id: 'barbero-2',
    nombre: 'Miguel Quispe',
    especialidad: 'Cortes Clásicos y Barba',
    descripcion: 'Maestro en técnicas tradicionales y diseño de barba. Atención personalizada.',
    experiencia: '8+ años',
    imagen: '/images/barberos/barbero_dos.jpg',
    disponible: true,
  },
  {
    id: 'barbero-3',
    nombre: 'Luis Rojas',
    especialidad: 'Afeitado Tradicional',
    descripcion: 'Experto en afeitado a navaja y técnicas clásicas de barbería.',
    experiencia: '12+ años',
    imagen: '/images/barberos/barbero_tres.jpg',
    disponible: true,
  },
  {
    id: 'barbero-4',
    nombre: 'Daniel Huamán',
    especialidad: 'Diseño y Creatividad',
    descripcion: 'Especialista en diseños creativos y estilos urbanos modernos.',
    experiencia: '6+ años',
    imagen: '/images/barberos/barbero_cuatro.jpg',
    disponible: true,
  },
  {
    id: 'barbero-5',
    nombre: 'Jorge Castillo',
    especialidad: 'Cortes Infantiles',
    descripcion: 'Especializado en cortes para niños y adolescentes con paciencia y dedicación.',
    experiencia: '7+ años',
    imagen: '/images/barberos/barbero_cinco.jpg',
    disponible: true,
  },
  {
    id: 'barbero-6',
    nombre: 'Ana Torres',
    especialidad: 'Estilista y Colorimetría',
    descripcion: 'Experta en cortes masculinos, tintes y técnicas de coloración moderna.',
    experiencia: '5+ años',
    imagen: '/images/barberos/barbero_mujer_seis.jpg',
    disponible: true,
  },
];

export const getBarberosDisponibles = () => 
  barberos.filter(b => b.disponible);

export const getBarberoById = (id: string) => 
  barberos.find(b => b.id === id);
