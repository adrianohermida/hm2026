
import React from 'react';
import { MessageSquare, Plus, Clock, ChevronRight } from 'lucide-react';
import { Typography } from '../../../atoms/Typography.tsx';

export const PortalTickets: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <Typography variant="h3" font="serif" className="text-white text-3xl">Suporte & Chamados</Typography>
          <Typography variant="caption" className="text-brand-secondary font-black tracking-widest mt-2 block">Interação Direta com a Equipe Jurídica</Typography>
        </div>
        <button className="bg-brand-secondary text-brand-primary px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all flex items-center gap-2">
          <Plus size={16} /> Abrir Chamado
        </button>
      </div>

      <div className="grid gap-4">
        {[
          { id: 'TKT-9921', subject: 'Dúvida sobre Extrato do Banco X', status: 'EM ATENDIMENTO', date: 'há 10 min' },
          { id: 'TKT-8840', subject: 'Envio de Documento de Renda', status: 'CONCLUÍDO', date: 'há 2 dias' }
        ].map((tkt, i) => (
          <button key={i} className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:bg-white/[0.06] transition-all text-left">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-secondary border border-white/5 group-hover:rotate-6 transition-all">
                <MessageSquare size={24} />
              </div>
              <div>
                <Typography variant="small" className="font-bold text-white block mb-1 uppercase text-base">{tkt.subject}</Typography>
                <Typography variant="caption" className="text-slate-500 font-mono">Protocolo: {tkt.id} • Atualizado {tkt.date}</Typography>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase ${tkt.status === 'CONCLUÍDO' ? 'bg-slate-500/20 text-slate-400' : 'bg-brand-secondary/20 text-brand-secondary'}`}>
                {tkt.status}
              </span>
              <ChevronRight size={18} className="text-white/10 group-hover:text-brand-secondary group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
