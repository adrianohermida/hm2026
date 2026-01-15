import React from 'react';
import { ArrowLeft, BoxSelect, Sparkles, Wand2 } from 'lucide-react';
import { Container } from '../components/atoms/Container.tsx';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';
import { VoidSkeleton } from '../modules/void/void-skeleton.tsx';

export const VoidPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans select-none">
      {/* Visual Atmosphere: HM-V12 Signature */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-[150px] -mr-32 -mt-32 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[150px] -ml-32 -mb-32 animate-pulse-slow delay-700" />

      <Container className="relative z-10 text-center max-w-2xl animate-in fade-in zoom-in duration-1000">
        <div className="relative inline-block mb-12">
          <div className="w-28 h-28 bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.08)] flex items-center justify-center mx-auto border border-slate-50 transition-all duration-700 hover:scale-110">
            <div className="text-brand-secondary opacity-30">
               <BoxSelect size={48} />
            </div>
          </div>
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-brand-primary rounded-2xl flex items-center justify-center shadow-xl border-2 border-white animate-bounce">
             <Sparkles size={18} className="text-brand-secondary" />
          </div>
        </div>
        
        <div className="space-y-6 mb-16">
          <Typography variant="h1" font="serif" className="text-brand-primary text-5xl md:text-7xl tracking-tighter leading-[0.9]">
            Célula <span className="text-brand-secondary italic">Neutra</span>
          </Typography>
          
          <Typography variant="body" className="text-slate-400 text-lg leading-relaxed max-w-md mx-auto font-medium">
            {VoidSkeleton.description}
          </Typography>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="border-slate-100 text-slate-400 hover:text-brand-primary hover:bg-slate-50 h-16 px-12 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm"
            icon={<ArrowLeft size={16} />}
          >
            Voltar ao Início
          </Button>
          <Button 
            variant="secondary"
            className="h-16 px-12 rounded-2xl shadow-2xl shadow-brand-secondary/30 font-black uppercase text-[10px] tracking-widest transition-all hover:scale-105"
            icon={<Wand2 size={18} />}
          >
            Sintetizar Módulo
          </Button>
        </div>

        <div className="mt-32 pt-12 border-t border-slate-100 flex flex-col items-center gap-4 opacity-10">
           <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-brand-primary">HM-V12-VOID-CELL</span>
           </div>
           <span className="text-[8px] font-black uppercase tracking-widest italic">Protocolo de Integridade: PAE-V14-6</span>
        </div>
      </Container>
    </div>
  );
};