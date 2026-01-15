
import React from 'react';
import { TrendingDown, ArrowRight, Landmark, Scale, ChevronRight } from 'lucide-react';
import { Typography } from '../ui/Typography.tsx';
import { Container } from '../ui/Container.tsx';
import { HomeSkeleton } from '../../modules/home/home-skeleton.tsx';

const ICONS = [<Scale size={32}/>, <Landmark size={32}/>, <TrendingDown size={32}/>];

export const ServicesGrid: React.FC<{ onNavigateToSuper: () => void; onNavigateToBancario: () => void }> = ({ onNavigateToSuper, onNavigateToBancario }) => {
  const { services } = HomeSkeleton;

  return (
    <section id="servicos" className="py-32 md:py-48 bg-white relative z-20">
      <Container>
        <div className="mb-24 md:mb-32 text-center md:text-left space-y-4">
          <Typography variant="caption" className="text-[#c5a059] block font-black tracking-[0.4em] uppercase">{services.subtitle}</Typography>
          <Typography variant="h2" font="serif" className="text-[#1a2b4b] text-4xl md:text-7xl leading-none tracking-tight">
            Soluções <span className="text-[#c5a059] italic">Estratégicas</span>
          </Typography>
          <Typography variant="body" className="text-slate-400 max-w-2xl text-sm md:text-xl font-light leading-relaxed">
            {services.description}
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
          {services.items.map((s, idx) => (
            <div 
              key={idx}
              onClick={idx === 0 ? onNavigateToSuper : idx === 1 ? onNavigateToBancario : undefined}
              className="group bg-slate-50 p-12 md:p-16 rounded-[4rem] border border-slate-100 transition-all duration-700 hover:bg-white hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-4 cursor-pointer flex flex-col h-full"
            >
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-12 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${idx === 0 ? 'bg-[#c5a059] text-[#1a2b4b]' : idx === 1 ? 'bg-[#1a2b4b] text-[#c5a059]' : 'bg-slate-900 text-white'}`}>
                {ICONS[idx]}
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="inline-block px-4 py-1.5 bg-[#1a2b4b]/5 rounded-lg w-fit mb-6">
                  <Typography variant="caption" className="text-[#1a2b4b]/40 text-[9px] font-black uppercase tracking-widest">{s.tag}</Typography>
                </div>
                
                <Typography variant="h4" font="serif" className="text-[#1a2b4b] text-3xl md:text-4xl leading-tight group-hover:text-[#c5a059] transition-colors mb-6">
                  {s.title}
                </Typography>
                
                <Typography variant="body" className="text-slate-500 text-base md:text-lg leading-relaxed mb-12 font-light">
                  {s.description}
                </Typography>
                
                <div className="mt-auto pt-12 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-slate-400 group-hover:text-[#c5a059] font-black uppercase text-[10px] tracking-widest transition-all">
                    Saber Mais
                  </span>
                  <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#1a2b4b] group-hover:border-[#1a2b4b] group-hover:text-[#c5a059] transition-all duration-500">
                    <ChevronRight size={24} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
