import React from 'react';
import { Headset, Sparkles, UserCheck, MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const BalcaoVirtualSkeleton: IModuleSkeleton = {
  moduleId: "balcao-virtual",
  moduleName: "Balcão Virtual",
  title: "Atendimento Neural",
  description: "Orquestrador de atendimento digital integrado ao Nexus CRM e HelpDesk.",
  icon: <Headset size={40} className="text-brand-secondary/40" />,
  
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
    allowedRoles: ["guest", "admin", "cliente"]
  },

  sidebar: {
    label: "Balcão Virtual",
    icon: <Headset size={18} />,
    route: "balcao-virtual",
    order: 1,
    badge: "Live"
  },

  breadcrumbs: [
    { label: "Início", route: "home", isClickable: true },
    { label: "Balcão Virtual", route: "balcao-virtual", isClickable: false }
  ],

  metadata: {
    version: "12.35.0",
    type: 'ORCHESTRATOR',
    arch: 'HM-V12-ORCHESTRATOR',
    mcp_sync: true
  }
};

export const BalcaoVirtualLabels = {
  states: {
    IDLE: { label: 'Início', sub: 'Aguardando interação', icon: <MessageSquare size={16}/> },
    IDENTIFY: { label: 'Identificação', sub: 'Sincronizando com Nexus CRM', icon: <UserCheck size={16}/> },
    TRIAGE: { label: 'Triagem IA', sub: 'Análise estratégica pelo agente neural', icon: <Zap size={16}/> },
    ORCHESTRATING: { label: 'Orquestração', sub: 'Gerando protocolo no HelpDesk', icon: <ShieldCheck size={16}/> },
    DONE: { label: 'Concluído', sub: 'Atendimento formalizado com sucesso', icon: <Sparkles size={16}/> }
  },
  content: {
    welcome: "Bem-vindo ao Balcão Virtual Hermida Maia.",
    subtitle: "Atendimento 100% digital orquestrado por inteligência especializada.",
    cta: "Iniciar Atendimento Digital",
    disclaimer: "Seus dados estão protegidos sob isolamento RLS e conformidade integral com a LGPD.",
    success: "Protocolo de atendimento gerado. Verifique seu e-mail para acompanhar as movimentações.",
    fallback: "Houve uma oscilação na orquestração neural. Por favor, tente novamente em alguns instantes."
  }
};
