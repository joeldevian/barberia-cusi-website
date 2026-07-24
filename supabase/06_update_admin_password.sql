-- Actualizar contraseña del usuario admin
-- Contraseña: admin123
-- Hash generado con bcrypt (10 rounds)

UPDATE usuarios_admin 
SET password_hash = '$2b$10$WdROFL/r7wi.6/OShSyeDeViLoT7HuvI18vXgaHGbZwo2Q7r9x76S',
    actualizado_en = NOW()
WHERE email = 'admin@barberiacusi.com';

-- Verificar que se actualizó correctamente
SELECT id, nombre, email, rol, activo, 
       substring(password_hash, 1, 20) || '...' as password_hash_preview,
       actualizado_en
FROM usuarios_admin 
WHERE email = 'admin@barberiacusi.com';
