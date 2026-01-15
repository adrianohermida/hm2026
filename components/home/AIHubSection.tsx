import React from 'react';
import { Search, MapPin, ArrowRight, BookOpen } from 'lucide-react';
import { Typography } from '../ui/Typography.tsx';
import { Container } from '../ui/Container.tsx';

export const AIHubSection: React.FC = () => {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden border-y border-slate-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-10">
            <div className="space-y-4">
              <Typography variant="caption" className="text-brand-secondary">Utilidade Pública</Typography>
              <Typography variant="h2" font="serif" className="text-brand-primary">Onde <span className="text-brand-secondary italic">Conciliar?</span></Typography>
              <Typography variant="body" className="text-slate-500 max-w-lg">
                Localize unidades de defesa do consumidor e canais de conciliação oficiais em todo o Brasil.
              </Typography>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
               <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Sua cidade ou estado..."
                    className="w-full bg-slate-50 border-none rounded-2xl p-6 pl-14 text-brand-primary focus:ring-4 focus:ring-brand-secondary/10 outline-none transition-all"
                  />
                  <Search size={24} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-secondary" />
               </div>
            </div>
          </div>

          <div className="bg-brand-primary p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-[100px] -mr-32 -mt-32 transition-all group-hover:scale-110" />
            <div className="relative z-10">
               <BookOpen size={48} className="text-brand-secondary mb-8" />
               <Typography variant="h3" font="serif" className="mb-6">Guia Jus Postulandi</Typography>
               <Typography variant="body" className="text-white/50 mb-10 leading-relaxed">
                  Aprenda a acessar a justiça sem advogado para causas de baixa complexidade. Orientação gratuita e estratégica.
               </Typography>
               <button className="flex items-center gap-4 bg-brand-secondary text-brand-primary px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all">
                  Baixar Guia <ArrowRight size={18} />
               </button>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};