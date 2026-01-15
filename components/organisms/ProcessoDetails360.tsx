
import React, { useState, useEffect } from 'react';
import { 
  Scale, Clock, Calendar, CheckSquare, FileText, ArrowLeft, Bot, Zap, 
  ExternalLink, Loader2, User, MapPin, Download, Plus, MessageSquare, 
  CreditCard, X, Send, CheckCircle2, ShieldCheck, TrendingUp, Landmark, Info
} from 'lucide-react';
import { Typography } from '../atoms/Typography.tsx';
import { Button } from '../atoms/Button.tsx';
import { ProcessosRouter } from '../../modules/processos/processos-router.ts';

interface Props {
  id: string;
  userRole: 'admin' | 'cliente';
  onBack: () => void;
}

export const ProcessoDetails360: React.FC<Props> = ({ id, userRole, onBack }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('timeline');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const isAdmin = userRole === 'admin';

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    setLoading(true);
    const result = await ProcessosRouter.getProcesso360(id);
    setData(result);
    setLoading(false);
  };

  const handleAiExegese = async () => {
    setAnalyzing(true);
    // HM-V12: Mock de chamada para exegese jurídica via Gemini
    setTimeout(() => {
      setAiAnalysis("Após análise do Ledger Processual, identificamos que o caso encontra-se em fase crítica de instrução. Recomendamos priorizar a juntada dos comprovantes de renda para sustentar a tese de Mínimo Existencial.");
      setAnalyzing(false);
    }, 1500);
  };

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center opacity-40">
      <RefreshCw size={48} className="animate-spin text-brand-primary mb-4" />
      <Typography variant="caption" className="font-black uppercase tracking-widest">Sincronizando Ledger Jurídico...</Typography>
    </div>
  );

  if (!data) return <div className="p-20 text-center opacity-20">Falha ao localizar registro processual.</div>;

  const { processo, timeline, documentos, agenda } = data;

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* HEADER DE AÇÃO */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <button onClick={onBack} className="flex items-center gap-3 text-slate-400 hover:text-brand-primary transition-all text-[10px] font-black uppercase tracking-widest group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1" /> Voltar ao Acervo
        </button>
        <div className="flex gap-4 w-full md:w-auto">
           {isAdmin ? (
             <>
               <Button variant="outline" onClick={handleAiExegese} disabled={analyzing} className="bg-white text-brand-primary h-14 px-8 rounded-2xl">
                 {analyzing ? <RefreshCw className="animate-spin" size={16}/> : <Bot size={18}/>} Exegese IA
               </Button>
               <Button variant="secondary" icon={<Plus size={18}/>} className="h-14 px-10 rounded-2xl shadow-xl shadow-brand-secondary/20">Novo Andamento</Button>
             </>
           ) : (
             <Button variant="secondary" icon={<MessageSquare size={18}/>} className="h-14 px-10 rounded-2xl shadow-xl shadow-brand-secondary/20">Falar com Equipe</Button>
           )}
        </div>
      </header>

      {/* PROCESSO CARD 360 */}
      <section className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
            <Landmark size={140} className="text-brand-primary" />
         </div>
         <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
               <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-1.5 bg-brand-primary/5 text-brand-primary rounded-xl text-[9px] font-black uppercase tracking-widest border border-brand-primary/10">Sincronizado CNJ</span>
                  <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-white ${processo.status === 'ATIVO' ? 'bg-emerald-500' : 'bg-slate-400'}`}>{processo.status}</span>
               </div>
               <Typography variant="h1" font="serif" className="text-brand-primary text-4xl lg:text-6xl tracking-tight leading-tight">
                  {processo.titulo || 'Processo Sem Título'}
               </Typography>
               <div className="flex items-center gap-4 text-slate-400 font-mono text-xl tracking-tight">
                  <Scale size={24} className="text-brand-secondary" /> {processo.numero_cnj}
               </div>
            </div>
            
            <div className="lg:col-span-4 grid gap-4">
               <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-5">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-sm"><User size={20}/></div>
                  <div>
                     <Typography variant="caption" className="text-[8px] font-black uppercase text-slate-400 mb-1">Titular Requerente</Typography>
                     <Typography variant="small" className="font-bold text-brand-primary truncate max-w-[150px]">{processo.autor || 'Não identificado'}</Typography>
                  </div>
               </div>
               <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-5">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-sm"><MapPin size={20}/></div>
                  <div>
                     <Typography variant="caption" className="text-[8px] font-black uppercase text-slate-400 mb-1">Tribunal de Origem</Typography>
                     <Typography variant="small" className="font-bold text-brand-primary">{processo.tribunal || 'Nacional'}</Typography>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* AI ANALYSIS HUB */}
      {aiAnalysis && (
        <div className="bg-[#05080F] p-10 rounded-[3.5rem] border border-brand-secondary/30 shadow-2xl animate-in zoom-in-95 duration-500 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5"><Bot size={100} className="text-brand-secondary" /></div>
           <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
              <div className="w-20 h-20 bg-brand-secondary text-brand-primary rounded-[2rem] flex items-center justify-center shadow-2xl shrink-0"><Zap size={32}/></div>
              <div className="space-y-3">
                 <Typography variant="caption" className="text-brand-secondary font-black uppercase tracking-[0.2em] text-[10px]">Exegese Jurídica IA Hermida Maia</Typography>
                 <Typography variant="body" className="text-white/80 leading-relaxed text-base italic font-light italic">"{aiAnalysis}"</Typography>
              </div>
           </div>
        </div>
      )}

      {/* TABS NUCLEARES */}
      <div className="flex gap-2 p-1.5 bg-white rounded-3xl w-fit shadow-sm border border-slate-100 mx-auto">
         {[
           { id: 'timeline', label: 'Timeline do Caso', icon: <Clock size={14}/> },
           { id: 'docs', label: 'Autos Digitalizados', icon: <FileText size={14}/> },
           { id: 'finance', label: 'Controle de Honorários', icon: <CreditCard size={14}/> },
         ].map(tab => (
           <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-brand-primary text-brand-secondary shadow-xl' : 'text-slate-400 hover:text-brand-primary'}`}
           >
             {tab.icon} {tab.label}
           </button>
         ))}
      </div>

      {/* CONTEÚDO DAS TABS */}
      <div className="min-h-[50vh]">
         {activeTab === 'timeline' && (
           <div className="space-y-8 animate-in slide-in-from-bottom-5">
              {timeline.map((evt: any, i: number) => (
                <div key={i} className="flex gap-8 group">
                   <div className="flex flex-col items-center shrink-0">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all group-hover:scale-110 ${evt.tipo === 'PUBLICACAO' ? 'bg-brand-secondary text-brand-primary' : 'bg-brand-primary text-brand-secondary'}`}>
                         <Zap size={20} />
                      </div>
                      <div className="w-[1px] flex-1 bg-slate-200 my-4" />
                   </div>
                   <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm flex-1 hover:shadow-xl transition-all group-hover:border-brand-secondary/20">
                      <div className="flex justify-between items-start mb-4">
                         <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest bg-brand-accent px-3 py-1 rounded-lg">{evt.origem} • {new Date(evt.data).toLocaleDateString()}</span>
                         {evt.criticidade === 'FATAL' && <span className="px-3 py-1 bg-rose-500 text-white rounded-lg text-[8px] font-black uppercase tracking-widest animate-pulse">Prazo Fatal</span>}
                      </div>
                      <Typography variant="body" className="text-slate-600 leading-relaxed text-sm md:text-base">{evt.descricao}</Typography>
                   </div>
                </div>
              ))}
           </div>
         )}

         {activeTab === 'docs' && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in">
              {documentos.length > 0 ? documentos.map((doc: any, i: number) => (
                <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group text-center flex flex-col items-center">
                   <div className="w-20 h-20 bg-brand-accent rounded-[2rem] flex items-center justify-center text-brand-primary mb-6 shadow-inner group-hover:rotate-6 transition-all">
                      <FileText size={32} />
                   </div>
                   <Typography variant="small" className="font-bold text-brand-primary mb-2 block truncate w-full">{doc.nome}</Typography>
                   <Typography variant="caption" className="text-slate-400 mb-8 block">{new Date(doc.criado_em).toLocaleDateString()}</Typography>
                   <Button variant="outline" size="sm" className="w-full rounded-xl" icon={<Download size={14}/>}>Baixar Cópia</Button>
                </div>
              )) : (
                <div className="col-span-3 py-32 text-center opacity-20"><Info size={48} className="mx-auto mb-4" /><Typography variant="small">Nenhum documento anexado ao ledger.</Typography></div>
              )}
           </div>
         )}
      </div>
      
      {/* FOOTER AUDIT */}
      <footer className="pt-20 pb-10 border-t border-slate-200 flex justify-between items-center opacity-30">
         <Typography variant="caption" className="text-[9px] font-black uppercase tracking-[0.5em] text-brand-primary">HM-PROCESSO-360-V12</Typography>
         <div className="flex gap-4">
            <ShieldCheck size={18} />
            <span className="text-[10px] font-bold">Imutabilidade Garantida</span>
         </div>
      </footer>
    </div>
  );
};

// Helper Icon Refresh (Missing in ref)
const RefreshCw: React.FC<{ className?: string, size?: number }> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>
  </svg>
);
