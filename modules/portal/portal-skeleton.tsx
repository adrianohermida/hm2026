
import React from 'react';
import { LayoutDashboard, Scale, MessageSquare, CreditCard, FileUp, Wallet, Calendar } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const PortalSkeleton: IModuleSkeleton = {
  moduleId: "client-portal",
  moduleName: "Portal do Cliente",
  title: "Área de Atendimento",
  description: "Ambiente seguro para acompanhamento processual e interação estratégica.",
  icon: <LayoutDashboard size={40} />,
  
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
    govBr: true,
    blockchain: false,
    cloudflare: true
  },

  permissions: {
    allowedRoles: ["cliente", "admin"]
  },

  sidebar: {
    label: "Portal",
    icon: <LayoutDashboard size={18} />,
    route: "portal",
    order: 0
  },

  breadcrumbs: [
    { label: "Home", route: "home", isClickable: true },
    { label: "Portal do Cliente", route: "portal", isClickable: false }
  ],

  metadata: {
    version: "12.5.0",
    type: 'ORCHESTRATOR',
    arch: 'HM-V12-KERN',
    mcp_sync: true
  }
};

export const PortalLabels = {
  tabs: [
    { id: 'overview', label: 'Visão Geral', icon: <LayoutDashboard size={18} /> },
    { id: 'processos', label: 'Meus Processos', icon: <Scale size={18} /> },
    { id: 'tickets', label: 'Atendimento', icon: <MessageSquare size={18} /> },
    { id: 'financeiro', label: 'Financeiro', icon: <CreditCard size={18} /> },
    { id: 'documentos', label: 'Documentos', icon: <FileUp size={18} /> },
    { id: 'plano', label: 'Plano de Pagamento', icon: <Wallet size={18} /> },
    { id: 'agenda', label: 'Agenda', icon: <Calendar size={18} /> },
  ],
  security: "Ambiente Protegido por Criptografia AES-256",
  emptyState: "Nenhum registro localizado no Ledger."
};
