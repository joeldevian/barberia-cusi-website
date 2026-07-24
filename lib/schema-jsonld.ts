import { Sucursal } from '@/data/sucursales';

/**
 * Genera el JSON-LD para LocalBusiness de una sucursal
 * siguiendo el esquema de Schema.org para SEO
 */
export function generarLocalBusinessSchema(sucursal: Sucursal) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    '@id': `https://barberiacusi.com/sucursales#${sucursal.id}`,
    name: `Barbería Cusi - ${sucursal.nombre}`,
    image: sucursal.imagen,
    url: 'https://barberiacusi.com',
    telephone: sucursal.telefono,
    email: sucursal.email,
    priceRange: 'S/. 25 - S/. 280',
    address: {
      '@type': 'PostalAddress',
      streetAddress: sucursal.direccion,
      addressLocality: 'Ayacucho',
      addressRegion: 'Ayacucho',
      addressCountry: 'PE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: sucursal.coordenadas.lat,
      longitude: sucursal.coordenadas.lng,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '09:00',
      closes: '20:00',
    },
    sameAs: [
      'https://www.facebook.com/BarberiaCusiAyacucho',
      'https://www.instagram.com/cusi.barber',
      'https://www.tiktok.com/@cusi.barber',
    ],
  };
}

/**
 * Genera el JSON-LD para Organization (empresa principal)
 */
export function generarOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Barbería Cusi',
    url: 'https://barberiacusi.com',
    logo: 'https://barberiacusi.com/images/logo.png',
    description:
      'La barbería familiar que define el estilo masculino en Ayacucho desde hace décadas. 5 sucursales en Ayacucho.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jr. Unión 156, Parque Magdalena',
      addressLocality: 'Ayacucho',
      addressRegion: 'Ayacucho',
      addressCountry: 'PE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+51-912-926-255',
      contactType: 'customer service',
      availableLanguage: 'Spanish',
    },
    sameAs: [
      'https://www.facebook.com/BarberiaCusiAyacucho',
      'https://www.instagram.com/cusi.barber',
      'https://www.tiktok.com/@cusi.barber',
    ],
  };
}

/**
 * Genera el JSON-LD para BreadcrumbList (navegación)
 */
export function generarBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Genera el JSON-LD para Service (servicios ofrecidos)
 */
export function generarServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Barbería y Cortes de Cabello',
    provider: {
      '@type': 'Organization',
      name: 'Barbería Cusi',
    },
    areaServed: {
      '@type': 'City',
      name: 'Ayacucho',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Barbería',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Corte de Cabello',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Diseño de Barba',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Afeitado Tradicional',
          },
        },
      ],
    },
  };
}
