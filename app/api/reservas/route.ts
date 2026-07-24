import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET - Obtener reservas (para el panel admin)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clienteTelefono = searchParams.get('telefono');

    let query = supabase.from('reservas').select('*');

    if (clienteTelefono) {
      query = query.eq('cliente_telefono', clienteTelefono);
    }

    const { data: todasLasReservas, error } = await query;

    if (error) throw error;

    return NextResponse.json(todasLasReservas);
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    return NextResponse.json(
      { error: 'Error al cargar reservas' },
      { status: 500 }
    );
  }
}

// POST - Crear nueva reserva
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      servicioId,
      sucursalId,
      barberoId,
      fecha,
      hora,
      clienteNombre,
      clienteTelefono,
      clienteEmail,
      notas,
      precio,
      duracionMinutos,
    } = body;

    // Validar campos requeridos
    if (!servicioId || !sucursalId || !fecha || !hora || !clienteNombre || !clienteTelefono) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Manejar "Sin preferencia" (cualquiera)
    const barberoIdFinal = barberoId === 'cualquiera' ? null : barberoId;

    // Crear la reserva
    const { data: nuevaReserva, error } = await supabase
      .from('reservas')
      .insert({
        servicio_id: servicioId,
        sucursal_id: sucursalId,
        barbero_id: barberoIdFinal,
        fecha,
        hora,
        cliente_nombre: clienteNombre,
        cliente_telefono: clienteTelefono,
        cliente_email: clienteEmail || null,
        notas: notas || null,
        precio: precio?.toString(),
        duracion_minutos: duracionMinutos,
        estado: 'pendiente',
        confirmada_whatsapp: false,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(nuevaReserva, { status: 201 });
  } catch (error) {
    console.error('Error al crear reserva:', error);
    return NextResponse.json(
      { error: 'Error al crear la reserva' },
      { status: 500 }
    );
  }
}

// PATCH - Actualizar estado de reserva (para admin)
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, estado, confirmadaWhatsapp, razonCancelacion } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID de reserva es requerido' },
        { status: 400 }
      );
    }

    const datosActualizar: any = {};
    
    if (estado) datosActualizar.estado = estado;
    if (confirmadaWhatsapp !== undefined) datosActualizar.confirmada_whatsapp = confirmadaWhatsapp;
    if (razonCancelacion) {
      datosActualizar.razon_cancelacion = razonCancelacion;
      datosActualizar.cancelado_en = new Date().toISOString();
    }

    const { data: reservaActualizada, error } = await supabase
      .from('reservas')
      .update(datosActualizar)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Reserva no encontrada' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json(reservaActualizada);
  } catch (error) {
    console.error('Error al actualizar reserva:', error);
    return NextResponse.json(
      { error: 'Error al actualizar la reserva' },
      { status: 500 }
    );
  }
}
