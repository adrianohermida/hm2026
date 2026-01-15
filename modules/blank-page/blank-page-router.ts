import { IModuleRouter } from '../contracts.ts';

export const BlankPageRouter: IModuleRouter = {
  SCHEMA: 'governanca',
  
  async getInitialState() {
    return {
      ready: true,
      timestamp: new Date().toISOString()
    };
  },

  navigate(callback: (route: string) => void) {
    callback('home');
  }
};
