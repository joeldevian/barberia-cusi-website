-- =============================================
-- BARBERÍA CUSI - SCHEMA DE BASE DE DATOS
-- =============================================
-- Archivo 1: Creación de tablas
-- Ejecutar este archivo PRIMERO en Supabase SQL Editor
-- =============================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLA: sucursales
-- =============================================
CREATE TABLE IF NOT EXISTS sucursales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(200) NOT NULL,
    direccion VARCHAR(300) NOT NULL,
    ciudad VARCHAR(100) NOT NULL DEFAULT 'Ayacucho (Huamanga)',
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    horario_apertura TIME NOT NULL DEFAULT '09:00:00',
    horario_cierre TIME NOT NULL DEFAULT '20:00:00',
    dias_atencion VARCHAR(50) DEFAULT 'Lunes a Domingo',
    latitud DECIMAL(10, 8),
    longitud DECIMAL(11, 8),
    es_principal BOOLEAN DEFAULT FALSE,
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para sucursales
CREATE INDEX idx_sucursales_activo ON sucursales(activo);
CREATE INDEX idx_sucursales_principal ON sucursales(es_principal);

-- =============================================
-- TABLA: barberos
-- =============================================
CREATE TABLE IF NOT EXISTS barberos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    especialidad VARCHAR(200) NOT NULL,
    descripcion TEXT,
    foto_url VARCHAR(500),
    anos_experiencia INTEGER DEFAULT 0,
    telefono VARCHAR(20),
    email VARCHAR(100),
    sucursal_id UUID REFERENCES sucursales(id) ON DELETE SET NULL,
    disponible BOOLEAN DEFAULT TRUE,
    orden_visualizacion INTEGER DEFAULT 0,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para barberos
CREATE INDEX idx_barberos_sucursal ON barberos(sucursal_id);
CREATE INDEX idx_barberos_disponible ON barberos(disponible);
CREATE INDEX idx_barberos_orden ON barberos(orden_visualizacion);

-- =============================================
-- TABLA: servicios
-- =============================================
CREATE TABLE IF NOT EXISTS servicios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    duracion_minutos INTEGER NOT NULL DEFAULT 30,
    categoria VARCHAR(50) NOT NULL CHECK (categoria IN ('corte', 'barba', 'combo', 'tratamiento', 'premium')),
    popular BOOLEAN DEFAULT FALSE,
    imagen_url VARCHAR(500),
    activo BOOLEAN DEFAULT TRUE,
    orden_visualizacion INTEGER DEFAULT 0,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para servicios
CREATE INDEX idx_servicios_categoria ON servicios(categoria);
CREATE INDEX idx_servicios_activo ON servicios(activo);
CREATE INDEX idx_servicios_popular ON servicios(popular);
CREATE INDEX idx_servicios_orden ON servicios(orden_visualizacion);

-- =============================================
-- TABLA: horarios_disponibles
-- =============================================
CREATE TABLE IF NOT EXISTS horarios_disponibles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    barbero_id UUID REFERENCES barberos(id) ON DELETE CASCADE,
    sucursal_id UUID REFERENCES sucursales(id) ON DELETE CASCADE,
    dia_semana INTEGER NOT NULL CHECK (dia_semana BETWEEN 0 AND 6), -- 0=Domingo, 6=Sábado
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para horarios_disponibles
CREATE INDEX idx_horarios_barbero ON horarios_disponibles(barbero_id);
CREATE INDEX idx_horarios_sucursal ON horarios_disponibles(sucursal_id);
CREATE INDEX idx_horarios_dia ON horarios_disponibles(dia_semana);

-- =============================================
-- TABLA: reservas
-- =============================================
CREATE TABLE IF NOT EXISTS reservas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cliente_nombre VARCHAR(150) NOT NULL,
    cliente_telefono VARCHAR(20) NOT NULL,
    cliente_email VARCHAR(100),
    servicio_id UUID REFERENCES servicios(id) ON DELETE SET NULL,
    sucursal_id UUID REFERENCES sucursales(id) ON DELETE SET NULL,
    barbero_id UUID REFERENCES barberos(id) ON DELETE SET NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    duracion_minutos INTEGER NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmada', 'completada', 'cancelada', 'no_asistio')),
    notas TEXT,
    precio DECIMAL(10, 2),
    confirmada_whatsapp BOOLEAN DEFAULT FALSE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    cancelado_en TIMESTAMP WITH TIME ZONE,
    razon_cancelacion TEXT
);

