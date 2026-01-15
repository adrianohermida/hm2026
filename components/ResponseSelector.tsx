import React, { useState, useEffect } from 'react';
import { Search, Folder, MessageSquare, ChevronRight, Wand2, X } from 'lucide-react';
import { Typography } from './Typography.tsx';
import { servicoRespostas } from '../services/supabaseService.ts';
import { PastaResposta, RespostaPredefinida, Ticket } from '../types.ts';

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
      const [p, r] = await Promise.all([
        servicoRespostas.buscarPastas(),
        servicoRespostas.buscarRespostas(pastaAtiva || undefined)
      ]);
      setPastas(p || []);
      setRespostas(r || []);
      setLoading(false);
    };
    load();
  }, [pastaAtiva]);

  const respostasFiltradas = respostas.filter(r => {
    if (!r) return false;
    const titulo = (r.titulo || "").toLowerCase();
    const corpo = (r.corpo || "").toLowerCase();
    const query = (busca || "").toLowerCase();
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
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg"><X size={20}/></button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-48 border-r border-slate-100 bg-slate-50/20 overflow-y-auto p-4 space-y-2">
          <button onClick={() => setPastaAtiva(null)} className={`w-full text-left p-3 rounded-xl text-[10px] font-bold uppercase transition-all ${!pastaAtiva ? 'bg-brand-primary text-white' : 'text-slate-400 hover:bg-slate-100'}`}>Tudo</button>
          {pastas.map(p => (
            <button key={p.id} onClick={() => setPastaAtiva(p.id)} className={`w-full text-left p-3 rounded-xl text-[10px] font-bold uppercase transition-all flex items-center gap-2 ${pastaAtiva === p.id ? 'bg-brand-primary text-white' : 'text-slate-400 hover:bg-slate-100'}`}>
              <Folder size={14} /><span className="truncate">{p.nome}</span>
            </button>
          ))}
        </aside>
        <main className="flex-1 flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <input type="text" placeholder="Pesquisar resposta..." className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-xs outline-none" value={busca} onChange={e => setBusca(e.target.value)} />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {respostasFiltradas.map(r => (
              <button key={r.id} onClick={() => onSelect(servicoRespostas.parserPlaceholders(r.corpo, ticket))} className="w-full text-left p-5 bg-white border border-slate-100 rounded-2xl hover:border-brand-secondary/40 transition-all">
                <Typography variant="small" className="text-brand-primary font-bold block mb-1">{r.titulo}</Typography>
                <Typography variant="caption" className="text-slate-400 normal-case line-clamp-2">{r.corpo}</Typography>
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};