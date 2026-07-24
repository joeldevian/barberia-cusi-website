-- =============================================
-- BARBERÍA CUSI - DATOS INICIALES
-- =============================================
-- Archivo 2: Inserción de datos de prueba
-- Ejecutar DESPUÉS del archivo 01_create_tables.sql
-- =============================================

-- =============================================
-- 1. SUCURSALES (5 ubicaciones reales)
-- =============================================

INSERT INTO sucursales (nombre, direccion, ciudad, telefono, email, latitud, longitud, es_principal) VALUES
('Sede Principal - Parque Magdalena', 'Jr. Unión 156, Parque Magdalena', 'Ayacucho (Huamanga)', '+51 912 926 255', 'richarcusi80@gmail.com', -13.1586, -74.2239, true),
('Sede Mariscal Cáceres', 'Av. Mariscal Cáceres 798', 'Ayacucho (Huamanga)', '+51 912 926 255', 'richarcusi80@gmail.com', -13.1622, -74.2181, false),
('Sede Manco Cápac', 'Jr. Manco Cápac 443', 'Ayacucho (Huamanga)', '+51 912 926 255', 'richarcusi80@gmail.com', -13.1595, -74.2250, false),
('Sede Los Andes', 'Jr. Los Andes 188', 'Ayacucho (Huamanga)', '+51 912 926 255', 'richarcusi80@gmail.com', -13.1640, -74.2205, false),
('Sede Tres Máscaras', 'Jr. Tres Máscaras 526', 'Ayacucho (Huamanga)', '+51 912 926 255', 'richarcusi80@gmail.com', -13.1575, -74.2220, false);

-- =============================================
-- 2. SERVICIOS (8 servicios con precios)
-- =============================================

INSERT INTO servicios (nombre, descripcion, precio, duracion_minutos, categoria, popular, orden_visualizacion) VALUES
('Corte Clásico', 'Corte de cabello tradicional con técnicas profesionales. Incluye lavado y secado.', 30.00, 40, 'corte', true, 1),
('Fade / Degradado', 'Corte moderno con degradado perfectamente difuminado. Técnicas de fade bajo, medio o alto.', 35.00, 50, 'corte', true, 2),
('Combo Corte + Barba', 'El paquete completo: corte de cabello profesional más diseño y perfilado de barba.', 45.00, 60, 'combo', true, 3),
('Diseño y Perfilado de Barba', 'Diseño profesional de barba con recorte, perfilado y acabado perfecto.', 25.00, 30, 'barba', false, 4),
('Afeitado Tradicional a Navaja', 'Experiencia clásica de barbería con afeitado a navaja, toallas calientes y productos premium.', 30.00, 35, 'barba', false, 5),
('Coloración de Cabello', 'Servicio de coloración profesional con productos de calidad premium.', 60.00, 90, 'tratamiento', false, 6),
('Tratamiento Capilar', 'Tratamiento revitalizante para el cabello con productos especializados.', 50.00, 45, 'tratamiento', false, 7),
('Servicio Premium', 'El paquete completo: corte, barba, afeitado, tratamiento facial y masaje. La experiencia definitiva.', 280.00, 120, 'premium', false, 8);

-- =============================================
-- 3. BARBEROS (4 barberos de ejemplo - REEMPLAZAR CON DATOS REALES)
-- =============================================

-- Obtener ID de la sede principal para asignar barberos
DO $$
DECLARE
    sede_principal_id UUID;
    sede_caceres_id UUID;
    sede_manco_id UUID;
BEGIN
    -- Obtener IDs de sucursales
    SELECT id INTO sede_principal_id FROM sucursales WHERE es_principal = true LIMIT 1;
    SELECT id INTO sede_caceres_id FROM sucursales WHERE nombre LIKE '%Cáceres%' LIMIT 1;
    SELECT id INTO sede_manco_id FROM sucursales WHERE nombre LIKE '%Manco%' LIMIT 1;

    -- Insertar barberos de ejemplo (NOTA: Estos son datos placeholder)
    INSERT INTO barberos (nombre, apellido, especialidad, descripcion, anos_experiencia, sucursal_id, disponible, orden_visualizacion) VALUES
    ('Carlos', 'Mendoza', 'Fade y Degradados Modernos', 'Especialista en cortes modernos y técnicas de fade. Más de 10 años de experiencia.', 10, sede_principal_id, true, 1),
    ('Miguel', 'Quispe', 'Cortes Clásicos y Barba', 'Maestro en técnicas tradicionales y diseño de barba. Atención personalizada.', 8, sede_principal_id, true, 2),
    ('Luis', 'Huamán', 'Afeitado Tradicional', 'Experto en afeitado a navaja y técnicas clásicas de barbería.', 12, sede_caceres_id, true, 3),
    ('Daniel', 'Rojas', 'Diseño y Creatividad', 'Especialista en diseños creativos y estilos urbanos modernos.', 6, sede_manco_id, true, 4);
