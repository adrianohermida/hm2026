
import React from 'react';
import { UserPlus } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const OAuthSignupSkeleton: IModuleSkeleton = {
  moduleId: 'oauthSignup',
  moduleName: 'Registro de Clientes',
  title: 'Criar Nova Conta',
  description: 'Inicie sua jornada jurídica digital com o Dr. Adriano Hermida Maia.',
  icon: <UserPlus size={40} />,
  compliance: { atomization: true, ssotAlignment: true, isolationLevel: 'STRICT', lgpdByDesign: true, hookDriven: true },
  integrations: { supabase: true, googleWorkspace: false, govBr: false, blockchain: false, cloudflare: true },
  permissions: { allowedRoles: ['guest'] },
  sidebar: { label: 'Cadastro', icon: <UserPlus size={18} />, route: 'signup', order: 0 },
  breadcrumbs: [{ label: 'Cadastro', route: 'signup', isClickable: false }],
  metadata: { version: '1.0.0', type: 'CORE', arch: 'HM-V12-KERN', mcp_sync: true }
};
