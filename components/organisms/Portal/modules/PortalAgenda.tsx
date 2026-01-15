
import React from 'react';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Typography } from '../../../atoms/Typography.tsx';

export const PortalAgenda: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <Typography variant="h3" font="serif" className="text-brand-primary text-3xl">Agenda & Prazos</Typography>
          <Typography variant="caption" className="text-slate-400 font-black tracking-widest mt-2 block">Seus Próximos Compromissos</Typography>
        </div>
      </div>

      <div className="grid gap-6">
        {[
          { title: 'Consulta Estratégica Mensal', type: 'VIRTUAL', date: '15/12/2024', time: '14:30', location: 'Google Meet' },
          { title: 'Audiência de Conciliação - Vara Cível', type: 'PRESENCIAL', date: '10/01/2025', time: '09:00', location: 'Fórum Central' }
        ].map((evt, i) => (
          <div key={i} className="p-10 bg-white border border-slate-200 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 group hover:shadow-lg transition-all hover:border-brand-secondary/30">
            <div className="flex items-center gap-8">
               <div className="w-20 h-20 bg-brand-accent text-brand-primary rounded-[2rem] flex flex-col items-center justify-center shadow-inner border border-slate-100 group-hover:bg-brand-primary group-hover:text-brand-secondary transition-colors">
                  <span className="text-2xl font-serif font-black">{evt.date.split('/')[0]}</span>
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-60">DEZ</span>
               </div>
               <div>
                  <Typography variant="small" className="font-bold text-brand-primary block mb-2 uppercase text-lg">{evt.title}</Typography>
                  <div className="flex flex-wrap items-center gap-4">
                     <span className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wide"><Clock size={14} className="text-brand-secondary"/> {evt.time}</span>
                     <span className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wide"><MapPin size={14} className="text-brand-secondary"/> {evt.location}</span>
                  </div>
               </div>
            </div>
            <button className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-primary group-hover:text-brand-secondary transition-all shadow-sm">
               <ChevronRight size={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
