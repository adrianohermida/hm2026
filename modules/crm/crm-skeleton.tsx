import React from 'react';
import { Users, Target, Settings2, ShieldCheck } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const CRMSkeleton: IModuleSkeleton = {
  moduleId: "crm",
  moduleName: "CRM",
  title: "Gestão de Relacionamento",
  description: "Gestão centralizada de oportunidades, contatos e conversões.",
  icon: React.createElement(Users, { size: 40, className: "text-brand-secondary/40" }),
  
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
    allowedRoles: ["admin", "gestor", "advogado"]
  },

  sidebar: {
    label: "CRM",
    icon: React.createElement(Users, { size: 18 }),
    route: "crm",
    order: 2
  },

  breadcrumbs: [
    { label: "Governança", route: "dashboard", isClickable: true },
    { label: "CRM", route: "crm", isClickable: false }
  ],

  metadata: {
    version: "23.0.0",
    type: 'CORE',
    arch: 'HM-V12-HYBRID',
    mcp_sync: true
  }
};

export const CRMLabels = {
  modos: [
    { id: 'VENDAS', label: 'Funil de Vendas', icon: React.createElement(Target, { size: 14 }) },
    { id: 'CLIENTES', label: 'Lista de Contatos', icon: React.createElement(Users, { size: 14 }) },
    { id: 'CAMPOS', label: 'Propriedades', icon: React.createElement(Settings2, { size: 14 }) },
    { id: 'SHIELD', label: 'Escudo CRM', icon: React.createElement(ShieldCheck, { size: 14 }) }
  ]
};