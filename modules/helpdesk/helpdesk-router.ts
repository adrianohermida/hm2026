
import { supabase } from '../../services/supabase.ts';
import { IModuleRouter } from '../contracts.ts';
import { Ticket, TicketThread, TicketStatus, Contato } from '../../types.ts';

export const HelpDeskRouter: IModuleRouter = {
  SCHEMA: 'tickets',
  TABLE: 'tickets',

  async fetchAll(): Promise<Ticket[]> {
    const { data } = await supabase.schema('tickets')
      .from('tickets')
      .select('*, contatos:contato_id(*)')
      .order('criado_em', { ascending: false });
    return (data || []) as Ticket[];
  },

  async fetchThreads(ticketId: string): Promise<TicketThread[]> {
    const { data } = await supabase.schema('tickets')
      .from('ticket_threads')
      .select('*')
      .eq('ticket_id', ticketId)
      .order('criado_em', { ascending: true });
    return (data || []) as TicketThread[];
  },

  async fetchContacts(): Promise<Contato[]> {
    const { data } = await supabase.schema('crm')
      .from('clientes')
      .select('*')
      .order('nome_completo', { ascending: true });
    return (data || []) as Contato[];
  },

  async createTicket(payload: Partial<Ticket>) {
    const protocolo = `HM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const { data, error } = await supabase.schema('tickets')
      .from('tickets')
      .insert([{
        ...payload,
        protocolo,
        situacao: 'aberto',
        criado_em: new Date().toISOString()
      }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateStatus(id: string, situacao: TicketStatus) {
    const { error } = await supabase.schema('tickets')
      .from('tickets')
      .update({ situacao })
      .eq('id', id);
    if (error) throw error;
  },

  async getHealth() {
    const entities = [
      { schema: 'tickets', table: 'tickets' },
      { schema: 'tickets', table: 'ticket_threads' }
    ];
    const results = [];
    for (const ent of entities) {
      try {
        const { error } = await supabase.schema(ent.schema).from(ent.table).select('count', { count: 'exact', head: true });
        results.push({
          table: `${ent.schema}.${ent.table}`,
          pass: !error,
          errorMessage: error?.message
        });
      } catch (e) {
        results.push({ table: ent.table, pass: false, errorMessage: 'Erro de conexão' });
      }
    }
    return results;
  }
};
