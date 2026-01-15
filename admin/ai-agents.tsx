
import React from 'react';
import { Bot, Brain, Zap } from 'lucide-react';
import { Typography } from '../components/atoms/Typography.tsx';

export const AiAgentsPage: React.FC = () => {
  return (
    <div className="p-10 space-y-10">
      <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Núcleo <span className="text-brand-secondary italic">Neural</span></Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#0b1321] text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
           <Brain size={120} className="absolute right-[-20px] top-[-20px] opacity-10" />
           <Typography variant="h4" font="serif" className="text-brand-secondary mb-2">Carlos</Typography>
           <Typography variant="caption" className="text-white/40 block mb-6">Assistente de Triagem</Typography>
           <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-4/5 h-full bg-brand-secondary" />
           </div>
        </div>
      </div>
    </div>
  );
};
