
import React from 'react';
import { Layout, Sparkles } from 'lucide-react';

/**
 * HM-V12: Skeleton de definição do módulo Canvas Digital.
 */
export const CanvasSkeleton = {
  moduleId: 'canvas',
  moduleName: 'Canvas Digital',
  // HM-V12: Adicionado campo 'name' para compatibilidade com orquestradores
  name: 'Canvas Digital',
  title: 'Espaço em Branco',
  // HM-V12: 'pageTitle' configurado com duas palavras para suportar o split visual no portal
  pageTitle: 'Novo Espaço',
  icon: <Layout size={40} className="text-brand-secondary/40" />,
  // HM-V12: Adicionados ícones específicos requeridos pela View PaginaEmBranco
  titleIcon: <Layout size={40} className="text-brand-secondary/40" />,
  badgeIcon: <Sparkles size={16} className="text-brand-secondary" />,
  description: 'Esta é uma página preparada para síntese pelo Kernel HM-V12. Defina o objetivo jurídico e ative a orquestração.',
  
  // Configuração de Sidebar Dinâmico
  sidebar: {
    label: 'Novo Módulo',
    icon: <Layout size={18} />,
    route: 'canvas',
    order: 100,
    badge: 'Draft'
  },

  // Configuração de Breadcrumbs Automáticos
  breadcrumbs: [
    { label: 'Dashboard', route: 'dashboard', isClickable: true },
    { label: 'Canvas Digital', route: 'canvas', isClickable: false }
  ],

  // Corrigido: Seguindo a estrutura { allowedRoles: string[] } exigida por IModuleSkeleton
  permissions: {
    allowedRoles: ['admin', 'gestor']
  },

  metadata: {
    version: '1.2.0',
    type: 'DRAFT_SPACE',
    arch: 'HM-V12-MODULES'
  },
  placeholders: {
    actionButton: 'Sintetizar Módulo',
    backButton: 'Voltar ao Início'
  }
};
