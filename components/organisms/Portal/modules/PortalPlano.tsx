
import React from 'react';
import { Wallet, Scale, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Typography } from '../../../atoms/Typography.tsx';

export const PortalPlano: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <Typography variant="h3" font="serif" className="text-brand-primary text-3xl">Plano de Repactuação</Typography>
        <Typography variant="caption" className="text-slate-400 font-black tracking-widest mt-2 block">Conformidade Lei 14.181/2021</Typography>
      </div>

      <section className="bg-brand-primary p-12 rounded-[4rem] border border-brand-primary shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="relative z-10 grid lg:grid-cols-3 gap-12 text-white">
          <div className="text-center lg:text-left space-y-2">
            <Typography variant="caption" className="text-white/60 block font-bold">Dívida Total Consolidada</Typography>
            <Typography variant="h2" font="serif" className="text-brand-secondary text-4xl">R$ 145.220,00</Typography>
          </div>
          <div className="text-center lg:text-left space-y-2">
            <Typography variant="caption" className="text-white/60 block font-bold">Desconto em Negociação</Typography>
            <Typography variant="h2" font="serif" className="text-emerald-400 text-4xl">- 65%</Typography>
          </div>
          <div className="text-center lg:text-left space-y-2">
            <Typography variant="caption" className="text-white/60 block font-bold">Prazo de Pagamento</Typography>
            <Typography variant="h2" font="serif" className="text-white text-4xl">60 Meses</Typography>
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] space-y-6 shadow-sm">
           <Typography variant="h4" font="serif" className="text-brand-primary">Status da Repactuação</Typography>
           <div className="space-y-4">
              {[
                { label: 'Auditoria de Contratos', done: true },
                { label: 'Cálculo do Mínimo Existencial', done: true },
                { label: 'Audiência de Conciliação', done: false },
                { label: 'Homologação Judicial', done: false }
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4 group">
                   <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${step.done ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 border border-slate-200 text-slate-300'}`}>
                      {step.done ? <CheckCircle2 size={16} /> : <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />}
                   </div>
                   <Typography variant="small" className={`${step.done ? 'text-brand-primary font-bold' : 'text-slate-400'}`}>{step.label}</Typography>
                </div>
              ))}
           </div>
        </div>
        <div className="p-10 bg-amber-50 border border-amber-100 rounded-[3.5rem] flex items-start gap-6">
           <AlertTriangle size={32} className="text-amber-500 shrink-0" />
           <div className="space-y-3">
              <Typography variant="small" className="text-amber-700 font-black uppercase text-xs tracking-widest">Atenção Estratégica</Typography>
              <Typography variant="body" className="text-amber-900/80 text-sm leading-relaxed">
                Seu plano está em fase de aprovação pelos credores. Aguarde a convocação para a audiência presencial ou virtual assistida pelo Dr. Adriano.
              </Typography>
           </div>
        </div>
      </div>
    </div>
  );
};
