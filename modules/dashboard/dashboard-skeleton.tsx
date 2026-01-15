import React from 'react';
import { LayoutGrid, PieChart, Users, Ticket, Headset, Zap, BookOpen, Megaphone, Bot, Briefcase, Settings } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const DashboardSkeleton: IModuleSkeleton = {
  moduleId: 'dashboard',
  moduleName: 'Dashboard',
  title: 'Gestão Estratégica',
  description: 'Orquestração centralizada de todos os núcleos operacionais da advocacia digital.',
  icon: React.createElement(PieChart, { size: 40, className: "text-brand-secondary/40" }),
  
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
    cloudflare: true
  },

  permissions: {
    allowedRoles: ['admin', 'gestor'],
  },

  sidebar: {
    label: 'Dashboard',
    icon: React.createElement(LayoutGrid, { size: 18 }),
    route: 'dashboard',
    order: 0,
    badge: 'ATIVO',
  },

  breadcrumbs: [
    { label: 'Sistema', route: 'dashboard', isClickable: false }
  ],

  metadata: {
    version: '12.0.1',
    type: 'ORQUESTRADOR_CORE',
    arch: 'HM-V12-SOBERANO',
    mcp_sync: true
  }
};