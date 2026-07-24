import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import HistoriaTeaser from '@/components/home/HistoriaTeaser';
import ServiciosPreview from '@/components/home/ServiciosPreview';
import BarberosPreview from '@/components/home/BarberosPreview';
import GaleriaPreview from '@/components/home/GaleriaPreview';
import SucursalesPreview from '@/components/home/SucursalesPreview';
import { generarOrganizationSchema } from '@/lib/schema-jsonld';

export const metadata: Metadata = {
  title: 'Barbería Cusi - Barbería Premium en Ayacucho',
  description: 'La barbería familiar que define el estilo masculino en Ayacucho desde hace décadas. Cortes, diseño de barba, afeitados y más. 5 sucursales en Ayacucho.',
};

export default function HomePage() {
  const organizationSchema = generarOrganizationSchema();

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="min-h-screen">
        <Hero />
        <HistoriaTeaser />
        <ServiciosPreview />
        <BarberosPreview />
        <GaleriaPreview />
        <SucursalesPreview />
      </div>
    </>
  );
}
