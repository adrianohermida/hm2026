
import React from 'react';
import { FileUp, FileText, ExternalLink, Shield } from 'lucide-react';
import { Typography } from '../../../atoms/Typography.tsx';

export const PortalDocumentos: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <Typography variant="h3" font="serif" className="text-brand-primary text-3xl">Meus Documentos</Typography>
          <Typography variant="caption" className="text-slate-400 font-black tracking-widest mt-2 block">Cofre Digital Hermida Maia</Typography>
        </div>
        <button className="bg-white border border-slate-200 text-brand-primary px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
          <FileUp size={16} /> Upload de Arquivo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Contrato_Prestacao_Servicos.pdf', type: 'PDF', date: '15 Nov 2024' },
          { name: 'Extrato_Bancario_Consolidado.pdf', type: 'PDF', date: '20 Nov 2024' },
          { name: 'Identidade_Titular.jpg', type: 'IMG', date: '15 Nov 2024' }
        ].map((doc, i) => (
          <div key={i} className="p-8 bg-white border border-slate-200 rounded-[2.5rem] flex flex-col justify-between h-64 hover:border-brand-secondary/40 hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
               <FileText size={80} className="text-brand-primary" />
            </div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="w-14 h-14 bg-brand-accent rounded-2xl flex items-center justify-center shadow-inner text-brand-primary group-hover:bg-brand-primary group-hover:text-brand-secondary transition-colors">
                <FileText size={24} />
              </div>
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-lg">{doc.type}</span>
            </div>
            
            <div className="relative z-10">
              <Typography variant="small" className="font-bold text-brand-primary block mb-1 truncate text-sm">{doc.name}</Typography>
              <Typography variant="caption" className="text-slate-400">{doc.date}</Typography>
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                <Shield size={12} className="text-emerald-500" />
                <span className="text-[8px] font-black uppercase tracking-tighter text-slate-400">Criptografado</span>
              </div>
              <button className="text-slate-300 hover:text-brand-secondary transition-colors"><ExternalLink size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
