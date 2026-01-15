
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, RefreshCw, CheckCircle2, Globe, Sparkles, ShieldCheck } from 'lucide-react';
import { Container } from '../ui/Container.tsx';
import { Typography } from '../ui/Typography.tsx';
import { Button } from '../ui/Button.tsx';
import { HelpDeskRouter } from '../../modules/helpdesk/helpdesk-router.ts';

const CAPITAIS = [
  "Manaus (AM)", "Porto Alegre (RS)", "São Paulo (SP)", "Recife (PE)", 
  "Brasília (DF)", "Salvador (BA)", "Florianópolis (SC)", "Rio de Janeiro (RJ)", 
  "Natal (RN)", "Belo Horizonte (MG)", "Belém (PA)", "Fortaleza (CE)", 
  "Curitiba (PR)", "Vitória (ES)", "Maceió (PB)"
];

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
          <div className="max-w-4xl">
            <Typography variant="h1" font="serif" className="text-brand-primary mb-6 text-4xl md:text-6xl tracking-tight leading-tight">
              Envie seu caso ou <span className="text-brand-secondary italic">tire dúvidas</span>.
            </Typography>
            <div className="flex items-center gap-3 text-slate-400">
              <Clock size={16} className="text-brand-secondary" />
              <Typography variant="caption" className="font-bold uppercase tracking-widest text-[10px]">
                Atendimento: Segunda à Sexta, das 9h às 17h (Brasília)
              </Typography>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Formulário de Ticket */}
          <div className="bg-white rounded-[4rem] p-10 md:p-14 shadow-2xl border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <MessageSquare size={120} className="text-brand-primary" />
            </div>
            
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
              
              {status === 'SUCCESS' ? (
                <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl flex items-center gap-4 animate-in zoom-in">
                  <CheckCircle2 className="text-emerald-500" size={32} />
                  <div>
                    <Typography variant="small" className="text-emerald-700 font-bold">Mensagem Enviada!</Typography>
                    <Typography variant="caption" className="text-emerald-600/80 normal-case">Retornaremos em breve via e-mail ou WhatsApp.</Typography>
                  </div>
                </div>
              ) : (
                <Button variant="secondary" fullWidth size="lg" disabled={status === 'PROCESSING'} className="h-20 rounded-[1.5rem] shadow-2xl shadow-brand-secondary/30">
                  {status === 'PROCESSING' ? <RefreshCw className="animate-spin" /> : 'Sincronizar Atendimento'}
                </Button>
              )}
            </form>
          </div>

          {/* Card de Atuação Nacional */}
          <div className="space-y-10">
            <div className="bg-brand-primary p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-brand-secondary rounded-2xl flex items-center justify-center mb-8 text-brand-primary shadow-xl">
                  <Globe size={32} />
                </div>
                <Typography variant="h3" font="serif" className="text-3xl mb-4 leading-tight">
                  Atuação em <span className="text-brand-secondary italic">todo o Brasil</span>.
                </Typography>
                <Typography variant="body" className="text-white/40 mb-10 leading-relaxed text-lg">
                  Operamos através de processos 100% eletrônicos, garantindo agilidade e segurança jurídica em qualquer comarca do território nacional.
                </Typography>

                <div className="space-y-6">
                  <Typography variant="caption" className="text-brand-secondary font-black uppercase tracking-[0.2em] text-[10px] block">
                    Unidades de Apoio Estratégico
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    {CAPITAIS.map((cidade, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-white/60 hover:bg-brand-secondary hover:text-brand-primary hover:border-brand-secondary transition-all cursor-default">
                        {cidade}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-12 pt-10 border-t border-white/10 flex items-center gap-4">
                  <ShieldCheck size={24} className="text-brand-secondary opacity-50" />
                  <Typography variant="caption" className="text-white/30 normal-case leading-relaxed text-xs">
                    Certificação de Segurança Digital HM-V12: <br />
                    Criptografia de ponta-a-ponta em todas as comunicações.
                  </Typography>
                </div>
              </div>
            </div>

            {/* Quick Info Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex items-center gap-6">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-primary shadow-sm border border-slate-100">
                    <Phone size={20} />
                  </div>
                  <div>
                    <Typography variant="caption" className="text-slate-400 uppercase font-black text-[8px] mb-1">WhatsApp</Typography>
                    <Typography variant="small" className="text-brand-primary font-bold text-base leading-none">(51) 99603-2004</Typography>
                  </div>
               </div>
               <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex items-center gap-6">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-primary shadow-sm border border-slate-100">
                    <Mail size={20} />
                  </div>
                  <div>
                    <Typography variant="caption" className="text-slate-400 uppercase font-black text-[8px] mb-1">E-mail</Typography>
                    <Typography variant="small" className="text-brand-primary font-bold text-base leading-none">contato@hermidamaia.adv.br</Typography>
                  </div>
               </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
