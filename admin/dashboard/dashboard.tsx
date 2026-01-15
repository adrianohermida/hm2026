
import React, { useState, useEffect } from 'react';
import { Typography } from '../../components/atoms/Typography.tsx';
import { DashboardRouter } from '../../modules/dashboard/dashboard-router.ts';
import { DashboardStatsGrid } from './components/DashboardStatsGrid.tsx';
import { DashboardRecentActivity } from './components/DashboardRecentActivity.tsx';
import { DashboardBIPanels } from './components/DashboardBIPanels.tsx';
import { RefreshCw, Zap, ShieldCheck, PieChart, Activity, Target } from 'lucide-react';

/**
 * HM-V12.5: ADMIN DASHBOARD MASTER
 * Orquestrador central de inteligência administrativa
 */
export const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await DashboardRouter.readSummary();
      setSummary(data);
    } catch (e) {
      console.error("Falha na sincronia BI:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const channel = DashboardRouter.getRealtimeChannel(loadData);
    return () => { channel.unsubscribe(); };
  }, []);

  return (
    <div className="p-4 lg:p-8 space-y-10 animate-in fade-in duration-700 font-sans">
      
      {/* KPI TÁTICOS SUPERIORES */}
      <DashboardStatsGrid data={summary} loading={loading} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* PAINEL CENTRAL DE PERFORMANCE */}
        <div className="lg:col-span-8">
           <DashboardBIPanels data={summary} loading={loading} />
        </div>

        {/* LEDGER DE ATIVIDADE */}
        <div className="lg:col-span-4 h-full">
           <DashboardRecentActivity />
        </div>
      </div>

      {/* ÁREA DE STATUS DA INFRAESTRUTURA */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80">
         <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shadow-inner">
               <ShieldCheck size={20} />
            </div>
            <div>
               <Typography variant="caption" className="text-slate-400 font-black uppercase text-[8px] block">MCP Server</Typography>
               <Typography variant="small" className="font-bold text-brand-primary">Conectado / Nominal</Typography>
            </div>
         </div>
         <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4">
            <div className="w-10 h-10 bg-brand-accent text-brand-primary rounded-xl flex items-center justify-center shadow-inner">
               <Activity size={20} />
            </div>
            <div>
               <Typography variant="caption" className="text-slate-400 font-black uppercase text-[8px] block">SLA Global</Typography>
               <Typography variant="small" className="font-bold text-brand-primary">99.8% Eficiência</Typography>
            </div>
         </div>
         <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shadow-inner">
               <Target size={20} />
            </div>
            <div>
               <Typography variant="caption" className="text-slate-400 font-black uppercase text-[8px] block">Conversão</Typography>
               <Typography variant="small" className="font-bold text-brand-primary">12.4% este mês</Typography>
            </div>
         </div>
      </section>
    </div>
  );
};
