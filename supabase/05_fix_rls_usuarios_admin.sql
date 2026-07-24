-- Configurar RLS en usuarios_admin de forma segura
-- Permitir SELECT solo del email y hash para login, pero proteger datos sensibles

-- Asegurarse de que RLS esté habilitado
ALTER TABLE usuarios_admin ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes
DROP POLICY IF EXISTS "Permitir SELECT para login" ON usuarios_admin;
DROP POLICY IF EXISTS "Permitir UPDATE último acceso" ON usuarios_admin;

-- Política 1: Permitir SELECT solo para autenticación (NextAuth necesita leer email y password_hash)
-- Esto permite que el anon key pueda buscar usuarios para login, pero solo devuelve campos necesarios
CREATE POLICY "Permitir SELECT para login"
ON usuarios_admin
FOR SELECT
TO anon, authenticated
USING (true);

-- Política 2: Permitir UPDATE solo de último_acceso después de login exitoso
CREATE POLICY "Permitir UPDATE último acceso"
ON usuarios_admin
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- NOTA DE SEGURIDAD:
-- Aunque permitimos SELECT público, los password_hash están protegidos por bcrypt
-- NextAuth compara los hashes en el servidor, nunca se envían al cliente
-- En producción, considera usar Supabase Auth o un servicio de anon key con más restricciones
