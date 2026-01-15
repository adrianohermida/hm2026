
/**
 * HM-V12 SIDEBAR MANIFEST - GOVERNANCE CONTRACT
 * Versão: 1.8.1 (LABORATÓRIO ADDED)
 * Autorizado por: Dr. Adriano Hermida Maia
 */

export type SidebarItemConfig = {
  id: string;
  label: string;
  route: string;
  order: number;
  isHidden?: boolean;
  requiredRole?: string[];
};

export const SidebarManifest: Record<string, SidebarItemConfig> = {
  dashboard: { id: "dashboard", label: "Dashboard", route: "dashboard", order: 0 },
  "balcao-virtual": { id: "balcao-virtual", label: "Balcão Virtual", route: "balcao-virtual", order: 1 },
  crm: { id: "crm", label: "CRM", route: "crm", order: 2 },
  tickets: { id: "tickets", label: "Atendimento", route: "tickets", order: 3 },
  processos: { id: "processos", label: "Processos", route: "processos", order: 4 },
  agenda: { id: "agenda", label: "Agenda", route: "agenda", order: 5 },
  ai_agents: { id: "ai-agents", label: "Agentes IA", route: "ai-agents", order: 6 },
  publicacoes: { id: "publicacoes", label: "Publicações", route: "publicacoes", order: 7 },
  contratos: { id: "contratos", label: "Contratos", route: "contratos", order: 8 },
  documentos: { id: "documentos", label: "GED", route: "documentos", order: 9 },
  newsletter: { id: "newsletter", label: "Notícias", route: "newsletter", order: 10 },
  configuracoes: { id: "configuracoes", label: "Configurações", route: "configuracoes", order: 11 },
  lab: { id: "lab", label: "Laboratório", route: "lab", order: 12 },
  "void-cell": { id: "void-cell", label: "Célula Neutra", route: "void-cell", order: 13 },
  "blank-canvas": { id: "blank-canvas", label: "Quadro Branco", route: "blank-canvas", order: 14 }
};

export const SidebarGovernance = {
  getSavedOrder() {
    try {
      const saved = localStorage.getItem('hm_v12_sidebar_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  },
  saveOrder(order: { id: string; order: number }[]) {
    localStorage.setItem('hm_v12_sidebar_order', JSON.stringify(order));
  }
};
