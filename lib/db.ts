import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/drizzle/schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está definida en las variables de entorno');
}

// Crear cliente de conexión
const connectionString = process.env.DATABASE_URL;

// Para queries
const queryClient = postgres(connectionString);
export const db = drizzle(queryClient, { schema });

// Helper para cerrar conexión (útil en serverless)
export const closeConnection = async () => {
  await queryClient.end();
};
