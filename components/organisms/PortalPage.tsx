import React, { useState } from 'react';
import { LogOut, ChevronRight, Home, LayoutDashboard, Settings } from 'lucide-react';
import { Typography } from '../atoms/Typography.tsx';
import { sidebarService } from '../../services/sidebar.service.ts';
import { breadcrumbService } from '../../services/breadcrumb.service.ts';

// Views Admin
import { Dashboard } from '../../admin/dashboard/dashboard.tsx';
import { CRM } from '../../admin/crm/crm.tsx';
import { HelpDesk } from '../../admin/helpdesk/helpdesk.tsx';
import { Process } from '../../admin/process/process.tsx';
import { Publication } from '../../admin/publication/publication.tsx';
import { CalendarModule } from '../../admin/calendar/calendar.tsx';
import { PaginaEmBranco } from '../../pages/PaginaEmBranco.tsx';

export const PortalPage: React.FC<{ 
  isAdmin?: boolean; 
  onLogout: () => void; 
  onNavigate: (page: string) => void;
  children?: React.ReactNode;
}> = ({ isAdmin = false, onLogout, onNavigate, children }) => {
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const userRole = isAdmin ? 'admin' : 'cliente';

  const menuItems = sidebarService.buildSidebar(userRole);
  const crumbs = breadcrumbService.getBreadcrumbs(activeRoute);

  const renderContent = () => {
    // Se children for passado (Portal do Cliente), ignora as rotas admin
    if (children) return children;

    switch (activeRoute) {
      case 'dashboard': return <Dashboard />;
      case 'crm': return <CRM />;
      case 'tickets': return <HelpDesk />;
      case 'processos': return <Process />;
      case 'publicacoes': return <Publication />;
      case 'agenda': return <CalendarModule />;
      case 'canvas': return <PaginaEmBranco onBack={() => setActiveRoute('dashboard')} />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F1F5F9] overflow-hidden font-sans select-none relative">
      <aside className={`${collapsed ? 'w-[100px]' : 'w-[280px]'} bg-brand-primary text-white flex flex-col border-r border-white/5 transition-all duration-500 z-[200]`}>
        <div className="p-8 flex flex-col items-center border-b border-white/5 bg-black/10">
          <div onClick={() => setCollapsed(!collapsed)} className="w-12 h-12 bg-brand-secondary rounded-[1.2rem] flex items-center justify-center font-serif font-black shadow-2xl text-brand-primary text-xl cursor-pointer hover:rotate-12 transition-transform">HM</div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar-dark">
          {menuItems.map((item) => (
            <button 
              key={item.route}
              onClick={() => setActiveRoute(item.route)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${activeRoute === item.route ? 'bg-brand-secondary text-brand-primary shadow-lg' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
            >
              <div className="flex items-center gap-4">
                <div className={activeRoute === item.route ? 'text-brand-primary' : 'text-brand-secondary/30 group-hover:text-brand-secondary'}>{item.icon}</div>
                {!collapsed && <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">{item.label}</span>}
              </div>
              {item.badge && !collapsed && (
                <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black ${activeRoute === item.route ? 'bg-brand-primary text-white' : 'bg-brand-secondary text-brand-primary'}`}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 py-3 text-rose-400/50 hover:text-rose-400 font-black uppercase text-[8px] tracking-widest bg-white/5 rounded-xl">
            <LogOut size={16} /> {!collapsed && 'Sair'}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 bg-white border-b border-slate-200 px-10 flex items-center justify-between shadow-sm">
          <Typography variant="h3" font="serif" className="text-brand-primary uppercase text-xs tracking-[0.3em]">{userRole === 'admin' ? 'Kernel' : 'Painel'} <span className="text-brand-secondary italic">Digital</span></Typography>
        </header>

        <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          <div className="p-10 lg:p-14">
            {!children && (
              <nav className="flex items-center gap-2 mb-8 text-slate-400">
                <Home size={14} className="cursor-pointer hover:text-brand-primary" onClick={() => setActiveRoute('dashboard')} />
                {crumbs.map((c, i) => (
                  <React.Fragment key={i}>
                    <ChevronRight size={12} className="opacity-30" />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${c.isClickable ? 'cursor-pointer hover:text-brand-primary' : 'text-brand-primary/40'}`} onClick={() => c.isClickable && setActiveRoute(c.route)}>
                      {c.label}
                    </span>
                  </React.Fragment>
                ))}
              </nav>
            )}
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};