import { IModuleRouter } from '../contracts.ts';

export const V12BlankRouter: IModuleRouter = {
  // Módulo estático sem conexão direta com tabelas por padrão
  SCHEMA: 'governanca',

  async getInitialState() {
    return {
      status: 'READY',
      timestamp: new Date().toISOString(),
      mode: 'TEMPLATE'
    };
  }
};