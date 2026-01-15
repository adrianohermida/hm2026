
import React from 'react';
import { Beaker, Sparkles } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';

export const LabPage: React.FC = () => {
  return (
    <div className="p-10 space-y-10">
      <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Laboratório <span className="text-brand-secondary italic">Digital</span></Typography>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-10 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center opacity-50 hover:opacity-100 transition-all cursor-pointer group">
           <Sparkles size={48} className="text-brand-secondary mb-4 group-hover:scale-110 transition-transform" />
           <Typography variant="small" className="font-bold">Novo Experimento</Typography>
        </div>
      </div>
    </div>
  );
};
