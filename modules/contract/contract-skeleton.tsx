
import React from 'react';
import { FileText, Edit, CheckSquare } from 'lucide-react';

export const ContractSkeleton = {
  moduleId: 'contratos',
  moduleName: 'Contratos',
  title: 'Gestão Contratual',
  description: 'Elaboração de minutas, automação de cláusulas e gestão de assinaturas digitais.',
  icon: <FileText size={40} className="text-brand-secondary/40" />,
  
  permissions: { allowedRoles: ['admin', 'gestor'] },

  sidebar: {
    label: 'Contratos',
    icon: <FileText size={18} />,
    route: 'contratos',
    order: 7,
    requiredRoles: ['admin', 'gestor']
  },

  breadcrumbs: [
    { label: 'Início', route: 'dashboard', isClickable: true },
    { label: 'Contratos', route: 'contratos', isClickable: false }
  ]
} as const;
