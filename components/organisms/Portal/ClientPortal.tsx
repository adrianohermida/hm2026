
import React, { useState } from 'react';
import { LogOut, Download, ShieldCheck, ChevronRight, LayoutDashboard, MessageSquare, CreditCard, Calendar, FileText, Wallet, Menu, X } from 'lucide-react';
import { Typography } from '../../atoms/Typography.tsx';
import { Container } from '../../atoms/Container.tsx';
import { Logo } from '../../ui/Logo.tsx';
import { PortalLabels } from '../../../modules/portal/portal-skeleton.tsx';
import { PortalOverview } from './modules/PortalOverview.tsx';
import { PortalProcessos } from './modules/PortalProcessos.tsx';
import { PortalTickets } from './modules/PortalTickets.tsx';
import { PortalFinanceiro } from './modules/PortalFinanceiro.tsx';
import { PortalDocumentos } from './modules/PortalDocumentos.tsx';
import { PortalPlano } from './modules/PortalPlano.tsx';
import { PortalAgenda } from './modules/PortalAgenda.tsx';

interface Props {
  user: any;
  onLogout: () => void;
}

export const ClientPortal: React.FC<Props> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'overview': return <PortalOverview user={user} onNavigate={setActiveTab} />;
      case 'processos': return <PortalProcessos />;
      case 'tickets': return <PortalTickets />;
      case 'financeiro': return <PortalFinanceiro />;
      case 'documentos': return <PortalDocumentos />;
      case 'plano': return <PortalPlano />;
      case 'agenda': return <PortalAgenda />;
      default: return <div className="p-20 text-center opacity-40 text-slate-500 font-bold uppercase tracking-widest">Módulo em Síntese...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-brand-secondary/30 selection:text-brand-primary">
      
      {/* HEADER DO CLIENT PORTAL */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <Container className="h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center p-1.5 shadow-md">
              <Logo variant="light" />
            </div>
            <div className="hidden md:block">
              <Typography variant="small" className="font-black text-brand-primary uppercase tracking-tight leading-none">Portal do Cliente</Typography>
              <Typography variant="caption" className="text-brand-secondary text-[8px] font-black uppercase tracking-[0.3em]">Hermida Maia</Typography>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-3 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
               <div className="w-6 h-6 rounded-full bg-brand-secondary flex items-center justify-center text-[10px] font-black text-brand-primary">
                 {user?.email?.[0].toUpperCase()}
               </div>
               <span className="text-[10px] font-bold text-slate-600">{user?.email?.split('@')[0]}</span>
             </div>
             <button 
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
             >
                <LogOut size={16} /> <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">Sair</span>
             </button>
             <button 
               className="md:hidden p-2 text-slate-500"
               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
             >
               {mobileMenuOpen ? <X /> : <Menu />}
             </button>
          </div>
        </Container>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-white z-40 p-6 border-t border-slate-100 overflow-y-auto">
           <nav className="space-y-2">
              {PortalLabels.tabs.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all ${activeTab === tab.id ? 'bg-brand-primary text-white' : 'bg-slate-50 text-slate-500'}`}
                >
                  {tab.icon}
                  <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
                </button>
              ))}
           </nav>
        </div>
      )}

      <main className="py-12">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* SIDEBAR DESKTOP */}
            <aside className="hidden lg:block w-72 shrink-0 space-y-6 sticky top-28 h-fit">
              <nav className="space-y-2">
                {PortalLabels.tabs.map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all group border ${activeTab === tab.id ? 'bg-brand-primary text-white border-brand-primary shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:border-brand-secondary hover:text-brand-primary'}`}
                  >
                    <div className="flex items-center gap-4">
                      {tab.icon}
                      <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                    </div>
                    <ChevronRight size={14} className={activeTab === tab.id ? 'text-white' : 'opacity-30 group-hover:opacity-100 transition-all text-brand-secondary'} />
                  </button>
                ))}
              </nav>

              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl text-center">
                 <ShieldCheck className="mx-auto text-emerald-500 mb-2" size={24} />
                 <Typography variant="caption" className="text-emerald-700 font-bold normal-case leading-tight">Ambiente Criptografado Ponta-a-Ponta</Typography>
              </div>
            </aside>

            {/* CONTEÚDO PRINCIPAL */}
            <div className="flex-1 min-w-0 min-h-[70vh]">
               {renderActiveModule()}
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
};
