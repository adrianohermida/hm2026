
import { supabase } from '../../services/supabase.ts';

const SCHEMA = 'judiciario';
const TABLE = 'publicacoes';

export const PublicationRouter = {
  async fetchRecent() {
    return supabase.schema(SCHEMA).from(TABLE).select('*').limit(20).order('data_publicacao', { ascending: false });
  },
  async markAsRead(id: string) {
    return supabase.schema(SCHEMA).from(TABLE).update({ lido: true }).eq('id', id);
  }
};
