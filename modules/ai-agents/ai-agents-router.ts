
import { supabase } from '../../services/supabase.ts';
import { IModuleRouter } from '../contracts.ts';
import { AiAgent, AiAgentTool, AiAgentFaq, AiAgentUsageLog } from '../../types.ts';

const SCHEMA = 'ai_agents';

export const AiAgentsRouter: IModuleRouter = {
  SCHEMA,

  async fetchAgents(): Promise<AiAgent[]> {
    try {
      const { data, error } = await supabase
        .schema(SCHEMA)
        .from('agents')
        .select('*')
        .order('criado_em', { ascending: false });
      
      if (error) {
        if (error.status === 406 || error.code === 'PGRST106' || error.message?.includes('schema')) return [];
        throw error;
      }
      return (data || []) as AiAgent[];
    } catch (e) {
      return [];
    }
  },

  async fetchAgentById(id: string): Promise<AiAgent | null> {
    try {
      const { data } = await supabase.schema(SCHEMA).from('agents').select('*').eq('id', id).single();
      return data;
    } catch (e) { return null; }
  },

  async fetchAgentByName(nome: string): Promise<AiAgent | null> {
    try {
      const { data } = await supabase.schema(SCHEMA).from('agents').select('*').eq('nome', nome).single();
      return data;
    } catch (e) { return null; }
  },

  async fetchMasterKernel(): Promise<AiAgent | null> {
    try {
      const { data, error } = await supabase
        .schema(SCHEMA)
        .from('agents')
        .select('*')
        .eq('tipo', 'copilot')
        .eq('nome', 'Roberto')
        .maybeSingle();
      
      if (error && (error.status === 406 || error.code === 'PGRST106')) return null;
      return data;
    } catch (e) { return null; }
  },

  /**
   * HM-V12: AUDITORIA DE INTEGRIDADE AVANÇADA
   * Valida a visibilidade e permissões de todas as tabelas do schema.
   */
  async runShieldAudit() {
    const results = [];
    const tables = [
      'agents', 
      'agent_faq', 
      'agent_faq_learning', 
      'agent_learning_metrics', 
      'agent_tools', 
      'agent_training_sessions', 
      'agent_usage_logs', 
      'agent_versions'
    ];
    
    for (const table of tables) {
      try {
        const { error: tableError } = await supabase
          .schema(SCHEMA)
          .from(table)
          .select('count', { count: 'exact', head: true });
        
        const isNotExposed = tableError?.status === 406 || tableError?.message?.includes('Not Acceptable');
        const isInvalidSchema = tableError?.message?.toLowerCase().includes('invalid schema') || tableError?.code === 'PGRST106';
        const isTableMissing = tableError?.code === '42P01';

        results.push({
          entity: table,
          exists: !tableError || (!isInvalidSchema && !isTableMissing && !isNotExposed),
          status: (!tableError || (!isInvalidSchema && !isTableMissing && !isNotExposed)) ? 'PASS' : 'FAIL',
          error: isNotExposed ? 'API_EXPOSURE_ERROR' : (isInvalidSchema ? 'SCHEMA_MISSING' : (isTableMissing ? 'TABLE_MISSING' : (tableError?.message || null)))
        });
      } catch (e: any) {
        results.push({ entity: table, exists: false, status: 'FAIL', error: 'CONNECTION_ERROR' });
      }
    }
    
    return results;
  },

  async testWriteAccess() {
    const tempId = '00000000-0000-0000-0000-000000000000';
    try {
      const { error: insError } = await supabase
        .schema(SCHEMA)
        .from('agent_usage_logs')
        .insert([{
          id: tempId,
          acao: 'SHIELD_WRITE_TEST',
          tokens_input: 0,
          tokens_output: 0,
          custo_usd: 0,
          sucesso: true,
          criado_em: new Date().toISOString()
        }]);
      
      if (insError) return { success: false, error: insError.message, status: insError.status };

      await supabase.schema(SCHEMA).from('agent_usage_logs').delete().eq('id', tempId);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  async createAgent(agent: Partial<AiAgent>) {
    try {
      const sanitizedPayload = {
        nome: agent.nome || "Novo Agente",
        descricao: agent.descricao || "",
        tipo: agent.tipo || "bot",
        nivel_autonomia: agent.nivel_autonomia || 3,
        persona: agent.persona || "Persona básica.",
        prompts_treinamento: Array.isArray(agent.prompts_treinamento) ? agent.prompts_treinamento : [],
        matriz_permissoes: agent.matriz_permissoes || {},
        modulos_conectados: Array.isArray(agent.modulos_conectados) ? agent.modulos_conectados : [],
        config_ferramentas: agent.config_ferramentas || { agenda_ativa: false, email_ativo: false, calculadora_ativa: false },
        versao_atual: 1,
        ativo: true,
        criado_em: new Date().toISOString(),
        atualizado_em: new Date().toISOString()
      };

      const { data, error } = await supabase
        .schema(SCHEMA)
        .from('agents')
        .insert([sanitizedPayload])
        .select()
        .single();
      
      if (error) {
        let customError = error.message;
        
        if (error.status === 406 || error.message?.includes('Not Acceptable')) {
          customError = "BLOQUEIO DE API (406): O schema 'ai_agents' existe, mas não está exposto. Vá em Settings > API > Exposed Schemas no Supabase e adicione 'ai_agents'.";
        } else if (error.message?.toLowerCase().includes('invalid schema') || error.code === 'PGRST106') {
          customError = "SCHEMA INEXISTENTE: O schema 'ai_agents' não foi localizado pela API. Verifique a ortografia ou se o schema foi criado corretamente.";
        }
          
        console.error("Kernel Persistence Failure:", customError, error);
        return { data: null, error: customError };
      }
      
      return { data, error: null };
    } catch (e: any) {
      return { data: null, error: e.message };
    }
  },

  async updateDNA(id: string, dna: Partial<AiAgent>) {
    try {
      const { error } = await supabase.schema(SCHEMA)
        .from('agents')
        .update({ ...dna, atualizado_em: new Date().toISOString() })
        .eq('id', id);
      return { success: !error, error: error?.message };
    } catch (e: any) { return { success: false, error: e.message }; }
  },

  async toggleStatus(id: string, ativo: boolean) {
    return supabase.schema(SCHEMA).from('agents').update({ ativo }).eq('id', id);
  },

  async fetchFaq(agentId: string): Promise<AiAgentFaq[]> {
    try {
      const { data } = await supabase.schema(SCHEMA).from('agent_faq').select('*').eq('agent_id', agentId);
      return data || [];
    } catch (e) { return []; }
  },

  async saveFaqEntry(entry: Partial<AiAgentFaq>) {
    return supabase.schema(SCHEMA).from('agent_faq').upsert(entry);
  },

  async fetchUsageLogs(agentId: string): Promise<AiAgentUsageLog[]> {
    try {
      const { data } = await supabase.schema(SCHEMA).from('agent_usage_logs').select('*').eq('agent_id', agentId).order('criado_em', { ascending: false }).limit(50);
      return data || [];
    } catch (e) { return []; }
  },

  async fetchTools(agentId: string): Promise<AiAgentTool[]> {
    try {
      const { data } = await supabase.schema(SCHEMA).from('agent_tools').select('*').eq('agent_id', agentId);
      return data || [];
    } catch (e) { return []; }
  },

  async toggleTool(toolId: string, ativo: boolean) {
    return supabase.schema(SCHEMA).from('agent_tools').update({ ativo }).eq('id', toolId);
  },

  async bootstrapDefaultAgents() {
    const defaults = [
      {
        nome: 'Carlos',
        descricao: 'Assistente Virtual do Site.',
        tipo: 'bot',
        nivel_autonomia: 3,
        persona: 'Você é o Carlos, assistente virtual da Hermida Maia Advocacia.',
        matriz_permissoes: { tickets: { read: true, create: true, update: false, delete: false } },
        modulos_conectados: ['tickets']
      },
      {
        nome: 'Roberto',
        descricao: 'Assistente de suporte interno.',
        tipo: 'copilot',
        nivel_autonomia: 4,
        persona: 'Você é o Roberto, suporte da equipe Hermida Maia.',
        matriz_permissoes: { 
          crm: { read: true, create: true, update: true, delete: false },
          agenda: { read: true, create: true, update: true, delete: true }
        },
        modulos_conectados: ['crm', 'agenda'],
        config_ferramentas: { agenda_ativa: true, email_ativo: true, calculadora_ativa: true }
      }
    ];

    for (const agent of defaults) {
      try {
        const { data: existing } = await supabase.schema(SCHEMA).from('agents').select('id').eq('nome', agent.nome).maybeSingle();
        if (!existing) { await this.createAgent(agent); }
      } catch (e) { }
    }
    return { success: true };
  }
};
