
import React from 'react';
import { Beaker, Sparkles } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const LabSkeleton: IModuleSkeleton = {
  moduleId: "lab",
  moduleName: "Laboratório",
  title: "Área de Testes",
  description: "Espaço em branco para prototipagem e síntese de novos fluxos jurídicos.",
  icon: React.createElement(Beaker, { size: 40, className: "text-brand-secondary/40" }),
  
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
    label: "Laboratório",
    icon: React.createElement(Beaker, { size: 18 }),
    route: "lab",
    order: 105,
    badge: "LAB"
  },

  breadcrumbs: [
    { label: "Dashboard", route: "dashboard", isClickable: true },
    { label: "Laboratório", route: "lab", isClickable: false }
  ],

  metadata: {
    version: "1.0.0",
    type: 'SANDBOX',
    arch: 'HM-V12-UI',
    mcp_sync: false
  }
};
