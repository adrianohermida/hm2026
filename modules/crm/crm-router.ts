import { supabase } from '../../services/supabase.ts';
import { IModuleRouter } from '../contracts.ts';

export const CRMRouter: IModuleRouter = {
  SCHEMA: 'crm',

  // --- GESTÃO DE PIPELINES ---
  async fetchPipelines(tipo?: 'vendas' | 'ciclo_vida') {
    let query = supabase.schema('crm').from('pipelines').select('*');
    if (tipo) query = query.eq('tipo', tipo);
    const { data, error } = await query.order('criado_em', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async upsertPipeline(pipeline: any) {
    const { data, error } = await supabase.schema('crm').from('pipelines').upsert(pipeline).select().single();
    if (error) throw error;
    return data;
  },

  async deletePipeline(id: string) {
    const { error } = await supabase.schema('crm').from('pipelines').delete().eq('id', id);
    if (error) throw error;
  },

  // --- GESTÃO DE ESTÁGIOS ---
  async fetchStages(pipelineId?: string) {
    let query = supabase.schema('crm').from('config').select('*');
    if (pipelineId) query = query.eq('pipeline_id', pipelineId);
    const { data, error } = await query.order('ordem', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async upsertStage(stage: any) {
    const { data, error } = await supabase.schema('crm').from('config').upsert(stage).select().single();
    if (error) throw error;
    return data;
  },

  async deleteStage(id: string) {
    const { error } = await supabase.schema('crm').from('config').delete().eq('id', id);
    if (error) throw error;
  },

  // --- LEADS & OPORTUNIDADES ---
  async fetchLeads(pipelineId: string) {
    const { data, error } = await supabase.schema('crm')
      .from('leads')
      .select('*, clientes:contato_id(*)')
      .eq('pipeline_id', pipelineId)
      .order('updated_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  // --- CONTATOS (LEDGER PROFISSIONAL) ---
  async fetchContatos(params: { busca?: string; lifecycleId?: string; page?: number; limit?: number }) {
    const start = (params.page || 0) * (params.limit || 20);
    const end = start + (params.limit || 20) - 1;

    let query = supabase.schema('crm').from('clientes').select('*', { count: 'exact' });
    
    if (params.busca) {
      query = query.or(`nome_completo.ilike.%${params.busca}%,email.ilike.%${params.busca}%,telefone.ilike.%${params.busca}%`);
    }
    
    if (params.lifecycleId) {
      query = query.eq('lifecycle_id', params.lifecycleId);
    }

    const { data, count, error } = await query
      .order('nome_completo', { ascending: true })
      .range(start, end);

    if (error) throw error;
    return { data: data || [], total: count || 0 };
  },

  /**
   * HM-V22.0: AUDITORIA PROFUNDA DE COLUNAS (CLIENTES)
   */
  async getHealth() {
    const checks = [
      { t: 'pipelines', cols: ['id', 'nome', 'tipo'] },
      { t: 'config', cols: ['id', 'label', 'pipeline_id'] },
      { t: 'leads', cols: ['id', 'pipeline_id', 'valor_estimado'] },
      { t: 'clientes', cols: ['id', 'nome_completo', 'email', 'lifecycle_id', 'status_ciclo_vida', 'origem'] }
    ];

    const results = [];

    for (const check of checks) {
      try {
        const { error } = await supabase
          .schema('crm')
          .from(check.t)
          .select(check.cols.join(','))
          .limit(1);

        const isApiBlocked = error?.status === 406;
        const isMissing = error?.code === '42P01' || error?.code === 'PGRST106' || error?.code === 'PGRST204';
        
        results.push({
          table: `crm.${check.t}`,
          pass: !error,
          msg: isApiBlocked ? 'API_BLOCKED' : (isMissing ? 'COLUMN_OR_TABLE_MISSING' : (error?.message || 'Nominal'))
        });
      } catch (e) {
        results.push({ table: `crm.${check.t}`, pass: false, msg: 'CRITICAL_CONNECTION_FAILURE' });
      }
    }

    return results;
  }
};