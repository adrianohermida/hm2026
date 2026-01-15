
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, MoreVertical, Clock, User, AlertCircle, 
  ChevronRight, ArrowRightLeft, RefreshCw, Filter, 
  Search, ShieldCheck, Zap
} from 'lucide-react';
import { Typography } from '../../../components/atoms/Typography.tsx';
import { HelpDeskRouter } from '../helpdesk-router.ts';
import { HelpDeskLabels } from '../helpdesk-skeleton.tsx';
import { Ticket, SituacaoTicket } from '../../../types.ts';

/**
 * HM-V12: KANBAN DE GOVERNANÇA JURÍDICA
 * Visualização tática baseada em estados do Ledger.
 */
export const KanbanBoard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [movingId, setMovingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await HelpDeskRouter.fetchAll();
    setTickets(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleMove = async (ticketId: string, newStatus: SituacaoTicket) => {
    setMovingId(ticketId);
    try {
      await HelpDeskRouter.updateStatus(ticketId, newStatus);
      setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, situacao: newStatus } : t));
    } catch (e) {
      alert("Falha na transição de estado no Ledger.");
    } finally {
      setMovingId(null);
    }
  };

  const columns: SituacaoTicket[] = ['aberto', 'triagem', 'pendente', 'aguardando', 'concluido'];

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-700">
      {/* BARRA DE FILTROS KANBAN */}
      <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
           <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar no board..."
                className="bg-slate-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-[11px] outline-none w-64 focus:ring-2 focus:ring-brand-secondary/20"
              />
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
           </div>
           <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all"><Filter size={16}/></button>
        </div>
        <div className="flex gap-3">
           <button onClick={load} className="flex items-center gap-2 px-6 py-2.5 bg-brand-accent text-brand-primary rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-100 hover:bg-white transition-all">
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Recarregar Board
           </button>
        </div>
      </div>

      {/* BOARD VIEWPORT */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-6 custom-scrollbar-horizontal">
        {columns.map(col => {
          const colTickets = tickets.filter(t => t.situacao === col);
          const colInfo = HelpDeskLabels.status[col];

          return (
            <div key={col} className="min-w-[320px] w-[320px] flex flex-col gap-4">
              <div className="flex items-center justify-between px-6 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${colInfo.color}`} />
                  <Typography variant="small" className="text-brand-primary font-black uppercase tracking-widest text-[10px]">
                    {colInfo.label}
                  </Typography>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded-lg font-bold">{colTickets.length}</span>
              </div>

              <div className="flex-1 bg-slate-100/30 rounded-[2.5rem] p-3 space-y-4 overflow-y-auto custom-scrollbar border border-transparent hover:border-slate-200/50 transition-all">
                {colTickets.map(ticket => (
                  <div 
                    key={ticket.id}
                    className={`bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden ${movingId === ticket.id ? 'opacity-50 grayscale' : ''}`}
                  >
                    {/* INDICADOR DE PRIORIDADE */}
                    {/* HM-V12 Fix: Updated 'priorities' to 'prioridades' to match HelpDeskLabels definition in helpdesk-skeleton.tsx */}
                    <div className={`absolute top-0 left-0 w-1.5 h-full ${HelpDeskLabels.prioridades[ticket.prioridade]?.color.replace('text', 'bg') || 'bg-slate-300'}`} />
                    
                    <div className="flex justify-between items-start mb-4">
                      <Typography variant="caption" className="text-[8px] font-black text-slate-300 tracking-widest uppercase">#{ticket.protocolo}</Typography>
                      <button className="text-slate-300 hover:text-brand-primary"><MoreVertical size={14}/></button>
                    </div>

                    <Typography variant="small" className="font-black text-brand-primary block text-sm uppercase leading-tight mb-4 group-hover:text-brand-secondary transition-colors">
                      {ticket.assunto}
                    </Typography>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
                       <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-brand-accent flex items-center justify-center text-brand-primary border border-slate-100">
                             <User size={12} />
                          </div>
                          <Typography variant="caption" className="text-[9px] text-slate-500 normal-case font-bold">{ticket.contatos?.nome_completo?.split(' ')[0] || 'Cliente'}</Typography>
                       </div>
                       
                       <div className="flex items-center gap-3">
                          {col !== 'concluido' && (
                            <button 
                              onClick={() => handleMove(ticket.id, columns[columns.indexOf(col) + 1])}
                              className="w-8 h-8 rounded-lg bg-slate-50 text-slate-300 hover:bg-brand-primary hover:text-brand-secondary transition-all flex items-center justify-center shadow-sm"
                            >
                               <ChevronRight size={16} />
                            </button>
                          )}
                       </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                       <div className="flex items-center gap-1.5 text-[8px] font-black uppercase text-rose-500">
                          <Clock size={10} /> 04:22
                       </div>
                       {ticket.prioridade === 'urgente' && (
                         <div className="flex items-center gap-1 px-2 py-0.5 bg-rose-500 text-white rounded-md text-[7px] font-black uppercase tracking-tighter animate-pulse">
                            <Zap size={8} /> Prioridade
                         </div>
                       )}
                    </div>
                  </div>
                ))}

                {colTickets.length === 0 && (
                  <div className="py-12 text-center opacity-10 flex flex-col items-center gap-3">
                     <ShieldCheck size={32} />
                     <Typography variant="caption" className="font-black uppercase tracking-widest text-[8px]">Vazio</Typography>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
