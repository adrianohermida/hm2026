
import React from 'react';
import { LayoutDashboard, PieChart, Activity } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const DashboardSkeleton: IModuleSkeleton = {
  moduleId: "dashboard",
  moduleName: "Dashboard",
  title: "Visão Geral",
  description: "Centro de comando e inteligência de negócios (BI) do escritório.",
  icon: <LayoutDashboard size={40} className="text-brand-secondary/40" />,
  
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
    label: "Visão Geral",
    icon: <PieChart size={18} />,
    route: "dashboard",
    order: 0
  },

  breadcrumbs: [
    { label: "Kernel", route: "dashboard", isClickable: true },
    { label: "Visão Geral", route: "dashboard", isClickable: false }
  ],

  metadata: {
    version: "12.5.0",
    type: 'BI_CORE',
    arch: 'HM-V12-KERN',
    mcp_sync: true,
    schema: 'metrics'
  },

  kpis: {
    refreshRate: 30000, // 30s
    realtime: true
  }
};
