import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, RefreshCw, CheckCircle2, Globe, Sparkles } from 'lucide-react';
import { Container } from '../ui/Container.tsx';
import { Typography } from '../ui/Typography.tsx';
import { Button } from '../ui/Button.tsx';
import { HelpDeskRouter } from '../../modules/helpdesk/helpdesk-router.ts';

export const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', subject: 'Superendividamento', message: '' });
  const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('PROCESSING');
    try {
      await HelpDeskRouter.createTicketFromWebForm(formState);
      setStatus('SUCCESS');
      setFormState({ name: '', email: '', phone: '', subject: 'Superendividamento', message: '' });
      setTimeout(() => setStatus('IDLE'), 5000);
    } catch (error) {
      setStatus('ERROR');
      setTimeout(() => setStatus('IDLE'), 3000);
    }
  };

  return (
    <div className="pt-24 bg-white min-h-screen font-sans selection:bg-brand-secondary/30">
      <section className="py-20 bg-slate-50/50">
        <Container>
          <div className="max-w-3xl">
            <Typography variant="caption" className="text-brand-secondary mb-4 block font-black uppercase tracking-widest">Protocolo de Defesa Digital</Typography>
            <Typography variant="h1" font="serif" className="text-brand-primary mb-6 text-4xl md:text-6xl tracking-tight">Inicie sua <span className="text-brand-secondary italic">defesa técnica</span>.</Typography>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="bg-white rounded-[4rem] p-10 md:p-14 shadow-2xl border border-slate-100 relative overflow-hidden group">
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-3 tracking-widest">Nome Completo</label>
                  <input type="text" required placeholder="Ex: Maria Silva" className="w-full bg-slate-50 border-none rounded-2xl p-5 outline-none focus:ring-4 focus:ring-brand-secondary/10 transition-all font-bold text-slate-900 text-sm shadow-inner" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-3 tracking-widest">Seu E-mail</label>
                  <input type="email" required placeholder="contato@exemplo.com" className="w-full bg-slate-50 border-none rounded-2xl p-5 outline-none focus:ring-4 focus:ring-brand-secondary/10 transition-all font-bold text-slate-900 text-sm shadow-inner" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-3 tracking-widest">Como podemos ajudar?</label>
                <textarea rows={5} required placeholder="Descreva sua situação..." className="w-full bg-slate-50 border-none rounded-[2rem] p-8 outline-none focus:ring-4 focus:ring-brand-secondary/10 transition-all font-bold text-slate-900 text-sm leading-relaxed shadow-inner" value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} />
              </div>
              <Button variant="secondary" fullWidth size="lg" disabled={status === 'PROCESSING'} className="h-20 rounded-[1.5rem] shadow-2xl shadow-brand-secondary/30">
                {status === 'PROCESSING' ? 'Sincronizando...' : 'Iniciar Atendimento Estratégico'}
              </Button>
            </form>
          </div>
        </Container>
      </section>
    </div>
  );
};