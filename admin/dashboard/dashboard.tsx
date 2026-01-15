
import React from 'react';
import { PieChart, Users, Ticket, Zap, ShieldCheck, TrendingUp, Clock } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';

export const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Leads Ativos', value: '124', trend: '+12%', icon: <Users size={24}/> },
    { label: 'Processos', value: '89', trend: '+3%', icon: <ShieldCheck size={24}/> },
    { label: 'Tickets', value: '14', trend: '-2', icon: <Ticket size={24}/> },
    { label: 'Economia IA', value: 'R$ 12k', trend: 'Soberano', icon: <Zap size={24}/> }
  ];

  return (
    <div className="p-10 space-y-12 animate-in fade-in duration-700">
      <header>
        <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">
          Visão <span className="text-brand-secondary italic">Geral</span>
        </Typography>
        <Typography variant="body" className="text-slate-400 mt-2">Status operacional do Kernel HM-V12.</Typography>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-brand-accent rounded-2xl flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-brand-secondary transition-all">
              {s.icon}
            </div>
            <Typography variant="h2" font="serif" className="text-brand-primary text-3xl mb-1">{s.value}</Typography>
            <div className="flex justify-between items-center">
              <Typography variant="caption" className="text-slate-400">{s.label}</Typography>
              <span className="text-[10px] font-black text-emerald-500">{s.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl min-h-[300px] flex flex-col items-center justify-center text-center opacity-40">
           <PieChart size={64} className="text-slate-200 mb-6" />
           <Typography variant="small" className="font-bold">Distribuição de Carteira (BI)</Typography>
        </div>
        <div className="bg-[#0b1321] p-12 rounded-[4rem] text-white shadow-2xl min-h-[300px] flex flex-col justify-between">
           <div className="flex items-center gap-4">
              <Clock size={32} className="text-brand-secondary" />
              <Typography variant="h4" font="serif">Prazos Fatais</Typography>
           </div>
           <Typography variant="body" className="text-white/40">Nenhum prazo fatal detectado para as próximas 48h.</Typography>
           <button className="text-brand-secondary font-black uppercase text-[10px] tracking-widest self-start hover:underline">Auditar Agenda</button>
        </div>
      </div>
    </div>
  );
};
