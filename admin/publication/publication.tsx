
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Filter, FileText, CheckCircle2, Clock, AlertCircle, 
  Loader2, Eye, Sparkles, Calendar, Plus, ChevronRight,
  X, Scale, ArrowRight, Download, Zap, ShieldCheck, Bot
} from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';
import { Button } from '../../components/atoms/Button.tsx';
import { PublicationRouter } from '../../modules/publication/publication-router.ts';

/**
 * HM-V12.5: PUBLICAÇÕES & RECORTES DIGITAIS
 * Núcleo de Monitoramento e Exegese por IA
 */
export const Publication: React.FC = () => {
  const [publicacoes, setPublicacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPub, setSelectedPub] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<any>(null);
  const [isCreatingDeadline, setIsCreatingDeadline] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      // Usando o router para buscar dados reais
      const { data } = await PublicationRouter.fetchRecent();
      setPublicacoes(data || []);
    } catch (e) {
      console.error("Falha ao carregar recortes:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleMarkAsRead = async (id: string, currentStatus: boolean) => {
    try {
      // Inverte o status de leitura no ledger
      await PublicationRouter.markAsRead(id);
      setPublicacoes(prev => prev.map(p => p.id === id ? { ...p, lido: !currentStatus } : p));
      if (selectedPub?.id === id) {
        setSelectedPub({ ...selectedPub, lido: !currentStatus });
      }
    } catch (e) {
      alert("Falha ao atualizar status de leitura.");
    }
  };

  const handleAiAnalysis = (pub: any) => {
    setAnalyzing(pub.id);
    setAiResult(null);
    // Simulação de Exegese Jurídica V12 via Gemini
    setTimeout(() => {
      setAiResult({
        has_deadline: true,
        title: "Contestar Embargos à Execução",
        days: 15,
        risk: "ALTO",
        summary: "A publicação intima a parte autora para se manifestar sobre os embargos apresentados pelo banco no evento 42. Prazo de 15 dias úteis detectado."
      });
      setAnalyzing(null);
    }, 1500);
  };

  const handleCreateDeadline = async () => {
    setIsCreatingDeadline(true);
    setTimeout(() => {
      alert(`Prazo de ${aiResult.days} dias criado com sucesso para o processo ${selectedPub.numero_cnj}`);
      setIsCreatingDeadline(false);
      setAiResult(null);
    }, 1000);
  };

  const filteredPubs = useMemo(() => {
    return publicacoes.filter(p => {
      const matchSearch = p.numero_cnj?.includes(searchTerm) || p.texto?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' ? true : (statusFilter === 'lido' ? p.lido : !p.lido);
      return matchSearch && matchStatus;
    });
  }, [publicacoes, searchTerm, statusFilter]);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 font-sans">
      
      {/* HEADER TÁTICO */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 bg-brand-primary text-brand-secondary rounded-xl flex items-center justify-center shadow-lg border border-brand-secondary/20">
                <Zap size={20} />
             </div>
             <Typography variant="caption" className="text-brand-secondary font-black tracking-[0.3em] uppercase text-[10px]">Monitoramento 24/7</Typography>
          </div>
          <Typography variant="h1" font="serif" className="text-brand-primary text-4xl lg:text-5xl">
            Recortes <span className="text-brand-secondary italic">Digitais</span>
          </Typography>
        </div>
        
        <div className="flex gap-4">
           <Button variant="outline" icon={<Download size={18}/>} className="bg-white border-slate-200 text-brand-primary h-14 px-8 rounded-2xl">Relatório DJ</Button>
           <Button variant="secondary" icon={<Plus size={18}/>} className="h-14 px-10 rounded-2xl shadow-xl shadow-brand-secondary/20 font-black">Lançar Manual</Button>
        </div>
      </header>

      {/* STATS DE FLUXO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Pendentes de Leitura', value: publicacoes.filter(p => !p.lido).length, color: 'text-amber-500' },
          { label: 'Total no Período', value: publicacoes.length, color: 'text-brand-primary' },
          { label: 'Prazos Fatais', value: publicacoes.filter(p => p.prioridade === 'Urgente').length || '0', color: 'text-rose-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
             <div>
                <Typography variant="caption" className="text-slate-400 font-black uppercase text-[9px] tracking-widest mb-2 block">{stat.label}</Typography>
                <Typography variant="h2" font="serif" className={`${stat.color} text-4xl`}>{stat.value}</Typography>
             </div>
             <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 group-hover:text-brand-secondary transition-colors">
                <ChevronRight size={24} />
             </div>
          </div>
        ))}
      </div>

      {/* FILTROS DE BORDA */}
      <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar por CNJ ou conteúdo da publicação..." 
            className="w-full bg-slate-50 border-none rounded-xl py-4 pl-12 text-sm focus:ring-4 focus:ring-brand-secondary/10 outline-none"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="bg-slate-50 border-none rounded-xl px-6 py-4 text-xs font-bold text-brand-primary outline-none min-w-[200px]"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">Todos os Status</option>
          <option value="pendente">Não Lidos</option>
          <option value="lido">Arquivados</option>
        </select>
      </div>

      {/* LISTA DE RECORTES */}
      <div className="grid gap-6">
        {loading ? (
          Array(3).fill(0).map((_, i) => <div key={i} className="h-40 bg-slate-100 rounded-[3.5rem] animate-pulse" />)
        ) : filteredPubs.length > 0 ? filteredPubs.map(pub => (
          <div 
            key={pub.id} 
            className={`bg-white p-10 rounded-[3.5rem] border transition-all group relative overflow-hidden ${pub.lido ? 'border-slate-100 opacity-60' : 'border-slate-200 shadow-sm hover:shadow-xl'}`}
          >
            {!pub.lido && <div className="absolute top-0 left-0 w-2 h-full bg-brand-secondary" />}
            
            <div className="flex flex-col lg:flex-row justify-between gap-10">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${pub.prioridade === 'Urgente' ? 'bg-rose-500 text-white' : 'bg-brand-primary text-brand-secondary'}`}>
                    {pub.fonte || 'DIÁRIO OFICIAL'}
                  </span>
                  <Typography variant="caption" className="text-slate-400 font-mono text-sm">{pub.numero_cnj}</Typography>
                  {!pub.lido && <span className="w-2 h-2 bg-brand-secondary rounded-full animate-pulse shadow-[0_0_8px_#c5a059]" />}
                </div>
                <Typography variant="body" className="text-slate-600 leading-relaxed text-sm lg:text-base line-clamp-3 italic">
                  "{pub.texto}"
                </Typography>
                <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                  <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest"><Calendar size={14}/> {new Date(pub.data_publicacao).toLocaleDateString()}</span>
                  <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest"><ShieldCheck size={14}/> Sincronia Nominal</span>
                </div>
              </div>

              <div className="flex lg:flex-col justify-end gap-3 min-w-[180px]">
                <button 
                  onClick={() => setSelectedPub(pub)}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary hover:text-brand-secondary transition-all"
                >
                  <Eye size={16}/> Detalhes
                </button>
                <button 
                  onClick={() => handleMarkAsRead(pub.id, pub.lido)}
                  className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${pub.lido ? 'bg-slate-100 text-slate-400' : 'bg-brand-secondary text-brand-primary shadow-lg shadow-brand-secondary/20'}`}
                >
                  {pub.lido ? <CheckCircle2 size={16}/> : <Clock size={16}/>}
                  {pub.lido ? 'Lido' : 'Marcar Lido'}
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="py-32 text-center bg-white rounded-[4rem] border border-dashed border-slate-200 opacity-30">
            <FileText size={64} className="mx-auto mb-4" />
            <Typography variant="small" className="font-bold">Nenhuma publicação localizada.</Typography>
          </div>
        )}
      </div>

      {/* MODAL DE DETALHES & IA */}
      {selectedPub && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-brand-primary/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-5xl rounded-[4rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-500">
            <header className="p-10 border-b border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-brand-accent rounded-2xl flex items-center justify-center text-brand-primary shadow-inner"><FileText size={28}/></div>
                  <div>
                    <Typography variant="h3" font="serif" className="text-brand-primary">Exegese de Publicação</Typography>
                    <Typography variant="caption" className="text-slate-400 font-mono">{selectedPub.numero_cnj}</Typography>
                  </div>
               </div>
               <button onClick={() => { setSelectedPub(null); setAiResult(null); }} className="p-4 hover:bg-slate-50 rounded-2xl text-slate-300 transition-all"><X size={28}/></button>
            </header>

            <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar">
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                     <Typography variant="caption" className="text-slate-400 font-black uppercase text-[8px] mb-2 block">Tribunal / Comarca</Typography>
                     <Typography variant="small" className="font-bold text-brand-primary">{selectedPub.fonte || 'DJ/TJ'} • {selectedPub.comarca || 'Nacional'}</Typography>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                     <Typography variant="caption" className="text-slate-400 font-black uppercase text-[8px] mb-2 block">Data de Publicação</Typography>
                     <Typography variant="small" className="font-bold text-brand-primary">{new Date(selectedPub.data_publicacao).toLocaleDateString()}</Typography>
                  </div>
               </div>

               <section className="space-y-6">
                  <div className="flex items-center justify-between">
                     <Typography variant="caption" className="text-brand-primary font-black uppercase tracking-widest border-l-4 border-brand-secondary pl-4">Conteúdo Integral</Typography>
                     <button 
                        onClick={() => handleAiAnalysis(selectedPub)}
                        disabled={analyzing === selectedPub.id}
                        className="flex items-center gap-3 px-8 py-3 bg-[#0A1120] text-brand-secondary rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all disabled:opacity-50"
                     >
                        {analyzing === selectedPub.id ? <Loader2 size={16} className="animate-spin"/> : <Sparkles size={16}/>}
                        Análise Estratégica IA
                     </button>
                  </div>
                  <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 font-serif text-slate-600 leading-relaxed text-lg italic whitespace-pre-wrap">
                     "{selectedPub.texto}"
                  </div>
               </section>

               {aiResult && (
                 <section className="bg-[#05080F] p-10 rounded-[3.5rem] border border-brand-secondary/30 shadow-2xl animate-in slide-in-from-top-4 duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5"><Zap size={100} className="text-brand-secondary" /></div>
                    <div className="relative z-10 space-y-8">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-brand-secondary text-brand-primary rounded-xl flex items-center justify-center shadow-lg"><Bot size={24}/></div>
                          <Typography variant="h4" font="serif" className="text-brand-secondary">Inteligência Processual V12</Typography>
                       </div>
                       
                       <Typography variant="body" className="text-white/80 leading-relaxed text-lg">"{aiResult.summary}"</Typography>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 flex items-center justify-between">
                             <div>
                                <Typography variant="caption" className="text-brand-secondary font-black uppercase text-[8px] mb-1 block">Ação Sugerida</Typography>
                                <Typography variant="small" className="text-white font-bold">{aiResult.title}</Typography>
                             </div>
                             <div className="px-3 py-1 bg-rose-500 text-white rounded-lg text-[8px] font-black uppercase tracking-widest animate-pulse">Risco {aiResult.risk}</div>
                          </div>
                          <div className="p-6 bg-brand-secondary text-brand-primary rounded-[2rem] flex items-center justify-between group cursor-pointer hover:scale-[1.02] transition-all" onClick={handleCreateDeadline}>
                             <div>
                                <Typography variant="caption" className="text-brand-primary/60 font-black uppercase text-[8px] mb-1 block">Prazo Detectado</Typography>
                                <Typography variant="small" className="font-black">{aiResult.days} Dias Úteis</Typography>
                             </div>
                             <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest bg-brand-primary text-brand-secondary px-4 py-2 rounded-xl">
                                {isCreatingDeadline ? <Loader2 size={12} className="animate-spin"/> : <ArrowRight size={14}/>} Vincular Agenda
                             </button>
                          </div>
                       </div>
                    </div>
                 </section>
               )}
            </div>

            <footer className="p-10 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-6">
               <button onClick={() => setSelectedPub(null)} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-primary">Fechar Visualização</button>
               <Button variant="outline" className="bg-white border-slate-200 text-brand-primary h-14 px-8 rounded-2xl" onClick={() => handleMarkAsRead(selectedPub.id, selectedPub.lido)}>
                  {selectedPub.lido ? 'Marcar como Pendente' : 'Arquivar Publicação'}
               </Button>
               <Button variant="secondary" className="h-14 px-12 rounded-2xl shadow-xl shadow-brand-secondary/20" onClick={() => window.open(`https://www.google.com/search?q=${selectedPub.numero_cnj}`, '_blank')}>Abrir no Tribunal</Button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Icon Refresh (Missing in ref)
const RefreshCw: React.FC<{ className?: string, size?: number }> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>
  </svg>
);
