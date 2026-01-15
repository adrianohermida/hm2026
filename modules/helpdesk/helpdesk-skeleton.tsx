
import React from 'react';
import { MessageSquare, Clock, CheckCircle2, Inbox, AlertCircle, User, Star, Shield, Mail } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const HelpDeskSkeleton: IModuleSkeleton = {
  moduleId: "tickets",
  moduleName: "Atendimento",
  title: "Central de Atendimento",
  description: "Gerenciamento simplificado de solicitações e dúvidas de clientes.",
  icon: <MessageSquare size={40} className="text-brand-secondary/40" />,

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
    allowedRoles: ["admin", "advogado", "cliente"]
  },

  sidebar: {
    label: "Atendimento",
    icon: <MessageSquare size={18} />,
    route: "tickets",
    order: 3
  },

  breadcrumbs: [
    { label: "Início", route: "dashboard", isClickable: true },
    { label: "Atendimentos", route: "tickets", isClickable: false }
  ],

  metadata: {
    version: "12.22.0",
    type: 'CORE',
    arch: 'HM-V12',
    mcp_sync: true,
    schema: 'tickets',
    tables: ['tickets', 'ticket_threads']
  }
};

export const AtendimentoLabels = {
  header: "Casos em Aberto",
  novoTicket: "Novo Atendimento",
  filtros: {
    todos: "Todos",
    urgentes: "Urgentes",
    meus: "Minhas Tarefas",
    concluidos: "Concluídos"
  },
  status: {
    aberto: { label: 'Novo', color: 'bg-emerald-500', icon: <Inbox size={12}/> },
    aguardando: { label: 'Aguardando', color: 'bg-amber-500', icon: <Clock size={12}/> },
    pendente: { label: 'Em Análise', color: 'bg-blue-500', icon: <Clock size={12}/> },
    concluido: { label: 'Finalizado', color: 'bg-slate-400', icon: <CheckCircle2 size={12}/> },
    triagem: { label: 'Triagem', color: 'bg-indigo-600', icon: <User size={12}/> }
  },
  prioridades: {
    urgente: { label: 'Urgente', color: 'text-rose-500' },
    alta: { label: 'Alta', color: 'text-orange-500' },
    media: { label: 'Normal', color: 'text-blue-500' },
    baixa: { label: 'Baixa', color: 'text-slate-400' }
  }
} as const;

export const HelpDeskLabels = AtendimentoLabels;
