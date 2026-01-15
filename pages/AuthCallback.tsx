
import React, { useEffect } from 'react';
import { RefreshCw, ShieldCheck, Zap } from 'lucide-react';
import { Typography } from '../components/atoms/Typography.tsx';

export const AuthCallback: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    // Simula a troca de tokens do provedor externo (Google/etc)
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-[#05080F] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Neural Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-secondary/10 blur-[150px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-md w-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-12 rounded-[4rem] text-center shadow-2xl animate-in zoom-in-95 duration-1000">
        <div className="relative inline-block mb-10">
          <div className="w-24 h-24 bg-brand-primary rounded-[2.5rem] flex items-center justify-center mx-auto border border-brand-secondary/30 shadow-2xl relative overflow-hidden group">
            <RefreshCw className="text-brand-secondary animate-spin" size={40} />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-secondary/10 to-transparent" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center border-4 border-[#05080F]">
            <ShieldCheck size={14} className="text-white" />
          </div>
        </div>

        <div className="space-y-4">
          <Typography variant="h3" font="serif" className="text-white">Validando Identidade</Typography>
          <Typography variant="body" className="text-white/40 text-sm leading-relaxed font-light">
            Sincronizando sua conta com o Ledger de Segurança HM-V12. Por favor, mantenha esta janela aberta.
          </Typography>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
           <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-brand-secondary animate-progress" />
           </div>
           <div className="flex items-center gap-2">
              <Zap size={10} className="text-brand-secondary" />
              <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/20">Protocolo de Borda Ativo</span>
           </div>
        </div>
      </div>
      
      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 2.5s linear forwards;
        }
      `}</style>
    </div>
  );
};
