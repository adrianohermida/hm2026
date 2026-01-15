/**
 * HM-V12 GLOBAL MODULE MANIFEST – SSOT (Source of Truth)
 */
export type ModuleManifest = {
  id: string;
  name: string;
  version?: string;
  authorizedBy?: string; 
  authHash?: string; 
  paths: {
    module: string;
    skeleton: string;
    router: string;
    pages: string[];
    log?: string;
    shield?: string;
    service?: string; // HM-V12 Add: Explicit Service Path
  };
  navigation: {
    sidebarRoute?: string;
    breadcrumbs?: string[];
    hiddenFromSidebar?: boolean;
  };
  database?: {
    schema?: string;
    tables?: string[];
    external_refs?: string[];
  };
  permissions: {
    allowedRoles: string[];
    isPublic?: boolean;
    requiresAuth?: boolean;
  };
  audit: {
    usesSupabase: boolean;
    usesAuth: boolean;
    usesOAuth: boolean;
    securityLevel: 'V12-MAXIMUM' | 'V12-STANDARD';
    externalApis?: string[];
  };
  legalNature?: {
    isOfficialSource: boolean;
    description: string;
    requiresHumanValidation: boolean;
  };
  mtdSupport?: {
    supportedVersions: string[];
    defaultVersion: string;
    auditMTDVersion: boolean;
  };
  security?: {
    containsSensitiveData: boolean;
    rlsRequired: boolean;
    apiKeysInFrontend: boolean;
  };
};

