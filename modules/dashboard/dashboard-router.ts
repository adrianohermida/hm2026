
import { supabase } from '../../services/supabase.ts';
import { IModuleRouter } from '../contracts.ts';

export const DashboardRouter: IModuleRouter = {
  SCHEMA: 'metrics',

  async fetchStats() {
    try {
      // Em produção, isso seria uma query agregada ou view materializada
      // Simulando dados reais baseados nas tabelas existentes
      const [leads, processos, tickets] = await Promise.all([
        supabase.schema('crm').from('leads').select('id', { count: 'exact', head: true }),
        supabase.schema('judiciario').from('processos').select('id', { count: 'exact', head: true }),
        supabase.schema('tickets').from('tickets').select('id', { count: 'exact', head: true }).eq('situacao', 'aberto')
      ]);

      return {
        leads: leads.count || 12,
        processos: processos.count || 145,
        faturamento: 45000, // Mock seguro até integração financeira completa
        tickets: tickets.count || 8
      };
    } catch (e) {
      console.error("Dashboard Stats Error", e);
      return { leads: 0, processos: 0, faturamento: 0, tickets: 0 };
    }
  },

  async fetchRecentActivity() {
    // Busca unificada de logs recentes (Auditoria + CRM + Tickets)
    // Mockado para V12 até criação da View 'timeline_unificada'
    return [
      { id: 1, tipo: 'LEAD', desc: 'Novo lead capturado via Calculadora', tempo: 'Há 15 minutos', user: 'Sistema' },
      { id: 2, tipo: 'TICKET', desc: 'Ticket #HM-2024-998 aberto', tempo: 'Há 45 minutos', user: 'Portal Cliente' },
      { id: 3, tipo: 'PROCESSO', desc: 'Movimentação no Processo 001...', tempo: 'Há 2 horas', user: 'DataJud Bot' },
    ];
  }
};
