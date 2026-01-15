
import React from 'react';
import { ArrowLeft, Square, Sparkles } from 'lucide-react';
import { Container } from '../components/atoms/Container.tsx';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';

export const PaginaVazia: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans select-none relative overflow-hidden">
       {/* Elemento de Governança Visual */}
       <div className="absolute top-0 left-0 w-full h-2 bg-brand-secondary" />
       
       {/* Background Atmosphere */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] -ml-32 -mb-32" />

       <Container className="text-center max-w-xl animate-in fade-in zoom-in duration-700 relative z-10">
          <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center mx-auto mb-8 border border-slate-100 relative group hover:scale-110 transition-transform">
             <Square size={32} className="text-brand-secondary" />
             <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-primary rounded-xl flex items-center justify-center border-4 border-slate-50 animate-bounce">
                <Sparkles size={12} className="text-white" />
             </div>
          </div>
          
          <Typography variant="h2" font="serif" className="text-brand-primary mb-4 text-4xl">
            Página <span className="text-brand-secondary italic">Vazia</span>
          </Typography>
          
          <Typography variant="body" className="text-slate-400 mb-10 text-sm leading-relaxed max-w-sm mx-auto font-medium">
            Um novo espaço limpo e pronto para ser sintetizado pelo Kernel V12. Aguardando instruções.
          </Typography>
          
          <div className="flex justify-center gap-4">
             <Button variant="outline" onClick={onBack} icon={<ArrowLeft size={16} />} className="border-slate-200 text-slate-500 hover:text-brand-primary h-14 px-8 rounded-2xl">
               Voltar
             </Button>
             <Button variant="secondary" className="h-14 px-10 rounded-2xl shadow-xl shadow-brand-secondary/20 font-black uppercase text-[10px] tracking-widest">
               Sintetizar
             </Button>
          </div>

          <div className="mt-20 pt-8 border-t border-slate-200/50 flex flex-col items-center gap-2 opacity-30">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">HM-VOID-SPACE</span>
             <span className="text-[8px] font-mono text-slate-400">Secure Protocol v1.0</span>
          </div>
       </Container>
    </div>
  );
};
