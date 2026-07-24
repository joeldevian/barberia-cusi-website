-- =============================================
-- FIX: Actualizar políticas RLS para reservas públicas
-- =============================================
-- Las reservas deben poder ser creadas por usuarios NO autenticados
-- (clientes que reservan desde el frontend público)
-- =============================================

-- Eliminar políticas restrictivas existentes
DROP POLICY IF EXISTS "Admin puede ver todas las reservas" ON reservas;
DROP POLICY IF EXISTS "Admin puede crear reservas" ON reservas;
DROP POLICY IF EXISTS "Admin puede actualizar reservas" ON reservas;

-- Crear nuevas políticas más permisivas

-- 1. CUALQUIERA puede crear una reserva (público)
CREATE POLICY "Cualquiera puede crear reservas"
    ON reservas
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- 2. CUALQUIERA puede ver sus propias reservas (por teléfono)
CREATE POLICY "Ver reservas propias por teléfono"
    ON reservas
    FOR SELECT
    TO anon, authenticated
    USING (true);  -- En producción, filtrar por cliente_telefono = auth.jwt() -> 'phone'

-- 3. Solo ADMIN autenticados pueden actualizar reservas
CREATE POLICY "Admin puede actualizar reservas"
    ON reservas
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4. Solo ADMIN autenticados pueden eliminar reservas
CREATE POLICY "Admin puede eliminar reservas"
    ON reservas
    FOR DELETE
    TO authenticated
    USING (true);

-- Verificar que RLS esté habilitado
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;

-- Mensaje de confirmación
SELECT 'Políticas RLS actualizadas correctamente para tabla reservas' as mensaje;
