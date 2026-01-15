
import React from 'react';
import { Settings, ShieldCheck, Database, Globe } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';

export const Config: React.FC = () => {
  return (
    <div className="p-10 space-y-12 max-w-4xl">
      <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Kernel <span className="text-brand-secondary italic">Setup</span></Typography>
      
      <div className="space-y-6">
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
           <div className="flex items-center gap-4">
              <ShieldCheck className="text-emerald-500" size={32}/>
              <div>
                 <Typography variant="small" className="font-bold">Segurança AES-256</Typography>
                 <Typography variant="caption" className="text-slate-400">Ativo e Auditado.</Typography>
              </div>
           </div>
           <span className="text-[10px] font-black uppercase text-emerald-500">Status: OK</span>
        </section>

        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between opacity-50">
           <div className="flex items-center gap-4">
              <Globe size={32}/>
              <div>
                 <Typography variant="small" className="font-bold">Domínio Personalizado</Typography>
                 <Typography variant="caption" className="text-slate-400">hermidamaia.adv.br</Typography>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};
