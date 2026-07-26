import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Configuration error' },
        { status: 500 }
      );
    }

    // Usar fetch directo a la REST API de Supabase
    const response = await fetch(
      `${supabaseUrl}/rest/v1/servicios?activo=eq.true&order=orden_visualizacion.asc`,
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

    const servicios = await response.json();
    return NextResponse.json(servicios);

  } catch (error) {
    console.error('Error al obtener servicios:', error);
    return NextResponse.json(
      { 
        error: 'Error al cargar servicios', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
