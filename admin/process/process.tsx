
import React, { useState, useEffect } from 'react';
import { Gavel, Search, Download, ChevronRight, Filter, Plus, Clock, User, ShieldCheck } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';
import { Button } from '../../components/atoms/Button.tsx';
import { ProcessosRouter } from '../../modules/processos/processos-router.ts';
import { ProcessoJuridico } from '../../types.ts';

export const Process: React.FC = () => {
  const [processos, setProcessos] = useState<ProcessoJuridico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProcessosRouter.fetchAll().then(data => {
      setProcessos(data);
      setLoading(false);
    });
  }, []);

  const openProcesso = (id: string) => {
    window.location.hash = `#/processo/${id}`;
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="flex justify-between items-end">
        <div>
          <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Acervo <span className="text-brand-secondary italic">Judicial</span></Typography>
          <Typography variant="body" className="text-slate-400 mt-2">Gestão soberana de processos e timeline sincronizada.</Typography>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="bg-white border-slate-200 h-14 px-8 rounded-2xl shadow-sm uppercase font-black text-[10px] tracking-widest">Relatório Analítico</Button>
          <Button variant="secondary" icon={<Plus size={18}/>} className="h-14 px-10 rounded-2xl shadow-xl shadow-brand-secondary/20">Distribuir Processo</Button>
        </div>
      </header>
      
      <div className="flex items-center justify-between bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16}/>
               <input type="text" placeholder="Pesquisar por CNJ ou Cliente..." className="bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-6 text-xs w-[400px] outline-none focus:ring-4 focus:ring-brand-secondary/5 transition-all" />
            </div>
            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all border border-slate-100"><Filter size={18}/></button>
         </div>
         <div className="flex items-center gap-3">
            <Typography variant="caption" className="text-[10px] font-black uppercase text-slate-300">Total no Ledger:</Typography>
            <Typography variant="small" className="font-black text-brand-primary">{processos.length}</Typography>
         </div>
      </div>

      <div className="grid gap-6">
        {loading ? (
          Array(3).fill(0).map((_, i) => <div key={i} className="h-32 bg-white rounded-[2.5rem] animate-pulse" />)
        ) : processos.map(proc => (
          <div 
            key={proc.id} 
            onClick={() => openProcesso(proc.id)}
            className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-brand-secondary/20 transition-all group cursor-pointer flex flex-col md:flex-row items-center justify-between gap-10"
          >
            <div className="flex items-center gap-8 flex-1">
               <div className="w-16 h-16 bg-brand-primary text-brand-secondary rounded-[2rem] flex items-center justify-center shadow-lg group-hover:rotate-6 transition-all shrink-0">
                  <Gavel size={32} />
               </div>
               <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-3">
                     <Typography variant="caption" className="text-brand-secondary font-black uppercase text-[9px] tracking-widest">{proc.tribunal || 'PJE/TJ'}</Typography>
                     <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
                  </div>
                  <Typography variant="h4" font="serif" className="text-brand-primary text-xl truncate">{proc.titulo}</Typography>
                  <Typography variant="caption" className="text-slate-400 font-mono text-sm tracking-tight">{proc.numero_cnj}</Typography>
               </div>
            </div>

            <div className="flex items-center gap-10">
               <div className="flex flex-col items-end">
                  <Typography variant="caption" className="text-slate-300 font-black uppercase text-[8px] tracking-widest mb-1">Último Movimento</Typography>
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                     <Clock size={12}/> {proc.data_ultima_movimentacao ? new Date(proc.data_ultima_movimentacao).toLocaleDateString() : 'N/A'}
                  </div>
               </div>
               <div className="flex flex-col items-end">
                  <Typography variant="caption" className="text-slate-300 font-black uppercase text-[8px] tracking-widest mb-1">Cliente</Typography>
                  <div className="flex items-center gap-2 text-brand-primary font-black text-xs uppercase">
                     <User size={12} className="text-brand-secondary"/> {proc.autor?.split(' ')[0] || 'Vínculo'}
                  </div>
               </div>
               <button className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-brand-primary group-hover:text-brand-secondary transition-all">
                  <ChevronRight size={24} />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
