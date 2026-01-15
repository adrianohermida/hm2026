
import React from 'react';
import { Typography } from '../components/Typography.tsx';
import { Button } from '../components/Button.tsx';
import { LayoutGrid, Plus, LogOut, Settings } from 'lucide-react';

export const DashboardPage: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar Simples */}
      <aside className="w-72 bg-brand-primary text-white flex flex-col">
        <div className="p-10 border-b border-white/5">
          <Typography variant="h4" font="serif" className="text-brand-secondary">HM Kernel</Typography>
          <Typography variant="caption" className="opacity-40">Versão 12.0.0</Typography>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          <button className="w-full flex items-center gap-4 p-4 bg-white/10 rounded-2xl text-brand-secondary">
            <LayoutGrid size={20}/>
            <span className="text-xs font-black uppercase tracking-widest">Visão Geral</span>
          </button>
        </nav>
        <div className="p-6 border-t border-white/5">
          <button onClick={onLogout} className="w-full flex items-center gap-4 p-4 text-white/40 hover:text-rose-400 transition-colors">
            <LogOut size={20}/>
            <span className="text-xs font-black uppercase tracking-widest">Sair</span>
          </button>
        </div>
      </aside>

      {/* Viewport */}
      <main className="flex-1 overflow-y-auto p-12 lg:p-20">
        <header className="flex justify-between items-center mb-16">
          <div>
            <Typography variant="h2" font="serif" className="text-brand-primary mb-2">Painel de Governança</Typography>
            <Typography variant="body" className="text-slate-400">Ambiente pronto para a síntese dos novos módulos.</Typography>
          </div>
          <Button variant="secondary" icon={<Plus size={18}/>}>Novo Módulo</Button>
        </header>

        {/* Placeholder Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="p-12 border-4 border-dashed border-slate-200 rounded-[3.5rem] flex flex-col items-center justify-center text-center opacity-30 hover:opacity-100 hover:border-brand-secondary transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-accent">
               <Settings size={32} className="text-slate-400 group-hover:text-brand-primary animate-spin-slow" />
            </div>
            <Typography variant="small" className="font-black uppercase tracking-widest">Aguardando Especificação</Typography>
          </div>
        </div>
      </main>
    </div>
  );
};
