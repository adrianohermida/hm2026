import { supabase } from '../../../services/supabase.ts';
import { ProcessoJuridico, EventoProcessual } from '../../../types.ts';

/**
 * HM-V12: Processo Orquestrador Service
 * Responsável por montar o Agregado "Processo" a partir de múltiplas tabelas.
 */
export const ProcessoOrquestradorService = {
  
  async getProcessoAggregate(id: string): Promise<{ processo: ProcessoJuridico, timeline: EventoProcessual[], documentos: any[], agenda: any[] } | null> {
    try {
      // 1. Fetch Entidade Raiz
      const { data: processo, error } = await supabase
        .schema('judiciario')
        .from('processos')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !processo) throw new Error("Processo não encontrado ou acesso negado.");

      // 2. Fetch Timeline e Integrações Cross-Module em paralelo
      const [movs, pubs, tasks, docs, agenda] = await Promise.all([
        this.fetchMovimentacoes(id),
        this.fetchPublicacoes(id),
        this.fetchTarefas(processo.numero_cnj),
        this.fetchDocumentos(processo.numero_cnj), // Busca GED pelo CNJ
        this.fetchAgendaEventos(processo.numero_cnj) // Busca Agenda pelo CNJ
      ]);

      // 3. Unificação e Ordenação da Timeline
      const timeline: EventoProcessual[] = [
        ...movs,
        ...pubs,
        ...tasks,
        ...agenda.map(evt => ({
          id: evt.id,
          processo_id: id,
          tipo: 'AUDIENCIA',
          data: evt.data_inicio,
          descricao: `[Agenda] ${evt.titulo}`,
          origem: 'AGENDA',
          criticidade: evt.urgencia === 'fatal' ? 'FATAL' : 'ALTA'
        }))
      ].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

      return { processo: processo as ProcessoJuridico, timeline, documentos: docs, agenda };

    } catch (e) {
      console.error("HM-PROCESS-ORCHESTRATOR-FAIL", e);
      return null;
    }
  },

  async fetchMovimentacoes(processoId: string): Promise<EventoProcessual[]> {
    const { data } = await supabase.schema('judiciario').from('movimentacoes').select('*').eq('processo_id', processoId);
    return (data || []).map((m: any) => ({
      id: m.id,
      processo_id: processoId,
      tipo: 'MOVIMENTACAO',
      data: m.data_movimentacao || m.criado_em,
      descricao: m.conteudo,
      origem: m.fonte || 'TRIBUNAL',
      criticidade: 'NORMAL'
    }));
  },

  async fetchPublicacoes(processoId: string): Promise<EventoProcessual[]> {
    const { data } = await supabase.schema('judiciario').from('publicacoes').select('*').eq('processo_id', processoId);
    return (data || []).map((p: any) => ({
      id: p.id,
      processo_id: processoId,
      tipo: 'PUBLICACAO',
      data: p.data_publicacao,
      descricao: `Publicação em ${p.diario}: ${p.conteudo.substring(0, 100)}...`,
      origem: 'SISTEMA',
      criticidade: p.tem_prazo ? 'ALTA' : 'NORMAL'
    }));
  },

  /**
   * HM-V12 Cross-Module Link: Busca tickets onde a descrição ou assunto contém o CNJ
   */
  async fetchTarefas(cnj: string): Promise<EventoProcessual[]> {
    if (!cnj) return [];
    // Busca tickets que mencionam o CNJ (Loose Coupling)
    const { data } = await supabase
      .schema('tickets')
      .from('tickets')
      .select('id, assunto, descricao, criado_em, prioridade')
      .or(`assunto.ilike.%${cnj}%,descricao.ilike.%${cnj}%`)
      .limit(5);

    return (data || []).map((t: any) => ({
      id: t.id,
      processo_id: 'EXTERNAL', 
      tipo: 'TAREFA',
      data: t.criado_em,
      descricao: `[HelpDesk] ${t.assunto}`,
      origem: 'USUARIO',
      criticidade: t.prioridade === 'urgente' ? 'FATAL' : 'NORMAL',
      metadados: { ticket_id: t.id }
    }));
  },

  /**
   * HM-V12 GED Integration: Busca documentos pelo CNJ (Nome do arquivo ou metadados)
   */
  async fetchDocumentos(cnj: string): Promise<any[]> {
    if (!cnj) return [];
    // Busca documentos que contenham o CNJ no nome ou termo 'Petição' como fallback
    const { data } = await supabase
      .schema('ged')
      .from('documentos')
      .select('*')
      .or(`nome.ilike.%${cnj}%,nome.ilike.%Petição%`) 
      .limit(5);
    
    return data || [];
  },

  /**
   * HM-V12 Agenda Integration: Busca eventos pelo CNJ
   */
  async fetchAgendaEventos(cnj: string): Promise<any[]> {
    if (!cnj) return [];
    const { data } = await supabase
      .schema('agenda')
      .from('eventos')
      .select('*')
      .or(`titulo.ilike.%${cnj}%,descricao.ilike.%${cnj}%`)
      .order('data_inicio', { ascending: true });
    
    return data || [];
  }
};