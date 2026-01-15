
import React from 'react';
import { Headset, Users, Activity } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';

export const BalcaoVirtualAdmin: React.FC = () => {
  return (
    <div className="p-10 space-y-10">
      <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Balcão <span className="text-brand-secondary italic">Live</span></Typography>
      <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl flex flex-col items-center justify-center text-center opacity-40">
         <Headset size={64} className="mb-6" />
         <Typography variant="small">Aguardando Conexões Realtime...</Typography>
      </div>
    </div>
  );
};
