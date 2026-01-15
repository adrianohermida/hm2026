
import React from 'react';
import { ArrowLeft, Layout, Sparkles, Wand2 } from 'lucide-react';
import { Typography } from '../components/ui/Typography.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Container } from '../components/ui/Container.tsx';

/**
 * HM-V12: WHITE CANVAS PAGE
 * Uma página em branco absoluta, projetada para estabilização de fluxo e novos experimentos.
 */
export const WhiteCanvas: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans select-none">
      {/* Atmosfera visual suave */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[100px] -mr-32 -mt-32 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] -ml-32 -mb-32 animate-pulse-slow delay-700" />

      <Container className="relative z-10 text-center max-w-lg animate-in fade-in zoom-in duration-1000">
        <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-slate-100 relative group transition-transform hover:scale-110">
          <Layout size={32} className="text-slate-300 group-hover:text-brand-secondary transition-colors" />
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-primary rounded-xl flex items-center justify-center border-2 border-white">
             <Sparkles size={16} className="text-brand-secondary" />
          </div>
        </div>
        
        <Typography variant="h3" font="serif" className="text-brand-primary mb-4 text-3xl">
          Workspace <span className="text-brand-secondary italic">Clean</span>
        </Typography>

        <Typography variant="body" className="text-slate-400 mb-12 text-sm leading-relaxed max-w-xs mx-auto font-medium">
          Área de trabalho em branco orquestrada pelo Kernel V12. Pronta para síntese de novos fluxos de governança digital.
        </Typography>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="border-slate-100 text-slate-400 hover:text-brand-primary hover:bg-slate-50 h-14 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest"
            icon={<ArrowLeft size={16} />}
          >
            Voltar ao Início
          </Button>
          <Button 
            variant="secondary"
            className="h-14 px-10 rounded-2xl shadow-xl shadow-brand-secondary/20 font-black uppercase text-[10px] tracking-widest"
            icon={<Wand2 size={16} />}
          >
            Sintetizar Módulo
          </Button>
        </div>

        <div className="mt-32 flex items-center justify-center gap-4 opacity-10">
           <div className="h-[1px] w-8 bg-brand-primary" />
           <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-primary">HM-CORE-VOID</span>
           <div className="h-[1px] w-8 bg-brand-primary" />
        </div>
      </Container>
    </div>
  );
};
