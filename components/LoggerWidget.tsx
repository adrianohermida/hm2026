
import React, { useState, useEffect } from 'react';
import { Terminal, X, Database, Cpu, ShieldCheck, RefreshCw, Layers, Zap, History, CheckCircle2, AlertCircle, Fingerprint, Copy, Check } from 'lucide-react';
import { Typography } from './Typography.tsx';
import { servicoGovernanca, MODULE_TABLE_MAP, SCHEMA_BLUEPRINTS } from '../services/supabaseService.ts';
import { ModuloSistema, RegistroAuditoria } from '../types.ts';

export const LoggerWidget: React.FC<{ activeModuleSlug?: string }> = ({ activeModuleSlug = 'dashboard' }) => {
  const [aberto, setAberto] = useState(false);
  const [aba, setAba] = useState<'contexto' | 'database' | 'blueprint' | 'auditoria'>('contexto');
  const [modulo, setModulo] = useState<ModuloSistema | null>(null);
  const [tableStats, setTableStats] = useState<any[]>([]);
  const [logs, setLogs] = useState<RegistroAuditoria[]>([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (aberto) carregarDados();
  }, [aberto, activeModuleSlug]);

  const carregarDados = async () => {
    setCarregando(true);
    try {
      const modulos = await servicoGovernanca.buscarModulosAtivos();
      const detectado = modulos.find(m => m.slug === activeModuleSlug) || modulos[0];
      setModulo(detectado);
      const tabelas = MODULE_TABLE_MAP[activeModuleSlug] || [];
      const stats = await Promise.all(tabelas.map(t => servicoGovernanca.verificarConectividadeTabela(t)));
      setTableStats(stats);
      if (detectado) setLogs(await servicoGovernanca.buscarLogsAuditoria(detectado.id));
    } catch (e) {}
    setCarregando(false);
  };

  if (!aberto) return (
    <button onClick={() => setAberto(true)} className="fixed bottom-10 right-10 w-16 h-16 bg-brand-primary text-brand-secondary rounded-2xl shadow-2xl flex items-center justify-center z-[999] border border-brand-secondary/40 animate-pulse">
      <Terminal size={24} />
    </button>
  );

  return (
    <div className="fixed bottom-10 right-10 w-[700px] h-[80vh] bg-brand-primary rounded-[3rem] shadow-2xl border border-white/10 z-[999] flex flex-col overflow-hidden backdrop-blur-3xl">
      <div className="p-8 bg-black/40 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-secondary rounded-2xl flex items-center justify-center text-brand-primary shadow-lg"><Cpu size={24} className={carregando ? 'animate-spin' : ''} /></div>
          <Typography variant="small" className="text-white font-black uppercase text-[12px] tracking-widest">Kernel HM-V12: {activeModuleSlug.toUpperCase()}</Typography>
        </div>
        <button onClick={() => setAberto(false)} className="p-3 text-white/40 hover:text-white"><X size={24}/></button>
      </div>
      <div className="flex p-2 bg-black/20 mx-8 mt-6 rounded-2xl border border-white/5">
        <button onClick={() => setAba('contexto')} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest ${aba === 'contexto' ? 'bg-brand-secondary text-brand-primary' : 'text-white/30'}`}>Contexto</button>
        <button onClick={() => setAba('database')} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest ${aba === 'database' ? 'bg-brand-secondary text-brand-primary' : 'text-white/30'}`}>Matriz CRUD</button>
        <button onClick={() => setAba('blueprint')} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest ${aba === 'blueprint' ? 'bg-brand-secondary text-brand-primary' : 'text-white/30'}`}>Blueprint SQL</button>
        <button onClick={() => setAba('auditoria')} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest ${aba === 'auditoria' ? 'bg-brand-secondary text-brand-primary' : 'text-white/30'}`}>Audit Ledger</button>
      </div>
      <div className="flex-1 overflow-y-auto p-10 custom-scrollbar-dark space-y-8 text-white">
        {aba === 'contexto' && <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">{modulo?.descricao}</div>}
        {aba === 'database' && tableStats.map((s, i) => (
          <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10 flex justify-between">
            <span className="font-mono text-xs">{s.tabela}</span>
            <span className={s.status === 'CONECTADO' ? 'text-emerald-500' : 'text-rose-500'}>{s.status}</span>
          </div>
        ))}
        {aba === 'blueprint' && <pre className="bg-black/60 p-8 rounded-2xl text-[10px] text-blue-300 font-mono overflow-x-auto">{SCHEMA_BLUEPRINTS[activeModuleSlug] || '-- Sem Blueprint'}</pre>}
      </div>
    </div>
  );
};