END $$;

-- =============================================
-- 4. HORARIOS DISPONIBLES (Lunes a Domingo, 9 AM - 8 PM)
-- =============================================

-- Generar horarios para todos los barberos
DO $$
DECLARE
    barbero_record RECORD;
    dia INTEGER;
BEGIN
    -- Para cada barbero
    FOR barbero_record IN SELECT id, sucursal_id FROM barberos LOOP
        -- Para cada día de la semana (0=Domingo, 6=Sábado)
        FOR dia IN 0..6 LOOP
            -- Turno completo: 9 AM a 8 PM
            INSERT INTO horarios_disponibles (barbero_id, sucursal_id, dia_semana, hora_inicio, hora_fin, activo)
            VALUES (barbero_record.id, barbero_record.sucursal_id, dia, '09:00:00', '20:00:00', true);
        END LOOP;
    END LOOP;
END $$;

-- =============================================
-- 5. RESERVAS DE EJEMPLO (10 reservas de prueba)
-- =============================================

DO $$
DECLARE
    barbero_id_1 UUID;
    barbero_id_2 UUID;
    sucursal_id_1 UUID;
    servicio_corte_id UUID;
    servicio_combo_id UUID;
    servicio_barba_id UUID;
BEGIN
    -- Obtener IDs para las reservas de ejemplo
    SELECT id INTO barbero_id_1 FROM barberos ORDER BY orden_visualizacion LIMIT 1;
    SELECT id INTO barbero_id_2 FROM barberos ORDER BY orden_visualizacion OFFSET 1 LIMIT 1;
    SELECT id INTO sucursal_id_1 FROM sucursales WHERE es_principal = true LIMIT 1;
    SELECT id INTO servicio_corte_id FROM servicios WHERE categoria = 'corte' LIMIT 1;
    SELECT id INTO servicio_combo_id FROM servicios WHERE categoria = 'combo' LIMIT 1;
    SELECT id INTO servicio_barba_id FROM servicios WHERE categoria = 'barba' LIMIT 1;

    -- Reservas para hoy y próximos días
    INSERT INTO reservas (cliente_nombre, cliente_telefono, cliente_email, servicio_id, sucursal_id, barbero_id, fecha, hora, duracion_minutos, estado, precio, confirmada_whatsapp) VALUES
    ('Juan Pérez', '+51 987654321', 'juan.perez@email.com', servicio_corte_id, sucursal_id_1, barbero_id_1, CURRENT_DATE, '10:00:00', 40, 'confirmada', 30.00, true),
    ('María González', '+51 987654322', 'maria.gonzalez@email.com', servicio_combo_id, sucursal_id_1, barbero_id_1, CURRENT_DATE, '14:00:00', 60, 'confirmada', 45.00, true),
    ('Pedro Sánchez', '+51 987654323', NULL, servicio_barba_id, sucursal_id_1, barbero_id_2, CURRENT_DATE, '16:30:00', 30, 'pendiente', 25.00, false),
    ('Carlos Ramírez', '+51 987654324', 'carlos.ramirez@email.com', servicio_corte_id, sucursal_id_1, barbero_id_1, CURRENT_DATE + INTERVAL '1 day', '11:00:00', 40, 'confirmada', 30.00, true),
    ('Ana Torres', '+51 987654325', NULL, servicio_combo_id, sucursal_id_1, barbero_id_2, CURRENT_DATE + INTERVAL '1 day', '15:00:00', 60, 'pendiente', 45.00, false),
    ('Luis Mendoza', '+51 987654326', 'luis.mendoza@email.com', servicio_barba_id, sucursal_id_1, barbero_id_1, CURRENT_DATE + INTERVAL '2 days', '10:30:00', 30, 'confirmada', 25.00, true),
    ('Rosa Flores', '+51 987654327', NULL, servicio_corte_id, sucursal_id_1, barbero_id_2, CURRENT_DATE + INTERVAL '2 days', '13:00:00', 40, 'confirmada', 30.00, true),
    ('Jorge Castro', '+51 987654328', 'jorge.castro@email.com', servicio_combo_id, sucursal_id_1, barbero_id_1, CURRENT_DATE + INTERVAL '3 days', '09:30:00', 60, 'pendiente', 45.00, false),
    ('Patricia Vega', '+51 987654329', NULL, servicio_barba_id, sucursal_id_1, barbero_id_2, CURRENT_DATE + INTERVAL '3 days', '17:00:00', 30, 'confirmada', 25.00, true),
    ('Roberto Díaz', '+51 987654330', 'roberto.diaz@email.com', servicio_corte_id, sucursal_id_1, barbero_id_1, CURRENT_DATE + INTERVAL '4 days', '12:00:00', 40, 'pendiente', 30.00, false);
