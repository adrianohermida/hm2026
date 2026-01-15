import React, { useEffect, useState } from 'react';
import { Wrench, ShieldAlert, CheckCircle2, Search, MapPin } from 'lucide-react';
import { Typography } from '../../../components/atoms/Typography.tsx';
import { AiAgentTool } from '../../../types.ts';
import { AiAgentsRouter } from '../ai-agents-router.ts';

export const AgentToolManager: React.FC<{ agentId: string }> = ({ agentId }) => {
  const [tools, setTools] = useState<AiAgentTool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AiAgentsRouter.fetchTools(agentId).then(data => {
      setTools(data);
      setLoading(false);
    });
  }, [agentId]);

  const toggleTool = async (tool: AiAgentTool) => {
    await AiAgentsRouter.toggleTool(tool.id, !tool.ativo);
    setTools(tools.map(t => t.id === tool.id ? { ...t, ativo: !t.ativo } : t));
  };

  if (loading) return <div className="py-10 animate-pulse text-center opacity-30">Auditoria de Tools...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tools.map(tool => (
        <div key={tool.id} className={`p-8 rounded-[2.5rem] border transition-all ${tool.ativo ? 'bg-white border-emerald-100 shadow-xl' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
          <div className="flex justify-between items-start mb-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tool.ativo ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
              {tool.tool_tipo === 'search' ? <Search size={28}/> : <MapPin size={28}/>}
            </div>
            <button 
              onClick={() => toggleTool(tool)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tool.ativo ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-200 text-slate-500'}`}
            >
              {tool.ativo ? 'Ativo' : 'Inativo'}
            </button>
          </div>
          <Typography variant="small" className="font-bold text-brand-primary block mb-2 uppercase tracking-tight">{tool.tool_nome}</Typography>
          <Typography variant="caption" className="text-slate-400 normal-case leading-relaxed block mb-6">{tool.descricao}</Typography>
          
          <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
            <ShieldAlert size={14} className={tool.risco === 'alto' ? 'text-rose-500' : 'text-amber-500'} />
            <Typography variant="caption" className="text-[9px] font-black uppercase text-slate-400">Risco HM: {tool.risco}</Typography>
          </div>
        </div>
      ))}
    </div>
  );
};
