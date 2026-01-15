
import React from 'react';
import { Award, Globe, ArrowRight } from 'lucide-react';
import { Typography } from './Typography.tsx';
import { Button } from './Button.tsx';
import { Container } from './Container.tsx';

export const AboutBio: React.FC = () => (
  <Container className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white">
      <img src="https://heyboss.heeyo.ai/user-assets/541c30f0c__TLM9795_hxylPUVt.jpg" className="w-full h-full object-cover" alt="Dr. Adriano" />
      <div className="absolute bottom-0 right-0 bg-brand-primary p-8 rounded-tl-[3rem] text-white">
        <Typography variant="h4" font="serif" className="text-brand-secondary">Adriano Maia</Typography>
        <Typography variant="caption" className="opacity-60">Sócio Fundador</Typography>
      </div>
    </div>
    <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-1000">
      <Typography variant="caption" className="text-brand-secondary tracking-widest uppercase font-black">Autoridade Digital</Typography>
      <Typography variant="h2" font="serif" className="text-brand-primary leading-tight">Liderança em <span className="text-brand-secondary italic">Advocacia Estratégica</span>.</Typography>
      <Typography variant="body" className="text-slate-500 text-lg">Defesa incansável do Mínimo Existencial através da governança digital avançada.</Typography>
      <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
         <div>
            <Award className="text-brand-secondary mb-4" size={32}/>
            <Typography variant="small" className="font-bold block">Expertise</Typography>
            <Typography variant="caption" className="text-slate-400 normal-case">Superendividamento e Bancário.</Typography>
         </div>
         <div>
            <Globe className="text-brand-secondary mb-4" size={32}/>
            <Typography variant="small" className="font-bold block">Abrangência</Typography>
            <Typography variant="caption" className="text-slate-400 normal-case">Presença digital em todo o Brasil.</Typography>
         </div>
      </div>
      <Button variant="secondary" size="lg" icon={<ArrowRight size={20} />}>Agendar Análise</Button>
    </div>
  </Container>
);