END $$;

-- =============================================
-- 6. BLOQUEOS DE HORARIO (2 ejemplos)
-- =============================================

DO $$
DECLARE
    barbero_id_1 UUID;
    sucursal_id_1 UUID;
BEGIN
    SELECT id INTO barbero_id_1 FROM barberos ORDER BY orden_visualizacion LIMIT 1;
    SELECT id INTO sucursal_id_1 FROM sucursales WHERE es_principal = true LIMIT 1;

    -- Bloqueo para almuerzo
    INSERT INTO bloqueos_horario (barbero_id, sucursal_id, fecha, hora_inicio, hora_fin, razon, tipo, creado_por) VALUES
    (barbero_id_1, sucursal_id_1, CURRENT_DATE + INTERVAL '1 day', '13:00:00', '14:00:00', 'Hora de almuerzo', 'manual', 'admin'),
    (barbero_id_1, sucursal_id_1, CURRENT_DATE + INTERVAL '2 days', '13:00:00', '14:00:00', 'Hora de almuerzo', 'manual', 'admin');
END $$;

-- =============================================
-- 7. USUARIO ADMIN DE PRUEBA
-- =============================================

-- IMPORTANTE: Este es un usuario de PRUEBA
-- Password: "admin123" (CAMBIAR en producción)
-- Hash generado con bcrypt (10 rounds)

INSERT INTO usuarios_admin (nombre, email, password_hash, rol, activo) VALUES
('Administrador', 'admin@barberiacusi.com', '$2a$10$rKvVXZfCQQdqoqWQQ8wGKegqvDRmXvPJ0aBdKQvT.jZKzl6.CYF8m', 'super_admin', true);

-- NOTA: Para generar un nuevo hash de contraseña, usar:
-- bcryptjs.hash('tu_contraseña', 10)

-- =============================================
-- 8. VERIFICACIÓN DE DATOS INSERTADOS
-- =============================================

-- Contar registros insertados
SELECT 
    'Datos insertados exitosamente' as mensaje,
    (SELECT COUNT(*) FROM sucursales) as sucursales,
    (SELECT COUNT(*) FROM servicios) as servicios,
    (SELECT COUNT(*) FROM barberos) as barberos,
    (SELECT COUNT(*) FROM horarios_disponibles) as horarios,
    (SELECT COUNT(*) FROM reservas) as reservas,
    (SELECT COUNT(*) FROM bloqueos_horario) as bloqueos,
    (SELECT COUNT(*) FROM usuarios_admin) as usuarios_admin;

-- Verificar sucursal principal
SELECT 
    'Verificación de sucursal principal:' as tipo,
    nombre,
    direccion,
    es_principal
FROM sucursales 
WHERE es_principal = true;

-- Verificar servicios populares
SELECT 
    'Servicios populares:' as tipo,
    nombre,
    precio,
    categoria
FROM servicios 
WHERE popular = true
ORDER BY orden_visualizacion;

-- Verificar barberos disponibles
SELECT 
    'Barberos disponibles:' as tipo,
    nombre || ' ' || apellido as nombre_completo,
    especialidad,
    disponible
FROM barberos
ORDER BY orden_visualizacion;

-- =============================================
-- FIN DEL SCRIPT DE DATOS
-- =============================================

-- PRÓXIMOS PASOS:
-- 1. Actualizar datos de barberos con información real
-- 2. Cambiar contraseña del usuario admin
-- 3. Agregar más barberos si es necesario
-- 4. Configurar horarios específicos por barbero/sucursal
