import React from 'react';
import { Settings, Shield, Users, Building2, Palette, Bell, ShieldCheck, Zap } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

/**
 * HM-V12 MODULE MANIFEST - CONFIGURAÇÕES
 * Versão: 13.12.0 (ADMIN DEPLOY MODE)
 * Status: HOMOLOGADO
 */
// HM-V12 Fix: Replaced JSX with React.createElement because .ts files do not support JSX syntax.
export const ConfigSkeleton: IModuleSkeleton = {
  moduleId: 'configuracoes',
  moduleName: 'Configurações',
  title: 'Gestão da Firma',
  description: 'Gerenciamento institucional, branding, controle de equipe e orquestração de deploy controlado.',
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
    vercelAiGateway: true // Nova integração de deploy
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
    version: '13.12.0', 
    type: 'MANAGEMENT', 
    arch: 'HM-V12-ADMIN-GATEWAY', 
    mcp_sync: true,
    schema: 'governanca',
    tables: [
      'configuracoes_gerais', 
      'branding_office', 
      'perfis_equipe', 
      'deploy_audit_logs' // Nova tabela de auditoria
    ],
    deploy_mode: 'VERCEL_AI_GATEWAY_CONTROLLED'
  }
};

export const ConfigLabels = {
  tabs: [
    // HM-V12 Fix: Using React.createElement for icons to ensure compatibility with .ts extension and fix parsing errors.
    { id: 'PERFIL', label: 'Meu Perfil', icon: React.createElement(Users, { size: 14 }) },
    { id: 'ESCRITORIO', label: 'Escritório', icon: React.createElement(Building2, { size: 14 }) },
    { id: 'PREFERENCIAS', label: 'Preferências', icon: React.createElement(Settings, { size: 14 }) },
    { id: 'EQUIPE', label: 'Equipe & IA', icon: React.createElement(Shield, { size: 14 }) },
    { id: 'DEPLOY', label: 'Deploy Hub', icon: React.createElement(Zap, { size: 14 }) }, // Nova Aba
    { id: 'SHIELD', label: 'Shield Auditor', icon: React.createElement(ShieldCheck, { size: 14 }) }
  ]
};