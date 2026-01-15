
import { IModuleRouter } from '../contracts.ts';

export const WorkspaceRouter: IModuleRouter = {
  SCHEMA: 'governanca',

  async getInitialState() {
    return {
      status: 'READY',
      timestamp: new Date().toISOString(),
      domain: 'hermidamaia.adv.br'
    };
  }
};
