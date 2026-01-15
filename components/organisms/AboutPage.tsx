
import React from 'react';
import { Award, BookOpen, Globe, Star, ShieldCheck, Linkedin, ArrowRight } from 'lucide-react';
import { Container } from '../atoms/Container.tsx';
import { Typography } from '../atoms/Typography.tsx';
import { Button } from '../atoms/Button.tsx';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="pt-28 md:pt-40 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full md:w-1/3 h-full bg-brand-accent -skew-x-12 translate-x-1/2 pointer-events-none opacity-30 md:opacity-50" />
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
          <div className="relative animate-in fade-in slide-in-from-left-8 duration-1000 order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-[8px] md:border-[12px] border-white max-w-md mx-auto lg:max-w-none">
              <img src="https://heyboss.heeyo.ai/user-assets/541c30f0c__TLM9795_hxylPUVt.jpg" className="w-full h-full object-cover" alt="Dr. Adriano Hermida Maia" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-2 md:-bottom-8 md:-right-8 bg-brand-primary p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-brand-secondary/30">
              <Typography variant="h3" font="serif" className="text-brand-secondary mb-1">Adriano</Typography>
              <Typography variant="caption" className="text-white/60 tracking-[0.2em] mb-4 block">Hermida Maia</Typography>
              <div className="flex items-center gap-4">
                <Linkedin size={18} className="text-brand-secondary" />
                <div className="w-[1px] h-5 bg-white/10" />
                <Typography variant="caption" className="text-white font-bold">OAB/SP 435.545</Typography>
              </div>
            </div>
          </div>
          <div className="animate-in fade-in slide-in-from-right-8 duration-1000 order-1 lg:order-2">
            <Typography variant="h2" font="serif" className="text-brand-primary mb-8 leading-tight">
              A advocacia como instrumento de <span className="text-brand-secondary italic">libertação financeira</span>.
            </Typography>
            <Typography variant="body" className="text-slate-600 mb-10">
              Dr. Adriano Hermida Maia fundou o escritório com uma visão clara: simplificar o complexo e proteger o cidadão contra abusos institucionais. Especialista pioneiro na aplicação da Lei do Superendividamento.
            </Typography>
            <Button variant="secondary" size="lg" icon={<ArrowRight size={20} />} onClick={() => window.open('https://wa.me/5551996032004')}>
              Consultoria Direta
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};
