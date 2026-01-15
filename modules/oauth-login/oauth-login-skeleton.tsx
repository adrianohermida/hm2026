
import React from 'react';
import { ShieldCheck, Mail, Lock, Smartphone } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const OAuthLoginSkeleton: IModuleSkeleton = {
  moduleId: 'oauthLogin',
  moduleName: 'Autenticação Core',
  title: 'Acesso Seguro',
  description: 'Portal de entrada auditado com suporte a MFA e Token Root.',
  icon: <ShieldCheck size={40} />,
  
  compliance: {
    atomization: true,
    ssotAlignment: true,
    isolationLevel: 'STRICT',
    lgpdByDesign: true,
    hookDriven: true
  },

  integrations: {
    supabase: true,
    googleWorkspace: true,
    govBr: true,
    blockchain: false,
    cloudflare: true
  },

  permissions: {
    allowedRoles: ['guest', 'admin', 'cliente']
  },

  sidebar: {
    label: 'Login',
    icon: <Lock size={18} />,
    route: 'login',
    order: 0
  },

  breadcrumbs: [
    { label: 'Início', route: 'home', isClickable: true },
    { label: 'Acesso', route: 'login', isClickable: false }
  ],

  metadata: {
    version: '1.5.0',
    type: 'CORE',
    arch: 'HM-V12-KERN',
    mcp_sync: true
  }
};

export const LoginLabels = {
  header: 'Identidade Auditada',
  emailPlaceholder: 'E-mail ou Token Root',
  passPlaceholder: 'Sua Senha',
  submitBtn: 'Entrar no Portal',
  rootBtn: 'Acesso Root Ativo',
  mfaHeader: 'Segurança V12',
  mfaSub: 'Insira o código de 6 dígitos do seu app de autenticação.',
  termsNotice: 'Ao entrar, você aceita nossa política de conformidade LGPD.'
};
