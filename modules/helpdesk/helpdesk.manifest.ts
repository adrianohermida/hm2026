
export const HelpDeskManifest = {
  id: "tickets",
  name: "Atendimento",
  version: "12.25.0",
  status: "ACTIVE",
  paths: {
    module: "modules/helpdesk",
    skeleton: "helpdesk-skeleton.tsx",
    router: "helpdesk-router.ts",
    pages: ["admin/helpdesk/helpdesk.tsx", "admin/helpdesk/shield.tsx"],
  },
  capabilities: [
    "RICH_TEXT_COMMUNICATION", // Editor Freshdesk Style
    "CRM_DEEP_INTEGRATION", // Contexto do cliente em tempo real
    "ADVANCED_FORWARDING_CC_BCC",
    "PLACEHOLDER_INJECTION",
    "CROSS_SCHEMA_SHIELD_AUDIT"
  ],
  database: {
    schema: "tickets",
    tables: ["tickets", "ticket_threads", "ticket_forwarding", "ticket_tags"],
    external_refs: ["crm.clientes", "auth.users"]
  },
  permissions: {
    allowedRoles: ["admin", "advogado", "gestor"],
    requiresAuth: true
  },
  audit: {
    usesSupabase: true,
    usesAuth: true,
    shieldStatus: "NOMINAL",
    lastAudit: new Date().toISOString()
  }
};
