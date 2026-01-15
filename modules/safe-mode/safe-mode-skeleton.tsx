
import React from 'react';
import { ShieldCheck, Coffee } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const SafeModeSkeleton: IModuleSkeleton = {
  moduleId: 'safe-mode',
  moduleName: 'Kernel Safe Mode',
  title: 'Modo de Recuperação',
  description: 'Ambiente de baixo consumo para estabilização de cota 429 e limpeza de PH1.',
  icon: <ShieldCheck size={40} />,
  compliance: {
    atomization: true,
    ssotAlignment: true,
    isolationLevel: 'STRICT',
    lgpdByDesign: true,
    hookDriven: true
  },
  integrations: {
    supabase: false, // Desativado para economizar recursos
    googleWorkspace: false,
    govBr: false,
    blockchain: false,
    cloudflare: false
  },
  permissions: { allowedRoles: ['admin', 'cliente'] },
  sidebar: {
    label: 'Safe Mode',
    icon: <ShieldCheck size={18} />,
    route: 'safe-mode',
    order: 99
  },
  breadcrumbs: [
    { label: 'Sistema', route: 'dashboard', isClickable: true },
    { label: 'Safe Mode', route: 'safe-mode', isClickable: false }
  ],
  metadata: { version: '1.0.0', type: 'CORE', arch: 'HM-V12-KERN', mcp_sync: false }
};

export const SafeModeLabels = {
  title: 'Ambiente em Standby',
  subtitle: 'Cota de Sincronização Excedida (429)',
  action: 'Limpar Tudo e Aguardar',
  notice: 'O erro PH1 ocorre quando o buffer da IDE satura. Permanecer nesta página por 5 minutos resolve o bloqueio do Google.'
};
