import React from 'react';
import { Gavel, Scale, FileSearch, Activity, AlertTriangle, Clock, List, DollarSign, Users, FileText, CalendarCheck, Layout } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const ProcessSkeleton: IModuleSkeleton = {
  moduleId: 'processos',
  moduleName: 'Processos',
  title: 'Gestão de Processos',
  description: 'Núcleo de inteligência processual. Monitoramento, risco e estratégia em um só lugar.',
  icon: React.createElement(Gavel, { size: 40, className: "text-brand-secondary/40" }),
  
  compliance: {
    atomization: true,
    ssotAlignment: true,
    isolationLevel: 'STRICT',
    lgpdByDesign: true,
    hookDriven: true
  },

  integrations: {
    supabase: true,
    googleWorkspace: true,
    govBr: true, // DataJud
    blockchain: false,
    cloudflare: true
  },

  permissions: { allowedRoles: ['admin', 'gestor', 'advogado'] },

  sidebar: {
    label: 'Processos',
    icon: React.createElement(Scale, { size: 18 }),
    route: 'processos',
    order: 4,
    badge: '360º'
  },

  breadcrumbs: [
    { label: 'Início', route: 'dashboard', isClickable: true },
    { label: 'Processos', route: 'processos', isClickable: false }
  ],

  metadata: {
    version: "3.7.0",
    type: 'CORE_OPERATIONAL',
    arch: 'HM-V12-AGGREGATE',
    mcp_sync: true
  }
};

export const ProcessosLabels = {
  tabs: [
    { id: 'RESUMO', label: 'Resumo', icon: <Layout size={14}/> },
    { id: 'MOVIMENTOS', label: 'Histórico', icon: <List size={14}/> },
    { id: 'AUTOS', label: 'Autos (GED)', icon: <FileText size={14}/> },
    { id: 'FINANCEIRO', label: 'Financeiro', icon: <DollarSign size={14}/> },
    { id: 'DETALHES', label: 'Técnico', icon: <FileSearch size={14}/> }
  ],
  status: {
    ATIVO: { label: 'Em Andamento', color: 'bg-emerald-500', icon: React.createElement(Activity, { size: 12 }) },
    SUSPENSO: { label: 'Suspenso', color: 'bg-amber-500', icon: React.createElement(Clock, { size: 12 }) },
    ARQUIVADO: { label: 'Arquivado', color: 'bg-slate-400', icon: React.createElement(FileSearch, { size: 12 }) },
    EM_GRAU_RECURSAL: { label: 'Recurso', color: 'bg-indigo-500', icon: React.createElement(Scale, { size: 12 }) }
  },
  risk: {
    CRITICO: { label: 'Crítico', color: 'text-rose-600' },
    ALTO: { label: 'Alto Risco', color: 'text-orange-500' },
    MEDIO: { label: 'Médio', color: 'text-yellow-600' },
    BAIXO: { label: 'Baixo', color: 'text-emerald-600' },
    REMOTO: { label: 'Remoto', color: 'text-blue-400' }
  }
};