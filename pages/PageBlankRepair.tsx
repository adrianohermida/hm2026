import React, { useState } from 'react';
import { Terminal, Play, CheckCircle2, AlertTriangle, Copy } from 'lucide-react';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';

/**
 * HM-V12: PÁGINA DE REPARO EM BRANCO (EMERGENCY CONSOLE)
 * Utilize esta página para executar scripts de correção quando o Admin Shield estiver inacessível.
 */
export const PageBlankRepair: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const REPAIR_SCRIPT = `-- 🛡️ HM-V12: DATAJUD & EDGE FUNCTION EMERGENCY REPAIR
-- CORREÇÃO DO ERRO 42809 ("movimentacoes" is not a view)

-- 1. LIMPEZA DE CONFLITOS (CRÍTICO PARA O ERRO 42809)
DROP VIEW IF EXISTS judiciario.movimentacoes;
DROP TABLE IF EXISTS judiciario.movimentacoes CASCADE; -- Remove a tabela antiga para permitir a View

-- 2. RECRIAR ESTRUTURA CORRETA
CREATE TABLE IF NOT EXISTS judiciario.processos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_cnj text UNIQUE NOT NULL,
  tribunal text,
  status text DEFAULT 'ATIVO',
  criado_em timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS judiciario.movimentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  processo_id uuid REFERENCES judiciario.processos(id) ON DELETE CASCADE,
  codigo integer,
  descricao text,
  data_movimento timestamp with time zone,
  criado_em timestamp with time zone DEFAULT now(),
  UNIQUE(processo_id, codigo, data_movimento)
);

-- Recria o alias como VIEW (Compatibilidade V1)
CREATE OR REPLACE VIEW judiciario.movimentacoes AS SELECT * FROM judiciario.movimentos;

-- 3. PERMISSÕES PARA EDGE FUNCTIONS (SERVICE_ROLE)
-- Garante que o usuario de serviço (Edge Function) possa ler/escrever
GRANT USAGE ON SCHEMA judiciario TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA judiciario TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA judiciario TO service_role;

GRANT USAGE ON SCHEMA lgpd TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA lgpd TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA lgpd TO service_role;

-- 4. RLS BYPASS PARA SERVICE_ROLE
ALTER TABLE judiciario.processos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Edge_Service_Role_Full" ON judiciario.processos;
CREATE POLICY "Edge_Service_Role_Full" ON judiciario.processos FOR ALL TO service_role USING (true) WITH CHECK (true);
`;

  const copyScript = () => {
    navigator.clipboard.writeText(REPAIR_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#05080F] flex flex-col items-center justify-center p-8 font-mono text-slate-400">
      <div className="max-w-3xl w-full space-y-8">
        <div className="flex items-center gap-4 text-brand-secondary">
          <Terminal size={32} />
          <Typography variant="h3" className="text-white">Console de Reparo Manual</Typography>
        </div>

        <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-4">
          <AlertTriangle className="text-rose-500 shrink-0" />
          <div>
            <Typography variant="small" className="text-rose-400 font-bold uppercase mb-1">Diagnóstico de Erro 42809</Typography>
            <p className="text-xs leading-relaxed">
              Detectamos que <code>judiciario.movimentacoes</code> existe como TABELA, impedindo sua recriação como VIEW. 
              O script abaixo executa um <code>DROP CASCADE</code> seguro e restaura as permissões das Edge Functions.
            </p>
          </div>
        </div>

        <div className="relative group">
          <pre className="bg-black/50 p-6 rounded-2xl border border-white/10 text-xs text-emerald-400 overflow-x-auto whitespace-pre-wrap max-h-[400px] custom-scrollbar-dark shadow-inner">
            {REPAIR_SCRIPT}
          </pre>
          <button 
            onClick={copyScript}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all"
            title="Copiar SQL"
          >
            {copied ? <CheckCircle2 size={16} className="text-emerald-400"/> : <Copy size={16}/>}
          </button>
        </div>

        <div className="flex justify-end">
          <Button variant="secondary" onClick={copyScript} icon={<Play size={16}/>}>
            Copiar Script para SQL Editor
          </Button>
        </div>
      </div>
    </div>
  );
};