
import React from 'react';
import { MessageSquare, Plus, Clock, ChevronRight } from 'lucide-react';
import { Typography } from '../../../atoms/Typography.tsx';

export const PortalTickets: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <Typography variant="h3" font="serif" className="text-brand-primary text-3xl">Suporte & Chamados</Typography>
          <Typography variant="caption" className="text-slate-400 font-black tracking-widest mt-2 block">Interação Direta com a Equipe Jurídica</Typography>
        </div>
        <button className="bg-brand-secondary text-brand-primary px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-brand-secondaryLight hover:shadow-xl transition-all flex items-center gap-2 shadow-lg shadow-brand-secondary/20">
          <Plus size={16} /> Abrir Chamado
        </button>
      </div>

      <div className="grid gap-4">
        {[
          { id: 'TKT-9921', subject: 'Dúvida sobre Extrato do Banco X', status: 'EM ATENDIMENTO', date: 'há 10 min' },
          { id: 'TKT-8840', subject: 'Envio de Documento de Renda', status: 'CONCLUÍDO', date: 'há 2 dias' }
        ].map((tkt, i) => (
          <button key={i} className="p-8 bg-white border border-slate-200 rounded-[2.5rem] flex items-center justify-between group hover:shadow-lg transition-all text-left hover:border-brand-secondary/30">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 group-hover:bg-brand-primary group-hover:text-brand-secondary transition-all">
                <MessageSquare size={24} />
              </div>
              <div>
                <Typography variant="small" className="font-bold text-brand-primary block mb-1 uppercase text-base">{tkt.subject}</Typography>
                <Typography variant="caption" className="text-slate-500 font-mono">Protocolo: {tkt.id} • Atualizado {tkt.date}</Typography>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase border ${tkt.status === 'CONCLUÍDO' ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                {tkt.status}
              </span>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
