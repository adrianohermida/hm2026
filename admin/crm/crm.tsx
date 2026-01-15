
import React, { useState, useEffect } from 'react';
import { Users, Filter, Plus, MoreVertical, Search, Download } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';
import { Button } from '../../components/atoms/Button.tsx';
import { servicoCRM } from '../../services/supabaseService.ts';

export const CRM: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    servicoCRM.buscarLeads().then(setLeads);
  }, []);

  const filteredLeads = leads.filter(l => 
    l.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in slide-in-from-right-10 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Pipeline <span className="text-brand-secondary italic">CRM</span></Typography>
          <Typography variant="body" className="text-slate-400 mt-2">Gestão de oportunidades e conversão de clientes.</Typography>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="bg-white border-slate-200 h-12 rounded-xl text-slate-500" icon={<Download size={16}/>}>Exportar</Button>
           <Button variant="secondary" icon={<Plus size={18}/>} className="h-12 rounded-xl shadow-lg">Novo Lead</Button>
        </div>
      </header>

      {/* FILTROS */}
      <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nome ou e-mail..." 
              className="w-full bg-slate-50 border-none rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-brand-secondary/20"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
         </div>
         <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all border border-slate-100"><Filter size={18}/></button>
      </div>

      {/* TABELA DE LEADS */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Lead / Contato</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Origem</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length > 0 ? filteredLeads.map((lead, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-primary/5 text-brand-primary flex items-center justify-center font-bold text-xs uppercase">
                        {lead.nome[0]}
                      </div>
                      <div>
                        <Typography variant="small" className="font-bold text-brand-primary block">{lead.nome}</Typography>
                        <Typography variant="caption" className="text-slate-400 lowercase">{lead.email}</Typography>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-bold uppercase tracking-wide border border-slate-200">
                      {lead.origem}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${lead.status === 'Novo' ? 'bg-emerald-500' : 'bg-brand-secondary'}`} />
                       <span className="text-xs font-medium text-slate-600">{lead.status}</span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <button className="p-2 text-slate-300 hover:text-brand-primary transition-colors"><MoreVertical size={18}/></button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="p-12 text-center opacity-40">
                    <Users size={48} className="mx-auto mb-4 text-slate-300" />
                    <Typography variant="small">Nenhum lead encontrado.</Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
