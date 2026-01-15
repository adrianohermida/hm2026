
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, User, Send, Lock, Scale, RefreshCw, 
  Plus, Edit2, Filter, X, Check, AlertCircle, Bot, Sparkles, MessageSquare,
  Tag, UserPlus, Info, Zap, Mail, Trash2, ChevronDown, Clock, Reply, Forward, StickyNote,
  MoreHorizontal, Paperclip, UserCheck, Shield, ShieldCheck, Bold, Italic, List, Code,
  AtSign, ChevronRight, Phone, MapPin, ExternalLink, Calendar
} from 'lucide-react';
import { Typography } from '../atoms/Typography.tsx';
import { Button } from '../atoms/Button.tsx';
import { useTickets } from '../../hooks/useTickets.ts';
import { HelpDeskLabels } from '../../modules/helpdesk/helpdesk-skeleton.tsx';
import { HelpDeskRouter } from '../../modules/helpdesk/helpdesk-router.ts';
import { Contato } from '../../types.ts';

type JourneyMode = 'REPLY' | 'NOTE' | 'FORWARD' | null;

export const HelpDesk: React.FC = () => {
  const {
    tickets, ticketAtivo, threads, contatos, loading, 
    filtroBusca, setFiltroBusca, filtroStatus, setFiltroStatus,
    selecionarTicket, enviarMensagem, atualizarStatus, refresh
  } = useTickets();

  // Estados de Interface
  const [journeyMode, setJourneyMode] = useState<JourneyMode>(null);
  const [message, setMessage] = useState('');
  const [fwdForm, setFwdForm] = useState({ to: '', cc: '', bcc: '' });
  const [showNewModal, setShowNewModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeContact, setActiveContact] = useState<Contato | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    if (ticketAtivo) {
      HelpDeskRouter.fetchContactDetails(ticketAtivo.contato_id).then(setActiveContact);
    }
  }, [threads, ticketAtivo]);

  const handleAction = async () => {
    if (!ticketAtivo || !message.trim()) return;
    setIsProcessing(true);
    try {
      if (journeyMode === 'REPLY') await enviarMensagem(message, false);
      if (journeyMode === 'NOTE') await enviarMensagem(message, true);
      if (journeyMode === 'FORWARD') {
        if (!fwdForm.to) throw new Error("Destinatário obrigatório.");
        await HelpDeskRouter.forwardAdvanced({ ticket_id: ticketAtivo.id, ...fwdForm, message });
        refresh();
      }
      setMessage('');
      setJourneyMode(null);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-full bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden font-sans">
      
      {/* SIDEBAR: FILA DE ATENDIMENTO */}
      <aside className={`w-[360px] border-r border-slate-100 flex flex-col bg-slate-50/10 ${ticketAtivo ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <Typography variant="h4" font="serif" className="text-brand-primary">Atendimentos</Typography>
            <button 
              onClick={() => setShowNewModal(true)}
              className="p-3 bg-brand-primary text-brand-secondary rounded-2xl shadow-xl hover:scale-110 transition-all"
            >
              <Plus size={20}/>
            </button>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Pesquisar protocolo..." 
              className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 text-xs outline-none focus:ring-2 focus:ring-brand-secondary/20 shadow-sm"
              value={filtroBusca}
              onChange={e => setFiltroBusca(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {tickets.map(t => (
            <button 
              key={t.id}
              onClick={() => selecionarTicket(t)}
              className={`w-full text-left p-6 rounded-[2.5rem] border transition-all relative ${ticketAtivo?.id === t.id ? 'bg-brand-primary text-white border-brand-primary shadow-2xl scale-[1.02]' : 'bg-white border-slate-100 hover:border-brand-secondary/20'}`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[8px] font-black uppercase tracking-widest opacity-60">#{t.protocolo}</span>
                <div className={`w-2 h-2 rounded-full ${HelpDeskLabels.status[t.situacao]?.color || 'bg-slate-300'}`} />
              </div>
              <Typography variant="small" className="font-bold block truncate text-xs uppercase mb-4">{t.assunto}</Typography>
              <div className="flex items-center justify-between pt-3 border-t border-slate-50/10">
                <span className="text-[9px] font-medium opacity-60 truncate max-w-[120px]">{t.contatos?.nome_completo || 'Cliente'}</span>
                <span className={`text-[8px] font-black uppercase ${t.prioridade === 'urgente' ? 'text-rose-500' : 'text-slate-400'}`}>{t.prioridade}</span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* ÁREA CENTRAL: JORNADA FRESHDESK ELITE */}
      <main className="flex-1 flex flex-col bg-white overflow-hidden relative">
        {ticketAtivo ? (
          <>
            {/* TRIPARTITE TOOLBAR */}
            <header className="px-8 py-5 border-b border-slate-100 bg-white flex items-center justify-between sticky top-0 z-20">
               <div className="flex gap-4">
                  <button 
                    onClick={() => setJourneyMode('REPLY')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${journeyMode === 'REPLY' ? 'bg-brand-primary text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                  >
                    <Reply size={14}/> Responder
                  </button>
                  <button 
                    onClick={() => setJourneyMode('NOTE')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${journeyMode === 'NOTE' ? 'bg-amber-500 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                  >
                    <StickyNote size={14}/> Nota Interna
                  </button>
                  <button 
                    onClick={() => setJourneyMode('FORWARD')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${journeyMode === 'FORWARD' ? 'bg-[#0A1120] text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                  >
                    <Forward size={14}/> Encaminhar
                  </button>
               </div>
               <div className="flex gap-4 items-center">
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={14} /> Auditado
                  </span>
                  <button className="p-2 text-slate-300 hover:text-brand-primary"><MoreHorizontal size={20}/></button>
               </div>
            </header>

            {/* THREAD VIEW */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-12 bg-slate-50/10 custom-scrollbar">
              {threads.map((thread) => (
                <div key={thread.id} className={`flex ${thread.autor_tipo === 'advogado' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${thread.autor_tipo === 'advogado' ? 'text-right' : 'text-left'}`}>
                    <div className={`flex items-center gap-3 mb-4 px-6 ${thread.autor_tipo === 'advogado' ? 'flex-row-reverse' : ''}`}>
                       <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center text-brand-primary border border-slate-100 shadow-sm">
                          <User size={14}/>
                       </div>
                       <Typography variant="caption" className="text-slate-400 font-black uppercase text-[9px] tracking-widest">{thread.autor_nome}</Typography>
                       {thread.eh_interno && <span className="bg-amber-100 text-amber-700 text-[8px] font-black px-2.5 py-1 rounded-lg border border-amber-200">Nota Privada</span>}
                    </div>
                    <div className={`p-8 rounded-[3.5rem] shadow-sm leading-relaxed text-sm transition-all ${thread.eh_interno ? 'bg-amber-50/50 border border-amber-100 text-slate-700' : thread.autor_tipo === 'advogado' ? 'bg-brand-primary text-white rounded-tr-none shadow-xl' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm'}`}>
                      <p className="whitespace-pre-wrap">{thread.mensagem}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RICH EDITOR AREA (FRESHDESK STYLE) */}
            {journeyMode && (
              <div className="p-8 border-t border-slate-200 bg-white animate-in slide-in-from-bottom-10 duration-300 shadow-[0_-30px_60px_rgba(0,0,0,0.06)] z-30">
                <div className="max-w-5xl mx-auto space-y-6">
                  {/* Header do Editor */}
                  <header className="flex justify-between items-center">
                    <Typography variant="caption" className={`font-black uppercase tracking-widest ${journeyMode === 'REPLY' ? 'text-brand-primary' : journeyMode === 'NOTE' ? 'text-amber-500' : 'text-slate-800'}`}>
                      {journeyMode === 'REPLY' ? 'Responder ao Cliente (E-mail)' : journeyMode === 'NOTE' ? 'Adicionar Nota Interna' : 'Encaminhar Ticket'}
                    </Typography>
                    <button onClick={() => setJourneyMode(null)} className="p-2 text-slate-300 hover:text-rose-500"><X size={18}/></button>
                  </header>

                  {/* Campos de Encaminhamento Avançado */}
                  {journeyMode === 'FORWARD' && (
                    <div className="space-y-3 bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 animate-in fade-in">
                       <div className="flex gap-4 items-center border-b border-slate-200 pb-3">
                          <span className="text-[10px] font-black uppercase text-slate-400 w-12 text-right">Para:</span>
                          <input type="email" placeholder="email@destino.com.br" className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-brand-primary" value={fwdForm.to} onChange={e => setFwdForm({...fwdForm, to: e.target.value})}/>
                       </div>
                       <div className="flex gap-4 items-center border-b border-slate-200 pb-3">
                          <span className="text-[10px] font-black uppercase text-slate-400 w-12 text-right">CC:</span>
                          <input type="email" placeholder="cc@email.com" className="flex-1 bg-transparent border-none outline-none text-xs font-medium text-slate-500" value={fwdForm.cc} onChange={e => setFwdForm({...fwdForm, cc: e.target.value})}/>
                       </div>
                    </div>
                  )}

                  {/* BARRA DE FERRAMENTAS RICA */}
                  <div className="flex items-center justify-between px-6 py-3 bg-slate-50 rounded-t-[2.5rem] border border-slate-100 border-b-0">
                     <div className="flex gap-4 text-slate-400">
                        <button className="hover:text-brand-primary transition-colors"><Bold size={16}/></button>
                        <button className="hover:text-brand-primary transition-colors"><Italic size={16}/></button>
                        <button className="hover:text-brand-primary transition-colors border-l border-slate-200 pl-4"><List size={16}/></button>
                        <button className="hover:text-brand-primary transition-colors border-l border-slate-200 pl-4"><Code size={16}/></button>
                        <button className="hover:text-brand-primary transition-colors border-l border-slate-200 pl-4 flex items-center gap-1"><AtSign size={14}/> Placeholders</button>
                     </div>
                     <button className="text-[10px] font-black uppercase text-brand-secondary hover:underline transition-all">Ver Respostas Predefinidas</button>
                  </div>

                  <div className="relative">
                    <textarea 
                      className={`w-full rounded-b-[2.5rem] p-8 pr-32 outline-none border border-slate-100 transition-all min-h-[200px] text-base resize-none shadow-inner ${journeyMode === 'REPLY' ? 'bg-white focus:ring-4 focus:ring-brand-secondary/5' : journeyMode === 'NOTE' ? 'bg-amber-50/30' : 'bg-slate-50/30'}`}
                      placeholder={journeyMode === 'REPLY' ? "Olá, prezado..." : journeyMode === 'NOTE' ? "Anotação visível apenas para advogados..." : "Escreva o contexto do encaminhamento..."}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                    />
                    <div className="absolute right-6 bottom-6 flex flex-col gap-3">
                       <button className="p-4 bg-white text-slate-300 rounded-2xl border border-slate-100 hover:text-brand-primary shadow-sm"><Paperclip size={24}/></button>
                       <button 
                        onClick={handleAction}
                        disabled={isProcessing || !message.trim()}
                        className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-30 ${journeyMode === 'REPLY' ? 'bg-brand-primary text-brand-secondary' : journeyMode === 'NOTE' ? 'bg-amber-500 text-white shadow-amber-500/20' : 'bg-[#0A1120] text-white shadow-[#0A1120]/20'}`}
                       >
                         {isProcessing ? <RefreshCw className="animate-spin" size={24}/> : <Send size={28}/>}
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center opacity-20">
             <div className="w-48 h-48 bg-slate-50 rounded-[5rem] flex items-center justify-center mb-10 border border-slate-100 shadow-inner">
                <MessageSquare size={100} className="text-slate-300" />
             </div>
             <Typography variant="h2" font="serif" className="text-brand-primary">Kernel de Atendimento HM</Typography>
             <Typography variant="body" className="max-w-md mx-auto mt-4">Selecione um ticket na lista lateral para iniciar a jornada operacional v12.</Typography>
          </div>
        )}
      </main>

      {/* SIDEBAR CRM INTEGRADA: CONTEXTO DO CLIENTE */}
      <aside className="w-[340px] bg-white border-l border-slate-100 overflow-y-auto hidden xl:flex flex-col p-8 space-y-10 custom-scrollbar">
         <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <Typography variant="caption" className="text-brand-primary font-black uppercase tracking-[0.3em]">Contexto CRM</Typography>
            <button className="text-slate-300 hover:text-brand-primary"><ExternalLink size={16}/></button>
         </div>
         
         {activeContact ? (
           <div className="space-y-10 animate-in fade-in duration-500">
              {/* Header do Cliente */}
              <section className="text-center space-y-4">
                 <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-brand-accent mx-auto flex items-center justify-center text-brand-primary border-4 border-white shadow-xl ring-1 ring-slate-100">
                       <User size={40}/>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 text-white rounded-xl flex items-center justify-center border-4 border-white">
                       <ShieldCheck size={14}/>
                    </div>
                 </div>
                 <div>
                    <Typography variant="h4" font="serif" className="text-brand-primary text-lg">{activeContact.nome_completo}</Typography>
                    <Typography variant="caption" className="text-slate-400 lowercase font-medium">{activeContact.email}</Typography>
                 </div>
              </section>

              {/* Informações de Contato */}
              <section className="space-y-6">
                 <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-brand-primary transition-all shadow-sm"><Phone size={18}/></div>
                    <div>
                       <Typography variant="caption" className="text-slate-300 font-black uppercase text-[8px]">WhatsApp</Typography>
                       <Typography variant="small" className="font-bold text-slate-600">(51) 99603-2004</Typography>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-brand-primary transition-all shadow-sm"><MapPin size={18}/></div>
                    <div>
                       <Typography variant="caption" className="text-slate-300 font-black uppercase text-[8px]">Localização</Typography>
                       <Typography variant="small" className="font-bold text-slate-600">Porto Alegre, RS</Typography>
                    </div>
                 </div>
              </section>

              {/* Status do Ticket Ativo */}
              <section className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 space-y-6 shadow-inner">
                 <Typography variant="caption" className="text-brand-primary font-black uppercase text-[9px] block">Propriedades Ativas</Typography>
                 <div>
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Estado</label>
                    <select 
                      className="w-full bg-white border-none rounded-xl p-4 mt-2 text-xs font-bold text-brand-primary shadow-sm outline-none focus:ring-2 focus:ring-brand-secondary/20"
                      value={ticketAtivo?.situacao}
                      onChange={e => atualizarStatus(e.target.value as any)}
                    >
                       {/* HM-V12: Fixed property 'label' does not exist on type 'unknown' by casting to any */}
                       {Object.entries(HelpDeskLabels.status).map(([k, v]) => <option key={k} value={k}>{(v as any).label}</option>)}
                    </select>
                 </div>
                 <div className="pt-4 border-t border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                       <Typography variant="caption" className="text-slate-400 uppercase text-[8px] font-black">SLA Restante</Typography>
                       <span className="text-rose-500 font-black text-[10px]">04:22:15</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                       <div className="h-full bg-rose-500 w-[65%]" />
                    </div>
                 </div>
              </section>

              {/* Tags de Classificação */}
              <section className="space-y-4">
                 <Typography variant="caption" className="text-slate-400 font-black uppercase text-[9px] px-2">Tags do Caso</Typography>
                 <div className="flex flex-wrap gap-2">
                    {['Lei-14181', 'Acordo-Breve', 'Urgente'].map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-brand-primary/5 text-brand-primary border border-brand-primary/10 rounded-lg text-[9px] font-black uppercase tracking-tighter flex items-center gap-2 cursor-pointer hover:bg-brand-primary hover:text-white transition-all">
                        <Tag size={10}/> {tag}
                      </span>
                    ))}
                    <button className="p-1.5 bg-slate-100 text-slate-400 rounded-lg hover:bg-slate-200 transition-all"><Plus size={12}/></button>
                 </div>
              </section>
           </div>
         ) : (
           <div className="flex-1 flex flex-col items-center justify-center text-center opacity-10">
              <UserCheck size={60} />
              <Typography variant="caption" className="mt-4">Selecione um caso para auditoria CRM</Typography>
           </div>
         )}
      </aside>

      {/* MODAL: NOVO CASO INTEGRADO AO CRM */}
      {showNewModal && (
        <div className="absolute inset-0 bg-brand-primary/60 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[4rem] p-12 shadow-2xl space-y-10 animate-in zoom-in-95 duration-500 relative">
              <button onClick={() => setShowNewModal(false)} className="absolute top-8 right-8 p-3 hover:bg-slate-50 rounded-xl text-slate-300"><X size={28}/></button>
              
              <div>
                <Typography variant="h3" font="serif" className="text-brand-primary">Sintetizar Caso</Typography>
                <Typography variant="caption" className="text-brand-secondary font-black uppercase tracking-widest mt-2 block">Criação de Protocolo HM Digital</Typography>
              </div>

              <div className="space-y-8">
                 <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-3 tracking-widest">Cliente Requerente</label>
                    <select className="w-full bg-slate-50 border-none rounded-2xl p-5 mt-2 font-bold text-brand-primary text-sm shadow-inner outline-none">
                       <option value="">Pesquisar na base CRM...</option>
                       {contatos.map(c => <option key={c.id} value={c.id}>{c.nome_completo} ({c.email})</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-3 tracking-widest">Assunto Jurídico</label>
                    <input type="text" placeholder="Ex: Revisão de Cláusula de Superendividamento..." className="w-full bg-slate-50 border-none rounded-2xl p-5 mt-2 font-bold text-brand-primary text-sm shadow-inner outline-none" />
                 </div>
              </div>

              <div className="flex justify-end gap-6 pt-6 border-t border-slate-100">
                 <button onClick={() => setShowNewModal(false)} className="text-[10px] font-black uppercase text-slate-400 hover:text-brand-primary tracking-widest">Descartar</button>
                 <Button variant="secondary" className="h-16 px-12 rounded-2xl" icon={<Zap size={18}/>}>Gerar Protocolo</Button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
