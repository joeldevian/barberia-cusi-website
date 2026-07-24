import { config } from 'dotenv';
import postgres from 'postgres';

// Cargar variables de entorno
config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL no está definida en .env.local');
  process.exit(1);
}

console.log('🔌 Intentando conectar a la base de datos...\n');

try {
  const sql = postgres(connectionString);
  
  // Probar consulta simple
  const result = await sql`SELECT current_database(), current_user, version()`;
  
  console.log('✅ Conexión exitosa!');
  console.log('📊 Database:', result[0].current_database);
  console.log('👤 Usuario:', result[0].current_user);
  console.log('🔢 Versión PostgreSQL:', result[0].version.split(' ')[0] + ' ' + result[0].version.split(' ')[1]);
  console.log('');
  
  // Verificar tablas creadas
  const tablas = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `;
  
  console.log('📋 Tablas encontradas:', tablas.length);
  tablas.forEach(tabla => console.log('  -', tabla.table_name));
  console.log('');
  
  // Contar registros
  const conteos = await Promise.all([
    sql`SELECT COUNT(*) as count FROM sucursales`,
    sql`SELECT COUNT(*) as count FROM servicios`,
    sql`SELECT COUNT(*) as count FROM barberos`,
    sql`SELECT COUNT(*) as count FROM reservas`,
  ]);
  
  console.log('📊 Registros en tablas:');
  console.log('  - Sucursales:', conteos[0][0].count);
  console.log('  - Servicios:', conteos[1][0].count);
  console.log('  - Barberos:', conteos[2][0].count);
  console.log('  - Reservas:', conteos[3][0].count);
  
  await sql.end();
  
  console.log('\n✅ Todo está funcionando correctamente!');
  process.exit(0);
} catch (error) {
  console.error('❌ Error al conectar:', error.message);
  process.exit(1);
}
