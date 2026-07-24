import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const { data: sucursalesActivas, error } = await supabase
      .from('sucursales')
      .select('*')
      .eq('activo', true)
      .order('es_principal', { ascending: false })
      .order('nombre', { ascending: true });

    if (error) throw error;

    return NextResponse.json(sucursalesActivas);
  } catch (error) {
    console.error('Error al obtener sucursales:', error);
    return NextResponse.json(
      { error: 'Error al cargar sucursales' },
      { status: 500 }
    );
  }
}
