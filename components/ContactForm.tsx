
import React from 'react';
import { Send, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Typography } from './Typography.tsx';
import { Button } from './Button.tsx';
import { useContact } from '../hooks/useContact.ts';

export const ContactForm: React.FC = () => {
  const { formState, setFormState, status, setStatus, submitForm } = useContact();

  if (status === 'SUCCESS') return (
    <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100 text-center animate-in zoom-in duration-500">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={40} /></div>
      <Typography variant="h3" font="serif" className="text-brand-primary mb-2">Mensagem Recebida</Typography>
      <Typography variant="body" className="text-slate-500 mb-8">Nossa IA já iniciou a triagem do seu caso.</Typography>
      <Button variant="ghost" onClick={() => setStatus('IDLE')}>Enviar Nova Dúvida</Button>
    </div>
  );

  return (
    <form onSubmit={submitForm} className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="text" placeholder="Nome Completo" required className="w-full bg-slate-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand-secondary/20" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
        <input type="email" placeholder="E-mail" required className="w-full bg-slate-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand-secondary/20" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
        <input type="tel" placeholder="WhatsApp" required className="w-full bg-slate-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand-secondary/20" value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value})} />
        <select className="w-full bg-slate-50 rounded-2xl p-4 outline-none" value={formState.subject} onChange={e => setFormState({...formState, subject: e.target.value})}>
          <option>Superendividamento</option>
          <option>Direito Bancário</option>
          <option>Recuperação</option>
        </select>
      </div>
      <textarea rows={4} placeholder="Sua mensagem..." required className="w-full bg-slate-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand-secondary/20 resize-none" value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} />
      <Button variant="secondary" fullWidth size="lg" disabled={status === 'PROCESSING'} icon={status === 'PROCESSING' ? <RefreshCw size={20} className="animate-spin" /> : <Send size={18} />}>
        {status === 'PROCESSING' ? 'Processando...' : 'Falar com Dr. Adriano'}
      </Button>
    </form>
  );
};
