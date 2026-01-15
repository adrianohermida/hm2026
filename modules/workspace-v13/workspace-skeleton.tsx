
import React from 'react';
import { Layout, Sparkles, Shield } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const WorkspaceSkeleton: IModuleSkeleton = {
  moduleId: "workspace-v13",
  moduleName: "Workspace Soberano",
  title: "Espaço Neutro V13",
  description: "Ambiente de alta performance para concepção de novos fluxos sob o domínio hermidamaia.adv.br.",
  icon: React.createElement(Layout, { size: 40, className: "text-brand-secondary/40" }),
  
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
    label: "Espaço Branco",
    icon: React.createElement(Layout, { size: 18 }),
    route: "workspace-v13",
    order: 100
  },

  breadcrumbs: [
    { label: "Dashboard", route: "dashboard", isClickable: true },
    { label: "Workspace", route: "workspace-v13", isClickable: false }
  ],

  metadata: {
    version: "13.20.0",
    type: 'CANVAS',
    arch: 'HM-V12-SOBERANO',
    mcp_sync: true
  }
};
