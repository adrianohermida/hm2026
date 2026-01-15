
import React from 'react';
import { Play, CheckCircle, ShieldCheck, Sparkles, MessageCircle, Trophy, BookOpen, ExternalLink } from 'lucide-react';
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
            <Typography variant="h1" font="serif" className="text-brand-primary mb-8 leading-tight">
              Recupere sua <span className="text-brand-secondary italic">dignidade</span> financeira.
            </Typography>
            <Typography variant="body" className="text-slate-600 mb-10 leading-relaxed">
              O superendividamento não é apenas uma questão de números, é uma questão de direitos humanos conduzida com rigor técnico pelo Dr. Adriano Hermida Maia. Protegemos seu mínimo existencial contra abusos do sistema bancário.
            </Typography>
            <div className="flex flex-wrap gap-4">
              {/* HM-V12: CTA atualizado conforme solicitação de UX */}
              <Button variant="secondary" size="lg" onClick={triggerIA} className="shadow-brand-secondary/40" icon={<MessageCircle size={18}/>}>
                Agende uma avaliação
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
          <div className="text-center max-w-3xl mx-auto mb-16 px-4">
            <Typography variant="caption" className="text-brand-secondary mb-4 block font-black uppercase tracking-widest">Trilha de Mentoria</Typography>
            <Typography variant="h2" font="serif" className="text-brand-primary mb-6 text-3xl md:text-5xl">
              A clareza que você precisa
            </Typography>
            <Typography variant="body" className="text-slate-500">
              Assista aos módulos preparados pelo Dr. Adriano Hermida Maia e saiba como a lei protege você e sua família de forma imediata.
            </Typography>
          </div>
          
          <LearningJourney />
        </Container>
      </section>

      {/* Trust Badges Atualizados */}
      <section className="py-20 bg-brand-primary text-white overflow-hidden relative border-t border-white/5">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none flex items-center justify-center">
          <Logo variant="light" className="w-[500px] h-[500px] rotate-12 opacity-10" />
        </div>
        <Container className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-12 lg:gap-32">
          <div className="flex items-center gap-6 group">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 transition-all group-hover:bg-brand-secondary group-hover:text-brand-primary shadow-xl">
              <Trophy size={28} className="text-brand-secondary group-hover:text-inherit" />
            </div>
            <div className="text-center md:text-left">
              <Typography variant="small" className="font-black uppercase tracking-widest text-[11px] md:text-sm">Prêmio Referência Nacional</Typography>
              <Typography variant="caption" className="text-white/40 normal-case text-[10px] block mt-1">Destaque em Advocacia & Justiça</Typography>
            </div>
          </div>
          
          <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.open('https://www.amazon.com.br/Manual-Superendividado-estabilidade-financeira-Endividado-ebook/dp/B0CTHR5KLF', '_blank')}>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 transition-all group-hover:bg-brand-secondary group-hover:text-brand-primary shadow-xl">
              <BookOpen size={28} className="text-brand-secondary group-hover:text-inherit" />
            </div>
            <div className="text-center md:text-left">
              <Typography variant="small" className="font-black uppercase tracking-widest text-[11px] md:text-sm">
                Autor do <span className="underline decoration-brand-secondary/50 underline-offset-4 group-hover:decoration-brand-primary transition-all">Manual do Superendividado</span>
              </Typography>
              <Typography variant="caption" className="text-white/40 normal-case text-[10px] block mt-1 flex items-center justify-center md:justify-start gap-1">
                Disponível na Amazon Kindle <ExternalLink size={10} />
              </Typography>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
