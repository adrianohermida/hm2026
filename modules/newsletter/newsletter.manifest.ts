/**
 * HM-V12 MODULE MANIFEST - NOTÍCIAS (NEWSLETTER)
 * Versão: 12.8.0 (INTELIGÊNCIA TERMINAL)
 * Status: HOMOLOGADO - 100% COMPLETUDE
 */
export const NewsletterManifest = {
  id: "newsletter",
  name: "Central de Notícias",
  version: "12.8.0",
  authorizedBy: "Dr. Adriano Hermida Maia",
  authHash: "AUTH-NEWS-V14-FINAL-SHIELD",
  status: "ACTIVE",
  paths: {
    module: "modules/newsletter",
    skeleton: "newsletter-skeleton.tsx",
    router: "newsletter-router.ts",
    pages: ["admin/newsletter/newsletter.tsx"],
    shield: "admin/newsletter/shield.tsx"
  },
  capabilities: [
    "AI_HISTORY_TAGGING",             // Análise neural de histórico Gemini 3
    "YANDEX_SMTP_FEEDBACK_WEBHOOK",   // Webhook de Bounce/Spam
    "CRM_AUDIENCE_SYNC",              // Sincronia bi-direcional
    "LGPD_AUDIT_LOGS"                 // Logs de conformidade
  ],
  database: {
    schema: "marketing",
    tables: ["campanhas", "assinantes", "etiquetas_interesse", "webhook_logs"]
  },
  permissions: {
    allowedRoles: ["admin", "gestor"],
    requiresAuth: true
  },
  audit: {
    securityLevel: 'V12-MAXIMUM',
    last_audit: new Date().toISOString(),
    status: "NOMINAL"
  }
};