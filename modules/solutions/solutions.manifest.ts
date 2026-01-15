/**
 * HM-V12 MODULE MANIFEST - SOLUÇÕES (KNOWLEDGE BASE)
 * Versão: 13.11.0 (ENGAGEMENT & FEEDBACK READY)
 * Status: FINAL_POLISH - 98% COMPLETUDE
 */
export const SolutionsManifest = {
  id: "solutions",
  name: "Soluções Jurídicas",
  version: "13.11.0",
  authorizedBy: "Dr. Adriano Hermida Maia",
  authHash: "AUTH-SOL-V13-11-FINAL-ENGAGE",
  status: "PRODUCTION_READY",
  paths: {
    module: "modules/solutions",
    skeleton: "solutions-skeleton.tsx",
    router: "solutions-router.ts",
    pages: ["pages/HelpCenter.tsx", "admin/solutions/solutions.tsx"],
    shield: "admin/solutions/shield.tsx"
  },
  capabilities: [
    "PUBLIC_HELP_CENTER_UI",
    "PRIVATE_KNOWLEDGE_BASE",
    "GEMINI_RAG_INTEGRATION",
    "ARTICLE_FEEDBACK_LOOP", // Votação útil/não útil
    "RELATED_ARTICLES_ENGINE",
    "ARTICLE_VIEW_ANALYTICS",
    "MCP_SERVER_SYNC",
    "FAST_TICKET_CONVERSION"
  ],
  database: {
    schema: "solutions",
    tables: ["categories", "articles", "article_views", "article_feedback"],
    external_refs: ["auth.users", "tickets.tickets"]
  },
  permissions: {
    allowedRoles: ["guest", "admin", "cliente"],
    editRoles: ["admin", "advogado"],
    requiresAuthForPrivate: true
  },
  audit: {
    securityLevel: 'V12-MAXIMUM',
    last_audit: new Date().toISOString(),
    completion_score: 98,
    mcp_ready: true
  }
};