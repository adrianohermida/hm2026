
import React from 'react';
// HM-V12 Fix: Added Activity to the lucide-react imports to resolve the build error on line 63
import { Bot, Power, Edit3, ChevronRight, Zap, ShieldCheck, Globe, Activity } from 'lucide-react';
import { Typography } from '../../../components/atoms/Typography.tsx';
import { AiAgent } from '../../../types.ts';
import { AiAgentsLabels } from '../ai-agents-skeleton.tsx';

interface AgentCardProps {
  agent: AiAgent;
  isActive: boolean;
  onSelect: () => void;
  onToggle: () => void;
  onEdit: () => void;
  onUpdate: () => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, isActive, onSelect, onToggle, onEdit, onUpdate }) => {
  const isMaster = agent.nome === 'Kernel HM-V12';
  const isLiveWidget = agent.tipo === 'bot' && agent.ativo;

  return (
    <div 
      onClick={onSelect}
      className={`p-10 rounded-[4rem] border transition-all group relative overflow-hidden flex flex-col cursor-pointer ${
        isMaster 
          ? 'bg-[#0A1120] border-brand-secondary/30 ring-4 ring-brand-secondary/5 shadow-2xl' 
          : isActive 
            ? 'bg-white ring-4 ring-brand-secondary/20 shadow-2xl border-brand-secondary/30' 
            : 'bg-white border-slate-100 shadow-sm hover:shadow-lg'
      }`}
    >
      <div className="flex justify-between items-start mb-8">
        <div className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center shadow-inner transition-all duration-700 group-hover:scale-110 ${
          isMaster 
            ? 'bg-brand-secondary text-brand-primary border-4 border-white/10'
            : agent.ativo 
              ? 'bg-brand-accent text-brand-primary border border-brand-secondary/20' 
              : 'bg-slate-100 text-slate-400'
        }`}>
          {isMaster ? <Zap size={32} /> : <Bot size={32} />}
        </div>
        <div className="flex items-center gap-2">
           {isLiveWidget && (
             <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-xl border border-emerald-500/20 mr-2">
               <Globe size={12} className="animate-pulse" />
               <span className="text-[8px] font-black uppercase tracking-widest">No Ar</span>
             </div>
           )}
           {!isMaster && (
             <button onClick={(e) => { e.stopPropagation(); onToggle(); }} className={`p-3 rounded-xl transition-all ${agent.ativo ? 'text-emerald-500 bg-emerald-50' : 'text-slate-300 bg-slate-50'}`}><Power size={18} /></button>
           )}
           <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className={`p-3 rounded-xl transition-all ${isMaster ? 'text-white/40 hover:text-brand-secondary bg-white/5' : 'text-slate-300 hover:text-brand-primary bg-slate-50'}`}><Edit3 size={18}/></button>
        </div>
      </div>
      
      <div className="space-y-3 mb-10 flex-1">
        <div className="flex items-center gap-3">
           <Typography variant="h4" font="serif" className={`uppercase tracking-tight text-xl ${isMaster ? 'text-white' : 'text-brand-primary'}`}>{agent.nome}</Typography>
           <span className={`px-2.5 py-1 text-[8px] font-black rounded-lg border ${isMaster ? 'bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20' : 'bg-slate-100 text-slate-500 border-slate-200/50'}`}>V{agent.versao_atual}.0</span>
        </div>
        
        <div className="flex items-center gap-2 text-emerald-400 text-[9px] font-black uppercase tracking-widest mb-2">
          {isMaster ? <ShieldCheck size={12}/> : <Activity size={12} />}
          {isMaster ? 'Core Governance Module' : `Neural Class: ${agent.tipo}`}
        </div>

        <Typography variant="body" className={`text-sm line-clamp-3 leading-relaxed font-medium italic ${isMaster ? 'text-white/50' : 'text-slate-500 opacity-80'}`}>"{agent.persona || 'Sem persona definida.'}"</Typography>
      </div>

      <div className={`pt-8 border-t flex items-center justify-between ${isMaster ? 'border-white/5' : 'border-slate-50'}`}>
        <div className="flex flex-col">
          <Typography variant="caption" className={`text-[8px] mb-2 font-black uppercase ${isMaster ? 'text-white/20' : 'text-slate-300'}`}>{AiAgentsLabels.fields.nivel_autonomia.label}</Typography>
          <div className="flex gap-1.5">
            {[1,2,3,4,5].map(i => (
              <div 
                key={i} 
                className={`w-4 h-1.5 rounded-full transition-all ${
                  i <= (agent.nivel_autonomia || 1) 
                    ? isMaster ? 'bg-brand-secondary shadow-[0_0_12px_rgba(197,160,89,0.6)]' : 'bg-brand-secondary shadow-[0_0_8px_rgba(197,160,89,0.4)]' 
                    : isMaster ? 'bg-white/5' : 'bg-slate-100'
                }`} 
              />
            ))}
          </div>
        </div>
        <ChevronRight size={16} className={`${isMaster ? 'text-brand-secondary' : 'text-slate-200'} group-hover:translate-x-1 transition-all`} />
      </div>
    </div>
  );
};
