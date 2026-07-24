export interface Sucursal {
  id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  telefono: string;
  email: string;
  horario: string;
  coordenadas: {
    lat: number;
    lng: number;
  };
  mapUrl: string;
  esPrincipal: boolean;
  imagen: string;
}

// Datos reales de las sucursales de Barbería Cusi
export const sucursales: Sucursal[] = [
  {
    id: 'principal-union',
    nombre: 'Sede Principal - Parque Magdalena',
    direccion: 'Jr. Unión 156, Parque Magdalena',
    ciudad: 'Ayacucho (Huamanga)',
    telefono: '+51 912 926 255',
    email: 'richarcusi80@gmail.com',
    horario: 'Lunes a Domingo, 9:00 am – 8:00 pm', // Placeholder - verificar horario real
    coordenadas: {
      lat: -13.1586,
      lng: -74.2239,
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243.5!2d-74.2239!3d-13.1586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA5JzMxLjAiUyA3NMKwMTMnMjYuMCJX!5e0!3m2!1ses!2spe!4v1234567890',
    esPrincipal: true,
    imagen: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=600&fit=crop',
  },
  {
    id: 'caceres',
    nombre: 'Sede Mariscal Cáceres',
    direccion: 'Av. Mariscal Cáceres 798',
    ciudad: 'Ayacucho (Huamanga)',
    telefono: '+51 912 926 255',
    email: 'richarcusi80@gmail.com',
    horario: 'Lunes a Domingo, 9:00 am – 8:00 pm',
    coordenadas: {
      lat: -13.1622,
      lng: -74.2181,
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243.5!2d-74.2181!3d-13.1622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA5JzQzLjkiUyA3NMKwMTMnMDUuMiJX!5e0!3m2!1ses!2spe!4v1234567891',
    esPrincipal: false,
    imagen: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=600&fit=crop',
  },
  {
    id: 'manco-capac',
    nombre: 'Sede Manco Cápac',
    direccion: 'Jr. Manco Cápac 443',
    ciudad: 'Ayacucho (Huamanga)',
    telefono: '+51 912 926 255',
    email: 'richarcusi80@gmail.com',
    horario: 'Lunes a Domingo, 9:00 am – 8:00 pm',
    coordenadas: {
      lat: -13.1595,
      lng: -74.2250,
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243.5!2d-74.2250!3d-13.1595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA5JzM0LjIiUyA3NMKwMTMnMzAuMCJX!5e0!3m2!1ses!2spe!4v1234567892',
    esPrincipal: false,
    imagen: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&h=600&fit=crop',
  },
  {
    id: 'los-andes',
    nombre: 'Sede Los Andes',
    direccion: 'Jr. Los Andes 188',
    ciudad: 'Ayacucho (Huamanga)',
    telefono: '+51 912 926 255',
    email: 'richarcusi80@gmail.com',
    horario: 'Lunes a Domingo, 9:00 am – 8:00 pm',
    coordenadas: {
      lat: -13.1640,
      lng: -74.2205,
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243.5!2d-74.2205!3d-13.1640!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA5JzUwLjQiUyA3NMKwMTMnMTMuOCJX!5e0!3m2!1ses!2spe!4v1234567893',
    esPrincipal: false,
    imagen: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=600&fit=crop',
  },
  {
    id: 'tres-mascaras',
    nombre: 'Sede Tres Máscaras',
    direccion: 'Jr. Tres Máscaras 526',
    ciudad: 'Ayacucho (Huamanga)',
    telefono: '+51 912 926 255',
    email: 'richarcusi80@gmail.com',
    horario: 'Lunes a Domingo, 9:00 am – 8:00 pm',
    coordenadas: {
      lat: -13.1575,
      lng: -74.2220,
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243.5!2d-74.2220!3d-13.1575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA5JzI3LjAiUyA3NMKwMTMnMTkuMiJX!5e0!3m2!1ses!2spe!4v1234567894',
    esPrincipal: false,
    imagen: 'https://images.unsplash.com/photo-1598523907345-30a74552bb52?w=800&h=600&fit=crop',
  },
];

export const getSucursalPrincipal = () => sucursales.find(s => s.esPrincipal) || sucursales[0];
export const getSucursalById = (id: string) => sucursales.find(s => s.id === id);
