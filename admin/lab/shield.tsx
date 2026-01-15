
import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';

export const LabShield: React.FC = () => {
  return (
    <div className="p-10 bg-[#0b1321] text-white rounded-[3rem] shadow-2xl">
      <div className="flex items-center gap-6 mb-8">
        <ShieldCheck size={48} className="text-brand-secondary" />
        <Typography variant="h4" font="serif">Lab Shield Active</Typography>
      </div>
      <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
         <Typography variant="caption" className="text-emerald-400">STATUS: NOMINAL</Typography>
      </div>
    </div>
  );
};
