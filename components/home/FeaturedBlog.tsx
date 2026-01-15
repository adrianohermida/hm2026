import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Typography } from '../ui/Typography.tsx';
import { Container } from '../ui/Container.tsx';
import { Button } from '../ui/Button.tsx';

export const FeaturedBlog: React.FC<{ onSeeAll: () => void }> = ({ onSeeAll }) => {
  return (
    <section className="py-40 bg-white border-t border-slate-100">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-xl">
            <Typography variant="caption" className="text-brand-secondary mb-4 block font-black uppercase tracking-widest">Conteúdo Jurídico</Typography>
            <Typography variant="h2" font="serif" className="text-brand-primary text-4xl md:text-6xl">
              Conhecimento que <span className="text-brand-secondary italic">liberta</span>.
            </Typography>
          </div>
          <Button variant="ghost" onClick={onSeeAll} className="group h-16 text-xs px-8">
            Ver todo o acervo <ArrowRight size={16} className="ml-3 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[1, 2, 3].map((i) => (
            <article key={i} className="bg-slate-50 rounded-[4rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 group border border-slate-100 flex flex-col cursor-pointer hover:bg-white">
              <div className="aspect-[16/10] overflow-hidden relative">
                {/* Overlay sutil para manter a consistência com o estilo Kernel */}
                <div className="absolute inset-0 bg-brand-primary/20 mix-blend-overlay z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
                <img 
                  src={`https://images.unsplash.com/photo-${1589829545856 + i * 1000}?auto=format&fit=crop&q=80&w=800`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  alt="Direito Digital" 
                />
              </div>
              <div className="p-12 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-8 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Calendar size={14} className="text-brand-secondary"/> Nov 2024</span>
                  <span className="flex items-center gap-2"><User size={14} className="text-brand-secondary"/> Dr. Adriano</span>
                </div>
                <Typography variant="h4" font="serif" className="text-brand-primary mb-8 text-2xl leading-tight group-hover:text-brand-secondary transition-colors">
                  A nova Lei do Superendividamento e a preservação do Mínimo Existencial.
                </Typography>
                <div className="mt-auto pt-8 border-t border-slate-100 flex items-center justify-between text-brand-secondary font-black uppercase text-[10px] tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">
                  Ler Artigo <ArrowRight size={18} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};