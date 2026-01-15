
import React, { useState, useEffect } from 'react';
import { LogOut, ChevronRight, LayoutDashboard, Database, ShieldCheck, Settings, Bell, Search, Zap, RefreshCw } from 'lucide-react';
import { Typography } from './atoms/Typography.tsx';
import { sidebarService } from '../services/sidebar.service.ts';
import { Dashboard } from '../admin/dashboard/dashboard.tsx';
import { CRM } from '../admin/crm/crm.tsx';
import { HelpDesk } from '../admin/helpdesk/helpdesk.tsx';
import { Process } from '../admin/process/process.tsx';
import { Publication } from '../admin/publication/publication.tsx';
import { AgendaModule } from '../admin/agenda/index.tsx';
import { Config } from '../admin/config/config.tsx';
import { ProcessoDetails360 } from './organisms/ProcessoDetails360.tsx';

/**
 * HM-V12.6: ADMIN COMMAND CENTER (PORTAL CORE)
 * Ajustado para rodar abaixo da Navbar Global
 */
export const PortalPage: React.FC<{ 
  isAdmin?: boolean; 
  onLogout: () => void;
  onNavigate?: (page: string) => void;
  user?: any;
}> = ({ isAdmin = true, onLogout, onNavigate, user }) => {
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const [processoId, setProcessoId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.replace('#/', '');
      if (hash.startsWith('processo/')) {
        setActiveRoute('processo-view');
        setProcessoId(hash.split('/')[1]);
      } else if (hash) {
        setActiveRoute(hash);
      } else {
        setActiveRoute('dashboard');
      }
    };
    window.addEventListener('hashchange', sync);
    sync();
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const menuItems = sidebarService.buildSidebar(isAdmin ? 'admin' : 'cliente');

  const renderModule = () => {
    switch (activeRoute) {
      case 'dashboard': return <Dashboard />;
      case 'crm': return <CRM />;
      case 'tickets': return <HelpDesk />;
      case 'processos': return <Process />;
      case 'publicacoes': return <Publication />;
      case 'agenda': return <AgendaModule />;
      case 'configuracoes': return <Config />;
      case 'processo-view': return <ProcessoDetails360 id={processoId!} userRole="admin" onBack={() => window.location.hash = '#/processos'} />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans select-none">
      
      {/* SIDEBAR TÁTICA */}
      <aside className={`${collapsed ? 'w-24' : 'w-72'} bg-[#1a2b4a] text-white flex flex-col border-r border-white/5 transition-all duration-500 z-[90] shadow-2xl`}>
        <div className="p-8 flex flex-col items-center border-b border-white/5 bg-[#132038]/40">
          <div onClick={() => setCollapsed(!collapsed)} className="w-12 h-12 bg-brand-secondary rounded-[1.2rem] flex items-center justify-center font-serif font-black shadow-2xl text-brand-primary text-xl cursor-pointer hover:rotate-12 transition-transform">HM</div>
          {!collapsed && <Typography variant="caption" className="text-brand-secondary mt-4 font-black tracking-[0.2em] text-[8px] uppercase">Kernel V12.6</Typography>}
        </div>
        
        <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar-dark">
          {menuItems.map((item) => (
            <button 
              key={item.route}
              onClick={() => { window.location.hash = `#/${item.route}`; }}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${activeRoute === item.route ? 'bg-brand-secondary text-brand-primary shadow-xl scale-[1.02]' : 'text-white/30 hover:bg-white/5 hover:text-white'}`}
            >
              <div className="flex items-center gap-4">
                <div className={activeRoute === item.route ? 'text-brand-primary' : 'text-brand-secondary/30 group-hover:text-brand-secondary transition-colors'}>
                  {item.icon}
                </div>
                {!collapsed && <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>}
              </div>
              {!collapsed && item.badge && <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black ${activeRoute === item.route ? 'bg-brand-primary text-white' : 'bg-brand-secondary text-brand-primary'}`}>{item.badge}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* VIEWPORT PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#F1F5F9] relative">
        <div className="flex-1 overflow-y-auto custom-scrollbar">
           <div className="p-6 lg:p-10 animate-in fade-in duration-500">
              {renderModule()}
           </div>
        </div>
      </main>
    </div>
  );
};
