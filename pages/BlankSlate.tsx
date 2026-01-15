
import React from 'react';
import { ArrowLeft, Layout } from 'lucide-react';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';
import { Container } from '../components/atoms/Container.tsx';

/**
 * HM-V12: BLANK SLATE
 * Página em branco solicitada para estabilização ou novos fluxos.
 */
export const BlankSlate: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
      <Container className="relative z-10 text-center max-w-lg animate-in fade-in duration-1000">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-10 border border-slate-100">
          <Layout size={24} className="text-slate-300" />
        </div>
        
        <Typography variant="h4" font="serif" className="text-slate-400 font-light tracking-[0.4em] uppercase mb-12 text-xs">
          Espaço Neutro HM-V12
        </Typography>

        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-slate-100 text-slate-400 hover:text-brand-primary hover:bg-slate-50 h-12 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest"
          icon={<ArrowLeft size={14} />}
        >
          Retornar ao Painel
        </Button>

        <div className="mt-32 flex items-center justify-center gap-4 opacity-5">
           <div className="h-[1px] w-6 bg-brand-primary" />
           <span className="text-[8px] font-black uppercase tracking-[0.5em]">HM-V12-CLEAN-SLATE</span>
           <div className="h-[1px] w-6 bg-brand-primary" />
        </div>
      </Container>
    </div>
  );
};
