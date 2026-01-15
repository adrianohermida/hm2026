import React, { useState } from 'react';
import { Database, Code, CheckCircle2, Copy, AlertTriangle } from 'lucide-react';
import { Typography } from '../../../components/atoms/Typography.tsx';
import { AiAgentsSkeleton } from '../ai-agents-skeleton.tsx';

export const AgentDatabaseAudit: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const ddl = AiAgentsSkeleton.metadata.ddl_blueprint || '';

  const handleCopy = async () => {
    try {
      if (!document.hasFocus()) window.focus();
      await navigator.clipboard.writeText(ddl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Falha ao copiar. Por favor, selecione o texto manualmente.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-brand-primary p-12 rounded-[3rem] text-white flex items-center justify-between shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
           <Database size={120} />
        </div>
        <div className="relative z-10 flex items-center gap-8">
          <div className="w-16 h-16 bg-brand-secondary rounded-[1.5rem] flex items-center justify-center text-brand-primary">
            <Database size={32} />
          </div>
          <div>
            <Typography variant="h3" font="serif" className="mb-2">Ledger de Infraestrutura</Typography>
            <Typography variant="caption" className="text-white/40 normal-case leading-relaxed">
              Verifique a normalização do schema <strong>ai_agents</strong> no Supabase.
            </Typography>
          </div>
        </div>
        <button 
          onClick={handleCopy}
          className={`relative z-10 flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          {copied ? <CheckCircle2 size={16}/> : <Copy size={16}/>}
          {copied ? 'Copiado para o MCP' : 'Copiar DDL Normalizado'}
        </button>
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-10 border border-white/5 shadow-inner">
         <div className="flex items-center gap-3 mb-6 text-slate-500">
            <Code size={18}/>
            <Typography variant="caption" className="text-[10px] font-black uppercase">Source: normalize-schema-v12.sql</Typography>
         </div>
         <pre className="text-[11px] font-mono text-blue-300/80 leading-relaxed overflow-x-auto p-4 bg-black/30 rounded-2xl border border-white/5 custom-scrollbar-dark">
            {ddl}
         </pre>
      </div>

      <div className="p-8 bg-amber-500/5 rounded-3xl border border-amber-500/20 flex items-start gap-6">
         <AlertTriangle size={24} className="text-amber-500 shrink-0 mt-1" />
         <div>
            <Typography variant="small" className="text-amber-700 font-bold block mb-1">Atenção ao Provisionamento</Typography>
            <Typography variant="caption" className="text-slate-500 normal-case leading-relaxed text-[11px]">
              Se o módulo apresentar erros de conexão "42P01", acesse o <strong>SQL Editor</strong> do Supabase e execute o script acima. O Kernel HM-V12 requer que todas as tabelas de versionamento e aprendizado estejam ativas para garantir a integridade dos logs.
            </Typography>
         </div>
      </div>
    </div>
  );
};