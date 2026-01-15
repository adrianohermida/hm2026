
import { supabase } from '../../services/supabase.ts';
import { IModuleRouter } from '../contracts.ts';

export const ConfigRouter: IModuleRouter = {
  SCHEMA: 'governanca',

  async getSettings() {
    return supabase.schema('governanca').from('configuracoes_gerais').select('*').single();
  },

  /**
   * HM-V12: MONITOR DE SINCRONIA GITHUB (PAGES)
   * No GitHub Pages, o deploy é automatizado via Actions no push.
   */
  async triggerVercelDeploy(motivo: string, usuario: string) {
    // HM-V12: Funcionalidade Vercel desativada conforme migração infra.
    return { success: false, error: "Ambiente migrado para GitHub Pages. O deploy é automático via GitHub Actions no domínio hermidamaia.adv.br." };
  },

  async fetchDeployLogs() {
    // Busca logs de sincronização registrados no ledger
    const { data } = await supabase
      .schema('governanca')
      .from('deploy_audit_logs')
      .select('*')
      .order('criado_em', { ascending: false })
      .limit(10);
    return data || [];
  },

  async getShieldStatus() {
    const checks = [
      { s: 'governanca', t: 'configuracoes_gerais', label: 'Preferências' },
      { s: 'governanca', t: 'branding_office', label: 'Escritório' },
      { s: 'governanca', t: 'perfis_equipe', label: 'Equipe & IA' },
      { s: 'governanca', t: 'deploy_audit_logs', label: 'Ledger de Sincronia' }
    ];

    const results = [];
    for (const item of checks) {
      try {
        const { error } = await supabase.schema(item.s).from(item.t).select('count', { count: 'exact', head: true });
        results.push({
          table: `${item.s}.${item.t}`,
          label: item.label,
          pass: !error,
          msg: error ? 'Inconsistência Ledger' : 'Nominal'
        });
      } catch (e) {
        results.push({ table: item.t, label: item.label, pass: false, msg: 'ERRO_DB' });
      }
    }

    return results;
  }
};
