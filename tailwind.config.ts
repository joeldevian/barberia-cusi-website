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
        // OKLCH color system - Modern urban barbershop
        // Primary brand: Deep charcoal with subtle warmth
        brand: {
          50: 'oklch(0.97 0.005 280)',
          100: 'oklch(0.92 0.008 280)',
          200: 'oklch(0.82 0.012 280)',
          300: 'oklch(0.72 0.015 280)',
          400: 'oklch(0.62 0.018 280)',
          500: 'oklch(0.52 0.020 280)',
          600: 'oklch(0.42 0.022 280)',
          700: 'oklch(0.32 0.024 280)',
          800: 'oklch(0.22 0.026 280)',
          900: 'oklch(0.15 0.028 280)',
          950: 'oklch(0.10 0.030 280)',
        },
        // Accent: Amber/copper for energy and warmth
        accent: {
          50: 'oklch(0.97 0.020 70)',
          100: 'oklch(0.92 0.040 70)',
          200: 'oklch(0.85 0.080 70)',
          300: 'oklch(0.78 0.120 70)',
          400: 'oklch(0.72 0.150 70)',
          500: 'oklch(0.65 0.180 70)',
          600: 'oklch(0.58 0.170 70)',
          700: 'oklch(0.50 0.150 70)',
          800: 'oklch(0.42 0.130 70)',
          900: 'oklch(0.35 0.110 70)',
        },
        // Neutral grays with brand hue tint
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