-- Índices para reservas
CREATE INDEX idx_reservas_fecha ON reservas(fecha);
CREATE INDEX idx_reservas_estado ON reservas(estado);
CREATE INDEX idx_reservas_sucursal ON reservas(sucursal_id);
CREATE INDEX idx_reservas_barbero ON reservas(barbero_id);
CREATE INDEX idx_reservas_cliente_telefono ON reservas(cliente_telefono);
CREATE INDEX idx_reservas_fecha_hora ON reservas(fecha, hora);

-- =============================================
-- TABLA: bloqueos_horario
-- =============================================
CREATE TABLE IF NOT EXISTS bloqueos_horario (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    barbero_id UUID REFERENCES barberos(id) ON DELETE CASCADE,
    sucursal_id UUID REFERENCES sucursales(id) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    razon VARCHAR(200),
    tipo VARCHAR(50) DEFAULT 'manual' CHECK (tipo IN ('manual', 'feriado', 'vacaciones', 'enfermedad', 'otro')),
    creado_por VARCHAR(100), -- Usuario admin que creó el bloqueo
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para bloqueos_horario
CREATE INDEX idx_bloqueos_barbero ON bloqueos_horario(barbero_id);
CREATE INDEX idx_bloqueos_sucursal ON bloqueos_horario(sucursal_id);
CREATE INDEX idx_bloqueos_fecha ON bloqueos_horario(fecha);

-- =============================================
-- TABLA: usuarios_admin (para NextAuth)
-- =============================================
CREATE TABLE IF NOT EXISTS usuarios_admin (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'admin' CHECK (rol IN ('super_admin', 'admin', 'staff')),
    activo BOOLEAN DEFAULT TRUE,
    ultimo_acceso TIMESTAMP WITH TIME ZONE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice para usuarios_admin
CREATE INDEX idx_usuarios_email ON usuarios_admin(email);
CREATE INDEX idx_usuarios_activo ON usuarios_admin(activo);

-- =============================================
-- FUNCIONES Y TRIGGERS
-- =============================================

-- Función para actualizar timestamp de actualizado_en
CREATE OR REPLACE FUNCTION actualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.actualizado_en = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar_timestamp
CREATE TRIGGER trigger_sucursales_actualizado
    BEFORE UPDATE ON sucursales
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER trigger_barberos_actualizado
    BEFORE UPDATE ON barberos
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER trigger_servicios_actualizado
    BEFORE UPDATE ON servicios
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER trigger_reservas_actualizado
    BEFORE UPDATE ON reservas
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER trigger_usuarios_actualizado
    BEFORE UPDATE ON usuarios_admin
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_timestamp();

-- =============================================
-- POLÍTICAS DE ROW LEVEL SECURITY (RLS)
-- =============================================

-- Habilitar RLS en tablas sensibles
ALTER TABLE usuarios_admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;

-- Política: Usuarios admin solo pueden ver sus propios datos
CREATE POLICY "Usuarios pueden ver su propia info"
    ON usuarios_admin
    FOR SELECT
    USING (auth.uid()::text = id::text);

-- Política: Las reservas son visibles para todos los admin autenticados
CREATE POLICY "Admin puede ver todas las reservas"
    ON reservas
    FOR SELECT
    TO authenticated
    USING (true);

-- Política: Solo admin puede crear/modificar reservas
CREATE POLICY "Admin puede crear reservas"
    ON reservas
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Admin puede actualizar reservas"
    ON reservas
    FOR UPDATE
    TO authenticated
    USING (true);

-- =============================================
-- COMENTARIOS EN TABLAS
-- =============================================

COMMENT ON TABLE sucursales IS 'Almacena las 5 sucursales de Barbería Cusi';
COMMENT ON TABLE barberos IS 'Información de los barberos profesionales';
COMMENT ON TABLE servicios IS 'Catálogo de servicios ofrecidos';
COMMENT ON TABLE horarios_disponibles IS 'Horarios de trabajo de cada barbero por sucursal';
COMMENT ON TABLE reservas IS 'Reservas de clientes (online y WhatsApp)';
COMMENT ON TABLE bloqueos_horario IS 'Horarios bloqueados manualmente por el admin';
COMMENT ON TABLE usuarios_admin IS 'Usuarios con acceso al panel de administración';

-- =============================================
-- FIN DEL SCRIPT
-- =============================================

-- Verificar que todo se creó correctamente
SELECT 
    'Tablas creadas exitosamente' as mensaje,
    COUNT(*) as total_tablas
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE';
