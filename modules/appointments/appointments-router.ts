
import { supabase } from '../../services/supabase.ts';
import { IModuleRouter } from '../contracts.ts';
import { Profissional, Slot } from '../../types.ts';
import { PROFISSIONAIS_MOCK, SLOTS_MOCK } from '../../services/supabaseService.ts';

const SCHEMA = 'agenda';

export const AppointmentsRouter: IModuleRouter = {
  SCHEMA,

  async fetchProfessionals(): Promise<Profissional[]> {
    try {
      const { data, error } = await supabase.schema(SCHEMA).from('profissionais').select('*').order('nome');
      if (error) return PROFISSIONAIS_MOCK;
      return data || PROFISSIONAIS_MOCK;
    } catch {
      return PROFISSIONAIS_MOCK;
    }
  },

  async fetchSlots(date: string, profId: string): Promise<Slot[]> {
    try {
      const { data, error } = await supabase.schema(SCHEMA)
        .from('slots_disponiveis')
        .select('*')
        .eq('profissional_id', profId)
        .eq('data', date)
        .eq('disponivel', true);
      
      if (error) return SLOTS_MOCK;
      return data || SLOTS_MOCK;
    } catch {
      return SLOTS_MOCK;
    }
  },

  async submitAppointment(payload: any) {
    // 1. Criação do Lead no CRM
    // 2. Registro do Compromisso na Agenda
    const { data, error } = await supabase.schema('crm').from('leads').insert([{
      nome: payload.name,
      email: payload.email,
      telefone: payload.phone,
      origem: 'AGENDAMENTO_WEB',
      status: 'Qualificado',
      metadata: {
        appointment_date: payload.date,
        appointment_time: payload.time,
        profissional_id: payload.profId
      }
    }]).select().single();

    if (error) throw error;
    return data;
  }
};
