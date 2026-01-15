import React, { useEffect, useState } from 'react';
import { GraduationCap, ThumbsUp, ThumbsDown, MessageSquare, ArrowRight, Zap, Database, CheckCircle2, History, AlertCircle } from 'lucide-react';
import { Typography } from '../../../components/atoms/Typography.tsx';
import { AiAgentUsageLog } from '../../../types.ts';
import { AiAgentsRouter } from '../ai-agents-router.ts';

export const AgentTrainingManager: React.FC<{ agentId: string }> = ({ agentId }) => {
  const [logs, setLogs] = useState<AiAgentUsageLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'error' | 'success'>('all');

  useEffect(() => {
    loadLogs();
  }, [agentId]);

  const loadLogs = async () => {
    setLoading(true);
    const data = await AiAgentsRouter.fetchUsageLogs(agentId);
    setLogs(data);
    setLoading(false);
  };

  const convertToRAG = async (log: AiAgentUsageLog) => {
    const { error } = await AiAgentsRouter.saveFaqEntry({
      agent_id: agentId,
      pergunta: log.prompt_text || '',
      resposta: log.response_text || '',
      origem: 'ia_aprimorada',
      ativo: true,
      aprovado: true
    });

    if (!error) {
      alert("Conhecimento integrado à base RAG com sucesso!");
    }
  };

  const filteredLogs = logs.filter(l => {
    if (filter === 'error') return !l.sucesso;
    if (filter === 'success') return l.sucesso;
    return true;
  });

  if (loading) return <div className="py-20 text-center opacity-30 animate-pulse">Analizando Ledger de Diálogos...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-brand-primary p-12 rounded-[3.5rem] text-white flex items-center justify-between border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
           <GraduationCap size={120} />
        </div>
        <div className="relative z-10 flex items-center gap-8">
          <div className="w-16 h-16 bg-brand-secondary rounded-[1.5rem] flex items-center justify-center text-brand-primary shadow-xl">
            <GraduationCap size={32} />
          </div>
          <div>
            <Typography variant="h3" font="serif" className="mb-2">Interface de Evolução</Typography>
            <Typography variant="caption" className="text-white/40 normal-case leading-relaxed">
              Audite interações reais e treine o agente convertendo diálogos em base RAG.
            </Typography>
          </div>
        </div>
        <div className="relative z-10 flex gap-2 p-1.5 bg-white/5 rounded-2xl">
           {(['all', 'success', 'error'] as const).map(f => (
             <button 
              key={f} 
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-brand-secondary text-brand-primary' : 'text-white/40 hover:text-white'}`}
             >
               {f === 'all' ? 'Todos' : f === 'success' ? 'Estáveis' : 'Falhas'}
             </button>
           ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredLogs.length === 0 ? (
          <div className="py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200 opacity-40">
             <History size={48} className="mx-auto mb-4" />
             <Typography variant="small">Nenhum log capturado para este filtro.</Typography>
          </div>
        ) : filteredLogs.map(log => (
          <div key={log.id} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group border-l-[12px] border-l-slate-100 hover:border-l-brand-secondary">
            <div className="flex justify-between items-start mb-8">
               <div className="flex gap-4 items-center">
                  <div className={`w-3 h-3 rounded-full ${log.sucesso ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`} />
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    ID: {log.id.slice(0,8)} • {new Date(log.criado_em).toLocaleString()}
                  </span>
               </div>
               <div className="flex gap-3">
                  <button onClick={() => convertToRAG(log)} className="flex items-center gap-2 px-6 py-3 bg-brand-accent text-brand-primary rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-brand-secondary transition-all">
                    <Database size={14} /> Ensinar RAG
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="space-y-3">
                  <Typography variant="caption" className="text-slate-400 font-black uppercase text-[8px] tracking-[0.2em]">Entrada do Titular</Typography>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-[13px] text-slate-600 leading-relaxed italic">
                    "{log.prompt_text}"
                  </div>
               </div>
               <div className="space-y-3">
                  <Typography variant="caption" className="text-brand-secondary font-black uppercase text-[8px] tracking-[0.2em]">Resposta Sintetizada</Typography>
                  <div className="p-6 bg-brand-primary/5 rounded-2xl border border-brand-secondary/10 text-[13px] text-brand-primary font-medium leading-relaxed">
                    {log.response_text}
                  </div>
               </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between opacity-30 group-hover:opacity-100 transition-opacity">
               <div className="flex gap-8">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Zap size={14} className="text-amber-500" />
                    <span className="text-[10px] font-bold uppercase">{log.tokens_input + log.tokens_output} Tokens</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <History size={14} />
                    <span className="text-[10px] font-bold uppercase">{log.tempo_resposta_ms}ms</span>
                  </div>
               </div>
               {log.erro_mensagem && (
                 <div className="flex items-center gap-2 text-rose-600">
                   <AlertCircle size={14} />
                   <span className="text-[10px] font-bold uppercase">{log.erro_mensagem}</span>
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
