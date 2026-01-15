
import React, { useState, useEffect } from 'react';
import { 
  Terminal, X, Database, Cpu, ShieldCheck, RefreshCw, 
  Layers, Zap, History, CheckCircle2, AlertCircle, 
  Fingerprint, FileCode, Shield, Activity, ListChecks
} from 'lucide-react';
import { Typography } from '../atoms/Typography.tsx';
import { ModulesManifest } from '../../modules/modules.manifest.ts';
import { AuditService } from '../../modules/audit-service.ts';

export const LoggerWidget: React.FC<{ activeModuleSlug?: string }> = ({ activeModuleSlug = 'dashboard' }) => {
  const [aberto, setAberto] = useState(false);
  const [aba, setAba] = useState<'estrutura' | 'database' | 'contratos' | 'seguranca'>('estrutura');
  const [diagnostic, setDiagnostic] = useState<any>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (aberto) runAudit();
  }, [aberto, activeModuleSlug]);

  const runAudit = async () => {
    setCarregando(true);
    try {
      const result = await AuditService.runFullDiagnostic(activeModuleSlug);
      setDiagnostic(result);
    } catch (e) {
      console.error("Audit Fail", e);
    } finally {
      setCarregando(false);
    }
  };

  if (!aberto) return (
    <button 
      onClick={() => setAberto(true)}
      className="fixed bottom-10 right-10 w-16 h-16 bg-[#0F172A] text-brand-secondary rounded-2xl shadow-2xl flex items-center justify-center z-[999] border border-white/10 hover:scale-110 transition-transform"
    >
      <Terminal size={24} />
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0F172A]" />
    </button>
  );

  const manifest = ModulesManifest[activeModuleSlug];

  return (
    <div className="fixed bottom-10 right-10 w-[850px] h-[85vh] bg-[#0F172A] rounded-[3rem] shadow-2xl border border-white/10 z-[999] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 backdrop-blur-3xl text-slate-300">
      
      <div className="p-8 bg-black/40 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${diagnostic?.status === 'PASS' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
            <Cpu size={24} className={carregando ? 'animate-spin' : ''} />
          </div>
          <div>
            <Typography variant="small" className="text-white font-black uppercase text-[12px] tracking-widest flex items-center gap-2">
              Kernel Audit: {activeModuleSlug.toUpperCase()}
            </Typography>
            <Typography variant="caption" className="text-brand-secondary text-[9px] uppercase font-bold tracking-tighter">
              Integrity Score: {diagnostic?.healthScore ?? 0}%
            </Typography>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={runAudit} className="p-3 text-white/40 hover:text-white transition-all"><RefreshCw size={20}/></button>
          <button onClick={() => setAberto(false)} className="p-3 text-white/40 hover:text-white transition-all"><X size={20}/></button>
        </div>
      </div>

      <div className="flex p-2 bg-black/20 mx-8 mt-6 rounded-2xl border border-white/5">
        {['estrutura', 'database', 'contratos', 'seguranca'].map(t => (
          <button 
            key={t}
            onClick={() => setAba(t as any)}
            className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${aba === t ? 'bg-brand-secondary text-brand-primary' : 'text-white/20'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-10 custom-scrollbar-dark space-y-8 font-mono">
        {aba === 'estrutura' && (
          <div className="grid grid-cols-2 gap-6 animate-in fade-in">
             <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <Typography variant="caption" className="text-brand-secondary mb-4 block font-black text-[9px]">Manifest Map</Typography>
                <div className="space-y-2 text-[10px]">
                   <div className="flex justify-between border-b border-white/5 pb-2"><span>Schema:</span> <span className="text-emerald-400">{manifest?.database?.schema ?? 'N/A'}</span></div>
                   <div className="flex justify-between pt-2"><span>Path:</span> <span className="text-blue-400">{manifest?.paths?.module ?? 'N/A'}</span></div>
                </div>
             </section>
             <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <Typography variant="caption" className="text-brand-secondary mb-4 block font-black text-[9px]">Structural Health</Typography>
                <div className="space-y-3">
                   {(diagnostic?.structuralChecks ?? []).map((c: any, i: number) => (
                     <div key={i} className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">{c.name}</span>
                        {c.status ? <CheckCircle2 size={14} className="text-emerald-500" /> : <AlertCircle size={14} className="text-rose-500" />}
                     </div>
                   ))}
                </div>
             </section>
          </div>
        )}

        {aba === 'database' && (
          <div className="space-y-4 animate-in slide-in-from-right-10">
             {(diagnostic?.dbDiagnostics ?? []).map((stat: any, i: number) => (
               <div key={i} className={`p-6 rounded-2xl border ${stat.connected ? 'bg-white/5 border-white/10' : 'bg-rose-500/10 border-rose-500/30'}`}>
                  <div className="flex justify-between items-center">
                     <div className="flex items-center gap-4">
                        <Activity size={18} className={stat.connected ? 'text-emerald-400' : 'text-rose-400'} />
                        <Typography variant="small" className="text-white font-bold text-xs">{stat.table}</Typography>
                     </div>
                     {stat.connected ? <CheckCircle2 className="text-emerald-500" size={18}/> : <AlertCircle className="text-rose-500" size={18}/>}
                  </div>
               </div>
             ))}
          </div>
        )}

        {aba === 'contratos' && (
          <div className="bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden animate-in fade-in">
             <table className="w-full text-left">
                <thead className="bg-black/40 text-[9px] font-black uppercase text-white/30 tracking-widest">
                   <tr><th className="p-4">Requirement</th><th className="p-4 text-center">Status</th></tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {(diagnostic?.contractChecks ?? []).map((check: any, i: number) => (
                     <tr key={i} className="text-[11px]">
                        <td className="p-4 font-bold">{check.name}</td>
                        <td className="p-4 text-center">
                           <span className={`px-3 py-1 rounded-full text-[9px] font-black ${check.status ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                              {check.status ? 'PASS' : 'FAIL'}
                           </span>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}
      </div>

      <div className="p-8 bg-black/60 border-t border-white/5 flex items-center justify-between">
         <Typography variant="caption" className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em]">HM-V12-AUDIT-SAFE</Typography>
         <Fingerprint size={16} className="text-emerald-500/40" />
      </div>
    </div>
  );
};
