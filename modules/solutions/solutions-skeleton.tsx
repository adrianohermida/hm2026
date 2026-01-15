import React from 'react';
import { BookOpen, Search, FileText, Folder, Star, Zap, ShieldCheck } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const SolutionsSkeleton: IModuleSkeleton = {
  moduleId: "solutions",
  moduleName: "Base de Conhecimento",
  title: "Central de Ajuda",
  description: "Repositório estratégico de orientações jurídicas e autoatendimento.",
  icon: <BookOpen size={40} className="text-brand-secondary/40" />,
  
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
    allowedRoles: ["guest", "admin", "cliente"]
  },

  sidebar: {
    label: "Soluções",
    icon: <BookOpen size={18} />,
    route: "solutions",
    order: 4
  },

  breadcrumbs: [
    { label: "Início", route: "home", isClickable: true },
    { label: "Central de Ajuda", route: "solutions", isClickable: false }
  ],

  metadata: {
    version: "13.10.0",
    type: 'CONTENT_CMS',
    arch: 'HM-V12-CMS',
    mcp_sync: true
  }
};

export const SolutionsLabels = {
  header: {
    title: "Como podemos ajudar hoje?",
    subtitle: "Encontre orientações, guias e respostas para sua demanda estratégica."
  },
  search: {
    placeholder: "Busque por termos jurídicos, leis ou processos...",
    noResults: "Nenhum artigo localizado. Tente termos mais amplos."
  },
  categories: {
    public: "Acesso Livre",
    private: "Exclusivo Clientes"
  },
  admin: {
    newArticle: "Sintetizar Artigo",
    newCategory: "Nova Coleção",
    status: {
      draft: "Rascunho",
      published: "Publicado",
      private: "Privado"
    }
  }
};