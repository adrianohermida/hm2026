
import { supabase } from '../../services/supabase.ts';

const SCHEMA = 'judiciario';
const TABLE = 'processos';

export const ProcessRouter = {
  async fetchAll() {
    return supabase.schema(SCHEMA).from(TABLE).select('*').order('ultima_movimentacao', { ascending: false });
  },
  async getByCNJ(numero_cnj: string) {
    return supabase.schema(SCHEMA).from(TABLE).select('*, movimentos(*)').eq('numero_cnj', numero_cnj).single();
  }
};
