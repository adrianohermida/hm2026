import React, { useState, useEffect, useRef } from 'react';
/* HM-V12 Fix: Added CheckCircle2 to imports */
import { Headset, Send, Sparkles, ShieldCheck, RefreshCw, MessageSquare, Zap, User, ArrowLeft, Bot, CheckCircle2 } from 'lucide-react';
import { Container } from '../components/atoms/Container.tsx';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';
import { BalcaoVirtualLabels } from '../modules/balcao-virtual/balcao-virtual-skeleton.tsx';
import { BalcaoVirtualRouter } from '../modules/balcao-virtual/balcao-virtual-router.ts';
import { supabase } from '../services/supabaseService.ts';

type BVState = 'IDLE' | 'IDENTIFY' | 'TRIAGE' | 'DONE';

export const BalcaoVirtual: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<BVState>('IDLE');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [protocol, setProtocol] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, step]);

  // HM-V12: REALTIME P2P SYNC
  useEffect(() => {
    if (!session?.id) return;

    const channel = supabase.channel(`session_${session.id}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'balcao_virtual', 
        table: 'logs_conversas',
        filter: `sessao_id=eq.${session.id}`
      }, (payload) => {
        // Se a mensagem vier do Admin ('model'), adicionamos ao chat
        if (payload.new.role === 'model') {
          setMessages(prev => {
            // Evita duplicatas se a IA e o Admin responderem (a IA já adiciona localmente no handleSend)
            const exists = prev.some(m => m.text === payload.new.text && m.role === 'model');
            if (exists) return prev;
            return [...prev, { role: 'model', parts: [{ text: payload.new.text }] }];
          });
          setLoading(false);
        }
      })
      .subscribe();

    return () => { channel.unsubscribe(); };
  }, [session?.id]);

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setLoading(true);
    setStep('IDENTIFY');
    try {
      const sessionData = await BalcaoVirtualRouter.startSession(email);
      setSession(sessionData);
      setMessages([{ role: 'model', parts: [{ text: `Olá! Sou o ${sessionData.agent?.nome || 'Assistente'}. Como posso ajudar?` }] }]);
      setStep('TRIAGE');
    } catch (err) {
      setStep('IDLE');
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userText = input;
    setMessages(prev => [...prev, { role: 'user', parts: [{ text: userText }] }]);
    setInput('');
    setLoading(true);
    try {
      const history = messages.map(m => ({ role: m.role, parts: m.parts }));
      const response = await BalcaoVirtualRouter.getTriageResponse(userText, session, history);
      // Nota: A resposta da IA já foi logada no banco pelo router, 
      // mas adicionamos aqui para UI imediata. O listener de Realtime evitará a duplicação.
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: String(response) }] }]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      const summary = messages.map(m => `${m.role}: ${m.parts[0]?.text}`).join('\n');
      const ticket = await BalcaoVirtualRouter.finalizeAndTicket({ email, name: 'Usuário Balcão', summary, sessionId: session.id });
      setProtocol(ticket.protocolo);
      setStep('DONE');
    } catch (e) {
      alert("Erro ao gerar protocolo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05080F] text-white flex flex-col p-6 relative overflow-hidden font-sans select-none">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-brand-secondary/5 blur-[180px] rounded-full" />
      </div>
      
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col flex-1">
        <header className="flex items-center justify-between py-10 border-b border-white/5 mb-10">
           <button onClick={onBack} className="flex items-center gap-3 text-white/30 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.2em] group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar
           </button>
           <div className="flex items-center gap-4">
              <Headset size={24} className="text-brand-secondary" />
              <Typography variant="h4" font="serif" className="text-xl">Balcão <span className="text-brand-secondary italic font-normal">Virtual</span></Typography>
           </div>
           <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-black uppercase text-emerald-500/80 tracking-widest">P2P Realtime</span>
           </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center">
          {step === 'IDLE' && (
            <div className="max-w-xl w-full text-center space-y-16 animate-in fade-in zoom-in duration-1000">
               <div className="relative inline-block">
                  <div className="w-32 h-32 bg-white/5 rounded-[3.5rem] flex items-center justify-center mx-auto border border-white/10 group hover:border-brand-secondary/40 transition-all duration-700">
                     <Bot size={56} className="text-brand-secondary" />
                  </div>
               </div>
               <form onSubmit={handleStart} className="space-y-8 w-full max-w-md mx-auto">
                  <input 
                    type="email" 
                    required
                    placeholder="Seu e-mail para identificação"
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-7 outline-none focus:ring-4 focus:ring-brand-secondary/10 transition-all text-center font-bold text-brand-secondary text-lg"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <Button variant="secondary" fullWidth className="h-24 rounded-[2rem] shadow-2xl text-base">
                    {loading ? <RefreshCw className="animate-spin" size={24} /> : 'Acessar Balcão Digital'}
                  </Button>
               </form>
            </div>
          )}

          {step === 'TRIAGE' && (
            <div className="w-full flex flex-col h-[75vh] bg-white/[0.03] rounded-[4rem] border border-white/5 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
               <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur-md">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-brand-secondary text-brand-primary rounded-2xl flex items-center justify-center shadow-xl">
                      <Zap size={24}/>
                    </div>
                    <div>
                      <Typography variant="small" className="text-brand-secondary font-black uppercase text-[10px] block">Atendimento Ativo</Typography>
                      <Typography variant="h4" font="serif" className="text-white text-xl uppercase">{session?.agent?.nome || 'IA'}</Typography>
                    </div>
                  </div>
                  <button onClick={handleFinish} className="px-8 py-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
                     Encerrar e Gerar Protocolo
                  </button>
               </div>

               <div ref={scrollRef} className="flex-1 overflow-y-auto p-12 space-y-8 custom-scrollbar-dark">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                       <div className={`max-w-[80%] p-7 rounded-[2.5rem] text-sm leading-relaxed ${m.role === 'user' ? 'bg-brand-primary text-white border border-brand-secondary/20 rounded-tr-none' : 'bg-white/5 text-white/80 border border-white/5 rounded-tl-none'}`}>
                          {m.parts[0]?.text}
                       </div>
                    </div>
                  ))}
                  {loading && <div className="flex justify-start"><div className="bg-white/5 p-4 rounded-full border border-white/5 animate-pulse text-[10px] uppercase font-black text-brand-secondary">IA Processando...</div></div>}
               </div>

               <div className="p-8 border-t border-white/5 bg-black/40">
                  <div className="max-w-4xl mx-auto flex gap-4">
                     <textarea 
                        className="flex-1 bg-white/5 border border-white/10 rounded-[2rem] p-6 outline-none focus:ring-4 focus:ring-brand-secondary/10 transition-all resize-none text-sm leading-relaxed text-brand-secondary"
                        placeholder="Digite sua mensagem aqui..."
                        rows={1}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                     />
                     <button onClick={handleSend} className="w-16 h-16 bg-brand-secondary text-brand-primary rounded-2xl flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all">
                        <Send size={24} />
                     </button>
                  </div>
               </div>
            </div>
          )}

          {step === 'DONE' && (
            <div className="max-w-xl w-full p-16 bg-emerald-500/5 border border-emerald-500/10 rounded-[5rem] text-center animate-in zoom-in-95 duration-1000 space-y-12">
               <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                  <CheckCircle2 size={48} />
               </div>
               <div className="space-y-4">
                 <Typography variant="h1" font="serif" className="text-emerald-400 text-4xl">Protocolo Ativo</Typography>
                 <Typography variant="body" className="text-white/40">Sua jornada foi formalizada sob o protocolo:</Typography>
               </div>
               <div className="bg-black/60 p-10 rounded-[2.5rem] border border-white/5 font-mono text-3xl text-brand-secondary tracking-widest shadow-inner">
                  {protocol}
               </div>
               <Button variant="outline" onClick={onBack} className="text-white border-white/10 h-16 px-12">Concluir Atendimento</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};