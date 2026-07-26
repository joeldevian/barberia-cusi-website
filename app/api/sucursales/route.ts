import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    let supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Configuration error' },
        { status: 500 }
      );
    }

    // Limpiar la key: remover saltos de línea y tomar solo la primera línea válida
    supabaseKey = supabaseKey.split('\n')[0].trim();

    // Usar fetch directo a la REST API de Supabase
    const response = await fetch(
      `${supabaseUrl}/rest/v1/sucursales?activo=eq.true&order=es_principal.desc,nombre.asc`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Supabase API error:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const sucursales = await response.json();
    return NextResponse.json(sucursales);

  } catch (error) {
    console.error('Error al obtener sucursales:', error);
    return NextResponse.json(
      { 
        error: 'Error al cargar sucursales', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
