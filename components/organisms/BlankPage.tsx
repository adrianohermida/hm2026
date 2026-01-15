
import React from 'react';
import { ArrowLeft, Layout, Sparkles, Wand2 } from 'lucide-react';
import { Container } from '../atoms/Container.tsx';
import { Typography } from '../atoms/Typography.tsx';
import { Button } from '../atoms/Button.tsx';

interface BlankPageProps {
  onBack?: () => void;
}

export const BlankPage: React.FC<BlankPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-brand-accent/30 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Elementos decorativos de fundo suaves */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-secondary/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] -ml-64 -mb-64 animate-pulse-slow" />

      <Container className="max-w-2xl text-center space-y-12 relative z-10 animate-in fade-in zoom-in duration-1000">
        <div className="relative inline-block">
          <div className="w-32 h-32 bg-white rounded-[3rem] shadow-2xl flex items-center justify-center mx-auto text-slate-200 border border-slate-50 transition-all duration-500 hover:rotate-6 hover:scale-110">
            <Layout size={56} className="text-brand-secondary opacity-40" />
          </div>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
            <Sparkles size={20} className="text-brand-secondary" />
          </div>
        </div>
        
        <div className="space-y-4">
          <Typography variant="h2" font="serif" className="text-brand-primary text-5xl tracking-tight">Novo Espaço <span className="text-brand-secondary italic">Institucional</span></Typography>
          <Typography variant="body" className="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
            Esta página está pronta para ser sintetizada pelo Orquestrador V12. 
            Defina o objetivo jurídico e deixe os agentes Hermida Maia construírem a infraestrutura necessária.
          </Typography>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          {onBack && (
            <Button 
              variant="outline" 
              onClick={onBack} 
              icon={<ArrowLeft size={18} />} 
              className="text-brand-primary border-slate-200 hover:bg-white rounded-2xl h-14 px-8 w-full sm:w-auto"
            >
              Voltar ao Início
            </Button>
          )}
          <Button 
            variant="secondary"
            size="lg"
            className="h-14 rounded-2xl px-10 shadow-xl w-full sm:w-auto"
            icon={<Wand2 size={20} />}
          >
            Sintetizar Módulo
          </Button>
        </div>

        <div className="pt-24 opacity-30 flex items-center justify-center gap-6">
           <div className="h-[1px] w-12 bg-brand-primary" />
           <span className="text-[9px] font-black uppercase tracking-[0.5em] text-brand-primary">HM-DIGITAL KERNEL V12</span>
           <div className="h-[1px] w-12 bg-brand-primary" />
        </div>
      </Container>
    </div>
  );
};
