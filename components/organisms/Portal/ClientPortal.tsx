
import React, { useState } from 'react';
import { LogOut, Download, ShieldCheck, ChevronRight, LayoutDashboard, MessageSquare, CreditCard, Calendar, FileText, Wallet } from 'lucide-react';
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
      default: return <div className="p-20 text-center opacity-40 text-slate-500 font-bold uppercase tracking-widest">Módulo em Síntese...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-brand-secondary/30 selection:text-brand-primary">
      <main className="py-12 md:py-20">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* SIDEBAR LIGHT MODE */}
            <aside className="w-full lg:w-72 shrink-0 space-y-6">
              <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] text-center shadow-sm">
                <div className="w-20 h-20 rounded-[2rem] bg-brand-primary border-4 border-slate-50 mx-auto mb-6 flex items-center justify-center text-brand-secondary text-2xl font-serif shadow-xl">
                   {user?.email?.[0].toUpperCase()}
                </div>
                <Typography variant="small" className="font-bold text-brand-primary block mb-1">{user?.email?.split('@')[0]}</Typography>
                <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100 mt-2">
                   <ShieldCheck size={10} />
                   <Typography variant="caption" className="text-emerald-600 text-[8px] tracking-widest block uppercase font-black">Auditado V12</Typography>
                </div>
              </div>

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

              <button className="w-full flex items-center justify-center gap-3 p-5 bg-white hover:bg-slate-50 text-slate-400 hover:text-brand-primary rounded-2xl transition-all border border-slate-200 text-[9px] font-black uppercase tracking-widest group">
                <Download size={16} className="group-hover:text-brand-secondary transition-colors"/> Exportar Dados
              </button>
            </aside>

            {/* CONTEÚDO PRINCIPAL LIGHT MODE */}
            <div className="flex-1 min-w-0 min-h-[70vh]">
               {renderActiveModule()}
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
};
