
import { ModuleRegistry } from '../modules/registry.ts';

export const breadcrumbService = {
  getBreadcrumbs(route: string) {
    const module = ModuleRegistry.find(m => m.sidebar.route === route);
    if (!module) return [];
    return module.breadcrumbs || [];
  }
};
