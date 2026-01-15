
import React, { useEffect, useState } from 'react';
import { Calendar, Clock, User, Share2, ArrowLeft, Bookmark, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { Container } from '../atoms/Container.tsx';
import { Typography } from '../atoms/Typography.tsx';
import { Button } from '../atoms/Button.tsx';
import { BlogPost } from '../../types.ts';

interface BlogPostPageProps {
  post: BlogPost;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // SEO Dinâmico
    // HM-V12 Fix: Updated title to titulo
    document.title = `${post.titulo} | Blog Hermida Maia`;
    const metaDescription = document.querySelector('meta[name="description"]');
    // HM-V12 Fix: Updated excerpt to resumo
    if (metaDescription) metaDescription.setAttribute('content', post.resumo);

    // Barra de Progresso Real
    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
      document.title = 'Hermida Maia | Advocacia Digital';
    };
  }, [post]);

  return (
    <div className="pt-24 bg-white min-h-screen">
      {/* Top Navigation & Progress Bar Real */}
      <div className="fixed top-[72px] left-0 w-full h-1 bg-slate-100 z-50">
        <div 
          className="h-full bg-brand-secondary transition-all duration-75 ease-out shadow-[0_0_8px_rgba(197,160,89,0.8)]" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article className="pb-24">
        {/* Post Header */}
        <header className="py-20 bg-slate-50 relative overflow-hidden">
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto">
              <button 
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-slate-400 hover:text-brand-primary transition-colors mb-12 group text-sm font-bold uppercase tracking-wider"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Blog
              </button>

              <div className="flex items-center gap-3 mb-8">
                {/* HM-V12 Fix: Updated category to categoria */}
                <span className="bg-brand-primary text-brand-secondary text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  {post.categoria}
                </span>
                {/* HM-V12 Fix: Updated readTime to tempo_leitura */}
                <span className="text-slate-400 text-xs font-medium flex items-center gap-1.5">
                  <Clock size={14} /> {post.tempo_leitura} de leitura
                </span>
              </div>

              {/* HM-V12 Fix: Updated title to titulo */}
              <Typography variant="h1" font="serif" className="text-brand-primary mb-10 leading-tight">
                {post.titulo}
              </Typography>

              <div className="flex items-center justify-between py-8 border-y border-slate-200/60">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-primary flex items-center justify-center text-brand-secondary shadow-lg border border-brand-secondary/30">
                    <User size={24} />
                  </div>
                  <div>
                    {/* HM-V12 Fix: Updated author to autor and date to data */}
                    <Typography variant="small" className="text-brand-primary font-bold">{post.autor}</Typography>
                    <Typography variant="caption" className="text-slate-400 text-[10px] font-medium tracking-tight normal-case">
                      Publicado em {post.data} • Especialista em Direito Bancário
                    </Typography>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 text-slate-400 hover:text-brand-secondary hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100">
                    <Share2 size={20} />
                  </button>
                  <button className="p-3 text-slate-400 hover:text-brand-secondary hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100">
                    <Bookmark size={20} />
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </header>

        {/* Featured Image */}
        <Container className="max-w-5xl -mt-16 relative z-20">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-slate-100 aspect-[21/9]">
            {/* HM-V12 Fix: Updated image to imagem and title to titulo */}
            <img src={post.imagem} className="w-full h-full object-cover" alt={post.titulo} />
          </div>
        </Container>

        {/* Content Section */}
        <Container className="mt-20">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                {/* HM-V12 Fix: Updated excerpt to resumo */}
                <Typography variant="body" className="text-xl text-brand-primary font-medium mb-12 leading-relaxed">
                  {post.resumo}
                </Typography>
                
                <div className="space-y-8">
                  {/* HM-V12 Fix: Updated content to conteudo */}
                  <Typography variant="body">
                    {post.conteudo}
                  </Typography>
                  
                  <Typography variant="h3" font="serif" className="text-brand-primary mt-12 pt-12 border-t border-slate-50">
                    O impacto na vida real
                  </Typography>
                  
                  <Typography variant="body">
                    Diferente de outros processos judiciais que podem levar anos para apresentar um resultado palpável, a aplicação da Lei do Superendividamento foca na <b>repactuação imediata</b>. O objetivo é criar um plano de pagamento que dure no máximo 5 anos, preservando o que chamamos de mínimo existencial.
                  </Typography>

                  <div className="bg-brand-accent p-10 rounded-[2.5rem] border-l-8 border-brand-secondary my-12 italic shadow-inner">
                    <Typography variant="body" className="text-brand-primary font-medium mb-0">
                      "O direito à dignidade financeira não é uma concessão dos bancos, é um direito fundamental garantido pela Constituição e agora reforçado por lei específica."
                    </Typography>
                  </div>

                  <Typography variant="h4" font="serif" className="text-brand-primary">
                    Como proceder agora?
                  </Typography>

                  <Typography variant="body">
                    O primeiro passo é always uma auditoria completa de todos os seus contratos. Muitas vezes, o que parece ser apenas uma dívida impagável é, na verdade, um amontoado de juros capitalizados ilegalmente e taxas de serviço nunca solicitadas.
                  </Typography>

                  <div className="flex flex-wrap gap-2 mt-16 pt-12 border-t border-slate-50">
                    {/* HM-V12 Fix: Updated tags to etiquetas */}
                    {post.etiquetas.map(tag => (
                      <span key={tag} className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-xl border border-slate-100">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author Bio Card */}
              <div className="mt-24 p-12 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <div className="w-24 h-24 rounded-[2rem] overflow-hidden flex-shrink-0 shadow-lg border-4 border-white">
                  <img src="https://heyboss.heeyo.ai/user-assets/541c30f0c__TLM9795_hxylPUVt.jpg" className="w-full h-full object-cover" alt="Dr. Adriano" />
                </div>
                <div>
                  {/* HM-V12 Fix: Updated author to autor */}
                  <Typography variant="small" className="text-brand-primary font-bold text-lg mb-2">Sobre {post.autor}</Typography>
                  <Typography variant="small" className="text-slate-500 mb-6 leading-relaxed font-normal">
                    Advogado especialista em Direito Bancário e Superendividamento, com foco em defesas estratégicas para consumidores e proteção ao patrimônio familiar através de soluções jurídicas inovadoras.
                  </Typography>
                  <div className="flex justify-center md:justify-start">
                    <Button variant="ghost" size="sm" className="p-0 text-brand-secondary flex items-center gap-2">
                      Conectar no LinkedIn <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Widgets */}
            <aside className="lg:w-[380px] space-y-10">
              <div className="bg-brand-primary p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/10 rounded-full blur-2xl -mr-16 -mt-16" />
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-brand-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-secondary/20">
                    <MessageSquare size={28} className="text-white" />
                  </div>
                  <Typography variant="h4" font="serif" className="mb-4">Dúvidas sobre este assunto?</Typography>
                  <Typography variant="small" className="text-white/60 mb-8 block leading-relaxed font-normal">
                    Nossa IA está treinada com base na legislação atualizada e pode responder suas dúvidas em segundos.
                  </Typography>
                  <Button variant="secondary" fullWidth className="py-4 shadow-brand-secondary/10">Falar com Assistente</Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </article>
    </div>
  );
};
