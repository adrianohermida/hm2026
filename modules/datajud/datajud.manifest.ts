/**
 * HM-V12 MANIFESTO DE MÓDULO - DATAJUD (CNJ)
 * Versão: 2.3.0 (CORS FIX & SYNC REPAIR)
 * Status: ATIVO - PRODUÇÃO
 */
export const DataJudManifest = {
  id: "datajud",
  name: "Integração DataJud (CNJ)",
  version: "2.3.0",
  authorizedBy: "Dr. Adriano Hermida Maia",
  authHash: "AUTH-CNJ-V2.3-CORS-FIX",
  status: "ACTIVE",
  paths: {
    module: "modules/datajud",
    skeleton: "datajud-skeleton.tsx",
    router: "datajud-router.ts",
    service: "DataJudService.ts",
    pages: ["admin/datajud/DataJudConfig.tsx"],
    shield: "admin/datajud/shield.tsx"
  },
  legalNature: {
    isOfficialSource: true,
    description: "Fonte pública oficial (CNJ/DataJud). O sistema utiliza Edge Functions para comunicação segura.",
    requiresHumanValidation: true
  },
  capabilities: [
    "EDGE_FUNCTION_PROXY",        // Proxies seguros via Supabase Functions
    "JUDICIARIO_SCHEMA_SYNC",     // Sincronia com schema judiciario.*
    "CNJ_SEARCH_ENGINE",          // Busca ativa por numeração
    "ASYNC_PROCESS_UPDATE",       // Atualização em segundo plano
    "SHIELD_SERVERLESS_AUDIT",    // Auditoria de funções cloud
    "LGPD_TRAFFIC_LOGGING",       // Registro de tratamento de dados art. 37
    "CORS_FAILURE_RECOVERY"       // Tratamento de falhas de rede/CORS
  ],
  security: {
    containsSensitiveData: true,
    rlsRequired: true,
    apiKeysInFrontend: false
  },
  mtdSupport: {
    supportedVersions: ["1.1", "1.2", "2.0"],
    defaultVersion: "1.2",
    auditMTDVersion: true
  },
  database: {
    schema: "judiciario",
    tables: [
      "datajud_sync_status", 
      "monitoramento_queue", 
      "processos", 
      "movimentacoes",
      "movimentos",
      "partes",
      "endpoints"
    ],
    external_refs: ["ged.documentos", "agenda.eventos", "lgpd.logs_tratamento"]
  },
  audit: {
    securityLevel: 'V12-MAXIMUM',
    last_audit: new Date().toISOString(),
    status: "NOMINAL"
  }
};