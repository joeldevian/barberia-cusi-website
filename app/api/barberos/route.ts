import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sucursalId = searchParams.get('sucursalId');

    if (!sucursalId) {
      return NextResponse.json(
        { error: 'sucursalId es requerido' },
        { status: 400 }
      );
    }

    const { data: barberosDisponibles, error } = await supabase
      .from('barberos')
      .select('*')
      .eq('sucursal_id', sucursalId)
      .eq('disponible', true)
      .order('orden_visualizacion', { ascending: true });

    if (error) throw error;

    return NextResponse.json(barberosDisponibles);
  } catch (error) {
    console.error('Error al obtener barberos:', error);
    return NextResponse.json(
      { error: 'Error al cargar barberos' },
      { status: 500 }
    );
  }
}
