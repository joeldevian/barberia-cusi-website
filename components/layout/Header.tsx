'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/historia', label: 'Historia' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/barberos', label: 'Barberos' },
  { href: '/sucursales', label: 'Sucursales' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo y Tagline */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14">
              <Image
                src="/images/brand/Logo.jpg"
                alt="Logo Barbería Cusi"
                fill
                sizes="(max-width: 640px) 48px, 56px"
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-xl text-brand-900 tracking-tight group-hover:text-accent-600 transition-colors">
                Barbería Cusi
              </div>
              <div className="text-xs text-neutral-600 tracking-wide">
                Estilo ayacuchano desde hace décadas
              </div>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 font-semibold rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'text-brand-900 bg-neutral-100'
                    : 'text-neutral-700 hover:text-brand-900 hover:bg-neutral-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button Desktop */}
          <Link
            href="/reservas"
            className="hidden lg:inline-flex btn btn-accent"
          >
            Reserva tu Cita
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-brand-900 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav
            className="lg:hidden py-6 border-t border-neutral-200 bg-gradient-to-b from-white to-neutral-50"
            aria-label="Navegación móvil"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    group px-5 py-4 font-semibold text-base rounded-xl transition-all duration-200
                    ${
                      isActive(item.href)
                        ? 'bg-accent-50 text-accent-700 shadow-md border-l-4 border-accent-600'
                        : 'bg-white text-neutral-800 hover:bg-accent-50 hover:text-accent-600 shadow-sm hover:shadow-md'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                        isActive(item.href) ? 'text-accent-600' : 'text-accent-500'
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
              <div className="mt-4 px-1">
                <Link
                  href="/reservas"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-6 py-4 font-bold text-base text-center bg-accent-600 text-white rounded-xl shadow-lg hover:bg-accent-700 hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                >
                  Reserva tu Cita
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
