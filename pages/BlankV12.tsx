
import React from 'react';
import { ArrowLeft, Layout, Sparkles } from 'lucide-react';
import { Container } from '../components/atoms/Container.tsx';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';

export const BlankV12: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <Container className="relative z-10 text-center max-w-xl animate-in fade-in zoom-in duration-1000">
        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] shadow-xl flex items-center justify-center mx-auto mb-10 border border-slate-100 relative group">
          <Layout size={32} className="text-slate-300 group-hover:text-brand-secondary transition-colors" />
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-primary rounded-xl flex items-center justify-center border-2 border-white animate-bounce">
             <Sparkles size={16} className="text-brand-secondary" />
          </div>
        </div>
        
        <Typography variant="h2" font="serif" className="text-brand-primary mb-6 text-4xl">
          Void <span className="text-brand-secondary italic">Space</span>
        </Typography>

        <Typography variant="body" className="text-slate-400 mb-12 text-sm leading-relaxed max-w-xs mx-auto font-medium">
          Workspace em standby orquestrado pelo Kernel V12. Pronto para síntese de novos fluxos de governança.
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
        </div>

        <div className="mt-32 pt-10 border-t border-slate-100 flex items-center justify-center gap-4 opacity-10">
           <div className="h-[1px] w-8 bg-brand-primary" />
           <span className="text-[9px] font-black uppercase tracking-[0.5em] text-brand-primary">HM-CORE-STABLE</span>
           <div className="h-[1px] w-8 bg-brand-primary" />
        </div>
      </Container>
    </div>
  );
};
