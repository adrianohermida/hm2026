
import React from 'react';
import { Scale, MessageSquare, CreditCard, Calendar, ArrowRight, Zap } from 'lucide-react';
import { Typography } from '../../../atoms/Typography.tsx';

export const PortalOverview: React.FC<{ user: any, onNavigate: (tab: string) => void }> = ({ user, onNavigate }) => {
  const cards = [
    { id: 'processos', label: 'Processos', value: '03', sub: 'Acompanhamento Ativo', icon: <Scale size={24}/>, color: 'text-brand-primary bg-brand-accent' },
    { id: 'tickets', label: 'Tickets', value: '01', sub: 'Aguardando Equipe', icon: <MessageSquare size={24}/>, color: 'text-blue-600 bg-blue-50' },
    { id: 'financeiro', label: 'Financeiro', value: 'R$ 1.2k', sub: 'Próximo Vencimento', icon: <CreditCard size={24}/>, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'agenda', label: 'Agenda', value: '15/12', sub: 'Consulta Marcada', icon: <Calendar size={24}/>, color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <section className="p-10 md:p-14 bg-brand-primary rounded-[3.5rem] relative overflow-hidden shadow-xl border border-brand-primary/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="relative z-10">
           <Typography variant="h2" font="serif" className="text-white text-3xl md:text-5xl mb-4">
              Olá, <span className="text-brand-secondary italic">{user?.email?.split('@')[0]}</span>.
           </Typography>
           <Typography variant="body" className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed font-light">
              Sua estratégia jurídica está em execução. Abaixo, você encontra o resumo das atividades auditadas no seu Ledger pessoal.
           </Typography>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(card => (
          <button 
            key={card.id}
            onClick={() => onNavigate(card.id)}
            className="p-8 bg-white border border-slate-200 rounded-[2.5rem] text-left hover:border-brand-secondary/30 hover:shadow-lg transition-all group"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${card.color}`}>
              {card.icon}
            </div>
            <Typography variant="h3" font="serif" className="text-brand-primary text-3xl mb-2">{card.value}</Typography>
            <Typography variant="caption" className="text-slate-500 block mb-1 font-bold">{card.label}</Typography>
            <Typography variant="caption" className="text-[8px] tracking-[0.2em] font-black uppercase text-slate-400 group-hover:text-brand-secondary transition-colors">{card.sub}</Typography>
          </button>
        ))}
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex items-center justify-between group cursor-pointer hover:border-brand-secondary/40 hover:shadow-md transition-all">
         <div className="flex items-center gap-8">
            <div className="w-16 h-16 bg-brand-accent rounded-[1.5rem] flex items-center justify-center text-brand-primary group-hover:rotate-12 transition-all">
               <Zap size={28} />
            </div>
            <div>
               <Typography variant="h4" font="serif" className="text-brand-primary mb-1">Triagem Inteligente</Typography>
               <Typography variant="body" className="text-slate-500 text-sm">Inicie um novo diálogo estratégico com nossa IA de borda.</Typography>
            </div>
         </div>
         <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand-primary group-hover:text-brand-secondary transition-all">
            <ArrowRight size={20} />
         </div>
      </div>
    </div>
  );
};
