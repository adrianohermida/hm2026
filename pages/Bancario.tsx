
import React from 'react';
import { ServiceHero } from '../components/ServiceHero.tsx';
import { FeaturesGrid, Feature } from '../components/FeaturesGrid.tsx';
import { Container } from '../components/Container.tsx';
import { Footer } from '../components/organisms/Footer.tsx';
import { Scale, ShieldCheck, AlertTriangle } from 'lucide-react';

const BANCARIO_FEATURES: Feature[] = [
  { icon: <Scale />, title: "Juros Abusivos", desc: "Revisão técnica de taxas acima da média de mercado." },
  { icon: <ShieldCheck />, title: "Venda Casada", desc: "Identificação e estorno de seguros não solicitados." },
  { icon: <AlertTriangle />, title: "Busca e Apreensão", desc: "Defesa urgente para proteção do seu veículo." }
];

export const BancarioPage: React.FC = () => {
  const triggerIA = () => {
    if ((window as any).triggerHMChat) (window as any).triggerHMChat();
  };

  return (
    <div className="min-h-screen bg-white">
      <ServiceHero 
        badge="Proteção Bancária"
        title={<>Defesa contra <span className="text-brand-secondary italic">abusos financeiros</span>.</>}
        description="Recupere o equilíbrio do seu contrato através da análise técnica e jurídica de juros abusivos e tarifas indevidas."
        ctaText="FALAR COM AGENTE AGORA"
        onCTAClick={triggerIA}
        image="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80"
      />
      <section className="py-24">
        <Container><FeaturesGrid features={BANCARIO_FEATURES} /></Container>
      </section>
      <Footer />
    </div>
  );
};
