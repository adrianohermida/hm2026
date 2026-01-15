
import React from 'react';
import { Scale, Info, ExternalLink, Clock } from 'lucide-react';
import { Typography } from '../../../atoms/Typography.tsx';

export const PortalProcessos: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-10 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <Typography variant="h3" font="serif" className="text-white text-3xl">Meus Processos</Typography>
          <Typography variant="caption" className="text-brand-secondary font-black tracking-widest mt-2 block">Sincronizado via DataJud CNJ</Typography>
        </div>
      </div>

      <div className="grid gap-6">
        {[
          { cnj: "0001234-56.2024.8.21.0001", titulo: "Revisional de Juros - Banco X", status: "ATIVO", updated: "há 2 horas" },
          { cnj: "0099887-22.2023.8.21.0001", titulo: "Defesa Superendividamento", status: "CONCLUSO", updated: "há 1 dia" }
        ].map((proc, i) => (
          <div key={i} className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-white/[0.05] transition-all">
            <div className="flex items-center gap-6 w-full md:w-auto">
               <div className="w-14 h-14 bg-brand-primary text-brand-secondary rounded-2xl flex items-center justify-center shadow-lg border border-brand-secondary/20">
                  <Scale size={24} />
               </div>
               <div>
                  <Typography variant="small" className="font-bold text-white block mb-1 uppercase text-base">{proc.titulo}</Typography>
                  <Typography variant="caption" className="text-slate-500 font-mono">{proc.cnj}</Typography>
               </div>
            </div>
            
            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-6 md:pt-0">
               <div className="text-right hidden sm:block">
                  <Typography variant="caption" className="text-slate-500 block mb-1">Última Movimentação</Typography>
                  <Typography variant="small" className="text-white/60 font-bold flex items-center gap-2 justify-end">
                     <Clock size={12} /> {proc.updated}
                  </Typography>
               </div>
               <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase ${proc.status === 'ATIVO' ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/20' : 'bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/20'}`}>
                  {proc.status}
               </span>
               <button className="p-4 bg-white/5 rounded-2xl text-slate-500 hover:text-brand-secondary transition-all hover:bg-white/10">
                  <ExternalLink size={20} />
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-10 bg-brand-secondary/5 border border-brand-secondary/10 rounded-[3rem] text-center opacity-40">
         <Info size={32} className="mx-auto text-brand-secondary mb-4" />
         <Typography variant="body" className="text-sm">Novas movimentações aparecem aqui automaticamente após auditoria da equipe técnica.</Typography>
      </div>
    </div>
  );
};
