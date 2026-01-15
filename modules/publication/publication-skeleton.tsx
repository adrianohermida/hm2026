
import React from 'react';
import { Zap, Bell, FileText } from 'lucide-react';

export const PublicationSkeleton = {
  moduleId: 'publicacoes',
  moduleName: 'Publicações',
  title: 'Recortes Digitais',
  description: 'Monitoramento automático de diários oficiais e extração de intimações por IA.',
  icon: <Zap size={40} className="text-brand-secondary/40" />,
  
  permissions: { allowedRoles: ['admin', 'advogado'] },

  sidebar: {
    label: 'Publicações',
    icon: <Zap size={18} />,
    route: 'publicacoes',
    order: 5,
    requiredRoles: ['admin', 'advogado']
  },

  breadcrumbs: [
    { label: 'Dashboard', route: 'dashboard', isClickable: true },
    { label: 'Publicações', route: 'publicacoes', isClickable: false }
  ]
} as const;
