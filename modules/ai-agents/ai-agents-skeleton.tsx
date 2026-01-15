
import React from 'react';
import { Bot, Brain, Wrench, GraduationCap, Activity, BookOpen, Code, Layers, Filter, ShieldCheck } from "lucide-react";
import { IModuleSkeleton } from '../contracts.ts';

/**
 * HM-V12: AI AGENTS — SKELETON (SSOT)
 * Versão 12.98.6 - Adicionado matriz_permissoes e modulos_conectados ao blueprint
 */
export const AiAgentsSkeleton: IModuleSkeleton = {
  moduleId: "ai-agents",
  moduleName: "Agentes de IA",
  title: "Kernel de Inteligência",
  description: "Orquestração avançada de agentes neurais, ferramentas e base de conhecimento RAG.",
  icon: <Bot size={40} className="text-brand-secondary/40" />,

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
    govBr: false,
    blockchain: true, 
    cloudflare: true
  },

  permissions: {
    allowedRoles: ["superadmin", "admin", "gestor_ia"],
    requiresMfa: true
  },

  sidebar: {
    label: "Agentes IA",
    icon: <Bot size={18} />,
    route: "ai-agents",
    order: 5,
    badge: "V12"
  },

  breadcrumbs: [
    { label: "Governança", route: "dashboard", isClickable: true },
    { label: "Agentes IA", route: "ai-agents", isClickable: false }
  ],

  metadata: {
    version: "12.98.6",
    type: 'CORE',
    arch: 'HM-V12-KERN',
    mcp_sync: true,
    schema: 'ai_agents',
    tables: ['agents', 'agent_faq', 'agent_faq_learning', 'agent_learning_metrics', 'agent_tools', 'agent_training_sessions', 'agent_usage_logs', 'agent_versions'],
    ddl_blueprint: `
-- HM-V12: AI_AGENTS MASTER INFRASTRUCTURE (FULL SYNC)
CREATE SCHEMA IF NOT EXISTS ai_agents;
GRANT USAGE ON SCHEMA ai_agents TO anon, authenticated, service_role;

CREATE TABLE IF NOT EXISTS ai_agents.agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  descricao text,
  tipo text NOT NULL,
  nivel_autonomia integer NOT NULL DEFAULT 1,
  estilo_linguagem text DEFAULT 'formal'::text,
  persona text,
  ativo boolean DEFAULT true,
  matriz_permissoes jsonb DEFAULT '{}'::jsonb,
  modulos_conectados text[] DEFAULT '{}'::text[],
  prompts_treinamento text[] DEFAULT '{}'::text[],
  config_ferramentas jsonb DEFAULT '{"agenda_ativa": false, "email_ativo": false, "calculadora_ativa": false}'::jsonb,
  escritorio_id uuid,
  criado_por uuid,
  atualizado_por uuid,
  versao_atual integer DEFAULT 1,
  criado_em timestamp with time zone DEFAULT now(),
  atualizado_em timestamp with time zone DEFAULT now()
);

-- RAG BASE
CREATE TABLE IF NOT EXISTS ai_agents.agent_faq (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES ai_agents.agents(id),
  pergunta text NOT NULL,
  resposta text NOT NULL,
  origem text DEFAULT 'manual'::text,
  categoria text,
  ativo boolean DEFAULT true,
  aprovado boolean DEFAULT false,
  aprovado_por uuid,
  criado_em timestamp with time zone DEFAULT now()
);

-- LEDGER DE USO
CREATE TABLE IF NOT EXISTS ai_agents.agent_usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES ai_agents.agents(id),
  usuario_id uuid,
  escritorio_id uuid,
  acao text,
  sucesso boolean,
  tokens_input integer,
  tokens_output integer,
  custo_usd numeric,
  prompt_text text,
  response_text text,
  tempo_resposta_ms integer,
  erro_mensagem text,
  criado_em timestamp with time zone DEFAULT now()
);

GRANT ALL ON ALL TABLES IN SCHEMA ai_agents TO anon, authenticated, service_role;
    `
  }
};

export const AiAgentsLabels = {
  tabs: [
    { id: 'DNA', label: 'DNA Neural', icon: <Brain size={14}/> },
    { id: 'PERMISSIONS', label: 'Permissões', icon: <Layers size={14}/> },
    { id: 'FAQ', label: 'Base RAG', icon: <BookOpen size={14}/> },
    { id: 'TOOLS', label: 'Capacidades', icon: <Wrench size={14}/> },
    { id: 'SHIELD', label: 'Shield', icon: <ShieldCheck size={14}/> }
  ],
  modules_available: [
    { id: 'crm', label: 'Pipeline CRM' },
    { id: 'tickets', label: 'Help Desk' },
    { id: 'processos', label: 'Contencioso' },
    { id: 'agenda', label: 'Agenda Técnica' },
    { id: 'documentos', label: 'GED Cloud' }
  ],
  filters: [
    { id: 'all', label: 'Todos' },
    { id: 'copilot', label: 'Copilots' },
    { id: 'bot', label: 'Bots' },
    { id: 'especialista', label: 'Especialistas' }
  ],
  messages: {
    loading: "Sincronizando Ledger de Agentes...",
    empty: "Nenhum agente neural detectado na base."
  },
  sections: {
    agents: {
      actions: {
        create: "Sintetizar Novo Agente"
      }
    }
  },
  economics: {
    token_cost_input: 0.0000005,
    token_cost_output: 0.0000015,
    google_rate: 5.80,
    currency: "BRL"
  },
  fields: {
    nome: { label: "Nome do Agente", placeholder: "Ex: Carlos" },
    tipo: { 
      label: "Classe Neural", 
      options: [
        { value: 'copilot', label: 'Copilot (Interno)' },
        { value: 'bot', label: 'Bot de Atendimento (Externo)' },
        { value: 'especialista', label: 'Especialista de Módulo' }
      ] 
    },
    nivel_autonomia: { label: "Nível de Autonomia" },
    persona: { 
      label: "Persona (Quem ele é)", 
      placeholder: "Você é o Carlos, assistente virtual..." 
    }
  }
} as const;
