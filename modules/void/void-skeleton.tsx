import React from 'react';
import { BoxSelect, Sparkles, Shield } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const VoidSkeleton: IModuleSkeleton = {
  moduleId: "void-cell",
  moduleName: "Célula Neutra",
  title: "Espaço Neutro",
  description: "Workspace em standby para estabilização de cota e síntese de novos fluxos.",
  icon: React.createElement(BoxSelect, { size: 40, className: "text-brand-secondary/40" }),
  
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
    allowedRoles: ["admin", "gestor", "advogado", "cliente"]
  },

  sidebar: {
    label: "Célula Neutra",
    icon: React.createElement(BoxSelect, { size: 18 }),
    route: "void-cell",
    order: 99
  },

  breadcrumbs: [
    { label: "Dashboard", route: "dashboard", isClickable: true },
    { label: "Célula Neutra", route: "void-cell", isClickable: false }
  ],

  metadata: {
    version: "14.6.0",
    type: 'STANDBY',
    arch: 'HM-V12-VOID',
    mcp_sync: true
  }
};