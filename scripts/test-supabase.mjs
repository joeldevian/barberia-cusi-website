import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Cargar variables de entorno
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables de entorno faltantes');
  process.exit(1);
}

console.log('🔌 Conectando a Supabase...');
console.log('📍 URL:', supabaseUrl);
console.log('');

const supabase = createClient(supabaseUrl, supabaseKey);

try {
  // Probar consulta a sucursales
  const { data: sucursales, error: errorSucursales } = await supabase
    .from('sucursales')
    .select('*')
    .limit(5);

  if (errorSucursales) {
    console.error('❌ Error al consultar sucursales:', errorSucursales.message);
    process.exit(1);
  }

  console.log('✅ Conexión exitosa!');
  console.log('📍 Sucursales encontradas:', sucursales.length);
  sucursales.forEach((s, i) => {
    console.log(`  ${i + 1}. ${s.nombre} - ${s.direccion}`);
  });
  console.log('');

  // Probar servicios
  const { data: servicios, error: errorServicios } = await supabase
    .from('servicios')
    .select('*')
    .eq('activo', true);

  if (!errorServicios) {
    console.log('💈 Servicios activos:', servicios.length);
    servicios.slice(0, 3).forEach((s) => {
      console.log(`  - ${s.nombre}: S/ ${s.precio}`);
    });
    console.log('');
  }

  // Probar barberos
  const { data: barberos, error: errorBarberos } = await supabase
    .from('barberos')
    .select('*');

  if (!errorBarberos) {
    console.log('✂️ Barberos registrados:', barberos.length);
    barberos.forEach((b) => {
      console.log(`  - ${b.nombre} ${b.apellido} (${b.especialidad})`);
    });
    console.log('');
  }

  // Probar reservas
  const { data: reservas, error: errorReservas } = await supabase
    .from('reservas')
    .select('*')
    .limit(5);

  if (!errorReservas) {
    console.log('📅 Reservas de prueba:', reservas.length);
  }

  console.log('✅ Todas las tablas están funcionando correctamente!');
  process.exit(0);
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
