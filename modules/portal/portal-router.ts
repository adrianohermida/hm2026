
import { supabase } from '../../services/supabase.ts';

export const PortalRouter = {
  async fetchSummary() {
    const { data } = await supabase.schema('public').from('client_summary').select('*').single();
    return data || { processos: 0, faturas: 0, tickets: 0, appointments: 0 };
  },

  async fetchMyProcessos() {
    const { data } = await supabase.schema('judiciario').from('processos').select('*').order('data_ultima_movimentacao', { ascending: false });
    return data || [];
  },

  async fetchMyFaturas() {
    const { data } = await supabase.schema('financeiro').from('faturas').select('*').order('data_vencimento', { ascending: true });
    return data || [];
  },

  async fetchMyDocuments() {
    const { data } = await supabase.schema('ged').from('documentos').select('*').order('criado_em', { ascending: false });
    return data || [];
  },

  async exportPersonalData() {
    // HM-V12: Direito à Portabilidade (LGPD Art. 18)
    const { data } = await supabase.rpc('get_my_full_ledger');
    return data;
  }
};
