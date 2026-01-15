
import React from 'react';
import { Play, CheckCircle, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import { Container } from '../atoms/Container.tsx';
import { Typography } from '../atoms/Typography.tsx';
import { Button } from '../atoms/Button.tsx';
import { DebtCalculator } from '../molecules/DebtCalculator.tsx';
import { LearningJourney } from './LearningJourney.tsx';
import { Logo } from '../ui/Logo.tsx';

export const SuperendividamentoPage: React.FC = () => {
  const triggerIA = () => {
    if ((window as any).triggerHMChat) (window as any).triggerHMChat();
  };

  return (
    <div className="pt-24 bg-white">
      {/* Hero */}
      <section className="py-20 bg-brand-accent">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-brand-secondary" />
              <Typography variant="caption" className="text-brand-secondary">Lei 14.181/2021 em Vigor</Typography>
            </div>
            <Typography variant="h1" font="serif" className="text-brand-primary mb-8">
              Recupere sua <span className="text-brand-secondary italic">dignidade</span> financeira.
            </Typography>
            <Typography variant="body" className="text-slate-600 mb-10 leading-relaxed">
              O superendividamento não é apenas uma questão de números, é uma questão de direitos humanos conduzida com rigor técnico pelo Dr. Adriano Hermida Maia. Protegemos seu mínimo existencial contra abusos do sistema bancário.
            </Typography>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="lg" onClick={triggerIA} className="shadow-brand-secondary/40" icon={<MessageCircle size={18}/>}>
                Simular com Agente IA
              </Button>
              <Button variant="ghost" className="flex items-center gap-2" size="lg" onClick={() => document.getElementById('jornada')?.scrollIntoView({ behavior: 'smooth' })}>
                <Play className="w-5 h-5 fill-brand-primary" /> Entenda o Processo
              </Button>
            </div>
          </div>
          <div className="relative" id="calculadora">
            <div className="absolute -inset-4 bg-brand-secondary/10 rounded-[3rem] blur-2xl opacity-50" />
            <DebtCalculator />
          </div>
        </Container>
      </section>

      {/* Jornada de Aprendizado Visual */}
      <section id="jornada" className="py-24 bg-slate-50">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Typography variant="caption" className="text-brand-secondary mb-4">Trilha de Mentoria</Typography>
            <Typography variant="h2" font="serif" className="text-brand-primary mb-6">
              A clareza que você precisa
            </Typography>
            <Typography variant="body" className="text-slate-500">
              Assista aos módulos preparados pelo Dr. Adriano Hermida Maia e saiba como a lei protege você e sua família de forma imediata.
            </Typography>
          </div>
          
          <LearningJourney />
        </Container>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-brand-primary text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none flex items-center justify-center">
          <Logo variant="light" className="w-[500px] h-[500px] rotate-12 opacity-10" />
        </div>
        <Container className="relative z-10 flex flex-wrap justify-center gap-12 lg:gap-24">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/5">
              <ShieldCheck className="text-brand-secondary" />
            </div>
            <div>
              <Typography variant="small" className="font-bold">OAB/SP 435.545</Typography>
              <Typography variant="caption" className="text-white/50 lowercase">Registro Dr. Adriano</Typography>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/5">
              <CheckCircle className="text-brand-secondary" />
            </div>
            <div>
              <Typography variant="small" className="font-bold">Direito Bancário</Typography>
              <Typography variant="caption" className="text-white/50 lowercase">Especialidade Master</Typography>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
