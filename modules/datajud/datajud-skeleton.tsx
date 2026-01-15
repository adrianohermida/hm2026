import React from 'react';
import { Gavel, ShieldCheck, Activity, Database, Lock } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const DataJudSkeleton: IModuleSkeleton = {
  moduleId: "datajud",
  moduleName: "DataJud CNJ",
  title: "Integração Nacional",
  description: "Orquestrador de dados públicos processuais com conformidade MTD 1.2.",
  icon: React.createElement(Gavel, { size: 40, className: "text-brand-secondary/40" }),
  
  compliance: {
    atomization: true,
    ssotAlignment: true,
    isolationLevel: 'STRICT',
    lgpdByDesign: true,
    hookDriven: true
  },

  integrations: {
    supabase: true,
    googleWorkspace: false,
    govBr: true,
    blockchain: true, // Para hash de auditoria
    cloudflare: true
  },

  permissions: {
    allowedRoles: ["admin", "advogado"]
  },

  sidebar: {
    label: "DataJud",
    icon: React.createElement(Database, { size: 18 }),
    route: "configuracoes", // Acessível via Config
    order: 99
  },

  breadcrumbs: [],

  metadata: {
    version: "2.3.0",
    type: 'INTEGRATION',
    arch: 'HM-V12-SERVICE',
    mcp_sync: true
  }
};

export const DataJudLabels = {
  status: {
    active: { label: 'Conectado', color: 'text-emerald-500', icon: <Activity size={14}/> },
    inactive: { label: 'Desconectado', color: 'text-slate-400', icon: <Lock size={14}/> },
    error: { label: 'Erro de Chave', color: 'text-rose-500', icon: <ShieldCheck size={14}/> }
  },
  tribunais: [
    { id: 'TRF1', nome: 'Tribunal Regional Federal da 1ª Região', endpoint: 'api_publica_trf1' },
    { id: 'TJSP', nome: 'Tribunal de Justiça de São Paulo', endpoint: 'api_publica_tjsp' },
    { id: 'STJ', nome: 'Superior Tribunal de Justiça', endpoint: 'api_publica_stj' }
  ]
};