
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Send, X, MessageCircle, User, Sparkles, Bot, Search, 
  ArrowLeft, Users, Zap, ShieldCheck, Clock, RefreshCw, 
  Headset, LayoutGrid, Megaphone, HelpCircle, ChevronRight, 
  Mail, ExternalLink, Bell, Shield, Settings2, Command, BookOpen,
  MessageSquare, FileText, ChevronLeft, ArrowRight
} from 'lucide-react';
import { streamOrchestratedResponse } from '../services/geminiService.ts';
import { AiAgentsRouter } from '../modules/ai-agents/ai-agents-router.ts';
import { SolutionsRouter } from '../modules/solutions/solutions-router.ts';
import { supabase } from '../services/supabaseService.ts';
import { ConversationMessage, AiAgent } from '../types.ts';
import { Typography } from './atoms/Typography.tsx';
import { Button } from './atoms/Button.tsx';

type WidgetTab = 'INICIO' | 'NOTICIAS' | 'MENSAGENS' | 'AJUDA';
type WidgetState = 'QUALIFY' | 'BROWSE' | 'CHAT_ACTIVE' | 'READ_ARTICLE';

interface LegalChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  isInternal?: boolean;
}

export const LegalChatWidget: React.FC<LegalChatWidgetProps> = ({ isOpen, onClose, isInternal = false }) => {
  const [activeTab, setActiveTab] = useState<WidgetTab>('INICIO');
  const [viewState, setViewState] = useState<WidgetState>(isInternal ? 'BROWSE' : 'QUALIFY');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>('guest');
  const [agent, setAgent] = useState<AiAgent | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [qualifyData, setQualifyData] = useState({ name: '', email: '', step: 0 });
  
  const [solutionsSearch, setSolutionsSearch] = useState('');
  const [solutionsResults, setSolutionsResults] = useState<any[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const checkAuth = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setCurrentUser(session.user);
      setUserRole(session.user.email?.includes('admin') ? 'admin' : 'cliente');
      setViewState('BROWSE');
      loadAgentContext('Roberto', `Sr(a). ${session.user.user_metadata?.full_name?.split(' ')[0] || 'Usuário'}`); 
    } else {
      setUserRole('guest');
      if (!isInternal) setViewState('QUALIFY');
      loadAgentContext('Carlos', 'Visitante');
    }
  }, [isInternal]);

  useEffect(() => { if (isOpen) checkAuth(); }, [isOpen, checkAuth]);

  useEffect(() => {
    if (activeTab === 'AJUDA') {
       const timer = setTimeout(() => {
          SolutionsRouter.fetchArticles(undefined, solutionsSearch.length > 2 ? solutionsSearch : undefined, 5)
            .then(setSolutionsResults);
       }, 300);
       return () => clearTimeout(timer);
    }
  }, [solutionsSearch, activeTab]);

  const loadAgentContext = useCallback(async (agentName: string, userName: string) => {
    try {
      const config = await AiAgentsRouter.fetchAgentByName(agentName);
      if (config && messages.length === 0) {
        setAgent(config);
        setMessages([{ role: 'model', text: `Olá, ${userName}! Sou o ${config.nome}. Como posso auxiliar na sua demanda hoje?`, timestamp: Date.now() }]);
      }
    } catch (e) { }
  }, [messages.length]);

  const handleQualify = () => {
    if (qualifyData.step === 0 && qualifyData.name.length > 2) setQualifyData({ ...qualifyData, step: 1 });
    else if (qualifyData.step === 1 && qualifyData.email.includes('@')) setViewState('BROWSE');
  };

  const openArticle = async (art: any) => {
    setViewState('READ_ARTICLE');
    setSelectedArticle(art);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText, timestamp: Date.now() }]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      let fullResponse = "";
      setMessages(prev => [...prev, { role: 'model', text: "", timestamp: Date.now() }]);

      const stream = streamOrchestratedResponse(userText, history, agent?.id || 'default');
      for await (const chunk of stream) {
        if (typeof chunk === 'string') {
          fullResponse += chunk;
          setMessages(prev => {
            const updated = [...prev];
            if (updated.length > 0) updated[updated.length - 1].text = fullResponse;
            return updated;
          });
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Houve uma instabilidade neural.", timestamp: Date.now() }]);
    } finally { setIsLoading(false); }
  };

  if (!isOpen) return (
    <button onClick={onClose} className="fixed bottom-6 right-6 w-16 h-16 bg-[#1a2b4a] text-brand-secondary rounded-2xl shadow-[0_10px_40px_rgba(26,43,74,0.4)] flex items-center justify-center z-[999] hover:scale-110 active:scale-95 transition-all border border-brand-secondary/20 group">
      <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-brand-secondary text-[#1a2b4a] rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black">!</div>
    </button>
  );

  return (
    <div className={`fixed bottom-6 right-6 w-[90vw] md:w-[420px] h-[680px] max-h-[90vh] bg-white rounded-[3rem] shadow-[0_25px_80px_rgba(26,43,74,0.3)] flex flex-col border z-[999] overflow-hidden animate-in slide-in-from-bottom-10 font-sans ${userRole === 'admin' ? 'border-white/10 bg-[#132038]' : 'border-slate-100'}`}>
      
      {/* HEADER DINÂMICO SEM PRETO */}
      <div className={`p-8 text-white relative overflow-hidden transition-all duration-700 ${userRole === 'admin' ? 'bg-[#1a2b4a] border-b border-white/5' : 'bg-[#1a2b4a]'}`}>
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 blur-2xl ${userRole === 'admin' ? 'bg-blue-400/10' : 'bg-brand-secondary/20'}`} />
        <div className="flex justify-between items-start relative z-10">
          <div className="flex items-center gap-4">
             {viewState === 'READ_ARTICLE' ? (
                <button onClick={() => setViewState('BROWSE')} className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"><ChevronLeft size={20}/></button>
             ) : (
                <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full bg-brand-secondary text-[#1a2b4a] flex items-center justify-center text-xs font-black border-2 border-[#1a2b4a] shadow-lg overflow-hidden uppercase">
                       {currentUser ? currentUser.email?.[0] : qualifyData.name?.[0] || 'H'}
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black border-2 shadow-lg ${userRole === 'admin' ? 'bg-blue-600 text-white border-[#132038]' : 'bg-white text-[#1a2b4a] border-[#1a2b4a]'}`}>
                       {userRole === 'admin' ? <Shield size={14}/> : <Bot size={14}/>}
                    </div>
                </div>
             )}
             <div>
                <Typography variant="small" className={`font-black uppercase tracking-widest text-[9px] block ${userRole === 'admin' ? 'text-blue-400' : 'text-brand-secondary'}`}>
                   {viewState === 'READ_ARTICLE' ? 'Artigo de Ajuda' : (userRole === 'admin' ? 'Kernel Digital Hub' : 'Balcão de Atendimento')}
                </Typography>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                   <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Protocolo V13.11</span>
                </div>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors"><X size={24}/></button>
        </div>
      </div>

      <div className={`flex-1 overflow-hidden flex flex-col ${userRole === 'admin' ? 'bg-[#132038]' : 'bg-[#F8FAFC]'}`}>
        
        {viewState === 'QUALIFY' && (
          <div className="p-10 flex flex-col items-center justify-center text-center space-y-8 h-full bg-white animate-in fade-in">
            <div className="w-20 h-20 bg-brand-accent rounded-[2.2rem] flex items-center justify-center text-[#1a2b4a] shadow-inner border border-slate-100">
               <ShieldCheck size={32} />
            </div>
            <Typography variant="h4" font="serif" className="text-[#1a2b4a]">Acesso Seguro</Typography>
            <div className="w-full space-y-4">
               <input type={qualifyData.step === 0 ? "text" : "email"} placeholder={qualifyData.step === 0 ? "Seu Nome Completo" : "Seu E-mail"} className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-brand-secondary/10 font-bold text-[#1a2b4a]" value={qualifyData.step === 0 ? qualifyData.name : qualifyData.email} onChange={e => setQualifyData({...qualifyData, [qualifyData.step === 0 ? 'name' : 'email']: e.target.value})} />
               <Button variant="secondary" fullWidth className="h-16 rounded-2xl" onClick={handleQualify}>Próximo</Button>
            </div>
          </div>
        )}

        {viewState === 'BROWSE' && (
          <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in pb-24">
            {activeTab === 'INICIO' && (
              <div className="p-8 space-y-6">
                 <button onClick={() => setViewState('CHAT_ACTIVE')} className="w-full p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all flex items-center justify-between group">
                    <div className="text-left space-y-1">
                       <Typography variant="small" className="text-brand-primary font-black uppercase text-xs block">Falar com Agente</Typography>
                       <Typography variant="caption" className="text-slate-400 normal-case">Iniciar diálogo estratégico.</Typography>
                    </div>
                    <ChevronRight size={24} className="text-brand-secondary group-hover:translate-x-1 transition-all" />
                 </button>
                 
                 <div className="bg-[#1a2b4a] p-10 rounded-[3rem] text-white relative overflow-hidden">
                    <Zap size={60} className="absolute right-[-10px] top-[-10px] opacity-10" />
                    <Typography variant="small" className="font-black uppercase text-[10px] mb-4 block text-brand-secondary tracking-widest">Self-Service Jurídico</Typography>
                    <Typography variant="caption" className="text-white/60 normal-case leading-relaxed block mb-8 text-sm">
                       Explore nossa base de soluções para dúvidas comuns sobre processos e leis.
                    </Typography>
                    <button onClick={() => setActiveTab('AJUDA')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-secondary hover:text-white transition-all">Ver Base de Conhecimento <ArrowRight size={14}/></button>
                 </div>
              </div>
            )}
            {/* Resto das abas seguem o mesmo padrão de cor primária #1a2b4a */}
          </div>
        )}

        {viewState === 'CHAT_ACTIVE' && (
          <div className="flex-1 flex flex-col animate-in slide-in-from-bottom-5 bg-white">
             <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
               {messages.map((msg, i) => (
                 <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] p-5 rounded-3xl text-[13px] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-[#1a2b4a] text-white font-bold rounded-tr-none' : 'bg-[#F4F7FA] text-slate-700 rounded-tl-none border border-slate-100'}`}>
                     {msg.text}
                     <div className="text-[8px] mt-2 opacity-30 font-bold text-right">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                   </div>
                 </div>
               ))}
               {isLoading && <div className="p-4 flex gap-2 animate-pulse"><div className="w-2 h-2 bg-brand-secondary rounded-full" /></div>}
             </div>
             <div className="p-6 border-t bg-white border-slate-50">
               <div className="flex items-center gap-3 rounded-2xl p-2 bg-slate-50 border border-slate-100 shadow-inner">
                 <input type="text" placeholder="Sua dúvida estratégica..." className="flex-1 bg-transparent p-4 outline-none text-sm font-medium" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} />
                 <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-3 bg-[#1a2b4a] text-brand-secondary rounded-xl shadow-lg"><Send size={20}/></button>
               </div>
             </div>
          </div>
        )}

        {viewState !== 'QUALIFY' && (
          <div className="absolute bottom-0 left-0 w-full backdrop-blur-3xl border-t border-slate-100 bg-white/95 px-8 py-4 flex justify-between items-center shadow-2xl z-50">
            {[
              { id: 'INICIO', label: 'Início', icon: <LayoutGrid size={22}/> },
              { id: 'MENSAGENS', label: 'Chat', icon: <MessageSquare size={22}/> },
              { id: 'AJUDA', label: 'Soluções', icon: <HelpCircle size={22}/> }
            ].map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id as WidgetTab); setViewState('BROWSE'); }} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === tab.id ? 'text-[#1a2b4a]' : 'text-slate-400'}`}>
                {tab.icon}
                <span className="text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
