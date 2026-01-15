
import React from 'react';
import { FileText, Shield } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';

export const Contract: React.FC = () => {
  return (
    <div className="p-10 space-y-10">
      <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Gerenciador <span className="text-brand-secondary italic">Contratual</span></Typography>
      <div className="bg-brand-accent p-12 rounded-[4rem] text-center border border-slate-200 border-dashed">
         <Shield size={48} className="mx-auto mb-4 text-brand-primary/20" />
         <Typography variant="small" className="text-slate-400">Nenhum contrato pendente de assinatura.</Typography>
      </div>
    </div>
  );
};
