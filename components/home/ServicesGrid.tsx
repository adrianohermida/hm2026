
import React from 'react';
import { TrendingDown, ArrowRight, Landmark, Scale, ChevronRight } from 'lucide-react';
import { Typography } from '../ui/Typography.tsx';
import { Container } from '../ui/Container.tsx';
import { HomeSkeleton } from '../../modules/home/home-skeleton.tsx';

const ICONS = [<Scale size={32}/>, <Landmark size={32}/>, <TrendingDown size={32}/>];

export const ServicesGrid: React.FC<{ onNavigateToSuper: () => void; onNavigateToBancario: () => void }> = ({ onNavigateToSuper, onNavigateToBancario }) => {
  const { services } = HomeSkeleton;

  return (
    <section id="servicos" className="py-24 md:py-32 lg:py-48 bg-white relative z-20 overflow-hidden">
      <Container>
        <div className="mb-16 md:mb-24 lg:mb-32 text-center md:text-left space-y-6">
          <Typography variant="caption" className="text-[#c5a059] block font-black tracking-[0.4em] uppercase">{services.subtitle}</Typography>
          <Typography variant="h2" font="serif" className="text-[#1a2b4b] text-4xl sm:text-5xl md:text-7xl leading-[1.1] tracking-tight">
            Soluções <span className="text-[#c5a059] italic">Estratégicas</span>
          </Typography>
          <Typography variant="body" className="text-slate-400 max-w-2xl text-base sm:text-lg md:text-xl font-light leading-relaxed">
            {services.description}
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {services.items.map((s, idx) => (
            <div 
              key={idx}
              onClick={idx === 0 ? onNavigateToSuper : idx === 1 ? onNavigateToBancario : undefined}
              className="group bg-slate-50 p-8 sm:p-10 md:p-12 lg:p-16 rounded-[3rem] md:rounded-[4rem] border border-slate-100 transition-all duration-700 hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-4 cursor-pointer flex flex-col h-full overflow-hidden"
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-8 md:mb-12 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${idx === 0 ? 'bg-[#c5a059] text-[#1a2b4b]' : idx === 1 ? 'bg-[#1a2b4b] text-[#c5a059]' : 'bg-[#132038] text-white'}`}>
                {ICONS[idx]}
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="inline-block px-4 py-1.5 bg-[#1a2b4b]/5 rounded-lg w-fit mb-6">
                  <Typography variant="caption" className="text-[#1a2b4b]/40 text-[8px] sm:text-[9px] font-black uppercase tracking-widest">{s.tag}</Typography>
                </div>
                
                {/* HM-V12 UX FIX: Otimização de legibilidade para palavras longas. 
                    Reduzido levemente o tamanho base no mobile para evitar quebra feia. */}
                <Typography variant="h3" font="serif" className="text-[#1a2b4b] text-2xl sm:text-3xl lg:text-4xl leading-tight group-hover:text-[#c5a059] transition-colors mb-6 break-words tracking-tight overflow-hidden">
                  {s.title}
                </Typography>
                
                <Typography variant="body" className="text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed mb-10 font-light">
                  {s.description}
                </Typography>
                
                <div className="mt-auto pt-10 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-slate-400 group-hover:text-[#c5a059] font-black uppercase text-[10px] tracking-widest transition-all">
                    Saber Mais
                  </span>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#1a2b4b] group-hover:border-[#1a2b4b] group-hover:text-[#c5a059] transition-all duration-500">
                    <ChevronRight size={22} />
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
