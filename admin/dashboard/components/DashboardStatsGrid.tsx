
import React from 'react';
import { Users, Ticket, Headset, TrendingUp } from 'lucide-react';
import { Typography } from '../../../components/atoms/Typography.tsx';

interface Props {
  data: any;
  loading: boolean;
}

export const DashboardStatsGrid: React.FC<Props> = ({ data, loading }) => {
  const stats = [
    { label: 'Leads Ativos', value: data?.leads || '0', icon: <Users />, color: 'text-blue-500', route: 'crm' },
    { label: 'Tickets em Aberto', value: data?.tickets || '0', icon: <Ticket />, color: 'text-amber-500', route: 'tickets' },
    { label: 'Sessões Balcão', value: data?.balcao || '0', icon: <Headset />, color: 'text-emerald-500', route: 'balcao-virtual' },
    { label: 'Faturamento Estimado', value: data?.revenue || 'R$ 0', icon: <TrendingUp />, color: 'text-brand-secondary', route: 'crm' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, i) => (
        <button 
          key={i}
          onClick={() => { if(stat.route) window.location.hash = `#/${stat.route}`; }}
          className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group text-left relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-150 transition-transform">
             {React.cloneElement(stat.icon as any, { size: 100 })}
          </div>
          
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-inner bg-slate-50 ${stat.color} group-hover:bg-brand-primary group-hover:text-brand-secondary transition-all`}>
             {React.cloneElement(stat.icon as any, { size: 24 })}
          </div>
          
          <div className={loading ? 'animate-pulse' : ''}>
            <Typography variant="h2" font="serif" className="text-brand-primary text-4xl mb-2">
              {loading ? '---' : stat.value}
            </Typography>
            <Typography variant="caption" className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">{stat.label}</Typography>
          </div>
        </button>
      ))}
    </div>
  );
};
