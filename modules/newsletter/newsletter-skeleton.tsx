import React from 'react';
import { Megaphone, Users, Send, FileText, ShieldCheck, Zap, BarChart3, Clock } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const NewsletterSkeleton: IModuleSkeleton = {
  moduleId: "newsletter",
  moduleName: "Notícias",
  title: "Central de Comunicação",
  description: "Orquestração de notícias e conteúdos educativos para a base de clientes.",
  icon: React.createElement(Megaphone, { size: 40, className: "text-brand-secondary/40" }),
  
  compliance: {
    atomization: true,
    ssotAlignment: true,
    isolationLevel: 'STRICT',
    lgpdByDesign: true,
    hookDriven: true
  },

  integrations: {
    supabase: true,
    googleWorkspace: false,
    govBr: false,
    blockchain: false,
    cloudflare: true
  },

  permissions: {
    allowedRoles: ["admin", "gestor"]
  },

  sidebar: {
    label: "Notícias",
    icon: React.createElement(Megaphone, { size: 18 }),
    route: "newsletter",
    order: 91
  },

  breadcrumbs: [
    { label: "Painel", route: "dashboard", isClickable: true },
    { label: "Notícias", route: "newsletter", isClickable: false }
  ],

  metadata: {
    version: "12.1.0",
    type: 'MARKETING_ORCH',
    arch: 'HM-V12-NEWS',
    mcp_sync: true,
    schema: 'marketing'
  }
};

export const NewsletterLabels = {
  tabs: [
    { id: 'CAMPANHAS', label: 'Conteúdos', icon: React.createElement(FileText, { size: 14 }) },
    { id: 'PUBLICO', label: 'Lista de Assinantes', icon: React.createElement(Users, { size: 14 }) },
    { id: 'RELATORIOS', label: 'Estatísticas', icon: React.createElement(BarChart3, { size: 14 }) },
    { id: 'SHIELD', label: 'Escudo Auditor', icon: React.createElement(ShieldCheck, { size: 14 }) }
  ],
  status: {
    rascunho: { label: 'Em Elaboração', color: 'bg-slate-400' },
    agendado: { label: 'Pronto para Disparo', color: 'bg-blue-500' },
    enviado: { label: 'Disparo Concluído', color: 'bg-emerald-500' },
    falha: { label: 'Interrupção Técnica', color: 'bg-rose-500' }
  }
};