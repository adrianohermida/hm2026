
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, Gavel, Briefcase, Bell, Clock, 
  ArrowUpRight, ArrowDownRight, MoreVertical, Plus, 
  Search, Filter, ExternalLink, Calendar as CalendarIcon, 
  ChevronRight, CheckCircle2, AlertTriangle, FileText,
  Mail, MessageSquare, DollarSign, Database, ShieldCheck,
  Lock as LockIcon, Trash2, Globe, TrendingUp, Download,
  PieChart, Settings, Wand2
} from 'lucide-react';
import { Typography } from '../atoms/Typography.tsx';
import { Button } from '../atoms/Button.tsx';
import { 
  servicoCRM, servicoProcessos, servicoAgenda, 
  servicoPublicacoes 
} from '../../services/supabaseService.ts';
import { LeadCRM, ProcessoJuridico, EventoAgenda, PublicacaoLegal } from '../../types.ts';

/**
 * MODULE: DASHBOARD (BUSINESS INTELLIGENCE)
 */
export const AdminDashboard: React.FC = () => {
  return (
    <div className="p-10 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 bg-brand-primary text-brand-secondary rounded-xl flex items-center justify-center shadow-lg"><PieChart size={20}/></div>
             <Typography variant="caption" className="text-brand-secondary font-black tracking-[0.3em] uppercase">Métricas de Performance</Typography>
          </div>
          <Typography variant="h1" font="serif" className="text-brand-primary text-5xl tracking-tight">Painel de <span className="text-brand-secondary italic">Governança</span></Typography>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Leads Ativos", value: "148", trend: "+12.4%", icon: <Users size={24}/>, color: "brand" },
          { label: "Processos em Curso", value: "312", trend: "+3.1%", icon: <Gavel size={24}/>, color: "emerald" },
          { label: "SLA Médio (Horas)", value: "2.4h", trend: "-15%", icon: <Clock size={24}/>, color: "amber" },
          { label: "Honorários Mês", value: "R$ 184k", trend: "+22.8%", icon: <DollarSign size={24}/>, color: "indigo" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${stat.color === 'brand' ? 'bg-brand-accent text-brand-primary' : 'bg-slate-50 text-slate-400'}`}>
              {stat.icon}
            </div>
            <Typography variant="h2" font="serif" className="text-brand-primary mb-2 text-3xl">{stat.value}</Typography>
            <Typography variant="caption" className="text-slate-400 font-black uppercase text-[8px] tracking-[0.2em]">{stat.label}</Typography>
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
    <div className="p-10 space-y-10 animate-in slide-in-from-right-10 duration-700">
      <Typography variant="h1" font="serif" className="text-brand-primary text-4xl mb-2">Pipeline CRM</Typography>
      <div className="flex gap-6 h-[70vh] overflow-x-auto pb-6 custom-scrollbar">
        {stages.map(stage => (
          <div key={stage} className="min-w-[300px] bg-slate-100/40 rounded-[2rem] p-6 flex flex-col border border-slate-200/50 shadow-inner">
             <Typography variant="caption" className="text-brand-primary font-black uppercase tracking-[0.2em] text-[9px] mb-6">{stage}</Typography>
             <div className="flex-1 space-y-4">
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                   <Typography variant="small" className="font-black text-brand-primary block text-xs uppercase">Exemplo Lead</Typography>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * MODULE: PROCESS MANAGEMENT
 */
export const ProcessModule: React.FC = () => {
  return (
    <div className="p-10 space-y-10 animate-in fade-in duration-700">
       <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Gestão Processual</Typography>
       <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-10 text-center opacity-40">
             <Gavel size={48} className="mx-auto mb-4" />
             <Typography variant="small">Carregando Acervo Processual via Datajud...</Typography>
          </div>
       </div>
    </div>
  );
};

/**
 * MODULE: AGENDA (DEADLINES & HEARINGS)
 */
export const AgendaModule: React.FC = () => {
  return (
    <div className="p-10 space-y-10 animate-in zoom-in-95 duration-500">
       <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Agenda Técnica</Typography>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
             <CalendarIcon size={48} className="text-brand-secondary mb-6" />
             <Typography variant="h4" font="serif" className="text-brand-primary mb-4">Próximos Prazos</Typography>
             <Typography variant="body" className="text-slate-400">Nenhum prazo fatal para as próximas 24h.</Typography>
          </div>
       </div>
    </div>
  );
};

/**
 * MODULE: PUBLICATION (PUSH HUB)
 */
export const PublicationModule: React.FC = () => {
  return (
    <div className="p-10 space-y-10 animate-in fade-in duration-700">
       <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-brand-primary text-brand-secondary rounded-[1.5rem] flex items-center justify-center shadow-lg"><Bell size={32}/></div>
          <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Recortes Digitais</Typography>
       </div>
       <div className="bg-white p-10 rounded-[3rem] border border-slate-100 text-center opacity-30">
          <Typography variant="small">Monitorando Diários Oficiais 24/7...</Typography>
       </div>
    </div>
  );
};

/**
 * MODULE: GED (CLOUD DRIVE)
 */
export const DocumentModule: React.FC = () => {
  return (
    <div className="p-10 space-y-10 animate-in fade-in">
       <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Cloud GED</Typography>
       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {['Petições', 'Contratos', 'Sentenças', 'Evidências'].map(f => (
            <div key={f} className="bg-white p-8 rounded-3xl border border-slate-100 text-center cursor-pointer hover:bg-slate-50 transition-all">
               <Briefcase size={32} className="mx-auto mb-4 text-brand-secondary/40" />
               <Typography variant="caption" className="font-black text-brand-primary uppercase text-[8px]">{f}</Typography>
            </div>
          ))}
       </div>
    </div>
  );
};

/**
 * MODULE: BLOG CMS
 */
export const BlogManager: React.FC = () => {
  return (
    <div className="p-10 space-y-10 animate-in slide-in-from-bottom-5">
       <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Gerenciador de Blog</Typography>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-10 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center opacity-40">
             <Plus size={32} className="mb-4" />
             <Typography variant="caption" className="font-black uppercase tracking-widest text-[10px]">Novo Artigo</Typography>
          </div>
       </div>
    </div>
  );
};

/**
 * MODULE: CONFIGURATIONS
 */
export const ConfigModule: React.FC = () => {
  return (
    <div className="p-10 space-y-10 animate-in fade-in max-w-4xl">
       <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Kernel Setup</Typography>
       <div className="bg-brand-primary p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
             <ShieldCheck size={48} className="text-brand-secondary mb-6" />
             <Typography variant="h4" font="serif" className="mb-2">Infraestrutura Blindada</Typography>
             <Typography variant="caption" className="text-white/40 normal-case block leading-relaxed">Padrão de segurança AES-256 e redundância em 3 zonas ativas.</Typography>
          </div>
       </div>
    </div>
  );
};
