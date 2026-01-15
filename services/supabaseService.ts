
import { ArtigoBlog, LeadCRM, Ticket, TicketThread, UnidadeConciliacao, ModeloDocumento, ModuloSistema, RegistroAuditoria, LogAuditoriaDetalhada, PastaResposta, RespostaPredefinida } from '../types.ts';

// Mock Supabase Client
// HM-V12 Fix: Updated channel.on mock to accept arguments to resolve "Expected 0 arguments, but got 3" error in BalcaoVirtual.tsx
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
  },
  channel: (name: string) => ({
    on: (type: any, filter: any, callback: any) => ({
      subscribe: () => ({ unsubscribe: () => {} })
    }),
  })
};

export const BLOG_POSTS_DATA: ArtigoBlog[] = [
  {
    id: '1',
    titulo: 'A Nova Lei do Superendividamento na Prática',
    resumo: 'Como a Lei 14.181/21 protege o mínimo existencial do cidadão brasileiro.',
    conteudo: 'A lei do superendividamento veio para equilibrar a relação entre credor e devedor...',
    imagem: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    categoria: 'Superendividamento',
    autor: 'Dr. Adriano Maia',
    data: '15/11/2024',
    tempo_leitura: '5 min',
    etiquetas: ['Lei14181', 'DireitoDoConsumidor']
  }
];

export const fetchBlogPosts = async () => BLOG_POSTS_DATA;

export const governanceService = {
  submitContactLead: async (form: any, body: string) => {
    console.log("Lead Submetido:", form);
    return { success: true };
  },
  buscarUnidades: async (): Promise<UnidadeConciliacao[]> => [],
  buscarModelos: async (): Promise<ModeloDocumento[]> => [],
  fetchTickets: async (): Promise<Ticket[]> => [],
  fetchTicketThreads: async (id: string): Promise<TicketThread[]> => [],
  sendTicketMessage: async (payload: any) => ({ success: true })
};

export const servicoCRM = {
  buscarLeads: async (): Promise<LeadCRM[]> => []
};

// HM-V12 Fix: Added missing exported members servicoProcessos, servicoAgenda, and servicoPublicacoes to resolve import errors in AdminModules components
export const servicoProcessos = {};
export const servicoAgenda = {};
export const servicoPublicacoes = {};

export const servicoTickets = {
  buscarTicketsCliente: async (): Promise<Ticket[]> => [],
  buscarHistorico: async (id: string): Promise<TicketThread[]> => [],
  registrarMensagem: async (msg: any) => {},
  buscarTarefas: async (id: string) => [],
  registrarTarefa: async (id: string, desc: string) => ({ id: '1', ticket_id: id, descricao: desc, concluida: false }),
  uploadAnexo: async (id: string, file: File) => {}
};

export const servicoGovernanca = {
  buscarModulosAtivos: async (): Promise<ModuloSistema[]> => [],
  verificarConectividadeTabela: async (tab: string) => ({ tabela: tab, status: 'CONECTADO' }),
  buscarLogsAuditoria: async (id: string): Promise<RegistroAuditoria[]> => [],
  fetchTickets: async (): Promise<Ticket[]> => [],
  fetchTicketThreads: async (id: string): Promise<TicketThread[]> => [],
  sendTicketMessage: async (payload: any) => {}
};

export const servicoRespostas = {
  buscarPastas: async (): Promise<PastaResposta[]> => [],
  buscarRespostas: async (pastaId?: string): Promise<RespostaPredefinida[]> => [],
  parserPlaceholders: (texto: string, ticket: Ticket) => texto
};

export const servicoCompliance = {
  buscarLogs: async (): Promise<LogAuditoriaDetalhada[]> => []
};

export const MODULE_TABLE_MAP: Record<string, string[]> = {
  dashboard: ['logs_auditoria', 'metricas_bi'],
  crm: ['leads', 'funil_vendas']
};

export const SCHEMA_BLUEPRINTS: Record<string, string> = {
  dashboard: '-- SQL Blueprint for Dashboard'
};
