
import React from 'react';
import { Wind, Shield, ArrowLeft } from 'lucide-react';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';

/**
 * HM-V12: ZEN PAGE (TRUE BLANK)
 * Página de baixíssimo consumo de recursos para estabilização de rede (Fix 429).
 * Ideal para aguardar o cooldown do Google MakerSuite.
 */
export const ZenPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-6 font-sans selection:bg-brand-secondary/30">
      {/* Atmosfera sutil para repouso visual */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[25%] -right-[10%] w-[50%] h-[50%] bg-brand-secondary/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center animate-in fade-in zoom-in duration-1000">
        <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-12 border border-white/10 backdrop-blur-xl group hover:border-brand-secondary/40 transition-all duration-700">
          <Wind className="text-slate-500 group-hover:text-brand-secondary transition-colors" size={32} />
        </div>

        <Typography variant="h2" font="serif" className="text-white/20 font-light tracking-[0.2em] mb-12 uppercase text-sm">
          Workspace em Repouso
        </Typography>

        <div className="space-y-4 max-w-sm mb-16">
          <Typography variant="body" className="text-slate-600 text-[10px] leading-relaxed tracking-wider uppercase">
            Sistema em modo de carga zero. <br/> 
            Aguardando dissipação de erros 429 e PH1.
          </Typography>
        </div>

        <button 
          onClick={onBack}
          className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Restaurar Fluxo de Trabalho</span>
        </button>

        <div className="mt-32 flex items-center gap-4 opacity-10">
          <div className="h-[1px] w-8 bg-white" />
          <Shield size={12} className="text-white" />
          <div className="h-[1px] w-8 bg-white" />
        </div>
      </div>
    </div>
  );
};
