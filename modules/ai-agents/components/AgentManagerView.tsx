import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { AiAgent } from '../../../types.ts';
import { AiAgentsLabels } from '../ai-agents-skeleton.tsx';
import { AgentCard } from './AgentCard.tsx';
import { AiAgentsRouter } from '../ai-agents-router.ts';

interface Props {
  agents: AiAgent[];
  loading: boolean;
  onUpdate: () => void;
  onEdit: (agent: AiAgent) => void;
}

export const AgentManagerView: React.FC<Props> = ({ agents, loading, onUpdate, onEdit }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleToggle = async (agent: AiAgent) => {
    await AiAgentsRouter.toggleStatus(agent.id, !agent.ativo);
    onUpdate();
  };

  const filteredAgents = agents.filter(a => activeFilter === 'all' || a.tipo === activeFilter);

  if (loading) return <div className="py-20 text-center opacity-30 animate-pulse">{AiAgentsLabels.messages.loading}</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 p-1.5 bg-slate-100 rounded-2xl w-fit">
        {AiAgentsLabels.filters.map(f => (
          <button 
            key={f.id} 
            onClick={() => setActiveFilter(f.id)}
            className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeFilter === f.id ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-400 hover:text-brand-primary'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAgents.length === 0 ? (
          <div className="col-span-full py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 opacity-40">
            <p className="text-sm font-bold uppercase tracking-widest">{AiAgentsLabels.messages.empty}</p>
          </div>
        ) : (
          filteredAgents.map(agent => (
            <AgentCard 
              key={agent.id} 
              agent={agent} 
              isActive={agent.ativo}
              onSelect={() => onEdit(agent)} 
              onToggle={() => handleToggle(agent)}
              onEdit={() => onEdit(agent)} 
              onUpdate={onUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
};
