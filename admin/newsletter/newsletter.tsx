
import React from 'react';
import { Megaphone, Send } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';

export const CMS_Newsletter: React.FC = () => {
  return (
    <div className="p-10 space-y-10">
      <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Hub de <span className="text-brand-secondary italic">Notícias</span></Typography>
      <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl text-center opacity-30">
         <Megaphone size={64} className="mx-auto mb-6" />
         <Typography variant="small">Campanhas Ativas: 0</Typography>
      </div>
    </div>
  );
};
