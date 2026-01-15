
import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Database, AlertCircle, RefreshCw, Copy, X, Sparkles, ShieldAlert, Lock, Wand2, Mail, Terminal } from 'lucide-react';
import { Typography } from '../../../components/atoms/Typography.tsx';
import { HelpDeskRouter } from '../helpdesk-router.ts';

export const TicketShield: React.FC = () => {
  const [audit, setAudit] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeBalloon, setActiveBalloon] = useState<string | null>(null);

  const runAudit = useCallback(async () => {
    setLoading(true);
    const results = await HelpDeskRouter.getHealth();
    setAudit(results);
    setLoading(false);
  }, []);

  useEffect(() => { runAudit(); }, [runAudit]);

  const REPAIR_SCRIPTS: Record<string, string> = {
    'tickets.tickets': `ALTER TABLE tickets.tickets ADD COLUMN IF NOT EXISTS responsavel_id uuid REFERENCES auth.users(id);
ALTER TABLE tickets.tickets ADD COLUMN IF NOT EXISTS prioridade text DEFAULT 'media';
ALTER TABLE tickets.tickets ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;`,
    'tickets.ticket_notifications': `CREATE TABLE IF NOT EXISTS tickets.ticket_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES tickets.tickets(id),
  tipo text NOT NULL, -- 'email_sent', 'email_received', 'push'
  status text DEFAULT 'pending',
  provider_id text,
  criado_em timestamp with time zone DEFAULT now()
);`
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("Script de correção copiado!");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 p-2">
      <div className="p-12 rounded-[3.5rem] bg-[#05080F] text-white border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
           <ShieldCheck size={140} />
        </div>
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-[2rem] bg-brand-secondary text-brand-primary flex items-center justify-center shadow-xl shadow-brand-secondary/10">
              <ShieldCheck size={44} />
            </div>
            <div>
              <Typography variant="h3" font="serif" className="text-3xl">Governança Shield: Atendimento</Typography>
              <Typography variant="caption" className="text-brand-secondary font-black tracking-widest uppercase text-xs">Versão do Ledger: HM-V12.22</Typography>
            </div>
          </div>
          <Typography variant="body" className="text-white/30 text-sm max-w-2xl leading-relaxed">
            Monitoramento de integridade para o ecossistema de Atendimento. Garante a sincronia entre tabelas de protocolos, histórico de mensagens e canais de notificação externa (Yandex/SMTP).
          </Typography>
          <button onClick={runAudit} className="px-10 py-5 bg-white/10 hover:bg-white/20 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center gap-3 border border-white/5">
             <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Recalibrar Integridade
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {audit.map((res, i) => (
          <div key={i} className={`p-10 rounded-[3rem] border transition-all duration-500 h-full flex flex-col justify-between ${res.pass ? 'bg-white border-slate-100 shadow-sm' : 'bg-rose-50 border-rose-100 shadow-xl'}`}>
            <div>
              <div className="flex justify-between items-start mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${res.pass ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                  {res.pass ? <Database size={28}/> : <ShieldAlert size={28}/>}
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${res.pass ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {res.pass ? 'NOMINAL' : 'AÇÃO REQUERIDA'}
                </span>
              </div>
              <Typography variant="h4" font="serif" className="text-brand-primary uppercase mb-2 truncate">
                {res.table}
              </Typography>
              <Typography variant="caption" className="text-slate-400 lowercase normal-case block mb-10 font-medium">
                {res.pass ? 'Conexão estável com o banco de dados.' : (res.errorMessage || 'Tabela inexistente no schema tickets.')}
              </Typography>
            </div>

            {!res.pass && (
              <button 
                onClick={() => setActiveBalloon(res.table)}
                className="w-full py-5 bg-brand-primary text-brand-secondary rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl shadow-brand-primary/20"
              >
                <Wand2 size={16}/> Balão de Reparo
              </button>
            )}
          </div>
        ))}
      </div>

      {activeBalloon && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
           <div className="bg-[#0A1120] text-white p-12 rounded-[4rem] border border-brand-secondary/40 shadow-2xl max-w-2xl w-full flex flex-col gap-8 animate-in zoom-in-95 duration-300">
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3 text-brand-secondary">
                    <Sparkles size={24}/>
                    <span className="text-[12px] font-black uppercase tracking-[0.2em]">Script de Resgate V12</span>
                 </div>
                 <button onClick={() => setActiveBalloon(null)} className="p-2 hover:bg-white/10 rounded-xl text-slate-400"><X size={24}/></button>
              </div>
              <div className="flex-1 overflow-y-auto max-h-[300px] bg-black/40 p-8 rounded-2xl border border-white/5 font-mono text-[11px] text-blue-300 leading-relaxed custom-scrollbar-dark">
                {REPAIR_SCRIPTS[activeBalloon] || '-- Script em síntese.'}
              </div>
              <div className="space-y-4">
                 <button 
                  onClick={() => { copyToClipboard(REPAIR_SCRIPTS[activeBalloon] || ''); setActiveBalloon(null); }}
                  className="w-full py-5 bg-brand-secondary text-brand-primary rounded-2xl font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-3 shadow-lg"
                 >
                  <Copy size={18}/> Copiar SQL de Reparo
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
