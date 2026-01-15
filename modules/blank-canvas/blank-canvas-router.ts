import { IModuleRouter } from '../contracts.ts';

export const BlankCanvasRouter: IModuleRouter = {
  SCHEMA: 'governanca',

  async getInitialState() {
    return {
      status: 'READY',
      timestamp: new Date().toISOString(),
      layers: []
    };
  }
};