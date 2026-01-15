
import React from 'react';
import { Scale, Info, ExternalLink, Clock } from 'lucide-react';
import { Typography } from '../../../atoms/Typography.tsx';

export const PortalProcessos: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-10 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <Typography variant="h3" font="serif" className="text-brand-primary text-3xl">Meus Processos</Typography>
          <Typography variant="caption" className="text-slate-400 font-black tracking-widest mt-2 block">Sincronizado via DataJud CNJ</Typography>
        </div>
      </div>

      <div className="grid gap-6">
        {[
          { cnj: "0001234-56.2024.8.21.0001", titulo: "Revisional de Juros - Banco X", status: "ATIVO", updated: "há 2 horas" },
          { cnj: "0099887-22.2023.8.21.0001", titulo: "Defesa Superendividamento", status: "CONCLUSO", updated: "há 1 dia" }
        ].map((proc, i) => (
          <div key={i} className="p-8 bg-white border border-slate-200 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 group hover:shadow-lg transition-all hover:border-brand-secondary/30">
            <div className="flex items-center gap-6 w-full md:w-auto">
               <div className="w-14 h-14 bg-brand-accent text-brand-primary rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:bg-brand-primary group-hover:text-brand-secondary transition-colors">
                  <Scale size={24} />
               </div>
               <div>
                  <Typography variant="small" className="font-bold text-brand-primary block mb-1 uppercase text-base">{proc.titulo}</Typography>
                  <Typography variant="caption" className="text-slate-500 font-mono bg-slate-50 px-2 py-1 rounded-md border border-slate-100">{proc.cnj}</Typography>
               </div>
            </div>
            
            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-100 pt-6 md:pt-0">
               <div className="text-right hidden sm:block">
                  <Typography variant="caption" className="text-slate-400 block mb-1">Última Movimentação</Typography>
                  <Typography variant="small" className="text-brand-primary font-bold flex items-center gap-2 justify-end">
                     <Clock size={12} className="text-brand-secondary" /> {proc.updated}
                  </Typography>
               </div>
               <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase ${proc.status === 'ATIVO' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                  {proc.status}
               </span>
               <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-brand-primary hover:bg-white border border-transparent hover:border-slate-200 transition-all shadow-sm">
                  <ExternalLink size={20} />
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-brand-accent/50 border border-brand-secondary/10 rounded-[2.5rem] text-center">
         <Info size={28} className="mx-auto text-brand-secondary mb-3" />
         <Typography variant="body" className="text-sm text-slate-500 font-medium">Novas movimentações aparecem aqui automaticamente após auditoria da equipe técnica.</Typography>
      </div>
    </div>
  );
};
