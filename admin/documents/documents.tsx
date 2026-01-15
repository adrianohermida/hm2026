
import React from 'react';
import { HardDrive, Folder, File } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';

export const Documents: React.FC = () => {
  return (
    <div className="p-10 space-y-10">
      <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Cofre <span className="text-brand-secondary italic">Digital</span></Typography>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {['Contratos', 'Petições', 'Evidências'].map(f => (
          <div key={f} className="bg-white p-8 rounded-3xl border border-slate-100 text-center hover:shadow-lg transition-all cursor-pointer">
            <Folder size={48} className="mx-auto mb-4 text-brand-secondary/40" />
            <Typography variant="caption" className="font-black text-brand-primary">{f}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
