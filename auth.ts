import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getUser(email: string) {
  try {
    console.log('[AUTH] Buscando usuario con email:', email);
    const { data: users, error } = await supabase
      .from('usuarios_admin')
      .select('*')
      .eq('email', email)
      .limit(1);
    
    console.log('[AUTH] Resultado de la consulta - Error:', error);
    console.log('[AUTH] Resultado de la consulta - Users:', users);
    
    if (error) {
      console.log('[AUTH] Error en Supabase:', error);
      throw error;
    }
    
    const user = users?.[0] || null;
    console.log('[AUTH] Usuario final:', user ? 'Encontrado' : 'No encontrado');
    return user;
  } catch (error) {
    console.error('[AUTH] Error al buscar usuario:', error);
    throw new Error('Error al buscar usuario');
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ 
            email: z.string().email(), 
            password: z.string().min(6) 
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          console.log('[AUTH] Intentando login con email:', email);
          
          const user = await getUser(email);
          console.log('[AUTH] Usuario encontrado:', user ? 'SÍ' : 'NO');
          
          if (!user) {
            console.log('[AUTH] Usuario no encontrado');
            return null;
          }
          
          if (!user.activo) {
            console.log('[AUTH] Usuario inactivo');
            return null;
          }

          console.log('[AUTH] Hash almacenado:', user.password_hash?.substring(0, 20) + '...');
          const passwordsMatch = await bcrypt.compare(password, user.password_hash);
          console.log('[AUTH] Contraseñas coinciden:', passwordsMatch);

          if (passwordsMatch) {
            // Actualizar último acceso
            await supabase
              .from('usuarios_admin')
              .update({ ultimo_acceso: new Date().toISOString() })
              .eq('id', user.id);

            console.log('[AUTH] Login exitoso');
            return {
              id: user.id,
              email: user.email,
              name: user.nombre,
              role: user.rol || undefined,
            };
          }
        }

        console.log('[AUTH] Credenciales inválidas');
        return null;
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
