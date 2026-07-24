#!/usr/bin/env node

/**
 * Script de verificación pre-push
 * Verifica que no se suban archivos sensibles al repositorio
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando seguridad antes de push...\n');

let errorsFound = false;

// Archivos que NO deben existir o NO deben estar trackeados
const sensitiveFiles = [
  '.env',
  '.env.local',
  '.env.production',
  '.env.development.local',
];

// Verificar que archivos sensibles no existan o estén ignorados
console.log('📁 Verificando archivos sensibles...');
sensitiveFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`⚠️  WARNING: Archivo sensible encontrado: ${file}`);
    console.log(`   → Asegúrate de que está en .gitignore`);
  }
});

// Verificar que .gitignore existe
console.log('\n📄 Verificando .gitignore...');
if (!fs.existsSync('.gitignore')) {
  console.log('❌ ERROR: .gitignore no encontrado');
  errorsFound = true;
} else {
  console.log('✅ .gitignore existe');
  
  const gitignoreContent = fs.readFileSync('.gitignore', 'utf8');
  
  // Verificar que .env está en gitignore
  if (!gitignoreContent.includes('.env')) {
    console.log('❌ ERROR: .env no está en .gitignore');
    errorsFound = true;
  } else {
    console.log('✅ .env está en .gitignore');
  }
  
  // Verificar que node_modules está en gitignore
  if (!gitignoreContent.includes('node_modules')) {
    console.log('❌ ERROR: node_modules no está en .gitignore');
    errorsFound = true;
  } else {
    console.log('✅ node_modules está en .gitignore');
  }
}

// Verificar que .env.example existe
console.log('\n📄 Verificando .env.example...');
if (!fs.existsSync('.env.example')) {
  console.log('⚠️  WARNING: .env.example no encontrado');
  console.log('   → Se recomienda tener un template de variables de entorno');
} else {
  console.log('✅ .env.example existe');
  
  const envExample = fs.readFileSync('.env.example', 'utf8');
  
  // Verificar que no tiene credenciales reales
  const suspiciousPatterns = [
    /supabase\.co\/rest\/v1\//,
    /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\./,
    /sk_live_/,
    /pk_live_/,
  ];
  
  let hasRealCredentials = false;
  suspiciousPatterns.forEach(pattern => {
    if (pattern.test(envExample)) {
      hasRealCredentials = true;
    }
  });
  
  if (hasRealCredentials) {
    console.log('⚠️  WARNING: .env.example puede contener credenciales reales');
    console.log('   → Usa placeholders como "tu-proyecto.supabase.co"');
  } else {
    console.log('✅ .env.example no contiene credenciales reales');
  }
}

// Verificar documentación
console.log('\n📚 Verificando documentación...');
const requiredDocs = ['README.md', 'LICENSE'];
requiredDocs.forEach(doc => {
  if (!fs.existsSync(doc)) {
    console.log(`⚠️  WARNING: ${doc} no encontrado`);
  } else {
    console.log(`✅ ${doc} existe`);
  }
});

// Verificar que node_modules no exista (debe estar en .gitignore)
console.log('\n📦 Verificando node_modules...');
if (fs.existsSync('node_modules')) {
  console.log('✅ node_modules existe (debe estar en .gitignore)');
} else {
  console.log('ℹ️  node_modules no encontrado (ejecuta npm install)');
}

// Resumen final
console.log('\n' + '='.repeat(50));
if (errorsFound) {
  console.log('❌ Se encontraron errores críticos');
  console.log('   → Corrígelos antes de hacer push');
  process.exit(1);
} else {
  console.log('✅ ¡Todo listo para subir a GitHub!');
  console.log('\n📝 Próximos pasos:');
  console.log('   1. git add .');
  console.log('   2. git commit -m "feat: initial commit"');
  console.log('   3. git push origin main');
  process.exit(0);
}
