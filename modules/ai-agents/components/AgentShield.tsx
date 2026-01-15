import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Activity, Database, AlertCircle, CheckCircle2, Code, Terminal, Zap, RefreshCw, Copy, ChevronRight, ShieldAlert, Lock, ExternalLink, PenTool, Wand2, X, Sparkles } from 'lucide-react';
import { Typography } from '../../../components/atoms/Typography.tsx';
import { Button } from '../../../components/atoms/Button.tsx';
import { AiAgentsRouter } from '../ai-agents-router.ts';

export const AgentShield: React.FC = () => {
  const [audit, setAudit] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [writeTesting, setWriteTesting] = useState(false);
  const [writeResult, setWriteResult] = useState<{ success: boolean; error?: string } | null>(null);
  const [activeBalloon, setActiveBalloon] = useState<string | null>(null);

  const runAudit = useCallback(async () => {
    setLoading(true);
    try {
      const results = await AiAgentsRouter.runShieldAudit();
      setAudit(results || []);
    } catch (err) {
      console.error("Shield Error:", err);
      setAudit([
        { entity: 'agents', status: 'FAIL', error: 'CONNECTION_ERROR' },
        { entity: 'agent_faq', status: 'FAIL', error: 'CONNECTION_ERROR' },
        { entity: 'agent_usage_logs', status: 'FAIL', error: 'CONNECTION_ERROR' }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { runAudit(); }, [runAudit]);

  const handleTestWrite = async () => {
    setWriteTesting(true);
    setWriteResult(null);
    const result = await AiAgentsRouter.testWriteAccess();
    setWriteResult(result);
    setWriteTesting(false);
    if (result.success) runAudit();
  };

  const isExposureError = audit.some(r => r.error === 'API_EXPOSURE_ERROR') || writeResult?.error?.includes('406');

  // HM-V12: SCRIPTS DE REPARO MASTER (AGORA COM MATRIZ_PERMISSOES)
  const REPAIR_SCRIPTS: Record<string, string> = {
    agents: `-- HM-V12: SCRIPT DE NORMALIZAÇÃO DE COLUNAS
-- Adiciona matriz_permissoes e colunas de suporte neural ausentes:
ALTER TABLE ai_agents.agents 
ADD COLUMN IF NOT EXISTS matriz_permissoes jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS modulos_conectados text[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS prompts_treinamento text[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS config_ferramentas jsonb DEFAULT '{"agenda_ativa": false, "email_ativo": false, "calculadora_ativa": false}'::jsonb;

-- DDL COMPLETO (Sincronizado)
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
);`,
    agent_faq: `CREATE TABLE IF NOT EXISTS ai_agents.agent_faq (
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
);`,
    agent_usage_logs: `CREATE TABLE IF NOT EXISTS ai_agents.agent_usage_logs (
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
);`
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (!document.hasFocus()) window.focus();
      await navigator.clipboard.writeText(text);
      alert("Script de correção copiado! Vá ao SQL Editor do Supabase, cole e execute para normalizar a tabela agents.");
    } catch (err) {
      alert("Falha ao copiar. Por favor, selecione o texto manualmente.");
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* HEADER SHIELD */}
      <div className={`p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group border transition-all duration-700 ${isExposureError ? 'bg-rose-950 border-rose-500/30' : 'bg-[#05080F] border-white/5'}`}>
        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
           <ShieldCheck size={120} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-5">
              <div className={`w-20 h-20 rounded-[2.2rem] flex items-center justify-center shadow-2xl ${isExposureError ? 'bg-rose-500 animate-pulse' : 'bg-brand-secondary text-brand-primary'}`}>
                {isExposureError ? <ShieldAlert size={40} /> : <ShieldCheck size={40} />}
              </div>
              <div>
                <Typography variant="h3" font="serif" className="text-3xl">Admin Shield</Typography>
                <Typography variant="caption" className={`${isExposureError ? 'text-rose-400' : 'text-brand-secondary'} font-black tracking-widest uppercase text-xs`}>Governança de Infraestrutura IA</Typography>
              </div>
            </div>
            <Typography variant="body" className="text-white/40 text-sm leading-relaxed max-w-2xl">
              {isExposureError 
                ? 'O schema "ai_agents" não está exposto na API (Erro 406). Habilite-o no Dashboard do Supabase.' 
                : 'Se ocorrer erro de persistência, clique no Balão de Reparo da tabela AGENTS abaixo para obter o comando ALTER TABLE que adiciona a matriz de permissões.'}
            </Typography>
            <div className="flex gap-4">
               <button onClick={runAudit} className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center gap-3 border border-white/5">
                  <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Recalibrar Ledger
               </button>
            </div>
          </div>

          <div className="bg-black/40 p-10 rounded-[3rem] border border-white/10 text-center min-w-[280px]">
             <Typography variant="caption" className="text-white/20 block mb-3 font-black uppercase tracking-widest text-[9px]">Integridade Geral</Typography>
             <div className="text-6xl font-serif mb-2">
                {audit.length > 0 ? Math.round((audit.filter(r => r.status === 'PASS').length / audit.length) * 100) : 0}%
             </div>
             <Typography variant="caption" className={`${audit.every(r => r.status === 'PASS') && audit.length > 0 ? 'text-emerald-400' : 'text-rose-400'} font-bold uppercase`}>
                {audit.every(r => r.status === 'PASS') && audit.length > 0 ? 'STATUS: NOMINAL' : 'STATUS: FALHA DETECTADA'}
             </Typography>
          </div>
        </div>
      </div>

      {/* GRID DE TABELAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative min-h-[300px]">
        {audit.map((res, i) => (
          <div key={i} className="relative group/card">
            <div className={`p-8 rounded-[3rem] border transition-all duration-500 h-full flex flex-col justify-between ${res.status === 'PASS' ? 'bg-white border-slate-100 shadow-sm' : 'bg-rose-50 border-rose-100 shadow-lg'}`}>
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${res.status === 'PASS' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    {res.status === 'PASS' ? <ShieldCheck size={24}/> : <ShieldAlert size={24}/>}
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${res.status === 'PASS' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${res.status === 'PASS' ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`} />
                    {res.status}
                  </div>
                </div>
                <Typography variant="small" className="font-black text-brand-primary uppercase text-xs mb-2 truncate" title={res.entity}>
                  {res.entity.replace('agent_', '')}
                </Typography>
                <Typography variant="caption" className="text-slate-400 normal-case block mb-8 font-medium">
                  {res.status === 'PASS' ? 'Conexão Estabelecida' : 'Link de Persistência Offline'}
                </Typography>
              </div>

              {res.status !== 'PASS' ? (
                <button 
                  onClick={() => setActiveBalloon(res.entity)}
                  className="w-full py-4 bg-brand-primary text-brand-secondary rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-brand-primary/20"
                >
                  <Wand2 size={14}/> Balão de Reparo
                </button>
              ) : (
                <div className="w-full py-4 bg-slate-50 text-slate-300 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2">
                   <Lock size={14}/> Ledger Protegido
                </div>
              )}
            </div>

            {/* OVERLAY DO BALÃO DE REPARO */}
            {activeBalloon === res.entity && (
              <div className="absolute inset-0 z-[100] animate-in fade-in zoom-in-95 duration-300">
                <div className="bg-[#0A1120] text-white p-8 rounded-[3rem] border border-brand-secondary/40 shadow-2xl h-full flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                     <div className="flex items-center gap-2 text-brand-secondary">
                        <Sparkles size={16}/>
                        <span className="text-[10px] font-black uppercase tracking-widest">Script de Correção V12</span>
                     </div>
                     <button onClick={() => setActiveBalloon(null)} className="p-2 hover:bg-white/10 rounded-xl text-slate-400"><X size={16}/></button>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar-dark mb-4">
                     <pre className="text-[9px] font-mono text-blue-300 bg-black/40 p-4 rounded-xl border border-white/5 whitespace-pre-wrap leading-relaxed">
                        {REPAIR_SCRIPTS[res.entity] || '-- Script de reparo em síntese.'}
                     </pre>
                  </div>
                  <button 
                    onClick={() => { copyToClipboard(REPAIR_SCRIPTS[res.entity] || ''); setActiveBalloon(null); }}
                    className="w-full py-3 bg-brand-secondary text-brand-primary rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Copy size={14}/> Copiar SQL
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FOOTER INFORMATIVO */}
      <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row items-center gap-10">
         <div className="w-20 h-20 bg-brand-primary text-brand-secondary rounded-[2rem] flex items-center justify-center shadow-xl shrink-0">
            <Zap size={32} />
         </div>
         <div className="flex-1 space-y-2">
            <Typography variant="small" className="text-brand-primary font-black uppercase text-sm">Protocolo de Resgate: Colunas de Permissão</Typography>
            <Typography variant="body" className="text-slate-500 text-sm leading-relaxed">
              O erro indica que a coluna <strong>matriz_permissoes</strong> não existe. Clique no <strong>Balão de Reparo</strong> da tabela <strong>agents</strong> acima e execute o script <code>ALTER TABLE</code> no Supabase para normalizar a estrutura.
            </Typography>
         </div>
         <Button 
           variant="secondary" 
           onClick={handleTestWrite} 
           disabled={writeTesting} 
           className="h-16 px-12 rounded-2xl shadow-xl shadow-brand-secondary/30 font-black uppercase text-[10px] tracking-widest shrink-0"
         >
           {writeTesting ? <RefreshCw className="animate-spin" size={18} /> : <PenTool size={18} />}
           {writeResult?.success ? 'Escrita Nominal' : 'Testar Escrita'}
         </Button>
      </div>
    </div>
  );
};