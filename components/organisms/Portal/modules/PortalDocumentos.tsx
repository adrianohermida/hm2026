
import React from 'react';
import { FileUp, FileText, ExternalLink, Shield } from 'lucide-react';
import { Typography } from '../../../atoms/Typography.tsx';

export const PortalDocumentos: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <Typography variant="h3" font="serif" className="text-white text-3xl">Meus Documentos</Typography>
          <Typography variant="caption" className="text-brand-secondary font-black tracking-widest mt-2 block">Cofre Digital Hermida Maia</Typography>
        </div>
        <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
          <FileUp size={16} /> Upload de Arquivo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Contrato_Prestacao_Servicos.pdf', type: 'PDF', date: '15 Nov 2024' },
          { name: 'Extrato_Bancario_Consolidado.pdf', type: 'PDF', date: '20 Nov 2024' },
          { name: 'Identidade_Titular.jpg', type: 'IMG', date: '15 Nov 2024' }
        ].map((doc, i) => (
          <div key={i} className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] flex flex-col justify-between h-56 hover:bg-white/[0.06] hover:border-brand-secondary/30 transition-all group">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-brand-primary text-brand-secondary rounded-xl flex items-center justify-center shadow-lg border border-brand-secondary/20">
                <FileText size={20} />
              </div>
              <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">{doc.type}</span>
            </div>
            <div>
              <Typography variant="small" className="font-bold text-white block mb-1 truncate text-sm">{doc.name}</Typography>
              <Typography variant="caption" className="text-slate-500">{doc.date}</Typography>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                <Shield size={12} className="text-emerald-500" />
                <span className="text-[8px] font-black uppercase tracking-tighter">Criptografado</span>
              </div>
              <button className="text-brand-secondary"><ExternalLink size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
