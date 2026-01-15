
import React from 'react';
import { Square } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const TrulyBlankSkeleton: IModuleSkeleton = {
  moduleId: "truly-blank",
  moduleName: "Vazio",
  title: "",
  description: "",
  icon: <Square size={40} />,
  
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
    cloudflare: false
  },

  permissions: {
    allowedRoles: ["admin", "gestor", "cliente", "guest"]
  },

  sidebar: {
    label: "Página em Branco",
    icon: <Square size={18} />,
    route: "truly-blank",
    order: -1 // Prioridade máxima na sidebar
  },

  breadcrumbs: [],

  metadata: {
    version: "1.1.0",
    type: 'TEMPLATE',
    arch: 'HM-V12-VOID',
    mcp_sync: false
  }
};
