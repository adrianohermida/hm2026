
import React from 'react';
import { Scale, ShieldCheck, Landmark, ArrowRight, TrendingDown } from 'lucide-react';
import { Container } from '../atoms/Container.tsx';
import { Typography } from '../atoms/Typography.tsx';
import { Button } from '../atoms/Button.tsx';

interface ServicesSectionProps {
  onNavigateToSuper: () => void;
}

const SERVICES = [
  {
    title: "Superendividamento",
    description: "A lei protege você contra abusos bancários e garante seu mínimo existencial através da repactuação de débitos.",
    icon: <Scale className="w-6 h-6" />,
    isSpecial: true
  },
  {
    title: "Direito Bancário",
    description: "Contestação de juros abusivos, revisões contratuais e defesa estratégica contra instituições financeiras.",
    icon: <ShieldCheck className="w-6 h-6" />,
    isSpecial: false
  },
  {
    title: "Recuperação e Falência",
    description: "Reestruturação de débitos empresariais e pessoais, com foco na continuidade e recuperação da saúde financeira.",
    icon: <TrendingDown className="w-6 h-6" />,
    isSpecial: false
  }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigateToSuper }) => {
  return (
    <section id="servicos" className="py-24 bg-brand-accent scroll-mt-20">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <Typography variant="caption" className="text-brand-secondary mb-4">Soluções Estratégicas</Typography>
            <Typography variant="h2" font="serif" className="text-brand-primary">
              Soluções Estratégicas na <span className="text-brand-secondary italic">Defesa do Devedor</span>.
            </Typography>
          </div>
          <Typography variant="body" className="text-slate-500 max-w-sm mb-2">
            Especialistas dedicados a reverter situações críticas e proteger seu patrimônio com agilidade técnica.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <div 
              key={idx} 
              className={`bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group ${service.isSpecial ? 'border-brand-secondary/30 ring-1 ring-brand-secondary/10' : ''}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors ${service.isSpecial ? 'bg-brand-secondary text-white' : 'bg-brand-accent text-brand-primary group-hover:bg-brand-primary group-hover:text-white'}`}>
                {service.icon}
              </div>
              <Typography variant="h4" font="serif" className="text-brand-primary mb-4">{service.title}</Typography>
              <Typography variant="body" className="text-slate-500 mb-8 min-h-[100px]">
                {service.description}
              </Typography>
              <Button 
                variant="ghost" 
                className="p-0 text-brand-secondary group/link" 
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => service.isSpecial ? onNavigateToSuper() : null}
              >
                {service.isSpecial ? 'Entrar na Jornada' : 'Saiba mais'}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
