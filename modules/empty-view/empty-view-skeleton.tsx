
import React from 'react';
import { File } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const EmptyViewSkeleton: IModuleSkeleton = {
  moduleId: 'empty-view',
  moduleName: 'Página em Branco',
  title: 'Vazio Estrutural',
  description: 'Uma página limpa para estabilização de fluxos.',
  icon: <File size={40} />,
  
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
    allowedRoles: ['admin', 'cliente', 'guest']
  },

  sidebar: {
    label: 'Página em Branco',
    icon: <File size={18} />,
    route: 'pagina-em-branco',
    order: 999
  },

  breadcrumbs: [
    { label: 'Início', route: 'home', isClickable: true },
    { label: 'Página em Branco', route: 'pagina-em-branco', isClickable: false }
  ],

  metadata: {
    version: '1.0.0',
    type: 'UI',
    arch: 'HM-V12-KERN',
    mcp_sync: false
  }
};
