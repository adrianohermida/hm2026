
import React from 'react';
import { PieChart, Activity, Target, Zap, Clock } from 'lucide-react';
import { Typography } from '../../../components/atoms/Typography.tsx';

interface Props {
  data: any;
  loading: boolean;
}

export const DashboardBIPanels: React.FC<Props> = ({ data, loading }) => {
  return (
    <div className="space-y-10 h-full flex flex-col">
       <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm flex-1 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
             <PieChart size={120} className="text-brand-primary" />
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10">
             <div>
                <Typography variant="h3" font="serif" className="text-brand-primary text-2xl mb-1">Carga de Trabalho</Typography>
                <Typography variant="caption" className="text-slate-400 normal-case">Distribuição técnica de demandas ativas.</Typography>
             </div>
             <div className="flex gap-4">
                <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                   <Typography variant="caption" className="text-brand-primary font-black text-[9px] uppercase tracking-widest">SLA Médio: 2.4h</Typography>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
             {[
               { label: 'Tickets', value: data?.tickets || 0, icon: <Activity size={18}/>, color: 'text-blue-500' },
               { label: 'Prazos', value: data?.agenda || 0, icon: <Clock size={18}/>, color: 'text-rose-500' },
               { label: 'IA Conversas', value: data?.balcao || 0, icon: <Zap size={18}/>, color: 'text-amber-500' },
               { label: 'Eficiência', value: `${data?.efficiency_score || 0}%`, icon: <Target size={18}/>, color: 'text-emerald-500' },
             ].map((item, i) => (
               <div key={i} className="space-y-3">
                  <div className={`flex items-center gap-2 ${item.color}`}>
                     {item.icon}
                     <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                  </div>
                  <Typography variant="h3" font="serif" className="text-brand-primary text-3xl">{loading ? '...' : item.value}</Typography>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                     <div className={`h-full ${item.color.replace('text', 'bg')} transition-all duration-1000`} style={{ width: loading ? '0%' : '70%' }} />
                  </div>
               </div>
             ))}
          </div>
       </div>

       <div className="bg-brand-primary p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden border border-brand-secondary/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
             <div className="space-y-4">
                <Typography variant="h4" font="serif" className="text-brand-secondary italic">Economia de Borda IA</Typography>
                <Typography variant="body" className="text-white/40 text-sm max-w-md">
                   Sua infraestrutura de agentes neurais economizou aproximadamente <span className="text-white font-bold">142 horas</span> de atendimento humano este mês.
                </Typography>
             </div>
             <div className="text-right">
                <Typography variant="caption" className="text-brand-secondary font-black uppercase tracking-widest text-[9px] mb-2 block">ROI Estimado (Mensal)</Typography>
                <Typography variant="h2" font="serif" className="text-white text-4xl">R$ 18.420,00</Typography>
             </div>
          </div>
       </div>
    </div>
  );
};
