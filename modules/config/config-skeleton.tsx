
import React from 'react';
import { Settings, Shield, Users, Building2, Database, ShieldCheck, Github, Zap } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const ConfigSkeleton: IModuleSkeleton = {
  moduleId: 'configuracoes',
  moduleName: 'Configurações',
  title: 'Gestão da Firma',
  description: 'Gerenciamento institucional, branding e orquestração de entrega via GitHub Pages.',
  icon: React.createElement(Settings, { size: 40, className: "text-brand-secondary/40" }),
  
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
    govBr: true,
    blockchain: false,
    cloudflare: true,
    vercelAiGateway: false // DESATIVADO: Transição completa para GitHub Pages
  },

  permissions: { 
    allowedRoles: ['admin', 'gestor'] 
  },

  sidebar: {
    label: 'Configurações',
    icon: React.createElement(Settings, { size: 18 }),
    route: 'configuracoes',
    order: 11
  },

  breadcrumbs: [
    { label: 'Início', route: 'dashboard', isClickable: true },
    { label: 'Configurações', route: 'configuracoes', isClickable: false }
  ],

  metadata: { 
    version: '13.16.0', 
    type: 'MANAGEMENT', 
    arch: 'HM-V12-GITHUB-SOVEREIGN', 
    mcp_sync: true,
    schema: 'governanca',
    domain: 'hermidamaia.adv.br',
    hosting: 'GITHUB_PAGES'
  }
};

export const ConfigLabels = {
  tabs: [
    { id: 'PERFIL', label: 'Meu Perfil', icon: React.createElement(Users, { size: 14 }) },
    { id: 'ESCRITORIO', label: 'Escritório', icon: React.createElement(Building2, { size: 14 }) },
    { id: 'DATAJUD', label: 'DataJud CNJ', icon: React.createElement(Database, { size: 14 }) },
    { id: 'PREFERENCIAS', label: 'Preferências', icon: React.createElement(Settings, { size: 14 }) },
    { id: 'EQUIPE', label: 'Equipe & IA', icon: React.createElement(Shield, { size: 14 }) },
    { id: 'DEPLOY', label: 'GitHub Console', icon: React.createElement(Github, { size: 14 }) },
    { id: 'SHIELD', label: 'Shield Auditor', icon: React.createElement(ShieldCheck, { size: 14 }) }
  ]
};
