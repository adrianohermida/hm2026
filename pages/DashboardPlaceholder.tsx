
import React from 'react';
import { Container } from '../components/Container.tsx';
import { Typography } from '../components/Typography.tsx';
import { Button } from '../components/Button.tsx';
import { LayoutDashboard, Plus, Settings } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Placeholder */}
      <aside className="w-72 bg-brand-primary text-white p-8 hidden lg:flex flex-col">
        <Typography variant="h4" font="serif" className="text-brand-secondary mb-12">HM Kernel V12</Typography>
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl text-brand-secondary">
            <LayoutDashboard size={20}/>
            <Typography variant="small">Visão Geral</Typography>
          </div>
        </div>
        <Button variant="ghost" className="text-white/40 hover:text-white mt-auto">Sair</Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 lg:p-16 overflow-y-auto">
        <header className="flex justify-between items-center mb-16">
          <div>
            <Typography variant="h2" font="serif" className="text-brand-primary mb-2">Painel Administrativo</Typography>
            <Typography variant="body" className="text-slate-400">Página pronta para implementação de módulos.</Typography>
          </div>
          <Button variant="secondary" icon={<Plus size={18}/>}>Novo Módulo</Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <div className="p-12 border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
              <Plus size={48} className="mb-4 text-brand-primary" />
              <Typography variant="small" className="font-black uppercase tracking-widest">Criar Primeiro Módulo</Typography>
           </div>
        </div>
      </main>
    </div>
  );
};
