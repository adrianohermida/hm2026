import React, { useState, useEffect } from 'react';
import { Search, Folder, MessageSquare, ChevronRight, Wand2, X } from 'lucide-react';
import { Typography } from '../atoms/Typography.tsx';
import { servicoRespostas } from '../../services/supabaseService.ts';
import { PastaResposta, RespostaPredefinida, Ticket } from '../../types.ts';

interface ResponseSelectorProps {
  ticket: Ticket;
  onSelect: (textoParser: string) => void;
  onClose: () => void;
}

export const ResponseSelector: React.FC<ResponseSelectorProps> = ({ ticket, onSelect, onClose }) => {
  const [pastas, setPastas] = useState<PastaResposta[]>([]);
  const [respostas, setRespostas] = useState<RespostaPredefinida[]>([]);
  const [pastaAtiva, setPastaAtiva] = useState<string | null>(null);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [p, r] = await Promise.all([
          servicoRespostas.buscarPastas(),
          servicoRespostas.buscarRespostas(pastaAtiva || undefined)
        ]);
        setPastas(p || []);
        setRespostas(r || []);
      } catch (e) {
        console.error("HM-V12: Falha ao carregar seletor de respostas", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [pastaAtiva]);

  const respostasFiltradas = respostas.filter(r => {
    if (!r) return false;
    
    // HM-V12 SAFE STRING PROTECTION
    const titulo = String(r.titulo || "").toLowerCase();
    const corpo = String(r.corpo || "").toLowerCase();
    const query = String(busca || "").toLowerCase();
    
    return titulo.includes(query) || corpo.includes(query);
  });

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xl animate-in zoom-in duration-300">
      <header className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary text-brand-secondary rounded-xl flex items-center justify-center">
            <MessageSquare size={20} />
          </div>
          <div>
            <Typography variant="small" className="text-brand-primary font-black uppercase tracking-widest text-[11px]">Respostas Homologadas</Typography>
            <Typography variant="caption" className="text-slate-400 normal-case lowercase font-medium">Selecione uma base jurídica padronizada.</Typography>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg transition-colors"><X size={20}/></button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar de Pastas */}
        <aside className="w-48 border-r border-slate-100 bg-slate-50/20 overflow-y-auto p-4 space-y-2">
          <button 
            onClick={() => setPastaAtiva(null)}
            className={`w-full text-left p-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${!pastaAtiva ? 'bg-brand-primary text-white' : 'text-slate-400 hover:bg-slate-100'}`}
          >
            Tudo
          </button>
          {pastas.map(p => (
            <button 
              key={p.id}
              onClick={() => setPastaAtiva(p.id)}
              className={`w-full text-left p-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${pastaAtiva === p.id ? 'bg-brand-primary text-white' : 'text-slate-400 hover:bg-slate-100'}`}
            >
              <Folder size={14} />
              <span className="truncate">{p.nome}</span>
            </button>
          ))}
        </aside>

        {/* Listagem de Respostas */}
        <main className="flex-1 flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Pesquisar resposta..."
                className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-xs outline-none focus:ring-2 focus:ring-brand-secondary/20"
                value={busca}
                onChange={e => setBusca(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {loading ? (
              Array(3).fill(0).map((_, i) => <div key={i} className="h-20 bg-slate-50 rounded-2xl animate-pulse" />)
            ) : respostasFiltradas.length > 0 ? (
              respostasFiltradas.map(r => (
                <button 
                  key={r.id}
                  onClick={() => onSelect(servicoRespostas.parserPlaceholders(r.corpo, ticket))}
                  className="w-full text-left p-5 bg-white border border-slate-100 rounded-2xl hover:border-brand-secondary/40 hover:shadow-lg transition-all group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <Typography variant="small" className="text-brand-primary font-bold">{r.titulo}</Typography>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-brand-secondary transition-colors" />
                  </div>
                  <Typography variant="caption" className="text-slate-400 normal-case line-clamp-2 leading-relaxed">{r.corpo}</Typography>
                </button>
              ))
            ) : (
              <div className="py-20 text-center opacity-20">
                <MessageSquare size={32} className="mx-auto mb-2" />
                <Typography variant="caption">Nenhuma resposta encontrada.</Typography>
              </div>
            )}
          </div>
        </main>
      </div>
      
      <footer className="p-4 bg-brand-accent border-t border-slate-100 flex items-center gap-3">
         <Wand2 size={16} className="text-brand-secondary" />
         <Typography variant="caption" className="text-brand-primary font-bold text-[9px] uppercase tracking-widest">Parser de Placeholders V12 Ativo</Typography>
      </footer>
    </div>
  );
};