
import React from 'react';
import { CreditCard, Download, CheckCircle, Clock } from 'lucide-react';
import { Typography } from '../../../atoms/Typography.tsx';

export const PortalFinanceiro: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <Typography variant="h3" font="serif" className="text-white text-3xl">Financeiro</Typography>
          <Typography variant="caption" className="text-brand-secondary font-black tracking-widest mt-2 block">Faturas e Controle de Honorários</Typography>
        </div>
      </div>

      <div className="grid gap-6">
        {[
          { id: 'FAT-102', desc: 'Mensalidade Assessoria Jurídica', valor: 'R$ 450,00', status: 'PAGO', vencimento: '10/11/2024' },
          { id: 'FAT-103', desc: 'Mensalidade Assessoria Jurídica', valor: 'R$ 450,00', status: 'PENDENTE', vencimento: '10/12/2024' }
        ].map((item, i) => (
          <div key={i} className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 group">
            <div className="flex items-center gap-6 w-full md:w-auto">
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${item.status === 'PAGO' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                  {item.status === 'PAGO' ? <CheckCircle size={24} /> : <Clock size={24} />}
               </div>
               <div>
                  <Typography variant="small" className="font-bold text-white block mb-1 uppercase text-base">{item.desc}</Typography>
                  <Typography variant="caption" className="text-slate-500">Vencimento: {item.vencimento}</Typography>
               </div>
            </div>
            
            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
               <Typography variant="h4" font="serif" className="text-white text-xl">{item.valor}</Typography>
               {item.status === 'PENDENTE' ? (
                 <button className="bg-brand-secondary text-brand-primary px-6 py-3 rounded-xl font-black uppercase text-[9px] tracking-widest shadow-lg">Pagar Agora</button>
               ) : (
                 <button className="p-4 bg-white/5 rounded-xl text-slate-500 hover:text-brand-secondary transition-all"><Download size={20} /></button>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
