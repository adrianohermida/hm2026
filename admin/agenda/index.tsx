
import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';

export const AgendaModule: React.FC = () => {
  return (
    <div className="p-10 space-y-10">
      <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Agenda <span className="text-brand-secondary italic">Técnica</span></Typography>
      <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl p-10 min-h-[400px] flex items-center justify-center opacity-30">
        <CalendarIcon size={80} className="text-slate-200" />
      </div>
    </div>
  );
};
