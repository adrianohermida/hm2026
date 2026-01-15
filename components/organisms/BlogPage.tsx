import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowRight, Calendar, Clock, User, ChevronRight, Loader2 } from 'lucide-react';
import { Container } from '../atoms/Container.tsx';
import { Typography } from '../atoms/Typography.tsx';
import { Button } from '../atoms/Button.tsx';
import { BlogPost } from '../../types.ts';
import { fetchBlogPosts } from '../../services/supabaseService.ts';

const CATEGORIES = ["Todos", "Direito Bancário", "Superendividamento", "Consumidor", "Empresarial", "Digital"];

export const BlogPage: React.FC<{ onPostClick: (post: BlogPost) => void }> = ({ onPostClick }) => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchBlogPosts();
      setPosts(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const filteredPosts = posts.filter(post => {
    if (!post) return false;
    const matchesCategory = activeCategory === "Todos" || post.categoria === activeCategory;
    
    // FIX: Fallback seguro para strings nulas antes de chamar toLowerCase().includes()
    const titulo = (post.titulo || "").toLowerCase();
    const resumo = (post.resumo || "").toLowerCase();
    const busca = (searchQuery || "").toLowerCase();

    const matchesSearch = titulo.includes(busca) || resumo.includes(busca);
    return matchesCategory && matchesSearch;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="w-12 h-12 text-brand-secondary animate-spin" />
    </div>
  );

  const featuredPost = posts[0];

  return (
    <div className="pt-24 bg-white min-h-screen">
      <section className="bg-brand-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-10" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <Typography variant="caption" className="text-brand-secondary mb-4">Central de Conhecimento</Typography>
            <Typography variant="h1" font="serif" className="mb-6">
              Blog Hermida Maia: Educação <span className="text-brand-secondary italic">Jurídica Estratégica</span>.
            </Typography>
            <div className="relative max-w-xl">
              <input 
                type="text" 
                placeholder="O que você está procurando?" 
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-white/40 focus:ring-2 focus:ring-brand-secondary/50 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-secondary" size={24} />
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Section */}
      {!searchQuery && activeCategory === "Todos" && featuredPost && (
        <section className="py-20">
          <Container>
            <div 
              onClick={() => onPostClick(featuredPost)}
              className="group cursor-pointer bg-brand-accent rounded-[3rem] overflow-hidden flex flex-col lg:flex-row border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="lg:w-3/5 overflow-hidden">
                <img src={featuredPost.imagem} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={featuredPost.titulo} />
              </div>
              <div className="lg:w-2/5 p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-brand-primary text-brand-secondary text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">Destaque</span>
                  <span className="text-slate-400 text-xs font-medium flex items-center gap-1.5"><Clock size={14} /> {featuredPost.tempo_leitura}</span>
                </div>
                <Typography variant="h2" font="serif" className="text-brand-primary mb-6 leading-tight group-hover:text-brand-secondary transition-colors">{featuredPost.titulo}</Typography>
                <Typography variant="body" className="text-slate-500 mb-10 line-clamp-3">{featuredPost.resumo}</Typography>
                <Button variant="ghost" className="p-0 text-brand-secondary font-bold" icon={<ChevronRight size={20} />}>Ler Agora</Button>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-20">
        <Container>
          <div className="flex items-center gap-4 mb-12 overflow-x-auto no-scrollbar pb-4">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border ${activeCategory === cat ? 'bg-brand-primary text-brand-secondary border-brand-primary' : 'text-slate-500 border-slate-200'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post) => (
              <article key={post.id} onClick={() => onPostClick(post)} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-slate-100 flex flex-col cursor-pointer">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={post.imagem} className="w-full h-full object-cover group-hover:scale-110" alt={post.titulo} />
                </div>
                <div className="p-10 flex flex-col flex-1">
                  <Typography variant="h4" font="serif" className="text-brand-primary mb-5 line-clamp-2">{post.titulo}</Typography>
                  <Typography variant="small" className="text-slate-500 mb-8 line-clamp-3 leading-relaxed">{post.resumo}</Typography>
                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between text-brand-secondary font-bold">
                    <span>Ler Artigo</span> <ArrowRight size={20} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};