export const ModulesManifest: Record<string, ModuleManifest> = {
  governance: {
    id: "governance",
    name: "Núcleo de Governança",
    version: "12.5.0",
    authorizedBy: "Dr. Adriano Hermida Maia",
    authHash: "AUTH-SEC-UPGRADE-99",
    paths: {
      module: "modules",
      skeleton: "contracts.ts",
      router: "audit-service.ts",
      pages: [],
      log: "modules/manifesto-log.ts"
    },
    navigation: { hiddenFromSidebar: true },
    permissions: { allowedRoles: ["admin"] },
    audit: { usesSupabase: true, usesAuth: true, usesOAuth: false, securityLevel: 'V12-MAXIMUM' }
  },
  "balcao-virtual": {
    id: "balcao-virtual",
    name: "Balcão Virtual",
    version: "13.0.0",
    authorizedBy: "Dr. Adriano Hermida Maia",
    authHash: "AUTH-BV-V13-HUMAN",
    paths: {
      module: "modules/balcao-virtual",
      skeleton: "balcao-virtual-skeleton.tsx",
      router: "balcao-virtual-router.ts",
      pages: ["pages/BalcaoVirtual.tsx"],
      shield: "admin/balcao-virtual/shield.tsx",
      log: "modules/manifesto-log.ts"
    },
    navigation: { sidebarRoute: "balcao-virtual" },
    permissions: { allowedRoles: ["guest", "admin", "cliente"] },
    audit: { usesSupabase: true, usesAuth: false, usesOAuth: false, securityLevel: 'V12-MAXIMUM' }
  },
  dashboard: {
    id: "dashboard",
    name: "Dashboard BI",
    paths: { module: "modules/dashboard", skeleton: "dashboard-skeleton.tsx", router: "dashboard-router.ts", pages: ["admin/dashboard/dashboard.tsx"] },
    navigation: { sidebarRoute: "dashboard" },
    database: { schema: "metrics", tables: ["module_scores"] },
    permissions: { allowedRoles: ["admin", "gestor", "cliente"], requiresAuth: true },
    audit: { usesSupabase: true, usesAuth: true, usesOAuth: false, securityLevel: 'V12-MAXIMUM' },
  },
  home: {
    id: "home",
    name: "Portal Público (Home)",
    version: "12.20.0",
    authorizedBy: "Dr. Adriano Hermida Maia",
    authHash: "AUTH-RESTORE-V12-HOME",
    paths: {
      module: "modules/home",
      skeleton: "home-skeleton.tsx",
      router: "home-router.ts",
      pages: ["pages/Inicio.tsx"],
      log: "modules/manifesto-log.ts"
    },
    navigation: { sidebarRoute: "home" },
    permissions: { allowedRoles: ["guest", "admin", "cliente"] },
    audit: { usesSupabase: true, usesAuth: false, usesOAuth: false, securityLevel: 'V12-MAXIMUM' }
  },
  crm: { 
    id: "crm", 
    name: "CRM", 
    paths: { 
      module: "modules/crm", 
      skeleton: "crm-skeleton.tsx", 
      router: "crm-router.ts", 
      pages: ["admin/crm/crm.tsx"] 
    }, 
    navigation: { sidebarRoute: "crm" }, 
    database: { schema: "crm", tables: ["leads", "clientes"] }, 
    permissions: { allowedRoles: ["admin", "gestor"], requiresAuth: true }, 
    audit: { usesSupabase: true, usesAuth: true, usesOAuth: false, securityLevel: 'V12-MAXIMUM' } 
  },
  tickets: { id: "tickets", name: "HelpDesk V12", paths: { module: "modules/helpdesk", skeleton: "helpdesk-skeleton.tsx", router: "helpdesk-router.ts", pages: ["admin/helpdesk/helpdesk.tsx"] }, navigation: { sidebarRoute: "tickets" }, database: { schema: "tickets", tables: ["tickets"] }, permissions: { allowedRoles: ["admin", "advogado", "cliente"], requiresAuth: true }, audit: { usesSupabase: true, usesAuth: true, usesOAuth: false, securityLevel: 'V12-MAXIMUM' } },
  datajud: {
    id: "datajud",
    name: "Integração DataJud (CNJ)",
    version: "2.3.0",
    authorizedBy: "Dr. Adriano Hermida Maia",
    authHash: "AUTH-CNJ-V2.3-CORS-FIX",
    paths: {
      module: "modules/datajud",
      skeleton: "datajud-skeleton.tsx",
      router: "datajud-router.ts",
      service: "DataJudService.ts",
      pages: ["admin/datajud/DataJudConfig.tsx"],
      shield: "admin/datajud/shield.tsx"
    },
    navigation: { hiddenFromSidebar: true }, // Acessado via Configurações
    database: {
      schema: "judiciario",
      tables: ["datajud_audit_log", "datajud_sync_status"]
    },
    legalNature: {
      isOfficialSource: true,
      description: "Fonte pública oficial (CNJ/DataJud). O sistema não altera dados, apenas audita.",
      requiresHumanValidation: true
    },
    mtdSupport: {
      supportedVersions: ["1.1", "1.2"],
      defaultVersion: "1.2",
      auditMTDVersion: true
    },
    permissions: { allowedRoles: ["admin", "advogado"], requiresAuth: true },
    audit: { usesSupabase: true, usesAuth: true, usesOAuth: false, securityLevel: 'V12-MAXIMUM' }
  },
  "blank-canvas": {
    id: "blank-canvas",
    name: "Quadro Branco",
    version: "1.0.1",
    authorizedBy: "Dr. Adriano Hermida Maia",
    authHash: "AUTH-CANVAS-V1-SYNC",
    paths: {
      module: "modules/blank-canvas",
      skeleton: "blank-canvas-skeleton.tsx",
      router: "blank-canvas-router.ts",
      pages: ["pages/BlankCanvas.tsx"],
      shield: "admin/blank-canvas/shield.tsx"
    },
    navigation: { sidebarRoute: "blank-canvas" },
    database: { schema: "governanca", tables: ["audit_logs"] },
    permissions: { allowedRoles: ["admin", "gestor", "advogado", "cliente"], requiresAuth: false },
    audit: { usesSupabase: true, usesAuth: false, usesOAuth: false, securityLevel: 'V12-STANDARD' }
  },
  "v12-blank": {
    id: "v12-blank",
    name: "Página Modelo V12",
    version: "1.0.0",
    authorizedBy: "Dr. Adriano Hermida Maia",
    authHash: "AUTH-V12-BLANK-INIT",
    paths: {
      module: "modules/v12-blank",
      skeleton: "v12-blank-skeleton.tsx",
      router: "v12-blank-router.ts",
      pages: ["pages/V12Blank.tsx"],
      shield: "admin/v12-blank/shield.tsx"
    },
    navigation: { sidebarRoute: "v12-blank" },
    permissions: { allowedRoles: ["admin", "gestor"], requiresAuth: true },
    audit: { usesSupabase: false, usesAuth: false, usesOAuth: false, securityLevel: 'V12-STANDARD' }
  }
};