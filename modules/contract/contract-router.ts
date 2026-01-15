
import { supabase } from '../../services/supabase.ts';

const SCHEMA = 'juridico';
const TABLE = 'contratos';

export const ContractRouter = {
  async listAll() {
    return supabase.schema(SCHEMA).from(TABLE).select('*');
  },
  async updateStatus(id: string, status: string) {
    return supabase.schema(SCHEMA).from(TABLE).update({ status }).eq('id', id);
  }
};
