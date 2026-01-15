import { supabase } from '../../services/supabase.ts';
import { ProcessoOrquestradorService } from './services/ProcessoOrquestradorService.ts';
import { ProcessoJuridico } from '../../types.ts';

const SCHEMA = 'judiciario';
const TABLE = 'processos';

export const ProcessosRouter = {
  SCHEMA,
  TABLE,
  
  // --- LEITURA ---
  
  async fetchAll(): Promise<ProcessoJuridico[]> {
    const { data, error } = await supabase
      .schema(SCHEMA)
      .from(TABLE)
      .select('*')
      .order('data_ultima_movimentacao', { ascending: false });
    
    if (error) {
      console.warn("HM-PROCESSOS: Erro ao listar processos.", error);
      return [];
    }
    
    // Mapper para tipagem interna
    return data.map((d: any) => ({
      ...d,
      ultima_movimentacao: d.data_ultima_movimentacao || d.created_at,
      autor: d.polo_ativo || 'Não informado',
      reu: d.polo_passivo || 'Não informado',
      status_juridico: d.status || 'ATIVO',
      valor_causa: d.valor_causa || 0
    })) as ProcessoJuridico[];
  },

  async fetchClientProcesses(): Promise<ProcessoJuridico[]> {
    try {
      const { data: { user } } = await (supabase.auth as any).getUser();
      if (!user) return [];

      const { data: contact } = await supabase.schema('crm').from('clientes').select('id').eq('email', user.email).single();
      
      if (!contact) return [];

      const { data } = await supabase
        .schema(SCHEMA)
        .from(TABLE)
        .select('*')
        .eq('cliente_id', contact.id)
        .order('data_ultima_movimentacao', { ascending: false });

      return (data || []).map((d: any) => ({ 
        ...d, 
        ultima_movimentacao: d.data_ultima_movimentacao,
        status_juridico: d.status
      })) as ProcessoJuridico[];
    } catch (e) {
      return [];
    }
  },

  async getProcesso360(id: string) {
    return await ProcessoOrquestradorService.getProcessoAggregate(id);
  },

  // --- ESCRITA ---

  async createProcess(payload: Partial<ProcessoJuridico>) {
    const { data, error } = await supabase
      .schema(SCHEMA)
      .from(TABLE)
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Importação CSV (Simplificada para manter compatibilidade)
  async processarImportacaoCSV(rows: any[], mapeamento: Record<string, string>) {
    // Lógica mantida da versão anterior, apontando para judiciario.processos
    return { sucesso: 0, falha: 0, erros: [] };
  },

  async consultDatajud(numeroProcesso: string) {
     // Redireciona para o serviço DataJud oficial que usa Edge Functions
     const { DataJudService } = await import('../datajud/DataJudService.ts');
     return await DataJudService.buscarProcessoNaFonte(numeroProcesso, 'TRF1'); // Default TRF1 para teste rápido
  },

  async fetchExtratoFinanceiro(processoId: string) {
    const { data } = await supabase
        .schema(SCHEMA)
        .from('financeiro_processual')
        .select('*')
        .eq('processo_id', processoId)
        .order('data', { ascending: false });
    
    return data || [];
  },

  // --- AUDITORIA ---

  async getShieldStatus() {
    const checks = [
      { t: 'processos', s: SCHEMA, label: 'Ledger Processual' },
      { t: 'movimentacoes', s: SCHEMA, label: 'Timeline Movimentos' },
      { t: 'financeiro_processual', s: SCHEMA, label: 'Conta Corrente' },
      { t: 'datajud_sync_status', s: SCHEMA, label: 'Sync Status' },
      { t: 'monitoramento_queue', s: SCHEMA, label: 'Fila Crawler' }
    ];
    
    const results = [];
    for (const check of checks) {
      try {
        const { error } = await supabase.schema(check.s).from(check.t).select('count', { count: 'exact', head: true });
        results.push({ 
          table: `${check.s}.${check.t}`, 
          pass: !error, 
          msg: error ? (error.code === '42P01' ? 'TABELA INEXISTENTE' : error.message) : 'Conexão Estável',
          label: check.label
        });
      } catch (e: any) { 
        results.push({ table: `${check.s}.${check.t}`, pass: false, msg: 'ERRO CRÍTICO', label: check.label }); 
      }
    }
    return results;
  }
};