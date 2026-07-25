import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

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

    // Crear cliente dentro de la función para asegurar que las variables estén disponibles
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data: serviciosActivos, error } = await supabase
      .from('servicios')
      .select('*')
      .eq('activo', true)
      .order('orden_visualizacion', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json(serviciosActivos);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    return NextResponse.json(
      { error: 'Error al cargar servicios', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
