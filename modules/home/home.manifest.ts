/**
 * HM-V12 GLOBAL MODULE MANIFEST - HOME
 * Versão: 12.20.1
 * Status: HOMOLOGADO - AUDITADO
 */
export const HomeManifest = {
  id: "home",
  name: "Portal Público (Home)",
  version: "12.20.1",
  // HM-V12 PAE: Token de Autorização Expressa vinculado ao modules/manifesto-log.ts
  authHash: "AUTH-V12-HOME-RESTORE",
  authorizedBy: "Dr. Adriano Hermida Maia",
  paths: {
    module: "modules/home",
    skeleton: "home-skeleton.tsx",
    router: "home-router.ts",
    pages: ["pages/Inicio.tsx"],
    components: [
      "components/home/HeroSection.tsx",
      "components/home/ServicesGrid.tsx",
      "components/home/AIHubSection.tsx",
      "components/home/FeaturedBlog.tsx"
    ],
    shield: "admin/home/shield.tsx"
  },
  database: {
    schema: "public",
    tables: ["unidades_conciliacao", "modelos_documentos"]
  },
  permissions: {
    allowedRoles: ["guest", "admin", "cliente"],
    requiresAuth: false
  },
  audit: {
    last_ui_sync: new Date().toISOString(),
    governance_level: "MAXIMUM",
    security_protocol: "PAE-V12"
  }
};