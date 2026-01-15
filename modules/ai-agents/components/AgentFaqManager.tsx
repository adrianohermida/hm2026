import React, { useEffect, useState } from 'react';
import { BookOpen, Plus, Search, Trash2, CheckCircle2 } from 'lucide-react';
import { Typography } from '../../../components/atoms/Typography.tsx';
import { Button } from '../../../components/atoms/Button.tsx';
import { AiAgentFaq } from '../../../types.ts';
import { AiAgentsRouter } from '../ai-agents-router.ts';

export const AgentFaqManager: React.FC<{ agentId: string }> = ({ agentId }) => {
  const [faqs, setFaqs] = useState<AiAgentFaq[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    AiAgentsRouter.fetchFaq(agentId).then(setFaqs);
  }, [agentId]);

  const filtered = faqs.filter(f => f.pergunta.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center gap-6">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Pesquisar na base de conhecimento..." 
            className="w-full bg-slate-50 border-none rounded-2xl p-5 pl-14 outline-none focus:ring-4 focus:ring-brand-secondary/10 transition-all font-medium"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
        </div>
        <Button variant="secondary" icon={<Plus size={18}/>}>Nova Entrada</Button>
      </div>

      <div className="grid gap-4">
        {filtered.map(faq => (
          <div key={faq.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-brand-primary text-brand-secondary text-[8px] font-black uppercase tracking-widest rounded-lg">ID: {faq.id.slice(0,8)}</span>
              <div className="flex gap-2">
                <button className="p-2 text-slate-200 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
              </div>
            </div>
            <Typography variant="small" className="font-bold text-brand-primary block mb-3 leading-relaxed text-base">P: {faq.pergunta}</Typography>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <Typography variant="caption" className="text-slate-500 normal-case leading-relaxed font-medium italic text-[13px]">R: {faq.resposta}</Typography>
            </div>
            <div className="mt-6 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={12} className="text-emerald-500" />
                <Typography variant="caption" className="text-[9px] font-black uppercase text-slate-400">Origem: {faq.origem}</Typography>
              </div>
              <Typography variant="caption" className="text-[9px] font-medium text-slate-400">Auditado por Adriano Maia</Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
