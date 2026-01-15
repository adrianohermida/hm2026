
import React from 'react';
import { History, ArrowRight, User, Database, Globe } from 'lucide-react';
import { Typography } from '../../../components/atoms/Typography.tsx';

export const DashboardRecentActivity: React.FC = () => {
  const activities = [
    { type: 'CRM', desc: 'Novo Lead via Calculadora', user: 'Sistema', time: '15 min', icon: <User size={12}/> },
    { type: 'TKT', desc: 'Ticket #9921 respondido', user: 'Dr. Adriano', time: '42 min', icon: <Database size={12}/> },
    { type: 'BV', desc: 'Sessão iniciada no Balcão', user: 'Visitante', time: '1h', icon: <Globe size={12}/> },
  ];

  return (
    <section className="bg-[#132038] p-10 rounded-[3.5rem] shadow-2xl h-full flex flex-col border border-white/5">
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
         <div className="flex items-center gap-4">
            <History size={20} className="text-brand-secondary" />
            <Typography variant="small" className="text-white font-black uppercase tracking-widest text-[10px]">Ledger de Operações</Typography>
         </div>
         <span className="w-2 h-2 bg-brand-secondary rounded-full animate-pulse shadow-[0_0_10px_#c5a059]" />
      </div>

      <div className="flex-1 space-y-6">
        {activities.map((act, i) => (
          <div key={i} className="flex gap-5 group cursor-pointer">
             <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-secondary border border-white/5 group-hover:bg-brand-secondary group-hover:text-brand-primary transition-all">
                {act.icon}
             </div>
             <div className="flex-1 min-w-0">
                <Typography variant="caption" className="text-brand-secondary font-black uppercase text-[8px] tracking-widest mb-1 block">{act.type}</Typography>
                <Typography variant="small" className="text-white font-bold block truncate text-xs">{act.desc}</Typography>
                <Typography variant="caption" className="text-white/20 normal-case lowercase text-[10px]">{act.user} • há {act.time}</Typography>
             </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-10 p-5 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white rounded-2xl transition-all border border-white/5 text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-3">
         Ver Auditoria Forense <ArrowRight size={14}/>
      </button>
    </section>
  );
};
