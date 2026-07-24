import { pgTable, uuid, varchar, text, decimal, integer, boolean, timestamp, time, date, check } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// =============================================
// TABLA: sucursales
// =============================================
export const sucursales = pgTable('sucursales', {
  id: uuid('id').primaryKey().defaultRandom(),
  nombre: varchar('nombre', { length: 200 }).notNull(),
  direccion: varchar('direccion', { length: 300 }).notNull(),
  ciudad: varchar('ciudad', { length: 100 }).notNull().default('Ayacucho (Huamanga)'),
  telefono: varchar('telefono', { length: 20 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  horarioApertura: time('horario_apertura').notNull().default('09:00:00'),
  horarioCierre: time('horario_cierre').notNull().default('20:00:00'),
  diasAtencion: varchar('dias_atencion', { length: 50 }).default('Lunes a Domingo'),
  latitud: decimal('latitud', { precision: 10, scale: 8 }),
  longitud: decimal('longitud', { precision: 11, scale: 8 }),
  esPrincipal: boolean('es_principal').default(false),
  activo: boolean('activo').default(true),
  creadoEn: timestamp('creado_en', { withTimezone: true }).defaultNow(),
  actualizadoEn: timestamp('actualizado_en', { withTimezone: true }).defaultNow(),
});

// =============================================
// TABLA: barberos
// =============================================
export const barberos = pgTable('barberos', {
  id: uuid('id').primaryKey().defaultRandom(),
  nombre: varchar('nombre', { length: 100 }).notNull(),
  apellido: varchar('apellido', { length: 100 }).notNull(),
  especialidad: varchar('especialidad', { length: 200 }).notNull(),
  descripcion: text('descripcion'),
  fotoUrl: varchar('foto_url', { length: 500 }),
  anosExperiencia: integer('anos_experiencia').default(0),
  telefono: varchar('telefono', { length: 20 }),
  email: varchar('email', { length: 100 }),
  sucursalId: uuid('sucursal_id').references(() => sucursales.id, { onDelete: 'set null' }),
  disponible: boolean('disponible').default(true),
  ordenVisualizacion: integer('orden_visualizacion').default(0),
  creadoEn: timestamp('creado_en', { withTimezone: true }).defaultNow(),
  actualizadoEn: timestamp('actualizado_en', { withTimezone: true }).defaultNow(),
});

// =============================================
// TABLA: servicios
// =============================================
export const servicios = pgTable('servicios', {
  id: uuid('id').primaryKey().defaultRandom(),
  nombre: varchar('nombre', { length: 150 }).notNull(),
  descripcion: text('descripcion').notNull(),
  precio: decimal('precio', { precision: 10, scale: 2 }).notNull(),
  duracionMinutos: integer('duracion_minutos').notNull().default(30),
  categoria: varchar('categoria', { length: 50 }).notNull(),
  popular: boolean('popular').default(false),
  imagenUrl: varchar('imagen_url', { length: 500 }),
  activo: boolean('activo').default(true),
  ordenVisualizacion: integer('orden_visualizacion').default(0),
  creadoEn: timestamp('creado_en', { withTimezone: true }).defaultNow(),
  actualizadoEn: timestamp('actualizado_en', { withTimezone: true }).defaultNow(),
});

// =============================================
// TABLA: horarios_disponibles
// =============================================
export const horariosDisponibles = pgTable('horarios_disponibles', {
  id: uuid('id').primaryKey().defaultRandom(),
  barberoId: uuid('barbero_id').references(() => barberos.id, { onDelete: 'cascade' }),
  sucursalId: uuid('sucursal_id').references(() => sucursales.id, { onDelete: 'cascade' }),
  diaSemana: integer('dia_semana').notNull(), // 0=Domingo, 6=Sábado
  horaInicio: time('hora_inicio').notNull(),
  horaFin: time('hora_fin').notNull(),
  activo: boolean('activo').default(true),
  creadoEn: timestamp('creado_en', { withTimezone: true }).defaultNow(),
});

// =============================================
// TABLA: reservas
// =============================================
export const reservas = pgTable('reservas', {
  id: uuid('id').primaryKey().defaultRandom(),
  clienteNombre: varchar('cliente_nombre', { length: 150 }).notNull(),
  clienteTelefono: varchar('cliente_telefono', { length: 20 }).notNull(),
  clienteEmail: varchar('cliente_email', { length: 100 }),
  servicioId: uuid('servicio_id').references(() => servicios.id, { onDelete: 'set null' }),
  sucursalId: uuid('sucursal_id').references(() => sucursales.id, { onDelete: 'set null' }),
  barberoId: uuid('barbero_id').references(() => barberos.id, { onDelete: 'set null' }),
  fecha: date('fecha').notNull(),
  hora: time('hora').notNull(),
  duracionMinutos: integer('duracion_minutos').notNull(),
  estado: varchar('estado', { length: 20 }).notNull().default('pendiente'),
  notas: text('notas'),
  precio: decimal('precio', { precision: 10, scale: 2 }),
  confirmadaWhatsapp: boolean('confirmada_whatsapp').default(false),
  creadoEn: timestamp('creado_en', { withTimezone: true }).defaultNow(),
  actualizadoEn: timestamp('actualizado_en', { withTimezone: true }).defaultNow(),
  canceladoEn: timestamp('cancelado_en', { withTimezone: true }),
  razonCancelacion: text('razon_cancelacion'),
});

// =============================================
// TABLA: bloqueos_horario
// =============================================
export const bloqueosHorario = pgTable('bloqueos_horario', {
  id: uuid('id').primaryKey().defaultRandom(),
  barberoId: uuid('barbero_id').references(() => barberos.id, { onDelete: 'cascade' }),
  sucursalId: uuid('sucursal_id').references(() => sucursales.id, { onDelete: 'cascade' }),
  fecha: date('fecha').notNull(),
  horaInicio: time('hora_inicio').notNull(),
  horaFin: time('hora_fin').notNull(),
  razon: varchar('razon', { length: 200 }),
  tipo: varchar('tipo', { length: 50 }).default('manual'),
  creadoPor: varchar('creado_por', { length: 100 }),
  creadoEn: timestamp('creado_en', { withTimezone: true }).defaultNow(),
});

// =============================================
// TABLA: usuarios_admin
// =============================================
export const usuariosAdmin = pgTable('usuarios_admin', {
  id: uuid('id').primaryKey().defaultRandom(),
  nombre: varchar('nombre', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  rol: varchar('rol', { length: 20 }).default('admin'),
  activo: boolean('activo').default(true),
  ultimoAcceso: timestamp('ultimo_acceso', { withTimezone: true }),
  creadoEn: timestamp('creado_en', { withTimezone: true }).defaultNow(),
  actualizadoEn: timestamp('actualizado_en', { withTimezone: true }).defaultNow(),
});

// =============================================
// RELACIONES
// =============================================

export const sucursalesRelations = relations(sucursales, ({ many }) => ({
  barberos: many(barberos),
  reservas: many(reservas),
  horariosDisponibles: many(horariosDisponibles),
  bloqueosHorario: many(bloqueosHorario),
}));

export const barberosRelations = relations(barberos, ({ one, many }) => ({
  sucursal: one(sucursales, {
    fields: [barberos.sucursalId],
    references: [sucursales.id],
  }),
  reservas: many(reservas),
  horariosDisponibles: many(horariosDisponibles),
  bloqueosHorario: many(bloqueosHorario),
}));

export const serviciosRelations = relations(servicios, ({ many }) => ({
  reservas: many(reservas),
}));

export const reservasRelations = relations(reservas, ({ one }) => ({
  servicio: one(servicios, {
    fields: [reservas.servicioId],
    references: [servicios.id],
  }),
  sucursal: one(sucursales, {
    fields: [reservas.sucursalId],
    references: [sucursales.id],
  }),
  barbero: one(barberos, {
    fields: [reservas.barberoId],
    references: [barberos.id],
  }),
}));

// =============================================
// TIPOS TYPESCRIPT EXPORTADOS
// =============================================

export type Sucursal = typeof sucursales.$inferSelect;
export type NuevaSucursal = typeof sucursales.$inferInsert;

export type Barbero = typeof barberos.$inferSelect;
export type NuevoBarbero = typeof barberos.$inferInsert;

export type Servicio = typeof servicios.$inferSelect;
export type NuevoServicio = typeof servicios.$inferInsert;

export type HorarioDisponible = typeof horariosDisponibles.$inferSelect;
export type NuevoHorarioDisponible = typeof horariosDisponibles.$inferInsert;

export type Reserva = typeof reservas.$inferSelect;
export type NuevaReserva = typeof reservas.$inferInsert;

export type BloqueoHorario = typeof bloqueosHorario.$inferSelect;
export type NuevoBloqueoHorario = typeof bloqueosHorario.$inferInsert;

export type UsuarioAdmin = typeof usuariosAdmin.$inferSelect;
export type NuevoUsuarioAdmin = typeof usuariosAdmin.$inferInsert;
