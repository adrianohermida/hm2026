
import React from 'react';
import { MessageSquare, ChevronDown, Sparkles, Calendar } from 'lucide-react';
import { Typography } from '../ui/Typography.tsx';
import { Button } from '../ui/Button.tsx';
import { Container } from '../ui/Container.tsx';
import { HomeSkeleton } from '../../modules/home/home-skeleton.tsx';

export const HeroSection: React.FC<{ onCTAClick: (route?: string) => void }> = ({ onCTAClick }) => {
  const { hero } = HomeSkeleton;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#05080F] pt-48 md:pt-64 pb-24 md:pb-40">
      {/* Atmosphere Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-[#c5a059]/15 blur-[180px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#1a2b4b]/30 blur-[150px] rounded-full animate-pulse-slow delay-700" />
      </div>
      
      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Lado Esquerdo: Conteúdo Estratégico */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 mb-8 md:mb-12">
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl px-6 md:px-8 py-3 rounded-full border border-white/10 shadow-2xl">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#c5a059] animate-pulse" />
                <Typography variant="caption" className="text-[#c5a059] text-[10px] md:text-[12px] font-black tracking-[0.3em] md:tracking-[0.4em]">
                  {hero.badge}
                </Typography>
              </div>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 mb-10">
              <Typography variant="h1" font="serif" className="text-white text-5xl sm:text-6xl md:text-8xl xl:text-[110px] leading-[0.95] md:leading-[0.85] tracking-tighter">
                Defesa da sua <br />
                <span className="text-[#c5a059] italic relative inline-block">
                  dignidade financeira.
                  <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#c5a059]/20" />
                </span>
              </Typography>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-400 mb-12 md:mb-16">
              <Typography variant="body" className="text-white/40 max-w-2xl text-lg md:text-3xl font-light leading-relaxed">
                {hero.subtitle}
              </Typography>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-500 w-full flex flex-col sm:flex-row justify-center lg:justify-start gap-5 md:gap-8 px-4 sm:px-0">
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={() => onCTAClick('contato')}
                className="h-16 md:h-20 px-10 md:px-14 shadow-[0_20px_60px_rgba(197,160,89,0.4)] hover:scale-105 transition-all text-xs md:text-sm group w-full sm:w-auto"
                icon={<MessageSquare size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />}
              >
                Fale com especialista
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => onCTAClick('agendamento')}
                className="h-16 md:h-20 px-10 md:px-14 border-white text-white bg-transparent hover:bg-white/10 transition-all text-xs md:text-sm group w-full sm:w-auto !border-2"
                icon={<Calendar size={18} className="ml-3 group-hover:translate-x-1 transition-transform text-white" />}
              >
                Agendar consulta
              </Button>
            </div>
          </div>

          {/* Lado Direito: Autoridade (Foto Dr. Adriano) */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end animate-in fade-in zoom-in duration-1000 delay-300">
             <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-brand-secondary/60 to-transparent rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                <div className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[580px] aspect-[4/5] rounded-[3.5rem] md:rounded-[5rem] overflow-hidden border-[10px] md:border-[20px] border-white/5 backdrop-blur-3xl shadow-2xl transition-all duration-700 group-hover:scale-[1.01]">
                   <img 
                      src="https://hermidamaia.adv.br/styles/assets/images/perfil_2.jpg" 
                      className="w-full h-full object-cover object-center filter contrast-[1.05]"
                      alt="Dr. Adriano Hermida Maia"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#05080F]/80 via-transparent to-transparent" />
                   
                   <div className="absolute bottom-10 left-10 right-10 p-8 md:p-12 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] border border-white/10">
                      <Typography variant="h4" font="serif" className="text-white text-2xl md:text-3xl mb-1">Dr. Adriano Hermida Maia</Typography>
                      <div className="flex items-center justify-between">
                         <Typography variant="caption" className="text-brand-secondary font-black tracking-widest text-[9px] md:text-[12px] uppercase">OAB/RS 10748</Typography>
                         <div className="flex gap-2 items-center">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                            <span className="text-[10px] font-black text-white/60 uppercase tracking-tighter">Advogado Especialista</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </Container>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20 animate-bounce cursor-pointer hidden md:block">
        <ChevronDown size={24} className="text-white" />
      </div>
    </section>
  );
};
