import React from 'react';
import { HardDrive, FileText, ShieldCheck, Zap } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const DocumentsSkeleton: IModuleSkeleton = {
  moduleId: "documentos",
  moduleName: "GED",
  title: "Gestão Eletrônica de Documentos",
  description: "Repositório seguro de ativos e documentos processuais.",
  icon: React.createElement(HardDrive, { size: 40, className: "text-brand-secondary/40" }),
  
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
    allowedRoles: ['admin', 'gestor', 'advogado'] 
  },

  sidebar: {
    label: "GED",
    icon: React.createElement(HardDrive, { size: 18 }),
    route: "documentos",
    order: 9
  },

  breadcrumbs: [
    { label: "Governança", route: "dashboard", isClickable: true },
    { label: "GED", route: "documentos", isClickable: false }
  ],

  metadata: {
    version: "15.1.0",
    type: 'CORE_STORAGE',
    arch: 'HM-V12-DRIVE',
    mcp_sync: true,
    schema: 'ged',
    tables: ['documentos', 'categorias', 'documento_vinculos']
  }
};