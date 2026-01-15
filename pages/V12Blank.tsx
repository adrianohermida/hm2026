import React from 'react';
import { ArrowLeft, FilePlus, Sparkles } from 'lucide-react';
import { Container } from '../components/atoms/Container.tsx';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';

export const V12Blank: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans select-none relative overflow-hidden">
       {/* Elemento de Governança Visual */}
       <div className="absolute top-0 left-0 w-full h-2 bg-brand-primary" />
       
       <Container className="text-center max-w-xl animate-in fade-in zoom-in duration-700 relative z-10">
          <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center mx-auto mb-8 border border-slate-100 relative group">
             <FilePlus size={32} className="text-brand-secondary group-hover:scale-110 transition-transform" />
             <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-primary rounded-xl flex items-center justify-center border-4 border-slate-50">
                <Sparkles size={12} className="text-white" />
             </div>
          </div>
          
          <Typography variant="h2" font="serif" className="text-brand-primary mb-4 text-4xl">
            Página <span className="text-brand-secondary italic">Modelo</span>
          </Typography>
          
          <Typography variant="body" className="text-slate-400 mb-10 text-sm leading-relaxed max-w-sm mx-auto">
            Estrutura base oficial em conformidade com o <strong>Kernel V12</strong>. Pronta para desenvolvimento de novos módulos de governança.
          </Typography>
          
          <div className="flex justify-center gap-4">
             <Button variant="outline" onClick={onBack} icon={<ArrowLeft size={16} />} className="border-slate-200 text-slate-500 hover:text-brand-primary h-14 px-8 rounded-2xl">
               Voltar
             </Button>
             <Button variant="secondary" icon={<Sparkles size={16} />} className="h-14 px-10 rounded-2xl shadow-xl shadow-brand-secondary/20">
               Inicializar Fluxo
             </Button>
          </div>

          <div className="mt-20 pt-8 border-t border-slate-200/50 flex flex-col items-center gap-2 opacity-30">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">HM-CORE-TEMPLATE</span>
             <span className="text-[8px] font-mono text-slate-400">v12.0.0-stable</span>
          </div>
       </Container>
    </div>
  );
};