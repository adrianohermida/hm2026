
import React from 'react';
import { ChevronRight, MessageSquare } from 'lucide-react';
import { Container } from '../atoms/Container.tsx';
import { Typography } from '../atoms/Typography.tsx';
import { Button } from '../atoms/Button.tsx';

interface HeroProps {
  onAIClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAIClick }) => {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-primary">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80" 
          className="w-full h-full object-cover opacity-20"
          alt="Law Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/80 via-brand-primary/40 to-brand-primary" />
      </div>
      
      <Container className="relative z-10 text-center">
        <div className="animate-in fade-in slide-in-from-top-10 duration-1000">
          <Typography variant="caption" className="text-brand-secondary bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10 inline-block mb-6 tracking-[0.3em] font-black uppercase">
            Advocacia Digital e Estratégica
          </Typography>
          <Typography variant="h1" font="serif" className="text-white mb-8 max-w-4xl mx-auto leading-[1.1]">
            Defendemos seus direitos com <span className="text-brand-secondary italic">excelência</span> e tecnologia.
          </Typography>
          <Typography variant="body" className="text-white/70 max-w-2xl mx-auto mb-12 text-lg">
            Especialistas em Superendividamento e Direito do Consumidor, prontos para reequilibrar sua vida financeira através da governança digital HM-V12.
          </Typography>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={onAIClick}
              className="px-12 py-6 text-base font-black uppercase tracking-widest shadow-2xl shadow-brand-secondary/40 hover:scale-105 transition-transform"
              icon={<MessageSquare className="w-6 h-6 ml-2" />}
            >
              TIRE SUAS DÚVIDAS
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-12 py-6 text-base font-black uppercase tracking-widest hover:bg-white/10"
              onClick={() => document.getElementById('conciliar')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Onde Conciliar?
            </Button>
          </div>
        </div>
      </Container>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 animate-bounce">
        <ChevronRight size={32} className="rotate-90" />
      </div>
    </section>
  );
};
