
import React from 'react';
import { Scale, MessageSquare, CreditCard, Calendar, ArrowRight, Zap } from 'lucide-react';
import { Typography } from '../../../atoms/Typography.tsx';

export const PortalOverview: React.FC<{ user: any, onNavigate: (tab: string) => void }> = ({ user, onNavigate }) => {
  const cards = [
    { id: 'processos', label: 'Processos', value: '03', sub: 'Acompanhamento Ativo', icon: <Scale size={24}/>, color: 'text-brand-secondary' },
    { id: 'tickets', label: 'Tickets', value: '01', sub: 'Aguardando Equipe', icon: <MessageSquare size={24}/>, color: 'text-blue-400' },
    { id: 'financeiro', label: 'Financeiro', value: 'R$ 1.2k', sub: 'Próximo Vencimento', icon: <CreditCard size={24}/>, color: 'text-emerald-400' },
    { id: 'agenda', label: 'Agenda', value: '15/12', sub: 'Consulta Marcada', icon: <Calendar size={24}/>, color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <section className="p-12 md:p-16 bg-brand-primary rounded-[4rem] relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="relative z-10">
           <Typography variant="h2" font="serif" className="text-white text-4xl md:text-6xl mb-6">
              Bem-vindo, <span className="text-brand-secondary italic">{user?.email?.split('@')[0]}</span>.
           </Typography>
           <Typography variant="body" className="text-white/50 text-lg max-w-2xl leading-relaxed">
              Sua estratégia jurídica está em execução. Abaixo, você encontra o resumo das atividades auditadas no seu Ledger pessoal.
           </Typography>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map(card => (
          <button 
            key={card.id}
            onClick={() => onNavigate(card.id)}
            className="p-10 bg-white/[0.03] border border-white/5 rounded-[3rem] text-left hover:bg-white/[0.06] hover:border-brand-secondary/30 transition-all group shadow-sm hover:shadow-xl"
          >
            <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform ${card.color}`}>
              {card.icon}
            </div>
            <Typography variant="h3" font="serif" className="text-white text-4xl mb-2">{card.value}</Typography>
            <Typography variant="caption" className="text-white/40 block mb-1">{card.label}</Typography>
            <Typography variant="caption" className="text-[8px] tracking-[0.2em] font-black uppercase text-brand-secondary/60">{card.sub}</Typography>
          </button>
        ))}
      </div>

      <div className="bg-[#0b1321] p-12 rounded-[3.5rem] border border-white/5 flex items-center justify-between group cursor-pointer hover:border-brand-secondary/20 transition-all">
         <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-brand-secondary/10 rounded-[2rem] flex items-center justify-center text-brand-secondary group-hover:rotate-12 transition-all">
               <Zap size={32} />
            </div>
            <div>
               <Typography variant="h4" font="serif" className="text-white">Triagem Inteligente</Typography>
               <Typography variant="body" className="text-white/30 text-sm">Inicie um novo diálogo estratégico com nossa IA de borda.</Typography>
            </div>
         </div>
         <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand-secondary group-hover:text-brand-primary transition-all">
            <ArrowRight size={24} />
         </div>
      </div>
    </div>
  );
};
