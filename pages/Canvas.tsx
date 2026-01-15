
import React from 'react';
import { ArrowLeft, Layout, Sparkles, Wand2, Plus } from 'lucide-react';
import { Container } from '../components/atoms/Container.tsx';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';

export const CanvasPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-secondary/5 rounded-full blur-[150px] -mr-96 -mt-96" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[150px] -ml-96 -mb-96" />

      <Container className="relative z-10 text-center max-w-3xl animate-in fade-in zoom-in duration-1000">
        <div className="relative inline-block mb-12">
          <div className="w-28 h-28 bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] flex items-center justify-center mx-auto border border-white transition-transform hover:scale-110">
            <Layout size={48} className="text-brand-secondary/30" />
          </div>
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-brand-primary rounded-2xl flex items-center justify-center shadow-xl border-2 border-white animate-bounce">
            <Sparkles size={18} className="text-brand-secondary" />
          </div>
        </div>
        
        <Typography variant="h1" font="serif" className="text-brand-primary mb-6 text-6xl tracking-tight">
          Espaço <span className="text-brand-secondary italic">Canvas</span>
        </Typography>
        
        <Typography variant="body" className="text-slate-400 mb-12 leading-relaxed text-xl max-w-xl mx-auto font-medium">
          Área de trabalho em branco orquestrada pelo Kernel V12. 
          Pronta para síntese de novos fluxos de governança.
        </Typography>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="border-slate-200 text-brand-primary bg-white hover:bg-slate-50 h-16 px-10 rounded-2xl shadow-sm font-black uppercase text-[10px] tracking-widest"
            icon={<ArrowLeft size={18} />}
          >
            Voltar
          </Button>
          <Button 
            variant="secondary"
            className="h-16 px-12 rounded-2xl shadow-2xl shadow-brand-secondary/30 font-black uppercase text-[10px] tracking-widest transition-all hover:scale-105"
            icon={<Plus size={20} />}
          >
            Adicionar Bloco IA
          </Button>
        </div>

        <div className="mt-32 pt-12 border-t border-slate-100 flex flex-col items-center gap-3 opacity-20">
          <div className="flex gap-4">
             <div className="w-2 h-2 bg-brand-primary rounded-full" />
             <div className="w-2 h-2 bg-brand-secondary rounded-full" />
             <div className="w-2 h-2 bg-brand-primary rounded-full" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-brand-primary">HM-CORE-WORKSPACE</span>
        </div>
      </Container>
    </div>
  );
};
