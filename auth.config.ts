import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminPanel = nextUrl.pathname.startsWith('/admin');
      const isOnLoginPage = nextUrl.pathname.startsWith('/admin/login');

      if (isOnAdminPanel) {
        if (isOnLoginPage) {
          if (isLoggedIn) return Response.redirect(new URL('/admin/dashboard', nextUrl));
          return true; // Permitir acceso a login page si no está logueado
        }
        if (isLoggedIn) return true; // Permitir acceso al panel si está logueado
        return false; // Redirigir a login si intenta acceder al panel sin estar logueado
      } else if (isLoggedIn && isOnLoginPage) {
        return Response.redirect(new URL('/admin/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Agregado en auth.ts
} satisfies NextAuthConfig;
