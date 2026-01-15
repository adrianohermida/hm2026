
/**
 * HM-V12 MODULE MANIFEST - APPOINTMENTS
 * Versão: 12.0.0
 * Status: HOMOLOGADO
 */
export const AppointmentsManifest = {
  id: "appointments",
  name: "Sistema de Agendamentos",
  version: "12.0.0",
  authorizedBy: "Dr. Adriano Hermida Maia",
  authHash: "AUTH-APP-V12-INIT",
  status: "ACTIVE",
  paths: {
    module: "modules/appointments",
    skeleton: "appointments-skeleton.tsx",
    router: "appointments-router.ts",
    pages: ["pages/AppointmentsPage.tsx"],
    shield: "admin/appointments/shield.tsx"
  },
  capabilities: [
    "INTERACTIVE_CALENDAR_ENGINE",
    "PROFESSIONAL_SELECT_V1",
    "SLOT_RESERVATION_LOGIC",
    "CRM_LEAD_AUTO_SYNC",
    "LGPD_COMPLIANT_FORMS"
  ],
  database: {
    schema: "agenda",
    tables: ["eventos", "profissionais", "slots_disponiveis"]
  },
  permissions: {
    allowedRoles: ["guest", "admin", "cliente"],
    requiresAuth: false
  },
  audit: {
    securityLevel: 'V12-MAXIMUM',
    last_audit: new Date().toISOString(),
    status: "NOMINAL"
  }
};
