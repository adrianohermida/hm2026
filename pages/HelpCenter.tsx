
import React, { useState, useEffect, useCallback } from 'react';
// HM-V12 Fix: Added FileText to lucide-react imports to resolve the error on line 135
import { Search, ChevronRight, BookOpen, Bot, MessageSquare, ArrowLeft, Zap, ShieldCheck, Ticket, Scale, ArrowRight, ThumbsUp, ThumbsDown, Clock, Share2, Printer, FileText } from 'lucide-react';
import { Container } from '../components/atoms/Container.tsx';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';
import { SolutionsRouter } from '../modules/solutions/solutions-router.ts';
import { SolutionsLabels } from '../modules/solutions/solutions-skeleton.tsx';
import { supabase } from '../services/supabaseService.ts';

export const HelpCenter: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  
  // Detalhes do Artigo Selecionado
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [voted, setVoted] = useState(false);

  const loadBase = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuth(!!session);
      
      const [cats, arts] = await Promise.all([
        SolutionsRouter.fetchCategories(!session),
        SolutionsRouter.fetchArticles(undefined, search.length > 2 ? search : undefined)
      ]);
      setCategories(cats);
      setArticles(arts);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [search]);

  useEffect(() => { loadBase(); }, [loadBase]);

  const viewArticle = async (art: any) => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const fullArt = await SolutionsRouter.fetchArticleById(art.id);
      setSelectedArticle(fullArt);
      setVoted(false);
      const related = await SolutionsRouter.fetchRelatedArticles(art.id, art.category_id);
      setRelatedArticles(related);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleVote = async (isHelpful: boolean) => {
    if (voted) return;
    await SolutionsRouter.registerFeedback(selectedArticle.id, isHelpful);
    setVoted(true);
  };

  const triggerChat = () => {
    if ((window as any).triggerHMChat) (window as any).triggerHMChat();
  };

  // --- RENDERS ---

  if (selectedArticle) return (
    <div className="min-h-screen bg-white font-sans animate-in fade-in duration-500">
      <section className="bg-slate-50 border-b border-slate-100 pt-32 pb-16">
        <Container>
          <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-2 text-slate-400 hover:text-brand-primary font-black uppercase text-[10px] tracking-widest mb-12 transition-all group">
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar para Central
          </button>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
             <div className="flex-1 max-w-4xl space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-brand-primary text-brand-secondary rounded-lg font-black uppercase text-[9px] tracking-widest">
                   {selectedArticle.categories?.name}
                </div>
                <Typography variant="h1" font="serif" className="text-brand-primary text-4xl md:text-7xl leading-tight tracking-tight">
                   {selectedArticle.title}
                </Typography>
                <div className="flex items-center gap-6 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                   <span className="flex items-center gap-2"><Clock size={14}/> {new Date(selectedArticle.created_at).toLocaleDateString()}</span>
                   <span className="flex items-center gap-2"><Bot size={14}/> Auditado por IA</span>
                </div>
             </div>
             <div className="flex gap-4">
                <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-brand-primary shadow-sm transition-all"><Share2 size={20}/></button>
                <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-brand-primary shadow-sm transition-all"><Printer size={20}/></button>
             </div>
          </div>
        </Container>
      </section>

      <Container className="py-24 grid grid-cols-1 lg:grid-cols-12 gap-20">
        <article className="lg:col-span-8">
           <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-[1.8]">
              {selectedArticle.content.split('\n').map((para: string, i: number) => (
                <p key={i} className="mb-6">{para}</p>
              ))}
           </div>

           {/* FEEDBACK BOX */}
           <div className="mt-24 p-12 bg-slate-50 rounded-[4rem] border border-slate-100 flex flex-col items-center text-center space-y-8 shadow-inner">
              <Typography variant="h4" font="serif" className="text-brand-primary">Este artigo foi <span className="text-brand-secondary italic">útil</span> para você?</Typography>
              {!voted ? (
                <div className="flex gap-6">
                   <button onClick={() => handleVote(true)} className="flex items-center gap-3 px-10 py-5 bg-white border border-slate-200 rounded-2xl font-black uppercase text-[10px] tracking-widest text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 transition-all shadow-sm">
                      <ThumbsUp size={16}/> Sim, ajudou
                   </button>
                   <button onClick={() => handleVote(false)} className="flex items-center gap-3 px-10 py-5 bg-white border border-slate-200 rounded-2xl font-black uppercase text-[10px] tracking-widest text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all shadow-sm">
                      <ThumbsDown size={16}/> Não muito
                   </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-emerald-600 font-black uppercase text-[10px] tracking-widest animate-in zoom-in duration-500">
                   <ShieldCheck size={20}/> Obrigado pelo seu feedback técnico!
                </div>
              )}
           </div>
        </article>

        <aside className="lg:col-span-4 space-y-12">
           <div className="bg-[#05080F] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform"><Bot size={100}/></div>
              <Typography variant="h4" font="serif" className="text-xl mb-4 relative z-10">Dúvida não resolvida?</Typography>
              <Typography variant="body" className="text-white/40 text-sm mb-8 relative z-10 leading-relaxed">Nossa IA pode processar os detalhes específicos do seu contrato agora mesmo.</Typography>
              <Button variant="secondary" fullWidth onClick={triggerChat} className="h-16 rounded-2xl shadow-xl shadow-brand-secondary/20 font-black">Iniciar Triagem</Button>
           </div>

           <div className="space-y-6">
              <Typography variant="caption" className="text-brand-primary font-black uppercase tracking-[0.3em] block px-4 border-l-4 border-brand-secondary">Artigos Relacionados</Typography>
              <div className="space-y-4">
                 {relatedArticles.map(rel => (
                   <button key={rel.id} onClick={() => viewArticle(rel)} className="w-full text-left p-6 bg-white border border-slate-100 rounded-3xl hover:shadow-xl transition-all group flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-brand-secondary transition-colors">
                        <FileText size={18}/>
                      </div>
                      <Typography variant="small" className="font-bold text-brand-primary block leading-tight pt-1 group-hover:text-brand-secondary">{rel.title}</Typography>
                   </button>
                 ))}
                 {relatedArticles.length === 0 && <div className="p-6 text-slate-400 italic text-xs">Nenhum artigo adicional nesta coleção.</div>}
              </div>
           </div>
        </aside>
      </Container>
      
      <footer className="py-20 border-t border-slate-100 text-center opacity-30">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">Hermida Maia Digital • V13.11</span>
      </footer>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-brand-secondary/30 font-sans">
      {/* HERO SECTION */}
      <section className="bg-brand-primary pt-40 pb-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-secondary/5 blur-[150px] rounded-full -mr-32 -mt-32" />
        <Container className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl px-6 py-2 rounded-full border border-white/10 mb-8">
             <ShieldCheck size={14} className="text-brand-secondary" />
             <Typography variant="caption" className="text-brand-secondary font-black uppercase tracking-widest text-[9px]">Hermida Maia Help Center</Typography>
          </div>
          <Typography variant="h1" font="serif" className="mb-12 text-5xl md:text-8xl leading-[0.9] tracking-tighter">
            Como podemos <span className="text-brand-secondary italic">ajudar hoje?</span>
          </Typography>
          
          <div className="relative group max-w-2xl mx-auto mb-12">
            <input 
              type="text" 
              placeholder={SolutionsLabels.search.placeholder}
              className="w-full bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] p-8 pl-16 text-white text-xl outline-none focus:ring-8 focus:ring-brand-secondary/10 transition-all shadow-2xl placeholder:text-white/30 font-medium"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-secondary" size={32} />
          </div>
        </Container>
      </section>

      <Container className="py-32">
        {search.length > 2 ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5">
             <div className="flex items-center gap-6 border-b border-slate-200 pb-10">
                <div className="w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center text-brand-primary shadow-sm"><Search size={24}/></div>
                <div>
                   <Typography variant="h3" font="serif" className="text-brand-primary">Resultados para: <span className="text-brand-secondary italic">"{search}"</span></Typography>
                   <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1 block">{articles.length} Artigos Localizados</span>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {articles.map(art => (
                   <div key={art.id} onClick={() => viewArticle(art)} className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group flex flex-col justify-between">
                      <div>
                         <Typography variant="caption" className="text-brand-secondary font-black uppercase text-[9px] mb-4 block tracking-widest">{art.categories?.name}</Typography>
                         <Typography variant="h4" font="serif" className="text-brand-primary mb-6 text-3xl leading-tight group-hover:text-brand-secondary transition-colors">{art.title}</Typography>
                      </div>
                      <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                         <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Ler Orientação</span>
                         <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:text-brand-secondary transition-all">
                            <ArrowRight size={20}/>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        ) : (
          <div className="space-y-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-in fade-in duration-1000">
               {categories.map(cat => (
                  <div key={cat.id} className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col items-center text-center">
                     <div className="w-20 h-20 bg-brand-accent rounded-[2.5rem] flex items-center justify-center text-brand-primary mb-8 shadow-inner group-hover:bg-brand-primary group-hover:text-brand-secondary transition-all">
                        <BookOpen size={36} />
                     </div>
                     <Typography variant="h4" font="serif" className="text-brand-primary mb-4 text-2xl uppercase tracking-tight">{cat.name}</Typography>
                     <Typography variant="caption" className="text-slate-400 normal-case mb-12 leading-relaxed font-medium text-sm">
                        {cat.description || "Coleção estratégica de orientações jurídicas."}
                     </Typography>
                     <button className="mt-auto px-10 py-5 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all shadow-sm">
                        Ver Coleção
                     </button>
                  </div>
               ))}
            </div>

            {/* QUICK ACTIONS BAR */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="bg-brand-primary text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Bot size={120}/></div>
                  <Typography variant="h4" font="serif" className="text-2xl mb-4 relative z-10">Chat Neural</Typography>
                  <Typography variant="body" className="text-white/40 text-sm mb-10 relative z-10 leading-relaxed">Triagem imediata com nossa IA especializada em defesa do consumidor.</Typography>
                  <Button variant="secondary" onClick={triggerChat} className="h-14 px-8 rounded-xl shadow-xl shadow-brand-secondary/20">Iniciar Diálogo</Button>
               </div>
               <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl group">
                  <div className="w-16 h-16 bg-brand-accent rounded-3xl flex items-center justify-center text-brand-primary mb-8 group-hover:bg-brand-primary group-hover:text-brand-secondary transition-all">
                     <Ticket size={32}/>
                  </div>
                  <Typography variant="h4" font="serif" className="text-2xl text-brand-primary mb-4">Novo Protocolo</Typography>
                  <Typography variant="body" className="text-slate-400 text-sm mb-10 leading-relaxed">Formalize sua demanda para análise estratégica da equipe.</Typography>
                  <Button variant="outline" onClick={() => onNavigate('contato')} className="h-14 px-8 rounded-xl border-slate-200">Gerar Ticket</Button>
               </div>
               <div className="bg-brand-secondary text-brand-primary p-12 rounded-[4rem] shadow-xl group">
                  <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mb-8">
                     <Scale size={32}/>
                  </div>
                  <Typography variant="h4" font="serif" className="text-2xl mb-4">Balcão Virtual</Typography>
                  <Typography variant="body" className="text-brand-primary/60 text-sm mb-10 leading-relaxed">Acesso direto ao núcleo de orquestração de atendimento.</Typography>
                  <Button variant="primary" onClick={() => onNavigate('balcao-virtual')} className="h-14 px-8 rounded-xl bg-brand-primary text-brand-secondary border-none">Acessar Balcão</Button>
               </div>
            </div>
          </div>
        )}
      </Container>

      {/* FOOTER AUDIT */}
      <footer className="py-20 bg-white border-t border-slate-100">
         <Container className="text-center space-y-6">
            <div className="flex items-center justify-center gap-6 opacity-20">
               <ShieldCheck size={24} className="text-brand-primary" />
               <div className="h-[1px] w-20 bg-slate-200" />
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">Protocolo V13.11</span>
            </div>
            <Typography variant="caption" className="text-slate-400 normal-case italic font-medium leading-relaxed max-w-lg mx-auto block">
               "A clareza jurídica é a base da dignidade financeira."
            </Typography>
         </Container>
      </footer>
    </div>
  );
};
