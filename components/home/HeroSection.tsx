
import React from 'react';
import { MessageSquare, ChevronDown, Sparkles, Calendar, ArrowRight, Star, ShieldCheck, TrendingDown } from 'lucide-react';
import { Typography } from '../ui/Typography.tsx';
import { Button } from '../ui/Button.tsx';
import { Container } from '../ui/Container.tsx';
import { HomeSkeleton } from '../../modules/home/home-skeleton.tsx';

export const HeroSection: React.FC<{ onCTAClick: (route?: string) => void }> = ({ onCTAClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#05080F] pt-40 pb-24 md:pt-56 md:pb-32">
      {/* Atmosfera de Fundo - Gradiantes Suaves */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-[#c5a059]/10 blur-[180px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#1a2b4b]/20 blur-[150px] rounded-full animate-pulse-slow delay-700" />
      </div>
      
      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LADO ESQUERDO: CONTEÚDO E CONVERSÃO */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-1000">
            
            {/* Badge de Lei em Vigor */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl px-6 py-2.5 rounded-full border border-white/10 shadow-2xl">
                <span className="w-2 h-2 bg-[#c5a059] rounded-full animate-pulse" />
                <Typography variant="caption" className="text-[#c5a059] text-[10px] md:text-[11px] font-black tracking-[0.3em] uppercase">
                  Lei 14.181/2021 - Superendividamento
                </Typography>
              </div>
            </div>

            {/* Headline Principal */}
            <div className="mb-10">
              <Typography variant="h1" font="serif" className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tighter">
                Advogado Especialista em <span className="text-[#c5a059] italic">Superendividamento</span>: Parcele suas dívidas em até 5 anos.
              </Typography>
            </div>

            {/* Sub-headline */}
            <div className="mb-12">
              <Typography variant="body" className="text-white/50 max-w-xl text-lg md:text-2xl font-light leading-relaxed">
                Mais de R$ 35 milhões em redução de passivos renegociados em todo o Brasil. Recupere sua paz e dignidade financeira hoje mesmo.
              </Typography>
            </div>

            {/* CTAs */}
            <div className="w-full flex flex-col sm:flex-row justify-center lg:justify-start gap-6 mb-12">
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={() => onCTAClick('agendamento')}
                className="h-16 md:h-20 px-10 md:px-12 shadow-[0_20px_60px_rgba(197,160,89,0.3)] hover:scale-105 transition-all group w-full sm:w-auto"
                icon={<ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />}
              >
                Agendar Análise
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => onCTAClick('contato')}
                className="h-16 md:h-20 px-10 md:px-12 border-white/20 text-white hover:bg-white/10 transition-all group w-full sm:w-auto"
              >
                Falar com Especialista
              </Button>
            </div>

            {/* Prova Social */}
            <div className="flex items-center gap-6 pt-4 border-t border-white/5 w-full justify-center lg:justify-start">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i} 
                    src={`https://ui-avatars.com/api/?name=User+${i}&background=c5a059&color=1a2b4b`} 
                    className="w-12 h-12 rounded-full border-2 border-[#05080F] shadow-lg" 
                    alt={`Cliente ${i}`} 
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex text-[#c5a059] gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <Typography variant="caption" className="text-white/40 normal-case font-bold text-[11px] tracking-tight">
                  +2.500 famílias protegidas contra abusos.
                </Typography>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: AUTORIDADE VISUAL */}
          <div className="relative flex justify-center lg:justify-end animate-in fade-in zoom-in duration-1000 delay-300">
             
             {/* Badge Flutuante Superior (OAB) */}
             <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 bg-white/10 backdrop-blur-3xl p-5 md:p-7 rounded-[2rem] border border-white/10 shadow-2xl z-50 animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="bg-[#c5a059]/20 p-3 rounded-2xl">
                    <ShieldCheck className="text-[#c5a059]" size={28} />
                  </div>
                  <div className="text-left">
                    <Typography variant="small" className="text-white font-black text-sm uppercase tracking-widest">OAB/RS 10748</Typography>
                    <Typography variant="caption" className="text-white/40 text-[9px] uppercase font-black">Especialista Ativo</Typography>
                  </div>
                </div>
             </div>

             {/* Badge Flutuante Inferior (Sucesso) */}
             <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-white/10 backdrop-blur-3xl p-5 md:p-7 rounded-[2rem] border border-white/10 shadow-2xl z-50 animate-bounce-slow delay-500">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-500/20 p-3 rounded-2xl">
                    <TrendingDown className="text-emerald-500" size={28} />
                  </div>
                  <div className="text-left">
                    <Typography variant="small" className="text-white font-black text-sm uppercase tracking-widest">98% de Êxito</Typography>
                    <Typography variant="caption" className="text-white/40 text-[9px] uppercase font-black">Em Renegociações</Typography>
                  </div>
                </div>
             </div>

             {/* Frame da Imagem Principal */}
             <div className="relative group">
                {/* Glow de destaque atrás da imagem */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#c5a059]/30 to-transparent rounded-[4rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                
                <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[540px] aspect-[4/5] rounded-[3.5rem] md:rounded-[5rem] overflow-hidden border-[10px] md:border-[16px] border-white/5 backdrop-blur-3xl shadow-2xl transition-all duration-700 group-hover:scale-[1.01] group-hover:rotate-1">
                   <img 
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69457177ae7e61f63fb38329/3b78c0579__TLM961311.jpg" 
                      className="w-full h-full object-cover object-center filter brightness-[1.05] contrast-[1.05]"
                      alt="Dr. Adriano Hermida Maia"
                   />
                   
                   {/* Overlay Gradiente de Rodapé da Foto */}
                   <div className="absolute inset-0 bg-gradient-to-t from-[#05080F]/90 via-transparent to-transparent" />
                   
                   {/* Identificação na Foto */}
                   <div className="absolute bottom-8 left-8 right-8 p-6 md:p-10 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10">
                      <Typography variant="h4" font="serif" className="text-white text-xl md:text-3xl mb-1">Dr. Adriano Hermida Maia</Typography>
                      <div className="flex items-center justify-between">
                         <Typography variant="caption" className="text-[#c5a059] font-black tracking-widest text-[9px] md:text-[11px] uppercase">Advocacia Estratégica</Typography>
                         <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </Container>
      
      {/* Scroll Down Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 animate-bounce cursor-pointer hidden md:block z-20">
        <ChevronDown size={28} className="text-white" />
      </div>
    </section>
  );
};
