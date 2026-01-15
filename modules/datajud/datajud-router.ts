import { DataJudService } from './DataJudService.ts';

export const DataJudRouter = {
  
  statusConectividade: async () => {
    return await DataJudService.obterStatusEndpoints();
  },

  // Busca direta (não persiste)
  buscarOnline: async (cnj: string, tribunal: string) => {
    return await DataJudService.buscarProcessoNaFonte(cnj, tribunal);
  },

  // Sincronia completa (persiste em judiciario.processos)
  sincronizarBase: async (cnj: string, tribunal: string) => {
    return await DataJudService.sincronizarProcesso(cnj, tribunal);
  },

  validarCNJ: (cnj: string) => {
    return DataJudService.parseCNJ(cnj);
  }
};