
import React from 'react';
import { Gavel, Search, Download } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';

export const Process: React.FC = () => {
  return (
    <div className="p-10 space-y-8">
      <header className="flex justify-between items-center">
        <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Acervo <span className="text-brand-secondary italic">Judicial</span></Typography>
        <div className="flex gap-4">
          <div className="relative">
            <input type="text" placeholder="CNJ..." className="bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16}/>
          </div>
        </div>
      </header>
      
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Processo</th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Última Mov.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-6 font-bold text-brand-primary">0001234-56.2024.8.21.0001</td>
              <td className="p-6"><span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[8px] font-black uppercase">Ativo</span></td>
              <td className="p-6 text-slate-400 text-xs">Concluso para decisão</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
