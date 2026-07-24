-- Verificar si el usuario admin existe
SELECT id, nombre, email, rol, activo, created_at 
FROM usuarios_admin 
WHERE email = 'admin@barberiacusi.com';

-- Verificar políticas RLS en usuarios_admin
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'usuarios_admin';

-- Ver todas las políticas de usuarios_admin
SELECT * FROM pg_policies WHERE tablename = 'usuarios_admin';
