/**
 * HM-V12 MODULE MANIFEST - PROCESSOS
 * Versão: 5.3.0 (ASTREA-LIKE UI & BULK IMPORT)
 * Status: PRODUCTION_READY
 */
export const ProcessosManifest = {
  id: "processos",
  name: "Gestão de Processos",
  version: "5.3.0",
  authorizedBy: "Dr. Adriano Hermida Maia",
  authHash: "AUTH-JUR-V5.3-BULK-IMPORT-READY",
  status: "ACTIVE",
  paths: {
    module: "modules/processos",
    skeleton: "processos-skeleton.tsx",
    router: "processos-router.ts",
    pages: [
      "admin/process/process.tsx", 
      "admin/process/ProcessoDetails.tsx",
      "admin/process/ProcessoDashboard.tsx",
      "admin/process/ProcessoImport.tsx",
      "admin/process/ProcessoForm.tsx",
      "painel/MeusProcessos.tsx"
    ],
    shield: "admin/processos/shield.tsx"
  },
  capabilities: [
    "PROCESS_AGGREGATE_ROOT",
    "SMART_CSV_IMPORT_ENGINE", // Nova engine de importação
    "DATAJUD_SYNC_STATUS",     // Monitoramento de sincronia
    "FINANCIAL_LEDGER_PARSER",
    "EXECUTIVE_HEATMAP_VIEW",
    "GED_CROSS_LINKING"
  ],
  database: {
    schema: "judiciario",
    tables: [
      "processos", 
      "movimentacoes", 
      "partes", 
      "financeiro_processual", 
      "datajud_sync_status",
      "monitoramento_queue"
    ],
    external_refs: ["crm.clientes", "agenda.eventos", "ged.documentos"]
  },
  permissions: {
    allowedRoles: ["admin", "advogado", "gestor", "cliente"],
    requiresAuth: true
  },
  audit: {
    securityLevel: 'V12-MAXIMUM',
    last_audit: new Date().toISOString(),
    status: "NOMINAL"
  }
};