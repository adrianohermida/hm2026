
import React from 'react';
import { Gavel, Scale, FileSearch } from 'lucide-react';

export const ProcessSkeleton = {
  moduleId: 'processos',
  moduleName: 'Contencioso',
  title: 'Gestão Processual',
  description: 'Monitoramento de acervo processual, prazos e sincronização com tribunais via Datajud.',
  icon: <Gavel size={40} className="text-brand-secondary/40" />,
  
  permissions: { allowedRoles: ['admin', 'gestor', 'advogado'] },

  sidebar: {
    label: 'Processos',
    icon: <Gavel size={18} />,
    route: 'processos',
    order: 4,
    requiredRoles: ['admin', 'gestor', 'advogado']
  },

  breadcrumbs: [
    { label: 'Início', route: 'dashboard', isClickable: true },
    { label: 'Jurídico', route: 'processos', isClickable: false }
  ]
} as const;
