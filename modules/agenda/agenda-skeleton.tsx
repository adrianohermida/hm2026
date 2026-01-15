import React from 'react';
import { Calendar, Clock, Gavel, Users, Bell, ShieldCheck } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const AgendaSkeleton: IModuleSkeleton = {
  moduleId: "agenda",
  moduleName: "Agenda",
  title: "Agenda Técnica",
  description: "Gestão centralizada de audiências, reuniões e prazos fatais.",
  icon: React.createElement(Calendar, { size: 40, className: "text-brand-secondary/40" }),
  
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
    govBr: false,
    blockchain: false,
    cloudflare: true
  },

  permissions: {
    allowedRoles: ["admin", "gestor", "advogado", "cliente"]
  },

  sidebar: {
    label: "Agenda",
    icon: React.createElement(Calendar, { size: 18 }),
    route: "agenda",
    order: 4
  },

  breadcrumbs: [
    { label: "Governança", route: "dashboard", isClickable: true },
    { label: "Agenda", route: "agenda", isClickable: false }
  ],

  metadata: {
    version: "12.6.0",
    type: 'ORCHESTRATOR',
    arch: "HM-V12-ORCHESTRATOR",
    mcp_sync: true,
    schema: 'agenda',
    tables: ['eventos', 'configuracoes_disponibilidade', 'evento_anexos']
  }
};

export const AgendaLabels = {
  eventTypes: {
    ATENDIMENTO_INICIAL: { label: 'Atendimento Inicial', color: 'bg-emerald-500', icon: React.createElement(Users, { size: 14 }) },
    REUNIAO_JURIDICA: { label: 'Reunião Jurídica', color: 'bg-blue-500', icon: React.createElement(ShieldCheck, { size: 14 }) },
    RETORNO: { label: 'Retorno Balcão', color: 'bg-indigo-500', icon: React.createElement(Clock, { size: 14 }) },
    AUDIENCIA: { label: 'Audiência', color: 'bg-rose-600', icon: React.createElement(Gavel, { size: 14 }) },
    INTERNA: { label: 'Reunião Interna', color: 'bg-slate-400', icon: React.createElement(Bell, { size: 14 }) }
  }
};