
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, Filter, Clock, CheckCircle2, User, 
  Send, Paperclip, Lock, Scale, Database, 
  Settings, ChevronLeft, ShieldCheck, Tag, Info, AlertCircle
} from 'lucide-react';
import { Typography } from '../atoms/Typography.tsx';
import { Button } from '../atoms/Button.tsx';
import { servicoGovernanca } from '../../services/supabaseService.ts';
// HM-V12: Map legacy names to unified ticket types
import { Ticket as Chamado, TicketThread as HistoricoChamado, TicketStatus as StatusChamado } from '../../types.ts';

const SeloStatus: React.FC<{ status: StatusChamado }> = ({ status }) => {
  // HM-V12: Added missing 'triagem' status to the map to satisfy Record<TicketStatus, ...> type requirement
  const map: Record<StatusChamado, { label: string; cor: string }> = {
    'aberto': { label: 'Aberto', cor: 'bg-emerald-500' },
    'aguardando': { label: 'Aguardando', cor: 'bg-amber-500' },
    'pendente': { label: 'Pendente', cor: 'bg-blue-500' },
    'concluido': { label: 'Encerrado', cor: 'bg-slate-400' },
    'vencido': { label: 'Vencido', cor: 'bg-rose-600 animate-pulse' },
    'triagem': { label: 'Em Triagem', cor: 'bg-indigo-600' },
    'analise_automatica': { label: 'Triagem IA', cor: 'bg-indigo-500 animate-pulse' }
  };
  const config = map[status] || map['aberto'];
  return (
    <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest text-white shadow-sm ${config.cor}`}>
      {config.label}
    </span>
  );
};

export const HelpDeskPage: React.FC = () => {
  const [fila, setFila] = useState<Chamado[]>([]);
  const [selecionado, setSelecionado] = useState<Chamado | null>(null);
  const [historico, setHistorico] = useState<HistoricoChamado[]>([]);
  const [mensagem, setMensagem] = useState('');
  const [ehInterno, setEhInterno] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregarDados = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      // Fix: Use aliased fetchTickets method from servicoGovernanca
      const dados = await servicoGovernanca.fetchTickets();
      setFila(dados);
    } catch (e: any) {
      setErro('Falha ao conectar com o Ledger de Chamados.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => { carregarDados(); }, [carregarDados]);

  const abrirCaso = async (c: Chamado) => {
    setSelecionado(c);
    // Fix: Use aliased fetchTicketThreads method from servicoGovernanca
    const h = await servicoGovernanca.fetchTicketThreads(c.id);
    setHistorico(h);
  };

  const enviarResposta = async () => {
    if (!mensagem.trim() || !selecionado) return;
    try {
      // Fix: Use aliased sendTicketMessage method and updated to autor_tipo
      await servicoGovernanca.sendTicketMessage({
        ticket_id: selecionado.id,
        mensagem: mensagem,
        autor_tipo: 'advogado',
        eh_interno: ehInterno
      });
      setMensagem('');
      // Fix: Use aliased fetchTicketThreads method from servicoGovernanca
      const h = await servicoGovernanca.fetchTicketThreads(selecionado.id);
      setHistorico(h);
    } catch (e) {
      alert('HM-V12: Falha ao registrar mensagem no Ledger.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full bg-white overflow-hidden font-sans animate-in fade-in duration-500">
      
      {/* FILA LATERAL */}
      <div className={`w-full lg:w-[400px] border-r border-slate-100 flex flex-col bg-slate-50/10 ${selecionado ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-10 border-b border-slate-100 bg-white shadow-sm">
           <Typography variant="h3" font="serif" className="text-brand-primary mb-6">Central de Atendimento</Typography>
           <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl shadow-inner">
              <button className="flex-1 py-3 bg-white text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-xl shadow-md">Ativos</button>
              <button className="flex-1 py-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">Prazos</button>
           </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
           {carregando ? (
             Array(4).fill(0).map((_, i) => <div key={i} className="h-32 bg-slate-100 rounded-[2.5rem] animate-pulse" />)
           ) : erro ? (
             <div className="text-center py-20 px-6 opacity-40">
                <AlertCircle size={48} className="mx-auto mb-4 text-rose-500" />
                <Typography variant="small" className="font-bold">{erro}</Typography>
             </div>
           ) : fila.length > 0 ? (
             fila.map(c => (
                <button 
                  key={c.id}
                  onClick={() => abrirCaso(c)}
                  className={`w-full text-left p-8 rounded-[2.5rem] border transition-all duration-300 relative group ${selecionado?.id === c.id ? 'bg-brand-primary text-white border-brand-primary shadow-2xl scale-[1.02]' : 'bg-white border-slate-100 hover:border-brand-secondary/30 hover:shadow-lg'}`}
                >
                   <div className="flex justify-between mb-4">
                      {/* HM-V12: protocol -> protocolo */}
                      <Typography variant="caption" className={`text-[9px] font-black uppercase tracking-widest ${selecionado?.id === c.id ? 'text-brand-secondary' : 'text-slate-400'}`}>PROTOCOLO #{c.protocolo}</Typography>
                      <SeloStatus status={c.situacao} />
                   </div>
                   {/* HM-V12: subject -> assunto */}
                   <Typography variant="small" className={`font-bold block truncate text-base uppercase tracking-tight ${selecionado?.id === c.id ? 'text-white' : 'text-brand-primary'}`}>{c.assunto}</Typography>
                   <div className="flex items-center gap-3 mt-6">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner ${selecionado?.id === c.id ? 'bg-white/10' : 'bg-brand-accent'}`}>
                         <User size={16} className={selecionado?.id === c.id ? 'text-brand-secondary' : 'text-slate-400'} />
                      </div>
                      <Typography variant="caption" className={`normal-case text-[11px] font-medium ${selecionado?.id === c.id ? 'text-white/60' : 'text-slate-500'}`}>
                        {/* HM-V12: contacts -> contatos, full_name -> nome_completo */}
                        {c.contatos?.nome_completo || 'Cliente Registrado'}
                      </Typography>
                   </div>
                </button>
             ))
           ) : (
             <div className="flex flex-col items-center justify-center h-full text-center opacity-20 py-20">
                <Info size={48} className="mb-4" />
                <Typography variant="small">Fila de atendimento vazia.</Typography>
             </div>
           )}
        </div>
      </div>

      {/* PAINEL DE CONVERSA */}
      <div className={`flex-1 flex flex-col bg-slate-50/5 ${!selecionado ? 'hidden lg:flex' : 'flex'}`}>
        {selecionado ? (
          <>
            <div className="p-8 lg:p-12 border-b border-slate-100 flex items-center justify-between bg-white shadow-sm z-10 relative overflow-hidden">
               <div className="flex items-center gap-8 relative z-10">
                  <button onClick={() => setSelecionado(null)} className="lg:hidden p-3 bg-slate-100 rounded-2xl"><ChevronLeft size={20}/></button>
                  <div className="w-16 h-16 bg-brand-accent rounded-[2rem] flex items-center justify-center text-brand-primary border border-slate-100 shadow-inner">
                     <Scale size={28} />
                  </div>
                  <div>
                     {/* HM-V12: subject -> assunto */}
                     <Typography variant="h3" font="serif" className="text-brand-primary mb-1 tracking-tight">{selecionado.assunto}</Typography>
                     <div className="flex gap-6 items-center">
                        <Typography variant="caption" className="text-emerald-600 normal-case flex items-center gap-2 font-black tracking-widest uppercase"><ShieldCheck size={14}/> CONFORMIDADE ATIVA</Typography>
                        {/* HM-V12: protocol -> protocolo */}
                        <Typography variant="caption" className="text-slate-400 normal-case flex items-center gap-2 font-medium tracking-tight uppercase"><Database size={14}/> PROTOCOLO: {selecionado.protocolo}</Typography>
                     </div>
                  </div>
               </div>
               <div className="hidden md:flex gap-4 relative z-10">
                  <Button variant="outline" size="sm" className="border-slate-200 text-brand-primary h-12 px-6 font-black uppercase text-[10px] tracking-widest">Suspender Caso</Button>
                  <Button variant="secondary" size="sm" icon={<Settings size={18}/>} className="h-12 px-6 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-brand-secondary/20">Gerenciar</Button>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 lg:p-14 space-y-12 bg-white/50 custom-scrollbar">
               {historico.length > 0 ? historico.map(h => (
                  <div key={h.id} className={`flex ${h.autor_tipo === 'advogado' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-5 duration-500`}>
                     <div className={`max-w-[85%] lg:max-w-[75%] ${h.autor_tipo === 'advogado' ? 'text-right' : 'text-left'}`}>
                        <div className={`flex items-center gap-4 mb-3 px-6 ${h.autor_tipo === 'advogado' ? 'flex-row-reverse' : ''}`}>
                           {/* HM-V12: Properties aligned with HistoricoTicket */}
                           <Typography variant="caption" className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{h.autor_tipo === 'advogado' ? 'Advocacia HM' : 'Cliente'}</Typography>
                           {/* HM-V12: Mapping to unified eh_interno field */}
                           {h.eh_interno && <span className="bg-amber-100 text-amber-700 text-[8px] font-black px-3 py-1 rounded-full uppercase border border-amber-200 shadow-sm">Nota Interna</span>}
                        </div>
                        <div className={`p-10 rounded-[3rem] border shadow-2xl leading-relaxed text-lg transition-all ${h.autor_tipo === 'advogado' ? 'bg-brand-primary text-white border-brand-primary rounded-tr-none' : 'bg-white text-slate-700 border-slate-100 rounded-tl-none'}`}>
                           {/* HM-V12: Proper property name from types.ts */}
                           <Typography variant="body" className="leading-relaxed">{h.mensagem}</Typography>
                        </div>
                        {/* HM-V12: Proper property name from types.ts */}
                        <Typography variant="caption" className="mt-4 block px-8 opacity-20 text-[9px] font-medium italic">{new Date(h.criado_em).toLocaleString('pt-BR')}</Typography>
                     </div>
                  </div>
               )) : (
                 <div className="flex flex-col items-center justify-center h-full text-center opacity-30 py-20">
                    <Database size={48} className="mb-4" />
                    <Typography variant="small">Ledger de conversas vazio or em triagem.</Typography>
                 </div>
               )}
            </div>

            <div className="p-10 bg-white border-t border-slate-100 shadow-[0_-20px_60px_rgba(0,0,0,0.03)]">
               <div className="max-w-5xl mx-auto">
                  <div className="flex gap-4 mb-6">
                     <button onClick={() => setEhInterno(!ehInterno)} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all flex items-center gap-3 shadow-sm ${ehInterno ? 'bg-amber-500 text-white border-amber-500 shadow-amber-500/20 shadow-lg' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                        <Lock size={14}/> {ehInterno ? 'Nota Interna Ativada' : 'Resposta Pública'}
                     </button>
                     <button className="px-6 py-3 bg-slate-50 border border-slate-100 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-slate-100 transition-colors">
                        <Paperclip size={14}/> Anexo Probatório
                     </button>
                  </div>
                  <div className="relative group">
                     <textarea 
                        className="w-full bg-slate-50 border-none rounded-[3rem] p-10 pr-40 focus:ring-4 focus:ring-brand-secondary/10 outline-none transition-all resize-none min-h-[160px] text-brand-primary font-medium shadow-inner text-xl leading-relaxed"
                        placeholder={ehInterno ? "Escreva notas técnicas visíveis apenas para a equipe..." : "Escreva sua orientação jurídica..."}
                        value={mensagem}
                        onChange={e => setMensagem(e.target.value)}
                        onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviarResposta(); } }}
                     />
                     <button onClick={enviarResposta} className="absolute right-8 bottom-8 w-20 h-20 bg-brand-secondary text-brand-primary rounded-[2rem] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all shadow-brand-secondary/40 group">
                        <Send size={32} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </button>
                  </div>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center animate-in zoom-in duration-1000 opacity-20">
             <Scale size={80} className="text-slate-200 mb-8" />
             <Typography variant="h2" font="serif" className="text-brand-primary">Selecione um Caso para Auditoria</Typography>
          </div>
        )}
      </div>
    </div>
  );
};
