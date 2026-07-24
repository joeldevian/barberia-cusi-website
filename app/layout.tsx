import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimationProvider from "@/components/AnimationProvider";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { GA_TRACKING_ID } from "@/lib/analytics";

export const metadata: Metadata = {
  metadataBase: new URL('https://barberiacusi.com'),
  title: {
    default: "Barbería Cusi - Barbería Premium en Ayacucho",
    template: "%s | Barbería Cusi"
  },
  description: "La barbería familiar que define el estilo masculino en Ayacucho desde hace décadas. Cortes, diseño de barba, afeitados y más. 5 sucursales en Ayacucho.",
  keywords: ["barbería Ayacucho", "barbería Huamanga", "corte de cabello Ayacucho", "barbería premium", "diseño de barba", "afeitado tradicional", "barbería cerca de mí"],
  authors: [{ name: "Barbería Cusi" }],
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://barberiacusi.com",
    siteName: "Barbería Cusi",
    title: "Barbería Cusi - Barbería Premium en Ayacucho",
    description: "La barbería familiar que define el estilo masculino en Ayacucho desde hace décadas.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Barbería Cusi - Ayacucho"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Barbería Cusi - Barbería Premium en Ayacucho",
    description: "La barbería familiar que define el estilo masculino en Ayacucho desde hace décadas.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // To be replaced with actual code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-PE">
      <body>
        {GA_TRACKING_ID && <GoogleAnalytics gaId={GA_TRACKING_ID} />}
        <AnimationProvider />
        <TopBar />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <a
          href="#top"
          className="no-print fixed bottom-6 right-6 bg-accent-600 text-white p-3 rounded-full shadow-lg hover:bg-accent-700 transition-all duration-300 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 z-50"
          aria-label="Volver arriba"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </a>
      </body>
    </html>
  );
}
