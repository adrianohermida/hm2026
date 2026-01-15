import React from 'react';
import { Square, Sparkles } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const BlankCanvasSkeleton: IModuleSkeleton = {
  moduleId: "blank-canvas",
  moduleName: "Quadro Branco",
  title: "Canvas Digital",
  description: "Área de trabalho limpa para rascunho e concepção de novos fluxos.",
  icon: React.createElement(Square, { size: 40, className: "text-brand-secondary/40" }),
  
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
    label: "Quadro Branco",
    icon: React.createElement(Square, { size: 18 }),
    route: "blank-canvas",
    order: 100
  },

  breadcrumbs: [
    { label: "Dashboard", route: "dashboard", isClickable: true },
    { label: "Quadro Branco", route: "blank-canvas", isClickable: false }
  ],

  metadata: {
    version: "1.0.1",
    type: 'CANVAS',
    arch: 'HM-V12-CANVAS',
    mcp_sync: true
  }
};