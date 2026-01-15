
import React from 'react';
import { Users, Filter, Plus } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';
import { Button } from '../../components/atoms/Button.tsx';

export const CRM: React.FC = () => {
  return (
    <div className="p-10 space-y-10 animate-in slide-in-from-right-10 duration-700">
      <header className="flex justify-between items-end">
        <div>
          <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Pipeline <span className="text-brand-secondary italic">CRM</span></Typography>
          <Typography variant="body" className="text-slate-400">Gestão de oportunidades e conversão.</Typography>
        </div>
        <Button variant="secondary" icon={<Plus size={18}/>}>Novo Lead</Button>
      </header>

      <div className="flex gap-8 overflow-x-auto pb-10 custom-scrollbar h-[60vh]">
        {['Prospecção', 'Qualificado', 'Reunião', 'Contrato'].map(stage => (
          <div key={stage} className="min-w-[320px] bg-slate-100/40 rounded-[2.5rem] p-6 border border-slate-200/50 flex flex-col">
            <Typography variant="caption" className="font-black mb-6 block px-4">{stage}</Typography>
            <div className="flex-1 space-y-4">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <Typography variant="small" className="font-bold">João da Silva</Typography>
                <Typography variant="caption" className="text-slate-400 normal-case">Superendividamento</Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
