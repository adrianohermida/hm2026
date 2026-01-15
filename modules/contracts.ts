
import React from 'react';

/**
 * HM-V12 FORMAL LAYER CONTRACTS
 * Definindo a SSOT para Módulos com foco em System Instructions.
 */

export interface IModuleSkeleton {
  moduleId: string;
  moduleName: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  
  // Governança de Instruções (Regras Estritas V12)
  compliance: {
    atomization: boolean; // Página ≤ 50 lines / Componente ≤ 200
    ssotAlignment: boolean; // Sem textos hardcoded em componentes
    isolationLevel: 'STRICT' | 'FLEXIBLE';
    lgpdByDesign: boolean;
    hookDriven: boolean; // Toda lógica reside em hooks (useX)
  };

  // Integrações Críticas (SSOT via Manifesto)
  integrations: {
    supabase: boolean;
    googleWorkspace: boolean;
    govBr: boolean;
    blockchain: boolean;
    cloudflare: boolean;
    // HM-V12 Fix: Included vercelAiGateway in the integrations contract to support deployment control modules
    vercelAiGateway?: boolean;
  };

  permissions: {
    allowedRoles: string[];
    requiresMfa?: boolean;
  };

  sidebar: {
    label: string;
    icon: React.ReactNode;
    route: string;
    order: number;
    badge?: string;
  };

  breadcrumbs: {
    label: string;
    route: string;
    isClickable: boolean;
  }[];

  // HM-V12: Dashboard Extensions
  kpis?: Record<string, any>;
  gadgets?: Record<string, any>;

  metadata: {
    version: string;
    type: string; // Relaxed for V12 compatibility (CORE, REGISTRY, DRAFT, etc.)
    arch: string; // Relaxed for V12 compatibility
    mcp_sync: boolean;
    ddl_blueprint?: string;
    [key: string]: any;
  };
}

export interface IModuleRouter {
  readonly SCHEMA?: string;
  readonly TABLE?: string;
  [key: string]: any;
}
