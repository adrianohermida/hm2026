
import { supabase } from '../../services/supabase.ts';

const SCHEMA = 'agenda';
const TABLE = 'eventos';

export const CalendarRouter = {
  async fetchUpcoming() {
    return supabase.schema(SCHEMA).from(TABLE).select('*').gte('data_inicio', new Date().toISOString()).order('data_inicio', { ascending: true });
  },
  async createEvent(payload: any) {
    return supabase.schema(SCHEMA).from(TABLE).insert(payload);
  }
};
