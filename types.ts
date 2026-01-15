
export enum ModuleStatus {
  ACTIVE = 'ACTIVE',
  DEVELOPMENT = 'DEVELOPMENT',
  DEPRECATED = 'DEPRECATED'
}

export interface ModuleManifest {
  id: string;
  name: string;
  path: string;
  status: ModuleStatus;
  version: string;
  adminShieldPath: string;
  lastAudit: string;
  dependencies: string[];
}

export interface ShieldAuditResult {
  passed: boolean;
  issues: string[];
  sqlFix?: string;
}

// HM-V12: Unified Blog types
export interface ArtigoBlog {
  id: string;
  titulo: string;
  resumo: string;
  conteudo?: string;
  imagem: string;
  categoria: string;
  autor: string;
  data: string;
  tempo_leitura?: string;
  etiquetas: string[];
}

export type BlogPost = ArtigoBlog;

// HM-V12: Unified HelpDesk and Ticket types
export type SituacaoTicket = 'aberto' | 'aguardando' | 'pendente' | 'concluido' | 'vencido' | 'triagem' | 'analise_automatica';
export type TicketStatus = SituacaoTicket;

export interface Ticket {
  id: string;
  protocolo: string;
  assunto: string;
  situacao: SituacaoTicket;
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  contato_id: string;
  contatos?: {
    id: string;
    nome_completo: string;
    email: string;
  };
  criado_em: string;
  // HM-V12 Fix: Added canal_origem used in HelpDeskRouter
  canal_origem?: string;
}

export interface TicketThread {
  id: string;
  ticket_id: string;
  mensagem: string;
  autor_tipo: 'cliente' | 'advogado' | 'agente' | 'sistema';
  autor_nome: string;
  eh_interno: boolean;
  criado_em: string;
}

export type HistoricoTicket = TicketThread;

export interface TarefaTicket {
  id: string;
  ticket_id: string;
  descricao: string;
  concluida: boolean;
  criado_em?: string;
}

// HM-V12: Unified AI and Conversation types
export interface ConversationMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

// HM-V12 Fix: Expanded AiAgent with missing properties used in modules and components
export interface AiAgent {
  id: string;
  nome: string;
  descricao: string;
  tipo: string;
  nivel_autonomia: number;
  persona: string;
  prompts_treinamento: string[];
  matriz_permissoes: any;
  modulos_conectados: string[];
  config_ferramentas: {
    agenda_ativa: boolean;
    email_ativo: boolean;
    calculadora_ativa: boolean;
  };
  versao_atual: number;
  ativo: boolean;
  estilo_linguagem?: string;
  criado_em?: string;
  atualizado_em?: string;
  config?: any;
}

// HM-V12 Fix: Added missing AiAgentFaq type
export interface AiAgentFaq {
  id: string;
  agent_id: string;
  pergunta: string;
  resposta: string;
  origem: string;
  categoria?: string;
  ativo: boolean;
  aprovado: boolean;
  aprovado_por?: string;
  criado_em: string;
}

// HM-V12 Fix: Added missing AiAgentTool type
export interface AiAgentTool {
  id: string;
  agent_id: string;
  tool_nome: string;
  tool_tipo: string;
  descricao: string;
  risco: string;
  ativo: boolean;
}

// HM-V12 Fix: Added missing AiAgentUsageLog type
export interface AiAgentUsageLog {
  id: string;
  agent_id: string;
  usuario_id?: string;
  escritorio_id?: string;
  acao: string;
  sucesso: boolean;
  tokens_input: number;
  tokens_output: number;
  custo_usd: number;
  prompt_text: string;
  response_text: string;
  tempo_resposta_ms: number;
  erro_mensagem?: string;
  criado_em: string;
}

// HM-V12: Unified CRM and Administrative types
export interface LeadCRM {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  status: string;
  origem: string;
  criado_em: string;
  // HM-V12 Add: Additional fields used in summary metrics
  valor_causa?: number;
}

export interface Contato {
  id: string;
  nome_completo: string;
  email: string;
  telefone: string;
  // HM-V12 Add: Additional fields
  origem?: string;
  criado_em?: string;
}

export interface ProcessoJuridico {
  id: string;
  numero_cnj: string;
  tribunal: string;
  status: string;
  criado_em?: string;
  // HM-V12 Fix: Adding fields for unified process management in ProcessosRouter
  data_ultima_movimentacao?: string;
  ultima_movimentacao?: string;
  polo_ativo?: string;
  autor?: string;
  polo_passivo?: string;
  reu?: string;
  status_juridico?: string;
  valor_causa?: number;
  cliente_id?: string;
}

// HM-V12 Fix: Added EventoProcessual type used in ProcessoOrquestradorService
export interface EventoProcessual {
  id: string;
  processo_id: string;
  tipo: string;
  data: string;
  descricao: string;
  origem: string;
  criticidade: string;
  metadados?: any;
}

export interface EventoAgenda {
  id: string;
  titulo: string;
  data: string;
  tipo: string;
}

export interface PublicacaoLegal {
  id: string;
  texto: string;
  data: string;
  fonte: string;
}

// HM-V12: Unified Governance and Audit types
export interface ModuloSistema {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
}

export interface RegistroAuditoria {
  id: string;
  modulo_id: string;
  acao: string;
  detalhes?: any;
  criado_em: string;
}

export interface LogAuditoriaDetalhada extends RegistroAuditoria {
  usuario_nome: string;
  tabela: string;
  registro_id: string;
}

// HM-V12: Unified Response and Knowledge types
export interface PastaResposta {
  id: string;
  nome: string;
}

export interface RespostaPredefinida {
  id: string;
  pasta_id: string;
  titulo: string;
  corpo: string;
}

export interface UnidadeConciliacao {
  id: string;
  nome: string;
  tipo: 'PROCON' | 'CEJUSC';
  endereco: string;
  cidade: string;
  estado: string;
  link_oficial: string;
}

export interface ModeloDocumento {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
}
