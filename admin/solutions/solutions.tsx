
import React from 'react';
import { BookOpen, Search } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';

export const CMS_Solutions: React.FC = () => {
  return (
    <div className="p-10 space-y-10">
      <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Base de <span className="text-brand-secondary italic">Soluções</span></Typography>
      <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-200 border-dashed text-center opacity-40">
         <BookOpen size={64} className="mx-auto mb-6" />
         <Typography variant="small">Central de Ajuda V12</Typography>
      </div>
    </div>
  );
};
