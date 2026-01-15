
import React from 'react';
import { ServiceHero } from '../components/ServiceHero.tsx';
import { FeaturesGrid, Feature } from '../components/FeaturesGrid.tsx';
import { Container } from '../components/Container.tsx';
import { Footer } from '../components/Footer.tsx';
import { TrendingDown, Landmark, Briefcase } from 'lucide-react';

const RECUPERACAO_FEATURES: Feature[] = [
  { icon: <TrendingDown />, title: "Gestão de Crise", desc: "Estabilização do fluxo de caixa e renegociação imediata." },
  { icon: <Landmark />, title: "Recuperação Judicial", desc: "Condução técnica sob a Lei 11.101/05." },
  { icon: <Briefcase />, title: "Blindagem Patrimonial", desc: "Proteção estratégica dos ativos dos sócios." }
];

export const RecuperacaoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <ServiceHero 
        badge="Corporate Recovery"
        title={<>Continuidade e <span className="text-brand-secondary italic">saúde empresarial</span>.</>}
        description="Expertise na reestruturação de passivos fiscais, bancários e trabalhistas para empresas em estágio crítico."
        ctaText="SOLICITAR DIAGNÓSTICO"
        onCTAClick={() => {}}
        image="https://images.unsplash.com/photo-1454165833772-d996d4ad509b?auto=format&fit=crop&q=80"
      />
      <section className="py-24">
        <Container><FeaturesGrid features={RECUPERACAO_FEATURES} /></Container>
      </section>
      <Footer />
    </div>
  );
};
