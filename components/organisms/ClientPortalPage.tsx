
import React, { useState, useEffect, useRef } from 'react';
import { 
  LogOut, ShieldCheck, Ticket as IconeTicket, User, 
  Send, Lock, Clock, MessageSquare, Paperclip, 
  RefreshCw, CheckCircle2, ChevronRight, LayoutDashboard,
  Shield, FileText, Download, AlertCircle
} from 'lucide-react';
import { Typography } from '../atoms/Typography.tsx';
import { Button } from '../atoms/Button.tsx';
import { servicoTickets, supabase } from '../../services/supabaseService.ts';
import { Ticket, HistoricoTicket } from '../../types.ts';

export const ClientPortalPage: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketAtivo, setTicketAtivo] = useState<Ticket | null>(null);
  const [historico, setHistorico] = useState<HistoricoTicket[]>([]);
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    carregarTickets();
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [historico]);

  const carregarTickets = async () => {
    setCarregando(true);
    try {
      const data = await servicoTickets.buscarTicketsCliente();
      setTickets(data);
    } catch (e) {
      console.error(e);
    } finally {
      setCarregando(false);
    }
  };

  const selecionarTicket = async (ticket: Ticket) => {
    setTicketAtivo(ticket);
    const h = await servicoTickets.buscarHistorico(ticket.id);
    // Filtrar mensagens internas para o cliente (Isolamento de Sigilo)
    setHistorico(h.filter(msg => !msg.eh_interno));
  };

  const enviarMensagem = async () => {
    if (!mensagem.trim() || !ticketAtivo) return;
    setEnviando(true);
    try {
      // Fix: Property 'getUser' does not exist on type 'SupabaseAuthClient'. Casting to any for compatibility.
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
    } catch (e) {
      alert("Erro ao enviar mensagem.");
    } finally {
      setEnviando(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ticketAtivo) {
      setEnviando(true);
      try {
        await servicoTickets.uploadAnexo(ticketAtivo.id, file);
        const h = await servicoTickets.buscarHistorico(ticketAtivo.id);
        setHistorico(h.filter(msg => !msg.eh_interno));
      } catch (e) {
        alert("Falha no upload.");
      } finally {
        setEnviando(false);
      }
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      
      {/* SIDEBAR CLIENTE */}
      <aside className={`w-full lg:w-[360px] border-r border-slate-100 flex flex-col bg-slate-50/30 transition-all ${ticketAtivo ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-8 border-b border-slate-100 bg-white">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center font-serif font-black text-brand-secondary shadow-lg">HM</div>
              <div>
                 <Typography variant="h4" font="serif" className="text-brand-primary text-lg">Portal do Cliente</Typography>
                 <Typography variant="caption" className="text-brand-secondary text-[8px] tracking-[0.3em] font-black uppercase">Ambiente Auditado</Typography>
              </div>
           </div>
           
           <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
              <button className="flex-1 py-2.5 bg-white text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">Protocolos</button>
              <button className="flex-1 py-2.5 text-slate-400 text-[10px] font-black uppercase tracking-widest">Documentos</button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
           {carregando ? (
             Array(3).fill(0).map((_, i) => <div key={i} className="h-28 bg-white rounded-[2rem] animate-pulse" />)
           ) : tickets.length > 0 ? (
             tickets.map(t => (
               <button 
                key={t.id}
                onClick={() => selecionarTicket(t)}
                className={`w-full text-left p-6 rounded-[2rem] border transition-all relative ${ticketAtivo?.id === t.id ? 'bg-brand-primary text-white border-brand-primary shadow-xl' : 'bg-white border-slate-100 hover:shadow-lg'}`}
               >
                  <div className="flex justify-between items-center mb-3">
                     <Typography variant="caption" className={`text-[9px] font-black ${ticketAtivo?.id === t.id ? 'text-brand-secondary' : 'text-slate-400'}`}>#{t.protocolo}</Typography>
                     <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest text-white ${t.situacao === 'concluido' ? 'bg-slate-400' : 'bg-emerald-600'}`}>{t.situacao}</span>
                  </div>
                  <Typography variant="small" className={`font-bold block truncate text-sm uppercase ${ticketAtivo?.id === t.id ? 'text-white' : 'text-brand-primary'}`}>{t.assunto}</Typography>
               </button>
             ))
           ) : (
             <div className="py-20 text-center opacity-20">
                <IconeTicket size={48} className="mx-auto mb-4" />
                <Typography variant="caption">Nenhum protocolo ativo.</Typography>
             </div>
           )}
        </div>

        <div className="p-8 border-t border-slate-100 bg-white">
          <button onClick={onLogout} className="w-full flex items-center gap-3 p-4 text-slate-400 hover:text-rose-500 transition-all font-black uppercase text-[10px] tracking-widest bg-slate-50 rounded-2xl">
            <LogOut size={18} /> Sair do Portal
          </button>
        </div>
      </aside>

      {/* ÁREA DE INTERAÇÃO CLIENTE */}
      <main className={`flex-1 flex flex-col bg-white ${!ticketAtivo ? 'hidden lg:flex' : 'flex'}`}>
        {ticketAtivo ? (
          <>
            <header className="p-6 lg:px-10 border-b border-slate-100 flex items-center justify-between bg-white shadow-sm z-10">
               <div className="flex items-center gap-6">
                  <button onClick={() => setTicketAtivo(null)} className="lg:hidden p-2 bg-slate-100 rounded-lg"><LayoutDashboard size={20}/></button>
                  <div className="w-14 h-14 bg-brand-accent rounded-2xl flex items-center justify-center text-brand-primary shadow-inner">
                     <Shield size={28} />
                  </div>
                  <div>
                     <Typography variant="h4" font="serif" className="text-brand-primary text-xl tracking-tight mb-1">{ticketAtivo.assunto}</Typography>
                     <div className="flex items-center gap-4">
                        <Typography variant="caption" className="text-emerald-600 font-bold uppercase text-[9px] tracking-widest flex items-center gap-2">
                           <ShieldCheck size={12}/> Canal de Atendimento Criptografado
                        </Typography>
                     </div>
                  </div>
               </div>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 bg-slate-50/10 custom-scrollbar">
               {historico.map(h => (
                  <div key={h.id} className={`flex ${h.autor_tipo === 'cliente' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-500`}>
                     <div className={`max-w-[85%] lg:max-w-[70%] ${h.autor_tipo === 'cliente' ? 'text-right' : 'text-left'}`}>
                        <div className={`flex items-center gap-3 mb-2 px-2 ${h.autor_tipo === 'cliente' ? 'flex-row-reverse' : ''}`}>
                           <Typography variant="caption" className="text-slate-400 text-[9px] font-black uppercase tracking-widest">{h.autor_nome}</Typography>
                        </div>
                        <div className={`p-6 rounded-[2rem] border text-sm leading-relaxed shadow-sm ${h.autor_tipo === 'cliente' ? 'bg-brand-primary text-white border-brand-primary rounded-tr-none' : 'bg-white text-slate-700 border-slate-100 rounded-tl-none'}`}>
                           <p className="whitespace-pre-wrap">{h.mensagem}</p>
                        </div>
                        <Typography variant="caption" className="mt-2 block px-2 opacity-30 text-[9px] font-medium">{new Date(h.criado_em).toLocaleString()}</Typography>
                     </div>
                  </div>
               ))}
               {enviando && <div className="flex justify-end opacity-40 animate-pulse"><div className="bg-brand-primary h-12 w-32 rounded-xl" /></div>}
            </div>

            <div className="p-6 lg:p-8 bg-white border-t border-slate-100 shadow-sm z-20">
               <div className="max-w-4xl mx-auto space-y-4">
                  <div className="relative group">
                     <textarea 
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 pr-32 outline-none transition-all resize-none min-h-[120px] font-medium text-sm leading-relaxed shadow-inner focus:border-brand-secondary/20"
                        placeholder="Escreva sua mensagem..."
                        value={mensagem}
                        onChange={e => setMensagem(e.target.value)}
                        onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviarMensagem(); } }}
                     />
                     <div className="absolute right-5 bottom-5 flex items-center gap-3">
                        <label className="p-4 bg-slate-100 text-slate-400 rounded-2xl hover:bg-slate-200 cursor-pointer transition-all">
                           <Paperclip size={24} />
                           <input type="file" className="hidden" onChange={handleFileUpload} />
                        </label>
                        <button 
                           onClick={enviarMensagem}
                           disabled={enviando || !mensagem.trim()}
                           className="w-16 h-16 bg-brand-secondary text-brand-primary rounded-2xl flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
                        >
                           <Send size={28} />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center bg-slate-50/10 opacity-30">
             <IconeTicket size={80} className="text-slate-200 mb-8" />
             <Typography variant="h3" font="serif" className="text-brand-primary">Selecione um Protocolo</Typography>
          </div>
        )}
      </main>

      {/* PAINEL INFORMATIVO CLIENTE */}
      <aside className="w-[320px] bg-slate-50 border-l border-slate-100 hidden xl:flex flex-col p-8 space-y-10">
         <Typography variant="caption" className="text-brand-primary font-black uppercase tracking-[0.3em] border-b border-slate-200 pb-6 block text-center text-[10px]">Contexto Seguro</Typography>
         
         {ticketAtivo ? (
           <div className="space-y-10">
              <section className="bg-brand-primary p-8 rounded-[2rem] text-white shadow-xl text-center">
                 <ShieldCheck size={40} className="mx-auto text-brand-secondary mb-4" />
                 <Typography variant="small" className="font-bold block mb-2">Dados Protegidos</Typography>
                 <Typography variant="caption" className="text-white/60 normal-case leading-relaxed">Suas informações estão sob isolamento RLS e criptografia ponta-a-ponta.</Typography>
              </section>

              <section className="space-y-4">
                 <Typography variant="caption" className="text-slate-400 font-black uppercase text-[9px] px-2 tracking-widest">Ações Rápidas</Typography>
                 <button className="w-full flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl text-left hover:border-brand-secondary transition-all group">
                    <div>
                       <Typography variant="small" className="text-brand-primary font-bold block">Ver Contrato</Typography>
                       <Typography variant="caption" className="text-slate-400 normal-case">Prestação de serviços.</Typography>
                    </div>
                    <FileText size={20} className="text-slate-200 group-hover:text-brand-secondary transition-colors" />
                 </button>
                 <button className="w-full flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl text-left hover:border-brand-secondary transition-all group">
                    <div>
                       <Typography variant="small" className="text-brand-primary font-bold block">Baixar Guia</Typography>
                       <Typography variant="caption" className="text-slate-400 normal-case">Como funciona o caso.</Typography>
                    </div>
                    <Download size={20} className="text-slate-200 group-hover:text-brand-secondary transition-colors" />
                 </button>
              </section>

              <div className="p-6 bg-brand-accent rounded-2xl border border-slate-200">
                 <Typography variant="caption" className="text-brand-primary font-black uppercase text-[9px] mb-2 block">Protocolo Oficial</Typography>
                 <code className="text-[10px] text-slate-400 font-mono">{ticketAtivo.protocolo}</code>
              </div>
           </div>
         ) : (
           <div className="flex-1 flex flex-col items-center justify-center text-center opacity-10">
              <Lock size={60} />
              <Typography variant="caption" className="mt-4">Nenhum caso ativo.</Typography>
           </div>
         )}
      </aside>
    </div>
  );
};
