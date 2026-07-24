// Script para generar hash bcrypt de la contraseña admin
const bcrypt = require('bcryptjs');

const password = 'admin123';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error al generar hash:', err);
    return;
  }
  
  console.log('\n=== HASH GENERADO ===');
  console.log('Contraseña:', password);
  console.log('Hash:', hash);
  console.log('\nSQL para actualizar en Supabase:');
  console.log(`UPDATE usuarios_admin SET password_hash = '${hash}' WHERE email = 'admin@barberiacusi.com';`);
  console.log('=====================\n');
});
