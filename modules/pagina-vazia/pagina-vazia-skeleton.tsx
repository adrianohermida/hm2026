
import React from 'react';
import { Square, Sparkles } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const PaginaVaziaSkeleton: IModuleSkeleton = {
  moduleId: "pagina-vazia",
  moduleName: "Página Vazia",
  title: "Espaço Livre",
  description: "Área limpa pronta para desenvolvimento de novos conceitos.",
  icon: React.createElement(Square, { size: 40, className: "text-brand-secondary/40" }),
  
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
    label: "Página Vazia",
    icon: React.createElement(Square, { size: 18 }),
    route: "pagina-vazia",
    order: 102,
    badge: "NEW"
  },

  breadcrumbs: [
    { label: "Dashboard", route: "dashboard", isClickable: true },
    { label: "Vazio", route: "pagina-vazia", isClickable: false }
  ],

  metadata: {
    version: "1.0.0",
    type: 'TEMPLATE',
    arch: 'HM-V12-UI',
    mcp_sync: false
  }
};
