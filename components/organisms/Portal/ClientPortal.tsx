
import React, { useState } from 'react';
import { LogOut, Download, ShieldCheck, ChevronRight } from 'lucide-react';
import { Typography } from '../../atoms/Typography.tsx';
import { Container } from '../../atoms/Container.tsx';
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

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'overview': return <PortalOverview user={user} onNavigate={setActiveTab} />;
      case 'processos': return <PortalProcessos />;
      case 'tickets': return <PortalTickets />;
      case 'financeiro': return <PortalFinanceiro />;
      case 'documentos': return <PortalDocumentos />;
      case 'plano': return <PortalPlano />;
      case 'agenda': return <PortalAgenda />;
      default: return <div className="p-20 text-center opacity-20">Módulo em Síntese...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#05080F] text-white selection:bg-brand-secondary/30 selection:text-white font-sans">
      <header className="h-20 border-b border-white/5 bg-[#05080F]/80 backdrop-blur-xl fixed top-0 w-full z-[100] flex items-center">
        <Container className="flex justify-between items-center w-full">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-brand-secondary rounded-xl flex items-center justify-center font-serif font-black text-brand-primary text-sm">HM</div>
            <Typography variant="caption" className="text-white/40 tracking-[0.3em]">Portal do Cliente</Typography>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span className="text-[8px] font-black uppercase text-emerald-500 tracking-widest">Sessão Segura</span>
            </div>
            <button onClick={onLogout} className="p-2 text-white/40 hover:text-rose-400 transition-colors"><LogOut size={20}/></button>
          </div>
        </Container>
      </header>

      <main className="pt-32 pb-20">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12">
            <aside className="w-full lg:w-72 shrink-0 space-y-8">
              <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] text-center">
                <div className="w-20 h-20 rounded-[2rem] bg-brand-primary border border-brand-secondary/30 mx-auto mb-6 flex items-center justify-center text-brand-secondary text-2xl font-serif">
                   {user?.email?.[0].toUpperCase()}
                </div>
                <Typography variant="small" className="font-bold text-white block mb-1">{user?.email?.split('@')[0]}</Typography>
                <Typography variant="caption" className="text-brand-secondary text-[8px] tracking-widest block uppercase font-black">Identidade V12 Auditada</Typography>
              </div>

              <nav className="space-y-2">
                {PortalLabels.tabs.map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all group ${activeTab === tab.id ? 'bg-brand-secondary text-brand-primary shadow-xl' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
                  >
                    <div className="flex items-center gap-4">
                      {tab.icon}
                      <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                    </div>
                    <ChevronRight size={14} className={activeTab === tab.id ? 'text-brand-primary' : 'opacity-0 group-hover:opacity-100 transition-all'} />
                  </button>
                ))}
              </nav>

              <button className="w-full flex items-center justify-center gap-3 p-5 bg-white/5 hover:bg-white/10 text-white/30 hover:text-white rounded-2xl transition-all border border-white/5 text-[9px] font-black uppercase tracking-widest">
                <Download size={16}/> Exportar Dados (LGPD)
              </button>
            </aside>

            <div className="flex-1 min-w-0 min-h-[70vh]">
               {renderActiveModule()}
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
};
