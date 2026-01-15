import { supabase } from '../../services/supabase.ts';
import { HelpDeskRouter } from '../helpdesk/helpdesk-router.ts';
import { IModuleRouter } from '../contracts.ts';

const SCHEMA = 'agenda';

export const AgendaRouter: IModuleRouter = {
  SCHEMA,

  /**
   * Admin: Busca eventos com enriquecimento de CRM e GED
   */
  async fetchAdminEvents(start: string, end: string) {
    const { data, error } = await supabase
      .schema(SCHEMA)
      .from('eventos')
      .select(`
        *, 
        clientes:crm.clientes(id, nome_completo, email),
        anexos_count:evento_anexos(count)
      `)
      .gte('data_inicio', start)
      .lte('data_inicio', end)
      .order('data_inicio', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  /**
   * GED Bridge: Recupera os documentos reais vinculados ao compromisso
   */
  async fetchEventDocs(eventId: string) {
    const { data, error } = await supabase
      .schema(SCHEMA)
      .from('evento_anexos')
      .select('documento_id, ged:ged.documentos(id, nome, path, mime_type)')
      .eq('evento_id', eventId);
    
    if (error) throw error;
    return data || [];
  },

  /**
   * Orquestrador Sovereign: Cria evento e garante integridade cross-module
   */
  async createIntegratedEvent(payload: any) {
    const { data: { user } } = await (supabase.auth as any).getUser();
    const escritorioId = user?.user_metadata?.escritorio_id;

    // 1. Ledger Persistência
    const { data: event, error } = await supabase
      .schema(SCHEMA)
      .from('eventos')
      .insert([{
        ...payload,
        escritorio_id: escritorioId,
        status: 'confirmado',
        criado_em: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    // 2. Automação HelpDesk: Prazos fatais geram tickets imediatos
    if (payload.urgencia === 'fatal') {
      await HelpDeskRouter.createTicket({
        assunto: `🚨 [IMEDIATO] PRAZO FATAL: ${payload.titulo}`,
        descricao: `Intervenção técnica obrigatória para o compromisso de ${new Date(payload.data_inicio).toLocaleString()}. Vínculo automatizado via Orquestrador HM-V12.`,
        contato_id: payload.contato_id,
        prioridade: 'urgente',
        canal_origem: 'web'
      });
    }

    return event;
  },

  async fetchClientEvents() {
    const { data: { user } } = await (supabase.auth as any).getUser();
    const contatoId = user?.user_metadata?.contato_id;
    if (!contatoId) return [];

    const { data, error } = await supabase
      .schema(SCHEMA)
      .from('eventos')
      .select('*, anexos:evento_anexos(id)')
      .eq('contato_id', contatoId)
      .order('data_inicio', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async fetchAvailableSlots(date: string) {
    // HM-V12: Mock de motor de intersecção cronológica
    return ["09:00", "10:30", "14:00", "15:30", "17:00", "18:15"];
  },

  async getShieldStatus() {
    const checks = [
      { t: 'eventos', cols: ['id', 'urgencia', 'status'] },
      { t: 'configuracoes_disponibilidade', cols: ['id', 'hora_inicio'] },
      { t: 'evento_anexos', cols: ['id', 'documento_id', 'evento_id'] }
    ];
    const results = [];
    for (const check of checks) {
      try {
        const { error } = await supabase.schema(SCHEMA).from(check.t).select(check.cols.join(',')).limit(1);
        results.push({ 
          table: `${SCHEMA}.${check.t}`, 
          pass: !error, 
          msg: error ? error.message : 'Nominal' 
        });
      } catch (e: any) { 
        results.push({ table: check.t, pass: false, msg: e.message }); 
      }
    }
    return results;
  }
};