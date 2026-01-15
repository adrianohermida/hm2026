
import React, { useState, useRef, useEffect } from 'react';
import { 
  Ticket as IconeTicket, Search, Clock, ShieldCheck, 
  User, Send, Lock, Scale, RefreshCw, 
  ArrowLeft, CheckCircle2, AlertTriangle, FileText,
  Paperclip, MoreVertical, Shield, Wifi, Globe,
  Filter, ChevronDown, CheckCircle, ExternalLink,
  MessageSquare, UserCheck, BookOpen, AlertCircle, Zap, Bot, Sparkles,
  Mail, ListChecks, DollarSign, PlusCircle, Trash2
} from 'lucide-react';
import { Typography } from './Typography.tsx';
import { Button } from './Button.tsx';
import { useTickets } from '../hooks/useTickets.ts';
import { ResponseSelector } from './ResponseSelector.tsx';
import { servicoTickets } from '../services/supabaseService.ts';
import { emailService } from '../services/emailService.ts';
import { paymentService } from '../services/paymentService.ts';
import { TarefaTicket } from '../types.ts';

export const HelpDesk: React.FC = () => {
  const {
    tickets,
    ticketAtivo,
    // HM-V12 Fix: Mapped threads to historico
    threads: historico,
    // HM-V12 Fix: Mapped loading to carregando
    loading: carregando,
    enviando,
    analisandoIA,
    filtroBusca,
    setFiltroBusca,
    // HM-V12 Fix: Mapped refresh to carregarTickets
    refresh: carregarTickets,
    selecionarTicket,
    enviarMensagem,
    // HM-V12 Fix: Mapped analisarComIA to sugerirRespostaIA
    analisarComIA: sugerirRespostaIA,
    // HM-V12 Fix: Mapped atualizarStatus to alterarSituacao
    atualizarStatus: alterarSituacao
  } = useTickets();

  const [texto, setTexto] = useState('');
  const [interna, setInterna] = useState(false);
  const [modoEnvio, setModoEnvio] = useState<'ticket' | 'email'>('ticket');
  const [tarefas, setTarefas] = useState<TarefaTicket[]>([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [showRespostas, setShowRespostas] = useState(false);
  const [analiseIA, setAnaliseIA] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ticketAtivo) {
       servicoTickets.buscarTarefas(ticketAtivo.id).then(setTarefas);
    }
  }, [ticketAtivo]);

  const dispararEnvio = async () => {
    if (!texto.trim() || !ticketAtivo) return;

    if (modoEnvio === 'email') {
      await emailService.sendEmail({
        to: ticketAtivo.contatos?.email || '',
        subject: `[${ticketAtivo.protocolo}] - ${ticketAtivo.assunto}`,
        body: texto,
        ticket_id: ticketAtivo.id
      });
      await enviarMensagem(`[E-mail Enviado via SendGrid]\n\n${texto}`, false);
    } else {
      await enviarMensagem(texto, interna);
    }
    setTexto('');
  };

  const handleAddTarefa = async () => {
    if (!novaTarefa.trim() || !ticketAtivo) return;
    const task = await servicoTickets.registrarTarefa(ticketAtivo.id, novaTarefa);
    setTarefas(prev => [...prev, task]);
    setNovaTarefa('');
  };

  const handleIASuggestion = async () => {
    const analise = await sugerirRespostaIA();
    if (analise) {
      setAnaliseIA(analise);
      if (analise.sugestao_resposta) {
        setTexto(analise.sugestao_resposta);
      }
    }
  };

  return (
    <div className="flex h-full bg-white overflow-hidden rounded-[2.5rem] shadow-xl border border-slate-100 font-sans relative">
      <aside className={`w-[320px] border-r border-slate-100 flex flex-col bg-slate-50/20 ${ticketAtivo ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-6 border-b border-slate-100 bg-white">
           <div className="flex items-center justify-between mb-4">
              <Typography variant="small" className="font-black uppercase tracking-widest text-brand-primary">Fila de Tickets</Typography>
              <button onClick={carregarTickets} className="p-2 hover:bg-slate-100 rounded-lg"><RefreshCw size={14} className={carregando ? 'animate-spin' : ''}/></button>
           </div>
           <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar..."
                className="w-full bg-slate-100 border-none rounded-xl py-2 pl-10 pr-4 text-xs"
                value={filtroBusca}
                onChange={e => setFiltroBusca(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
           </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
           {tickets.map(t => (
             <button 
              key={t.id}
              onClick={() => selecionarTicket(t)}
              className={`w-full text-left p-4 rounded-2xl transition-all border ${ticketAtivo?.id === t.id ? 'bg-brand-primary text-white border-brand-primary shadow-lg' : 'bg-white border-slate-100 hover:border-brand-secondary/30'}`}
             >
                <div className="flex justify-between items-center mb-1">
                   <Typography variant="caption" className={`text-[8px] font-black ${ticketAtivo?.id === t.id ? 'text-brand-secondary' : 'text-slate-400'}`}>#{t.protocolo}</Typography>
                   <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${t.situacao === 'concluido' ? 'bg-slate-400' : 'bg-emerald-500'} text-white`}>{t.situacao}</span>
                </div>
                <Typography variant="small" className="font-bold block truncate text-xs">{t.assunto}</Typography>
             </button>
           ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-white">
        {ticketAtivo ? (
          <>
            <header className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shadow-sm">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center text-brand-primary"><MessageSquare size={20}/></div>
                  <div>
                     <Typography variant="small" className="font-bold text-brand-primary block leading-none">{ticketAtivo.assunto}</Typography>
                     <Typography variant="caption" className="text-slate-400 normal-case">{ticketAtivo.contatos?.nome_completo}</Typography>
                  </div>
               </div>
               <Button variant="outline" size="sm" onClick={() => selecionarTicket(null)}>Fechar</Button>
            </header>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/10 custom-scrollbar">
               {historico.map(h => (
                  <div key={h.id} className={`flex ${h.autor_tipo === 'advogado' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[80%] ${h.autor_tipo === 'advogado' ? 'bg-brand-primary text-white rounded-tr-none' : 'bg-white text-slate-700 border-slate-100 rounded-tl-none'} p-5 rounded-2xl shadow-sm border`}>
                        <Typography variant="body" className="text-sm">{h.mensagem}</Typography>
                     </div>
                  </div>
               ))}
            </div>
            <div className="p-6 border-t border-slate-100 bg-white">
               <div className="flex gap-2 mb-4">
                  <button onClick={() => setInterna(false)} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase border ${!interna ? 'bg-brand-secondary text-brand-primary border-brand-secondary' : 'bg-slate-100 text-slate-400'}`}>Pública</button>
                  <button onClick={() => setInterna(true)} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase border ${interna ? 'bg-brand-primary text-brand-secondary border-brand-primary' : 'bg-slate-100 text-slate-400'}`}>Interna</button>
               </div>
               <div className="relative">
                  <textarea 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 pr-20 min-h-[100px] text-sm outline-none focus:border-brand-secondary/30"
                    placeholder="Sua resposta..."
                    value={texto}
                    onChange={e => setTexto(e.target.value)}
                  />
                  <button onClick={dispararEnvio} className="absolute right-4 bottom-4 w-12 h-12 bg-brand-secondary text-brand-primary rounded-xl flex items-center justify-center shadow-lg"><Send size={20}/></button>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center opacity-20"><IconeTicket size={64}/></div>
        )}
      </main>
    </div>
  );
};
