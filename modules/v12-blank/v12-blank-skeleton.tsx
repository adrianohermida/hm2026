import React from 'react';
import { FilePlus } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const V12BlankSkeleton: IModuleSkeleton = {
  moduleId: "v12-blank",
  moduleName: "Modelo V12",
  title: "Espaço Modelo",
  description: "Template oficial para novas interfaces em conformidade com o Kernel V12.",
  icon: React.createElement(FilePlus, { size: 40, className: "text-brand-secondary/40" }),
  
  compliance: {
    atomization: true,
    ssotAlignment: true,
    isolationLevel: 'STRICT',
    lgpdByDesign: true,
    hookDriven: true
  },

  integrations: {
    supabase: false,
    googleWorkspace: false,
    govBr: false,
    blockchain: false,
    cloudflare: true
  },

  permissions: {
    allowedRoles: ["admin", "gestor"]
  },

  sidebar: {
    label: "Modelo V12",
    icon: React.createElement(FilePlus, { size: 18 }),
    route: "v12-blank",
    order: 101,
    badge: "NEW"
  },

  breadcrumbs: [
    { label: "Dashboard", route: "dashboard", isClickable: true },
    { label: "Modelo", route: "v12-blank", isClickable: false }
  ],

  metadata: {
    version: "1.0.0",
    type: 'TEMPLATE',
    arch: 'HM-V12-UI',
    mcp_sync: false
  }
};