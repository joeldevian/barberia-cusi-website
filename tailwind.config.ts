import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // OKLCH color system - Premium Black & Gold Barbershop
        // Primary brand: Deep black matching logo
        brand: {
          50: 'oklch(0.97 0.005 280)',
          100: 'oklch(0.94 0.008 280)',
          200: 'oklch(0.88 0.010 280)',
          300: 'oklch(0.75 0.012 280)',
          400: 'oklch(0.60 0.015 280)',
          500: 'oklch(0.45 0.018 280)',
          600: 'oklch(0.35 0.020 280)',
          700: 'oklch(0.25 0.022 280)',
          800: 'oklch(0.18 0.024 280)',
          900: 'oklch(0.12 0.026 280)',
          950: 'oklch(0.08 0.028 280)',
        },
        // Accent: Premium Gold matching logo (rich golden yellow)
        accent: {
          50: 'oklch(0.98 0.015 95)',   // Very light gold
          100: 'oklch(0.95 0.035 95)',  // Light gold
          200: 'oklch(0.90 0.065 95)',  // Soft gold
          300: 'oklch(0.85 0.095 95)',  // Medium gold
          400: 'oklch(0.80 0.125 95)',  // Rich gold
          500: 'oklch(0.75 0.145 95)',  // True gold (main)
          600: 'oklch(0.68 0.140 90)',  // Deep gold
          700: 'oklch(0.60 0.130 85)',  // Dark gold
          800: 'oklch(0.50 0.115 80)',  // Very dark gold
          900: 'oklch(0.40 0.095 75)',  // Almost bronze
        },
        // Neutral grays with warm tint
        neutral: {
          50: 'oklch(0.98 0.003 280)',
          100: 'oklch(0.95 0.005 280)',
          200: 'oklch(0.90 0.007 280)',
          300: 'oklch(0.80 0.009 280)',
          400: 'oklch(0.65 0.011 280)',
          500: 'oklch(0.50 0.013 280)',
          600: 'oklch(0.40 0.015 280)',
          700: 'oklch(0.30 0.017 280)',
          800: 'oklch(0.20 0.019 280)',
          900: 'oklch(0.15 0.021 280)',
          950: 'oklch(0.10 0.023 280)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': 'clamp(3rem, 8vw, 5rem)',
        'display-md': 'clamp(2.5rem, 6vw, 4rem)',
        'display-sm': 'clamp(2rem, 5vw, 3rem)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
