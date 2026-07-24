export interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number; // En soles
  duracion: number; // En minutos
  categoria: 'corte' | 'barba' | 'combo' | 'tratamiento' | 'premium';
  popular: boolean;
  imagen: string;
}

// Datos de servicios con imágenes reales
export const servicios: Servicio[] = [
  {
    id: 'corte-clasico',
    nombre: 'Corte Clásico',
    descripcion: 'Corte de cabello tradicional con técnicas profesionales. Incluye lavado y secado.',
    precio: 30,
    duracion: 40,
    categoria: 'corte',
    popular: true,
    imagen: '/images/servicios/Corte Clásico.jpg',
  },
  {
    id: 'fade-degradado',
    nombre: 'Fade / Degradado',
    descripcion: 'Corte moderno con degradado perfectamente difuminado. Técnicas de fade bajo, medio o alto.',
    precio: 35,
    duracion: 50,
    categoria: 'corte',
    popular: true,
    imagen: '/images/servicios/Fade Degradado.jpg',
  },
  {
    id: 'combo-corte-barba',
    nombre: 'Combo Corte + Barba',
    descripcion: 'El paquete completo: corte de cabello profesional más diseño y perfilado de barba.',
    precio: 45,
    duracion: 60,
    categoria: 'combo',
    popular: true,
    imagen: '/images/servicios/Combo Corte + Barba.jpg',
  },
  {
    id: 'diseno-barba',
    nombre: 'Diseño y Perfilado de Barba',
    descripcion: 'Diseño profesional de barba con recorte, perfilado y acabado perfecto.',
    precio: 25,
    duracion: 30,
    categoria: 'barba',
    popular: false,
    imagen: '/images/servicios/Diseño y Perfilado de Barba.jpg',
  },
  {
    id: 'afeitado-navaja',
    nombre: 'Afeitado Tradicional a Navaja',
    descripcion: 'Experiencia clásica de barbería con afeitado a navaja, toallas calientes y productos premium.',
    precio: 30,
    duracion: 35,
    categoria: 'barba',
    popular: false,
    imagen: '/images/servicios/Afeitado Tradicional a Navaja.jpg',
  },
  {
    id: 'coloracion',
    nombre: 'Coloración de Cabello',
    descripcion: 'Servicio de coloración profesional con productos de calidad premium.',
    precio: 60,
    duracion: 90,
    categoria: 'tratamiento',
    popular: false,
    imagen: '/images/servicios/Coloración de Cabello.jpg',
  },
  {
    id: 'tratamiento-capilar',
    nombre: 'Tratamiento Capilar',
    descripcion: 'Tratamiento revitalizante para el cabello con productos especializados.',
    precio: 50,
    duracion: 45,
    categoria: 'tratamiento',
    popular: false,
    imagen: '/images/servicios/Tratamiento Capilar.jpg',
  },
  {
    id: 'servicio-premium',
    nombre: 'Servicio Premium',
    descripcion: 'El paquete completo: corte, barba, afeitado, tratamiento facial y masaje. La experiencia definitiva.',
    precio: 280,
    duracion: 120,
    categoria: 'premium',
    popular: false,
    imagen: '/images/servicios/Servicio Premium.jpg',
  },
];

export const getServiciosByCategoria = (categoria: Servicio['categoria']) => 
  servicios.filter(s => s.categoria === categoria);

export const getServiciosPopulares = () => 
  servicios.filter(s => s.popular);

export const getServicioById = (id: string) => 
  servicios.find(s => s.id === id);
