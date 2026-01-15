
import React, { useState } from 'react';
import { Coffee, RefreshCw, Trash2, ArrowLeft } from 'lucide-react';
import { Container } from '../components/atoms/Container.tsx';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';
import { SyncRescue } from '../services/sync-rescue.ts';
import { SafeModeLabels } from '../modules/safe-mode/safe-mode-skeleton.tsx';

export const SafeModePage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [cleaning, setCleaning] = useState(false);

  const handleRescue = async () => {
    setCleaning(true);
    await SyncRescue.fullEnvironmentReset();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-sans">
      <Container className="max-w-xl text-center space-y-12 animate-in fade-in duration-1000">
        <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto border border-white/10 text-brand-secondary animate-pulse">
          <Coffee size={48} />
        </div>

        <div className="space-y-4">
          <Typography variant="h2" font="serif" className="text-white text-4xl">
            {SafeModeLabels.title}
          </Typography>
          <Typography variant="body" className="text-slate-500 text-sm leading-relaxed">
            {SafeModeLabels.notice}
          </Typography>
        </div>

        <div className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-2xl flex flex-col items-center gap-4">
           <Typography variant="caption" className="text-rose-400 font-black uppercase text-[10px]">
             {SafeModeLabels.subtitle}
           </Typography>
           <Button 
            variant="primary" 
            onClick={handleRescue} 
            disabled={cleaning}
            className="bg-rose-600 hover:bg-rose-700 text-white border-none h-14 px-10 rounded-2xl shadow-xl shadow-rose-900/20"
            icon={cleaning ? <RefreshCw className="animate-spin" /> : <Trash2 size={18} />}
           >
             {cleaning ? 'Expurgando Cache...' : SafeModeLabels.action}
           </Button>
        </div>

        <button onClick={onBack} className="text-slate-600 hover:text-white transition-colors flex items-center gap-2 mx-auto text-[10px] font-black uppercase tracking-widest">
          <ArrowLeft size={14} /> Voltar ao Painel
        </button>

        <div className="pt-20 opacity-10 flex flex-col items-center gap-4">
           <div className="h-[1px] w-20 bg-white" />
           <span className="text-[8px] font-mono text-white uppercase tracking-[0.5em]">Kernel V12 Offline Mode</span>
        </div>
      </Container>
    </div>
  );
};
