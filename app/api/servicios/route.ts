import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const { data: serviciosActivos, error } = await supabase
      .from('servicios')
      .select('*')
      .eq('activo', true)
      .order('orden_visualizacion', { ascending: true });

    if (error) throw error;

    return NextResponse.json(serviciosActivos);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    return NextResponse.json(
      { error: 'Error al cargar servicios' },
      { status: 500 }
    );
  }
}
