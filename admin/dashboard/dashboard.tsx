
import React, { useState, useEffect } from 'react';
import { 
  Users, Scale, TrendingUp, MessageSquare, Zap, 
  ChevronRight, Download, Plus, LayoutDashboard, Search
} from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';
import { Button } from '../../components/atoms/Button.tsx';
import { DashboardRouter } from '../../modules/dashboard/dashboard-router.ts';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>({ leads: 0, processos: 0, faturamento: 0, tickets: 0 });
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [s, a] = await Promise.all([
        DashboardRouter.fetchStats(),
        DashboardRouter.fetchRecentActivity()
      ]);
      setStats(s);
      setActivity(a);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Leads Hoje', value: stats.leads, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Processos Ativos', value: stats.processos, icon: Scale, color: 'text-brand-primary', bg: 'bg-brand-accent' },
          { label: 'Faturamento Mês', value: `R$ ${(stats.faturamento / 1000).toFixed(0)}k`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Tickets Abertos', value: stats.tickets, icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-4 rounded-2xl ${stat.bg}`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tempo Real</span>
            </div>
            <Typography variant="caption" className="text-slate-500 font-bold uppercase text-xs mb-1">{stat.label}</Typography>
            <Typography variant="h2" font="serif" className={`text-3xl ${stat.color}`}>{loading ? '...' : stat.value}</Typography>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ATIVIDADE RECENTE */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <Typography variant="h3" font="serif" className="text-brand-primary text-2xl">Atividade Recente</Typography>
              <Button variant="ghost" className="text-brand-secondary font-black uppercase text-[10px] tracking-widest">Ver Log Completo</Button>
            </div>
            
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-10 opacity-30 text-slate-400 font-bold">Carregando timeline...</div>
              ) : activity.map((item, i) => (
                <div key={i} className="flex items-center gap-5 p-5 bg-slate-50/50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-brand-primary shadow-sm group-hover:scale-110 transition-transform">
                    <Zap size={20} />
                  </div>
                  <div className="flex-1">
                    <Typography variant="small" className="font-bold text-brand-primary block text-sm">{item.desc}</Typography>
                    <Typography variant="caption" className="text-slate-400 normal-case">{item.tempo} • {item.user}</Typography>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-secondary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS / BUSCA */}
        <div className="bg-brand-primary p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex flex-col justify-center">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
           <div className="relative z-10 space-y-8">
              <div>
                <Typography variant="h3" font="serif" className="text-2xl mb-2">Busca Global</Typography>
                <Typography variant="body" className="text-white/50 text-sm">Pesquise por processos, clientes ou tickets.</Typography>
              </div>
              
              <div className="relative group">
                 <input 
                   type="text" 
                   placeholder="Digite para buscar..." 
                   className="w-full bg-white/10 border border-white/10 rounded-2xl p-5 pl-14 text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-brand-secondary/50 transition-all"
                 />
                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-secondary" size={20} />
              </div>

              <div className="pt-4 border-t border-white/10">
                 <Typography variant="caption" className="text-brand-secondary font-black uppercase tracking-widest text-[9px] mb-4 block">Acesso Rápido</Typography>
                 <div className="flex gap-3">
                    <button className="flex-1 p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all flex flex-col items-center gap-2 group">
                      <Users size={20} className="group-hover:text-brand-secondary transition-colors"/>
                      <span className="text-[9px] font-bold">Novo Lead</span>
                    </button>
                    <button className="flex-1 p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all flex flex-col items-center gap-2 group">
                      <Scale size={20} className="group-hover:text-brand-secondary transition-colors"/>
                      <span className="text-[9px] font-bold">Processo</span>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
