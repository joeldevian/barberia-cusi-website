import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    // Verificar variables de entorno
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Configuration error: Missing Supabase credentials' },
        { status: 500 }
      );
    }

    const { data: sucursalesActivas, error } = await supabase
      .from('sucursales')
      .select('*')
      .eq('activo', true)
      .order('es_principal', { ascending: false })
      .order('nombre', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json(sucursalesActivas);
  } catch (error) {
    console.error('Error al obtener sucursales:', error);
    return NextResponse.json(
      { error: 'Error al cargar sucursales', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
