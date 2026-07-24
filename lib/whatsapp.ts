interface WhatsAppMessageParams {
  servicio?: string;
  sede?: string;
  fecha?: string;
  hora?: string;
  barbero?: string;
  nombre?: string;
}

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '+51912926255';

/**
 * Genera un enlace de WhatsApp con mensaje prellenado
 * Acepta un objeto de parámetros o un string directo
 */
export function generarEnlaceWhatsApp(params: WhatsAppMessageParams | string): string {
  let mensaje: string;
  
  // Si es un string, usarlo directamente
  if (typeof params === 'string') {
    mensaje = params;
  } else {
    // Si es un objeto, construir el mensaje
    const { servicio, sede, fecha, hora, barbero, nombre } = params;
    
    mensaje = '¡Hola! Me gustaría ';
    
    if (servicio || sede || fecha || hora) {
      mensaje += 'hacer una reserva con los siguientes datos:\n\n';
      
      if (servicio) mensaje += `🪒 Servicio: ${servicio}\n`;
      if (sede) mensaje += `📍 Sede: ${sede}\n`;
      if (fecha) mensaje += `📅 Fecha: ${fecha}\n`;
      if (hora) mensaje += `🕐 Hora: ${hora}\n`;
      if (barbero) mensaje += `✂️ Barbero: ${barbero}\n`;
      if (nombre) mensaje += `👤 Nombre: ${nombre}\n`;
    } else {
      mensaje += 'obtener más información sobre sus servicios.';
    }
  }
  
  const mensajeCodificado = encodeURIComponent(mensaje);
  return `https://wa.me/${WHATSAPP_PHONE.replace(/\+/g, '')}?text=${mensajeCodificado}`;
}

/**
 * Genera un enlace de WhatsApp simple para consultas generales
 */
export function generarEnlaceWhatsAppConsulta(): string {
  const mensaje = '¡Hola! Me gustaría obtener más información sobre Barbería Cusi.';
  const mensajeCodificado = encodeURIComponent(mensaje);
  return `https://wa.me/${WHATSAPP_PHONE.replace(/\+/g, '')}?text=${mensajeCodificado}`;
}

/**
 * Formatea el número de teléfono para mostrar
 */
export function formatearTelefono(telefono: string): string {
  // +51 912 926 255 -> (51) 912 926 255
  const cleaned = telefono.replace(/\D/g, '');
  if (cleaned.length === 11 && cleaned.startsWith('51')) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }
  return telefono;
}
