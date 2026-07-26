import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Verificar variables de entorno
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Configuration error: Missing Supabase credentials' },
        { status: 500 }
      );
    }

    // Importar createClient dinámicamente
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabase = createClient(supabaseUrl, supabaseKey);

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
