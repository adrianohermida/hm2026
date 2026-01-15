
import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Container } from './Container.tsx';
import { Typography } from './Typography.tsx';
import { Button } from './Button.tsx';
import { ArtigoBlog } from '../types.ts';
import { BLOG_POSTS_DATA } from '../services/supabaseService.ts';

interface BlogModuleProps {
  onSeeAll?: () => void;
  onPostClick?: (post: ArtigoBlog) => void;
}

export const BlogModule: React.FC<BlogModuleProps> = ({ onSeeAll, onPostClick }) => {
  return (
    <section id="blog" className="py-24 bg-brand-accent/30">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <Typography variant="caption" className="text-brand-secondary mb-4 tracking-widest font-black uppercase">Conteúdo Estratégico</Typography>
            <Typography variant="h2" font="serif" className="text-brand-primary">
              Blog Hermida Maia: Conhecimento que <span className="text-brand-secondary italic">liberta</span>.
            </Typography>
          </div>
          <Button 
            variant="ghost" 
            className="group" 
            onClick={onSeeAll}
            icon={<ArrowRight className="group-hover:translate-x-1 transition-transform" />}
          >
            Ver todo o blog
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS_DATA.slice(0, 3).map((post, idx) => (
            <article 
              key={idx} 
              onClick={() => onPostClick?.(post)}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-slate-100 flex flex-col cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={post.imagem} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={post.titulo} />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-white/20">
                  <Typography variant="caption" className="text-brand-primary text-[10px] font-black">{post.categoria}</Typography>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-4 text-slate-400 text-xs font-medium">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.data}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {post.autor}</span>
                </div>
                <Typography variant="h4" font="serif" className="text-brand-primary mb-4 line-clamp-2 group-hover:text-brand-secondary transition-colors">
                  {post.titulo}
                </Typography>
                <Typography variant="small" className="text-slate-500 mb-8 line-clamp-3 leading-relaxed font-normal">
                  {post.resumo}
                </Typography>
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-2 text-brand-secondary font-black uppercase text-[10px] tracking-widest">
                    Ler Artigo <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
