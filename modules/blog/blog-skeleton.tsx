
import React from 'react';
import { BookOpen, PenTool, Layout } from 'lucide-react';

export const BlogSkeleton = {
  moduleId: 'blog',
  moduleName: 'CMS Blog',
  title: 'Gerenciador de Conteúdo',
  description: 'Publicação de artigos educativos, gestão de categorias e SEO jurídico.',
  icon: <BookOpen size={40} className="text-brand-secondary/40" />,
  
  permissions: { allowedRoles: ['admin', 'gestor'] },

  sidebar: {
    label: 'Blog CMS',
    icon: <BookOpen size={18} />,
    route: 'blog',
    order: 9,
    requiredRoles: ['admin', 'gestor']
  },

  breadcrumbs: [
    { label: 'Marketing', route: 'dashboard', isClickable: true },
    { label: 'Blog', route: 'blog', isClickable: false }
  ]
} as const;
