
import React, { useState, useEffect } from 'react';
import { 
  Ticket as TicketIcon, MessageSquare, ShieldCheck, Search, Filter, 
  Clock, CheckCircle2, AlertTriangle, User, Send, 
  MoreVertical, Paperclip, Lock, Activity, ChevronRight,
  Database, Scale, Mail, FileText, Settings
} from 'lucide-react';
import { Typography } from '../atoms/Typography.tsx';
import { Button } from '../atoms/Button.tsx';
import { governanceService } from '../../services/supabaseService.ts';
// Fix: TicketThread and TicketStatus are now aliases in types.ts
import { Ticket as TicketType, TicketThread, TicketStatus } from '../../types.ts';

const PriorityBadge: React.FC<{ priority: string }> = ({ priority }) => {
  const colors: any = {
    'urgente': 'bg-rose-500 text-white',
    'alta': 'bg-amber-500 text-white',
    'media': 'bg-blue-500 text-white',
    'baixa': 'bg-slate-400 text-white'
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black tracking-widest uppercase border border-white/10 ${colors[priority.toLowerCase()] || 'bg-slate-400 text-white'}`}>
      {priority}
    </span>
  );
};

export const TicketHelpDeskPage: React.FC = () => {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [threads, setThreads] = useState<TicketThread[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'closed'>('all');
  const [messageInput, setMessageInput] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadTickets(); }, []);

  const loadTickets = async () => {
    setLoading(true);
    // Fix: method alias added to governanceService
    const data = await governanceService.fetchTickets();
    setTickets(data);
    setLoading(false);
  };

  const selectTicket = async (ticket: TicketType) => {
    setSelectedTicket(ticket);
    // Fix: method alias added to governanceService
    const data = await governanceService.fetchTicketThreads(ticket.id);
    setThreads(data);
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedTicket) return;
    
    // Bridge espera parâmetros em inglês para mapeamento interno no supabaseService
    const newThread: any = {
      ticket_id: selectedTicket.id,
      body: messageInput,
      sender_type: 'agente',
      is_internal: isInternal
    };

    // Fix: method alias added to governanceService
    await governanceService.sendTicketMessage(newThread);
    setMessageInput('');
    // Fix: method alias added to governanceService
    const updatedThreads = await governanceService.fetchTicketThreads(selectedTicket.id);
    setThreads(updatedThreads);
  };

  return (
    <div className="flex h-full bg-white overflow-hidden animate-in fade-in duration-500">
      {/* Listagem de Tickets (Sidebar Interna) */}
      <div className="w-[400px] border-r border-slate-100 flex flex-col bg-slate-50/30">
        <div className="p-8 border-b border-slate-100 bg-white">
           <div className="flex items-center justify-between mb-6">
              <Typography variant="h4" font="serif" className="text-brand-primary">Tickets</Typography>
              <div className="flex gap-2">
                 <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Filter size={18} className="text-slate-400"/></button>
                 <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Search size={18} className="text-slate-400"/></button>
              </div>
           </div>
           
           <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
              {(['all', 'my', 'closed'] as const).map(tab => (
                 <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === tab ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-400'}`}
                 >
                   {tab === 'all' ? 'Todos' : tab === 'my' ? 'Meus' : 'Fechados'}
                 </button>
              ))}
           </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
           {loading ? (
             Array(5).fill(0).map((_, i) => <div key={i} className="h-32 bg-slate-100 rounded-[2rem] animate-pulse" />)
           ) : (
             tickets.map(ticket => (
                <button 
                  key={ticket.id}
                  onClick={() => selectTicket(ticket)}
                  className={`w-full text-left p-6 rounded-[2rem] border transition-all duration-300 group relative overflow-hidden ${selectedTicket?.id === ticket.id ? 'bg-brand-primary text-white shadow-xl scale-[1.02] border-brand-primary' : 'bg-white border-slate-100 hover:border-brand-secondary/30 hover:shadow-lg'}`}
                >
                   <div className="flex justify-between items-start mb-4">
                      {/* Fix: protocol -> protocolo, priority -> prioridade */}
                      <Typography variant="caption" className={`text-[8px] font-black ${selectedTicket?.id === ticket.id ? 'text-brand-secondary' : 'text-slate-400'}`}>{ticket.protocolo}</Typography>
                      <PriorityBadge priority={ticket.prioridade} />
                   </div>
                   {/* Fix: subject -> assunto */}
                   <Typography variant="small" className={`font-bold block truncate mb-1 ${selectedTicket?.id === ticket.id ? 'text-white' : 'text-brand-primary'}`}>{ticket.assunto}</Typography>
                   <div className="flex items-center gap-2 mt-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedTicket?.id === ticket.id ? 'bg-white/10' : 'bg-slate-100'}`}>
                         <User size={14} className={selectedTicket?.id === ticket.id ? 'text-brand-secondary' : 'text-slate-400'} />
                      </div>
                      <div className="flex-1 min-w-0">
                         {/* Fix: contact_id -> contato_id */}
                         <Typography variant="caption" className={`block truncate lowercase normal-case ${selectedTicket?.id === ticket.id ? 'text-white/60' : 'text-slate-500'}`}>Cliente ID: {ticket.contato_id?.slice(0,8)}...</Typography>
                      </div>
                      <Clock size={12} className="text-slate-400" />
                   </div>
                </button>
             ))
           )}
        </div>
      </div>

      {/* Área de Conversação / Detalhes */}
      <div className="flex-1 flex flex-col bg-slate-50/10">
        {selectedTicket ? (
          <>
            {/* Header do Ticket */}
            <div className="p-8 border-b border-slate-100 bg-white flex justify-between items-center shadow-sm relative z-10">
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-brand-accent rounded-2xl flex items-center justify-center text-brand-primary shadow-inner">
                     <Scale size={24} />
                  </div>
                  <div>
                     <div className="flex items-center gap-3 mb-1">
                        {/* Fix: subject -> assunto, status -> situacao */}
                        <Typography variant="h4" font="serif" className="text-brand-primary">{selectedTicket.assunto}</Typography>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[9px] font-black tracking-widest uppercase">{selectedTicket.situacao}</span>
                     </div>
                     <div className="flex gap-4">
                        {/* Fix: protocol -> protocolo */}
                        <Typography variant="caption" className="text-slate-400 normal-case flex items-center gap-1"><Database size={12}/> {selectedTicket.protocolo}</Typography>
                        <Typography variant="caption" className="text-slate-400 normal-case flex items-center gap-1"><Lock size={12}/> LGPD: CONSENTIDO</Typography>
                     </div>
                  </div>
               </div>
               <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="border-slate-200 text-brand-primary">Encerrar Ticket</Button>
                  <Button variant="secondary" size="sm" icon={<Settings size={16}/>}>Ações</Button>
               </div>
            </div>

            {/* Timeline de Mensagens */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.8]">
               {threads.map(thread => (
                  <div key={thread.id} className={`flex ${thread.autor_tipo === 'agente' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[70%] group ${thread.autor_tipo === 'agente' ? 'text-right' : 'text-left'}`}>
                        <div className="flex items-center gap-3 mb-2 px-2 justify-end flex-row-reverse">
                           <Typography variant="caption" className="text-slate-400 text-[9px] font-black uppercase tracking-widest uppercase">{thread.autor_tipo}</Typography>
                           {thread.eh_interno && <span className="bg-amber-100 text-amber-700 text-[8px] font-black px-2 py-0.5 rounded-full border border-amber-200 uppercase">Interno</span>}
                        </div>
                        <div className={`p-6 rounded-[2rem] shadow-sm border ${thread.autor_tipo === 'agente' ? 'bg-brand-primary text-white border-brand-primary rounded-tr-none' : 'bg-white text-slate-700 border-slate-100 rounded-tl-none'}`}>
                           {/* Fix: Properties aligned with HistoricoTicket */}
                           <Typography variant="body" className="text-sm leading-relaxed">{thread.mensagem}</Typography>
                        </div>
                        {/* Fix: Property aligned with HistoricoTicket */}
                        <Typography variant="caption" className="mt-2 block px-4 opacity-30 text-[8px]">{new Date(thread.criado_em).toLocaleString()}</Typography>
                     </div>
                  </div>
               ))}
            </div>

            {/* Input de Resposta */}
            <div className="p-8 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
               <div className="max-w-4xl mx-auto">
                  <div className="flex gap-4 mb-4">
                     <button 
                        onClick={() => setIsInternal(!isInternal)}
                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border ${isInternal ? 'bg-amber-500 text-white border-amber-500' : 'bg-slate-50 text-slate-400 border-slate-100'}`}
                     >
                        <Lock size={12}/> {isInternal ? 'Nota Interna Ativa' : 'Resposta Pública'}
                     </button>
                     <button className="px-4 py-2 bg-slate-50 border border-slate-100 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-100 transition-colors">
                        <Paperclip size={12}/> Anexo
                     </button>
                  </div>
                  <div className="relative group">
                     <textarea 
                        className="w-full bg-slate-50 border-none rounded-[2rem] p-8 pr-32 focus:ring-2 focus:ring-brand-secondary/20 outline-none transition-all resize-none min-h-[120px] text-brand-primary font-medium shadow-inner"
                        placeholder={isInternal ? "Escreva uma nota técnica visível apenas para a equipe..." : "Digite sua resposta jurídica aqui..."}
                        value={messageInput}
                        onChange={e => setMessageInput(e.target.value)}
                        onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                     />
                     <button 
                        onClick={handleSendMessage}
                        className="absolute right-6 bottom-6 w-14 h-14 bg-brand-secondary text-brand-primary rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
                     >
                        <Send size={24} />
                     </button>
                  </div>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-20 animate-in zoom-in duration-1000">
             <div className="w-32 h-32 bg-slate-50 rounded-[3.5rem] flex items-center justify-center mb-8 border border-slate-100 shadow-inner">
                <TicketIcon size={48} className="text-slate-200" />
             </div>
             <Typography variant="h3" font="serif" className="text-brand-primary mb-4 opacity-40">Selecione um Protocolo</Typography>
             <Typography variant="body" className="text-slate-400 max-w-sm mx-auto leading-relaxed">
                Utilize a barra lateral para acessar os tickets ativos. Cada interação é monitorada e auditada pelo sistema de governança HM-V12.
             </Typography>
          </div>
        )}
      </div>

      {/* Sidebar de Auditoria e Info (Multitenant context) */}
      <div className="w-[300px] bg-slate-50/50 border-l border-slate-100 overflow-y-auto hidden xl:block p-8">
         <Typography variant="caption" className="text-brand-primary font-black mb-8 block uppercase tracking-widest border-b pb-4 border-slate-200">Contexto do Caso</Typography>
         
         {selectedTicket ? (
           <div className="space-y-10">
              <section>
                 <Typography variant="caption" className="text-slate-400 mb-4 block font-black text-[9px]">SLA & Performance</Typography>
                 <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm text-center">
                    <Typography variant="h4" font="serif" className="text-emerald-500 mb-1">04:22:15</Typography>
                    <Typography variant="caption" className="text-slate-400 lowercase normal-case text-[10px]">Tempo restante de resposta</Typography>
                 </div>
              </section>

              <section>
                 <Typography variant="caption" className="text-slate-400 mb-4 block font-black text-[9px]">Conformidade LGPD</Typography>
                 <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[10px] font-medium text-slate-600">
                       <ShieldCheck size={14} className="text-emerald-500"/> Consentimento Coletado
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-medium text-slate-600">
                       <CheckCircle2 size={14} className="text-emerald-500"/> Finalidade Definida
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-medium text-slate-600">
                       <Lock size={14} className="text-emerald-500"/> Retenção: 5 anos
                    </div>
                 </div>
              </section>

              <section>
                 <Typography variant="caption" className="text-slate-400 mb-4 block font-black text-[9px]">Ledger de Auditoria</Typography>
                 <div className="space-y-4">
                    {[
                       { action: 'Ticket Criado', date: 'Hoje, 09:12' },
                       { action: 'Triagem IA', date: 'Hoje, 09:13' },
                       { action: 'Atribuído ao Dr.', date: 'Hoje, 09:45' }
                    ].map((log, i) => (
                       <div key={i} className="flex gap-3 relative pl-4">
                          <div className="absolute left-0 top-1 w-[2px] h-full bg-slate-100" />
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary absolute left-[-2px] top-1" />
                          <div>
                             <Typography variant="small" className="text-brand-primary font-bold block text-[10px]">{log.action}</Typography>
                             <Typography variant="caption" className="text-slate-400 normal-case text-[9px]">{log.date}</Typography>
                          </div>
                       </div>
                    ))}
                 </div>
              </section>
           </div>
         ) : (
           <div className="space-y-8 opacity-20 grayscale">
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="h-32 bg-slate-200 rounded-3xl" />
              <div className="h-4 bg-slate-200 rounded w-2/3" />
              <div className="h-20 bg-slate-200 rounded-2xl" />
           </div>
         )}
      </div>
    </div>
  );
};
