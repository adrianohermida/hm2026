
import React, { useState, useEffect, useRef } from 'react';
import { LogOut, ShieldCheck, Ticket as IconeTicket, User, Send, Lock, LayoutDashboard, Shield, Settings, Bot } from 'lucide-react';
import { Typography } from './Typography.tsx';
import { servicoTickets, supabase } from '../services/supabaseService.ts';
import { AiAgentsRouter } from '../modules/ai-agents/ai-agents-router.ts';
import { streamOrchestratedResponse } from '../services/geminiService.ts';
import { Ticket, HistoricoTicket, ConversationMessage, AiAgent } from '../types.ts';

export const ClientPortalPage: React.FC<{ onLogout: () => void; onSwitchAdmin?: () => void }> = ({ onLogout, onSwitchAdmin }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketAtivo, setTicketAtivo] = useState<Ticket | null>(null);
  const [historico, setHistorico] = useState<HistoricoTicket[]>([]);
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [internalAgent, setInternalAgent] = useState<AiAgent | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    servicoTickets.buscarTicketsCliente().then(setTickets).finally(() => setCarregando(false));
    AiAgentsRouter.fetchAgentByName('Roberto').then(setInternalAgent);
  }, []);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [historico]);

  const selecionarTicket = async (ticket: Ticket) => {
    setTicketAtivo(ticket);
    const h = await servicoTickets.buscarHistorico(ticket.id);
    setHistorico(h.filter(msg => !msg.eh_interno));
  };

  const enviarMensagem = async () => {
    if (!mensagem.trim() || !ticketAtivo) return;
    const { data: { user } } = await (supabase.auth as any).getUser();
    await servicoTickets.registrarMensagem({ 
      ticket_id: ticketAtivo.id, 
      autor_tipo: 'cliente', 
      autor_nome: user?.user_metadata?.full_name || 'Titular', 
      mensagem, 
      eh_interno: false 
    });
    setMensagem('');
    const h = await servicoTickets.buscarHistorico(ticketAtivo.id);
    setHistorico(h.filter(msg => !msg.eh_interno));
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      <aside className={`w-full lg:w-[360px] border-r border-slate-100 flex flex-col bg-slate-50/30 ${ticketAtivo ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-8 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center font-serif font-black text-brand-secondary shadow-lg">HM</div>
            <div>
              <Typography variant="h4" font="serif" className="text-brand-primary text-lg">Portal do Cliente</Typography>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <Typography variant="caption" className="text-slate-400 text-[8px] font-black uppercase">Canal Protegido</Typography>
              </div>
            </div>
          </div>
          
          {internalAgent && (
            <div className="p-4 bg-brand-accent rounded-2xl border border-brand-secondary/10 flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-secondary rounded-xl flex items-center justify-center text-brand-primary">
                <Bot size={20} />
              </div>
              <div>
                <Typography variant="small" className="font-bold text-brand-primary block">{internalAgent.nome}</Typography>
                <Typography variant="caption" className="text-slate-500 text-[8px]">Suporte interno ativo</Typography>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {tickets.map(t => (
            <button key={t.id} onClick={() => selecionarTicket(t)} className={`w-full text-left p-6 rounded-[2rem] border transition-all ${ticketAtivo?.id === t.id ? 'bg-brand-primary text-white border-brand-primary shadow-xl' : 'bg-white border-slate-100 hover:shadow-lg'}`}>
              <Typography variant="caption" className={`text-[9px] font-black ${ticketAtivo?.id === t.id ? 'text-brand-secondary' : 'text-slate-400'}`}>#{t.protocolo}</Typography>
              <Typography variant="small" className={`font-bold block truncate text-sm uppercase ${ticketAtivo?.id === t.id ? 'text-white' : 'text-brand-primary'}`}>{t.assunto}</Typography>
            </button>
          ))}
        </div>

        <div className="p-8 space-y-3">
          {onSwitchAdmin && (
            <button onClick={onSwitchAdmin} className="w-full flex items-center gap-3 p-4 text-brand-primary hover:bg-brand-accent transition-all font-black uppercase text-[10px] tracking-widest bg-white border border-slate-200 rounded-2xl">
              <Settings size={18} /> Administração
            </button>
          )}
          <button onClick={onLogout} className="w-full flex items-center gap-3 p-4 text-slate-400 hover:text-rose-500 transition-all font-black uppercase text-[10px] tracking-widest bg-slate-50 rounded-2xl">
            <LogOut size={18} /> Sair do Portal
          </button>
        </div>
      </aside>

      <main className={`flex-1 flex flex-col bg-white ${!ticketAtivo ? 'hidden lg:flex' : 'flex'}`}>
        {ticketAtivo ? (
          <>
            <header className="p-6 lg:px-10 border-b border-slate-100 flex items-center gap-6 bg-white shadow-sm z-10">
              <button onClick={() => setTicketAtivo(null)} className="lg:hidden p-2 bg-slate-100 rounded-lg"><LayoutDashboard size={20}/></button>
              <Shield size={28} className="text-brand-primary" />
              <Typography variant="h4" font="serif" className="text-brand-primary text-xl tracking-tight">{ticketAtivo.assunto}</Typography>
            </header>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 bg-slate-50/10 custom-scrollbar">
              {historico.map(h => (
                <div key={h.id} className={`flex ${h.autor_tipo === 'cliente' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] lg:max-w-[70%] p-6 rounded-[2rem] border text-sm leading-relaxed ${h.autor_tipo === 'cliente' ? 'bg-brand-primary text-white rounded-tr-none' : 'bg-white text-slate-700 border-slate-100 rounded-tl-none'}`}>
                    <p className="whitespace-pre-wrap">{h.mensagem}</p>
                    <Typography variant="caption" className="mt-2 block opacity-30 text-[9px]">{new Date(h.criado_em).toLocaleString()}</Typography>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 lg:p-8 bg-white border-t border-slate-100 shadow-sm z-20">
              <div className="max-w-4xl mx-auto flex items-center gap-4">
                <textarea className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 outline-none resize-none min-h-[80px] text-sm focus:border-brand-secondary/20" placeholder="Escreva sua dúvida jurídica..." value={mensagem} onChange={e => setMensagem(e.target.value)} />
                <button onClick={enviarMensagem} disabled={!mensagem.trim()} className="w-16 h-16 bg-brand-secondary text-brand-primary rounded-2xl flex items-center justify-center shadow-2xl hover:scale-105 transition-all disabled:opacity-30"><Send size={28} /></button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center opacity-30">
            <IconeTicket size={80} className="mb-4" />
            <Typography variant="h3" font="serif">Selecione um Protocolo</Typography>
          </div>
        )}
      </main>
    </div>
  );
};
