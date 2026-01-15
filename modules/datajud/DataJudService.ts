import { supabase } from '../../services/supabase.ts';

/**
 * HM-V12: DATAJUD SERVICE - EDGE FUNCTION ORCHESTRATOR
 * Versão: 2.3.0 (Sync Repair & CORS Handling)
 */

export class DataJudService {
  
  private static getFunctionName(tribunal: string): string {
    const map: Record<string, string> = {
      'TRF1': 'datajud_trf1',
      'TRF2': 'datajud_trf2',
      'TRF3': 'datajud_trf3',
      'TRF4': 'datajud_trf4',
      'TRF5': 'datajud_trf5',
      'TRF6': 'datajud_trf6',
      'TJSP': 'datajud_tjsp',
      'TJAM': 'datajud_tjam',
      'TJDFT': 'datajud_tjdft',
      'STJ': 'datajud_stj'
    };
    return map[tribunal] || 'datajud_trf1'; 
  }

  static async obterStatusEndpoints() {
    try {
      const { data, error } = await supabase.schema('judiciario').from('endpoints').select('*');
      if (error) throw error;
      return data || [];
    } catch (e) {
      return []; 
    }
  }

  static async sincronizarProcesso(cnj: string, tribunal: string) {
    const dados = await this.buscarProcessoNaFonte(cnj, tribunal);
    
    // Persistência assíncrona se houver sucesso
    if (dados && dados.hits) {
       await supabase.schema('judiciario').from('datajud_sync_status').upsert({
        numero_processo: cnj.replace(/\D/g, ''),
        tribunal: tribunal,
        status: 'SYNCED',
        ultima_execucao: new Date().toISOString()
      }, { onConflict: 'numero_processo' });
    }
    
    return { sucesso: true, dados };
  }

  static async buscarProcessoNaFonte(numeroProcesso: string, tribunal: string) {
    const cleanCNJ = numeroProcesso.replace(/\D/g, '');
    const functionName = this.getFunctionName(tribunal);
    
    // Log operacional discreto
    console.info(`[DataJud] Invoke: ${functionName} -> ${cleanCNJ}`);

    try {
      // Chamada via Supabase Functions Client
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: { numeroProcesso: cleanCNJ },
        method: 'POST'
      });

      if (error) {
        // Tratamento robusto para extrair a mensagem de erro
        let errorMsg = "Erro desconhecido na Edge Function";
        
        if (typeof error === 'string') {
          errorMsg = error;
        } else if (error && typeof error === 'object') {
          errorMsg = (error as any).message || JSON.stringify(error);
        }

        // Detecção de CORS (Network Error do Fetch)
        // O Supabase JS retorna "Failed to send a request to the Edge Function" quando o fetch falha (CORS ou Offline)
        const isCors = errorMsg.includes('Failed to send a request') || 
                       errorMsg.includes('TypeError') || 
                       ((error as any)?.name === 'FunctionsFetchError');
        
        const customError: any = new Error(errorMsg);
        customError.status = (error as any)?.context?.response?.status || 500;
        customError.name = 'DataJudEdgeError';
        customError.context = functionName;
        customError.isCors = isCors;
        customError.hint = isCors ? "Bloqueio de CORS detectado. A Edge Function precisa tratar o método OPTIONS." : undefined;
        
        throw customError;
      }
      
      return data;

    } catch (e: any) {
      // Evita logar o erro novamente se ele já foi tratado e transformado acima
      if (e.name !== 'DataJudEdgeError') {
         const logMsg = e.message || (typeof e === 'object' ? JSON.stringify(e) : String(e));
         console.warn(`[DataJud] Falha de Execução: ${logMsg}`);
      }
      throw e;
    }
  }

  // Helper para validação de CNJ
  static parseCNJ(raw: string): { valido: boolean; formatado: string; msg?: string } {
    const clean = raw.replace(/\D/g, '');
    if (clean.length !== 20) {
      return { 
        valido: false, 
        formatado: raw, 
        msg: `CNJ Inválido (${clean.length} dígitos). O padrão requer 20 dígitos numéricos.` 
      };
    }
    const formatado = `${clean.slice(0, 7)}-${clean.slice(7, 9)}.${clean.slice(9, 13)}.${clean.slice(13, 14)}.${clean.slice(14, 16)}.${clean.slice(16, 20)}`;
    return { valido: true, formatado };
  }

  private static async registrarAuditoria(log: any) {
    try { console.log("[DataJud Audit]", log); } catch (e) { }
  }
}