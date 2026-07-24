import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Generar slots de horario disponibles
function generarSlotsHorarios(
  horaInicio: string, 
  horaFin: string, 
  intervalo: number = 30
): string[] {
  const slots: string[] = [];
  const [inicioHora, inicioMinuto] = horaInicio.split(':').map(Number);
  const [finHora, finMinuto] = horaFin.split(':').map(Number);
  
  const inicioMinutos = inicioHora * 60 + inicioMinuto;
  const finMinutos = finHora * 60 + finMinuto;
  
  for (let minutos = inicioMinutos; minutos < finMinutos; minutos += intervalo) {
    const hora = Math.floor(minutos / 60);
    const minuto = minutos % 60;
    slots.push(`${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`);
  }
  
  return slots;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fecha = searchParams.get('fecha');
    const barberoId = searchParams.get('barberoId');
    const sucursalId = searchParams.get('sucursalId');
    const duracionMinutos = parseInt(searchParams.get('duracionMinutos') || '30');

    if (!fecha || !barberoId || !sucursalId) {
      return NextResponse.json(
        { error: 'fecha, barberoId y sucursalId son requeridos' },
        { status: 400 }
      );
    }

    // Obtener día de la semana (0=Domingo, 6=Sábado)
    const fechaObj = new Date(fecha + 'T00:00:00');
    const diaSemana = fechaObj.getDay();

    // Si seleccionó "Sin preferencia", usar horarios de la sucursal
    let horariosBase;
    if (barberoId === 'cualquiera') {
      const { data: sucursal, error } = await supabase
        .from('sucursales')
        .select('horario_apertura, horario_cierre')
        .eq('id', sucursalId)
        .single();

      if (error || !sucursal) {
        return NextResponse.json({ error: 'Sucursal no encontrada' }, { status: 404 });
      }

      horariosBase = [{
        hora_inicio: sucursal.horario_apertura,
        hora_fin: sucursal.horario_cierre,
      }];
    } else {
      const { data: horarios, error } = await supabase
        .from('horarios_disponibles')
        .select('hora_inicio, hora_fin')
        .eq('barbero_id', barberoId)
        .eq('dia_semana', diaSemana)
        .eq('activo', true);

      if (error) throw error;
      horariosBase = horarios;
    }

    if (!horariosBase || horariosBase.length === 0) {
      return NextResponse.json({ horarios: [] });
    }

    // Generar todos los slots posibles
    const todosLosSlots = generarSlotsHorarios(
      horariosBase[0].hora_inicio,
      horariosBase[0].hora_fin,
      30
    );

    // Obtener reservas existentes
    let reservasQuery = supabase
      .from('reservas')
      .select('hora, duracion_minutos')
      .eq('fecha', fecha)
      .eq('estado', 'confirmada');

    if (barberoId !== 'cualquiera') {
      reservasQuery = reservasQuery.eq('barbero_id', barberoId);
    } else {
      reservasQuery = reservasQuery.eq('sucursal_id', sucursalId);
    }

    const { data: reservasExistentes, error: errorReservas } = await reservasQuery;
    if (errorReservas) throw errorReservas;

    // Obtener bloqueos
    let bloqueosQuery = supabase
      .from('bloqueos_horario')
      .select('hora_inicio, hora_fin')
      .eq('fecha', fecha);

    if (barberoId !== 'cualquiera') {
      bloqueosQuery = bloqueosQuery.eq('barbero_id', barberoId);
    } else {
      bloqueosQuery = bloqueosQuery.eq('sucursal_id', sucursalId);
    }

    const { data: bloqueos, error: errorBloqueos } = await bloqueosQuery;
    if (errorBloqueos) throw errorBloqueos;

    // Marcar slots ocupados
    const slotsDisponibles = todosLosSlots.map(slot => {
      let disponible = true;

      // Verificar bloqueos
      if (bloqueos) {
        for (const bloqueo of bloqueos) {
          if (slot >= bloqueo.hora_inicio && slot < bloqueo.hora_fin) {
            disponible = false;
            break;
          }
        }
      }

      // Verificar reservas
      if (disponible && reservasExistentes) {
        for (const reserva of reservasExistentes) {
          const reservaInicio = reserva.hora;
          const reservaFinMinutos = parseInt(reservaInicio.split(':')[0]) * 60 
            + parseInt(reservaInicio.split(':')[1]) 
            + (reserva.duracion_minutos || 30);
          const reservaFin = `${Math.floor(reservaFinMinutos / 60).toString().padStart(2, '0')}:${(reservaFinMinutos % 60).toString().padStart(2, '0')}`;

          if (slot >= reservaInicio && slot < reservaFin) {
            disponible = false;
            break;
          }
        }
      }

      // Descartar horas pasadas si es hoy
      if (fecha === new Date().toISOString().split('T')[0]) {
        const ahora = new Date();
        const horaActual = `${ahora.getHours().toString().padStart(2, '0')}:${ahora.getMinutes().toString().padStart(2, '0')}`;
        if (slot <= horaActual) {
          disponible = false;
        }
      }

      return {
        hora: slot,
        disponible,
      };
    });

    return NextResponse.json({ horarios: slotsDisponibles });
  } catch (error) {
    console.error('Error al obtener disponibilidad:', error);
    return NextResponse.json(
      { error: 'Error al cargar disponibilidad' },
      { status: 500 }
    );
  }
}
