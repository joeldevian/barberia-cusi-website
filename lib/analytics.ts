// Google Analytics Configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
interface EventProps {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const event = ({ action, category, label, value }: EventProps) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined events for Barbería Cusi
export const trackReservation = (barberoId: string, servicioId: string) => {
  event({
    action: 'reservation_started',
    category: 'Reservas',
    label: `Barbero: ${barberoId}, Servicio: ${servicioId}`,
  });
};

export const trackReservationComplete = (reservaId: string) => {
  event({
    action: 'reservation_completed',
    category: 'Reservas',
    label: reservaId,
    value: 1,
  });
};

export const trackWhatsAppClick = (sucursalNombre: string) => {
  event({
    action: 'whatsapp_click',
    category: 'Contacto',
    label: sucursalNombre,
  });
};

export const trackSocialClick = (platform: string) => {
  event({
    action: 'social_click',
    category: 'Social Media',
    label: platform,
  });
};

export const trackServiceView = (servicioNombre: string) => {
  event({
    action: 'service_view',
    category: 'Servicios',
    label: servicioNombre,
  });
};

export const trackBarberoView = (barberoNombre: string) => {
  event({
    action: 'barbero_view',
    category: 'Barberos',
    label: barberoNombre,
  });
};

// Type declaration for window.gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}
