
import React from 'react';
import { Zap, Bell } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';

export const Publication: React.FC = () => {
  return (
    <div className="p-10 space-y-10">
      <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Recortes <span className="text-brand-secondary italic">Digitais</span></Typography>
      <div className="grid grid-cols-1 gap-6">
        {[1, 2].map(i => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex gap-6">
            <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center text-brand-primary shrink-0">
              <Zap size={24}/>
            </div>
            <div className="space-y-2">
              <Typography variant="small" className="font-bold text-brand-primary">Publicação em DJ-RS - 15/11/2024</Typography>
              <Typography variant="caption" className="text-slate-400 normal-case leading-relaxed">
                Vistos. Indefiro o pedido de liminar. Intime-se a parte contrária para...
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
