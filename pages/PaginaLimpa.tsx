import React from 'react';
import { ArrowLeft, Sparkles, Layout, Shield } from 'lucide-react';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';
import { Container } from '../components/atoms/Container.tsx';

/**
 * HM-V12: PAGINA LIMPA (ZERO-LOAD WORKSPACE)
 * Projetada para estabilizar o Kernel em momentos de instabilidade de path ou rede.
 */
export const PaginaLimpa: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Decoração de Fundo Minimalista */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[100px] -ml-32 -mb-32" />

      <Container className="relative z-10 text-center max-w-xl animate-in fade-in zoom-in duration-700">
        <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-10 border border-slate-100 relative group">
          <Layout size={32} className="text-brand-secondary/30" />
          <div className="absolute -top-2 -right-2 w-7 h-7 bg-brand-primary rounded-xl flex items-center justify-center border-2 border-white">
            <Sparkles size={14} className="text-brand-secondary" />
          </div>
        </div>
        
        <Typography variant="h2" font="serif" className="text-brand-primary mb-6 text-4xl">
          Página em <span className="text-brand-secondary italic">Branco</span>
        </Typography>
        
        <Typography variant="body" className="text-slate-400 mb-12 text-sm leading-relaxed max-w-sm mx-auto">
          Este é um workspace minimalista orquestrado pelo Kernel V12. 
          Ambiente em repouso absoluto, sem consumo de rede ou scripts externos pendentes.
        </Typography>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="border-slate-200 text-brand-primary bg-white hover:bg-slate-50 h-14 px-10 rounded-2xl text-[10px] font-black uppercase tracking-widest"
            icon={<ArrowLeft size={16} />}
          >
            Retornar ao Início
          </Button>
          <Button 
            variant="secondary"
            className="h-14 px-10 rounded-2xl shadow-xl shadow-brand-secondary/20 font-black uppercase text-[10px] tracking-widest"
          >
            Sintetizar Bloco
          </Button>
        </div>

        <div className="mt-24 pt-10 border-t border-slate-100 flex items-center justify-center gap-4 opacity-10">
           <div className="h-[1px] w-8 bg-brand-primary" />
           <Shield size={14} />
           <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-primary">HM-STABLE-ZONE</span>
           <div className="h-[1px] w-8 bg-brand-primary" />
        </div>
      </Container>
    </div>
  );
};