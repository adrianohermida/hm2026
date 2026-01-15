
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, Gavel, Briefcase, Bell, Clock, 
  ArrowUpRight, ArrowDownRight, MoreVertical, Plus, 
  Search, Filter, ExternalLink, Calendar as CalendarIcon, 
  ChevronRight, CheckCircle2, AlertTriangle, FileText,
  Mail, MessageSquare, DollarSign, Database, ShieldCheck,
  Lock as LockIcon, Trash2, Globe, TrendingUp, Download,
  PieChart, Settings
} from 'lucide-react';
import { Typography } from './Typography.tsx';
import { Button } from './Button.tsx';
import { 
  servicoCRM, servicoProcessos, servicoAgenda, 
  servicoPublicacoes 
} from '../services/supabaseService.ts';
import { LeadCRM, ProcessoJuridico, EventoAgenda, PublicacaoLegal } from '../types.ts';

/**
 * MODULE: DASHBOARD (BUSINESS INTELLIGENCE)
 */
export const AdminDashboard: React.FC = () => {
  return (
    <div className="p-12 lg:p-20 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 bg-brand-primary text-brand-secondary rounded-xl flex items-center justify-center shadow-lg"><PieChart size={20}/></div>
             <Typography variant="caption" className="text-brand-secondary font-black tracking-[0.3em] uppercase">Métricas de Performance</Typography>
          </div>
          <Typography variant="h1" font="serif" className="text-brand-primary text-5xl tracking-tight">Painel de <span className="text-brand-secondary italic">Governança</span></Typography>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="bg-white border-slate-200 text-brand-primary h-14 px-8 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-sm">Exportar BI</Button>
          <Button variant="secondary" className="h-14 px-10 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl" icon={<Plus size={18}/>}>Novo Registro</Button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {[
          { label: "Leads Ativos", value: "148", trend: "+12.4%", icon: <Users size={24}/>, color: "brand" },
          { label: "Processos em Curso", value: "312", trend: "+3.1%", icon: <Gavel size={24}/>, color: "emerald" },
          { label: "SLA Médio (Horas)", value: "2.4h", trend: "-15%", icon: <Clock size={24}/>, color: "amber" },
          { label: "Honorários Mês", value: "R$ 184k", trend: "+22.8%", icon: <DollarSign size={24}/>, color: "indigo" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-inner ${stat.color === 'brand' ? 'bg-brand-accent text-brand-primary' : 'bg-slate-50 text-slate-400'}`}>
              {stat.icon}
            </div>
            <Typography variant="h2" font="serif" className="text-brand-primary mb-2 text-4xl">{stat.value}</Typography>
            <div className="flex items-center justify-between">
              <Typography variant="caption" className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">{stat.label}</Typography>
              <span className={`text-[11px] font-black flex items-center gap-1 ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.trend.startsWith('+') ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * MODULE: CRM (LEADS & CONVERSION)
 */
export const CRMModule: React.FC = () => {
  const [leads, setLeads] = useState<LeadCRM[]>([]);

  useEffect(() => {
    servicoCRM.buscarLeads().then(setLeads);
  }, []);

  const stages = ['Prospecção', 'Qualificado', 'Em Reunião', 'Contrato', 'Convertido'];

  return (
    <div className="p-12 lg:p-20 space-y-12 animate-in slide-in-from-right-10 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-200 pb-12">
        <div>
          <Typography variant="h1" font="serif" className="text-brand-primary text-4xl mb-2">Pipeline de Conversão</Typography>
          <Typography variant="body" className="text-slate-400 font-medium">Gestão estratégica de oportunidades.</Typography>
        </div>
      </header>
      <div className="flex gap-8 h-[70vh] overflow-x-auto pb-10 custom-scrollbar">
        {stages.map(stage => {
          const filtered = leads.filter(l => l.status === stage);
          return (
            <div key={stage} className="min-w-[320px] bg-slate-100/40 rounded-[2.5rem] p-6 flex flex-col border border-slate-200/50 shadow-inner">
              <div className="flex items-center justify-between mb-8 px-4">
                 <Typography variant="caption" className="text-brand-primary font-black uppercase tracking-[0.2em] text-[10px]">{stage}</Typography>
                 <span className="bg-white text-brand-primary border-2 border-slate-100 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black shadow-sm">
                   {filtered.length}
                 </span>
              </div>
              <div className="flex-1 space-y-5 overflow-y-auto custom-scrollbar pr-2">
                 {filtered.map(lead => (
                   <div key={lead.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all cursor-pointer group border-l-[8px] border-l-brand-secondary">
                      <Typography variant="small" className="font-black text-brand-primary block mb-1 text-sm uppercase tracking-tight">{lead.nome}</Typography>
                      <Typography variant="caption" className="text-slate-400 normal-case mb-6 block text-[11px]">{lead.origem}</Typography>
                   </div>
                 ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ProcessModule: React.FC = () => {
  return <div className="p-20 text-center"><Typography variant="h3" font="serif">Módulo de Processos</Typography></div>;
};

export const AgendaModule: React.FC = () => {
  return <div className="p-20 text-center"><Typography variant="h3" font="serif">Agenda Técnica</Typography></div>;
};

export const PublicationModule: React.FC = () => {
  return <div className="p-20 text-center"><Typography variant="h3" font="serif">Publicações Legais</Typography></div>;
};

export const DocumentModule: React.FC = () => {
  return <div className="p-20 text-center"><Typography variant="h3" font="serif">GED / Cloud Drive</Typography></div>;
};

export const BlogManager: React.FC = () => {
  return <div className="p-20 text-center"><Typography variant="h3" font="serif">Gerenciador de Blog</Typography></div>;
};

export const ConfigModule: React.FC = () => {
  return <div className="p-20 text-center"><Typography variant="h3" font="serif">Configurações de Infra</Typography></div>;
};
