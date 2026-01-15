import React, { useState } from 'react';
import { ArrowLeft, Play, Terminal, Wifi } from 'lucide-react';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';
import { DataJudRouter } from '../modules/datajud/datajud-router.ts';

export const BlankEdgeTest: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const log = (msg: string) => setLogs(p => [...p, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  const runTest = async () => {
    setLoading(true);
    setLogs([]);
    log("Iniciando teste de Edge Function...");
    
    try {
      // Teste com um número de processo fixo para validação de conectividade
      const cnjTeste = "0000832-35.2018.4.01.3202"; 
      log(`Target: ${cnjTeste}`);
      log("Enviando request OPTIONS/POST...");
      
      const result = await DataJudRouter.buscarOnline(cnjTeste, 'TRF1');
      
      log("Resposta recebida com sucesso!");
      log(`Hits: ${result?.hits?.total?.value || 0}`);
      log(JSON.stringify(result, null, 2));
      
    } catch (e: any) {
      log(`ERRO: ${e.message}`);
      if (e.isCors) log("⚠️ FALHA DE CORS DETECTADA. Verifique os headers da Edge Function.");
      console.error(e);
    } finally {
      setLoading(false);
      log("Teste finalizado.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col p-8 font-mono">
      <header className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-brand-primary transition-colors font-bold uppercase text-xs">
          <ArrowLeft size={16} /> Voltar
        </button>
        <Typography variant="h4" className="text-brand-primary">Ambiente de Teste Estéril</Typography>
      </header>

      <main className="max-w-4xl mx-auto w-full space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-6">
           <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto text-brand-secondary">
              <Wifi size={32} />
           </div>
           <div>
              <Typography variant="h3" className="text-brand-primary mb-2">Teste de Conectividade Edge</Typography>
              <Typography variant="body" className="text-slate-400 text-sm">
                Validação isolada do preflight CORS e resposta JSON da função `datajud_trf1`.
              </Typography>
           </div>
           <Button variant="secondary" onClick={runTest} disabled={loading} icon={<Play size={18}/>}>
              {loading ? 'Executando...' : 'Disparar Edge Function'}
           </Button>
        </div>

        <div className="bg-[#0b1321] p-6 rounded-3xl border border-white/10 min-h-[300px] flex flex-col shadow-2xl">
           <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-4 text-emerald-400">
              <Terminal size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Console Output</span>
           </div>
           <div className="flex-1 overflow-y-auto font-mono text-[11px] text-slate-300 space-y-2 max-h-[400px]">
              {logs.length === 0 && <span className="opacity-30 italic">Aguardando execução...</span>}
              {logs.map((l, i) => (
                <div key={i} className="break-all whitespace-pre-wrap border-b border-white/5 pb-1 mb-1 last:border-0">
                  {l}
                </div>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
};