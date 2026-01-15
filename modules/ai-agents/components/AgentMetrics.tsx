import React from 'react';
import { Brain, Coins, ShieldCheck, Activity, Target, Zap } from 'lucide-react';
import { Typography } from '../../../components/atoms/Typography.tsx';
import { AiAgentsLabels } from '../ai-agents-skeleton.tsx';

export const AgentMetrics: React.FC<{ stats: any }> = () => {
  const metrics = [
    { label: 'Carga Neural Total', value: '2.8M', icon: <Brain size={20}/>, color: 'text-blue-500' },
    { label: `Investimento (${AiAgentsLabels.economics.currency})`, value: 'R$ 842,12', icon: <Coins size={20}/>, color: 'text-emerald-500' },
    { label: 'Score de Confiança', value: '98.2%', icon: <Target size={20}/>, color: 'text-brand-secondary' },
    { label: 'Latência de Borda', value: '88ms', icon: <Zap size={20}/>, color: 'text-amber-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {metrics.map((stat, i) => (
        <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-xl transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform">
             {stat.icon}
          </div>
          <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center ${stat.color} shadow-inner group-hover:rotate-6 transition-all`}>
            {stat.icon}
          </div>
          <div>
            <Typography variant="h3" font="serif" className="text-brand-primary leading-none mb-1 text-2xl">{stat.value}</Typography>
            <Typography variant="caption" className="text-slate-400 font-black uppercase text-[8px] tracking-widest">{stat.label}</Typography>
          </div>
        </div>
      ))}
    </div>
  );
};