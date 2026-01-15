
import React from 'react';
import { ArrowLeft, Layout } from 'lucide-react';
import { Typography } from '../components/ui/Typography.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Container } from '../components/ui/Container.tsx';

export const EmptyView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-slate-50 rounded-full blur-[100px] -mr-32 -mt-32" />
      </div>

      <Container className="relative z-10 text-center max-w-lg animate-in fade-in duration-1000">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-10 border border-slate-100">
          <Layout size={24} className="text-slate-300" />
        </div>
        
        <Typography variant="h4" font="serif" className="text-slate-400 font-light tracking-[0.4em] uppercase mb-12 text-xs">
          Página em Branco
        </Typography>

        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-slate-100 text-slate-400 hover:text-brand-primary hover:bg-slate-50 h-12 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest"
          icon={<ArrowLeft size={14} />}
        >
          Retornar ao Início
        </Button>

        <div className="mt-32 flex items-center justify-center gap-4 opacity-5">
           <div className="h-[1px] w-6 bg-brand-primary" />
           <span className="text-[8px] font-black uppercase tracking-[0.5em]">HM-V12-EMPTY</span>
           <div className="h-[1px] w-6 bg-brand-primary" />
        </div>
      </Container>
    </div>
  );
};
