
import React from 'react';
import { ModuleRegistry } from '../modules/registry.ts';

export const sidebarService = {
  buildSidebar(role: 'admin' | 'cliente' | 'guest') {
    return ModuleRegistry
      .filter(module => {
        if (!module.sidebar) return false;
        const allowedRoles = module.permissions?.allowedRoles || [];
        return allowedRoles.includes(role);
      })
      .map(module => ({
        id: String(module.moduleId),
        label: String(module.sidebar.label || ''),
        icon: module.sidebar.icon,
        route: String(module.sidebar.route),
        badge: String(module.sidebar.badge || ''),
        order: Number(module.sidebar.order ?? 99)
      }))
      .sort((a, b) => a.order - b.order);
  }
};
