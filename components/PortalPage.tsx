
import React, { useState, useEffect } from 'react';
import { LogOut, BookOpen, Megaphone, Beaker, Layout, Square } from 'lucide-react';
import { Typography } from './atoms/Typography.tsx';
import { sidebarService } from '../services/sidebar.service.ts';
import { SidebarGovernance } from '../modules/sidebar.manifest.ts';

// Importação dos Módulos
import { Dashboard } from '../admin/dashboard/dashboard.tsx';
import { CRM } from '../admin/crm/crm.tsx';
import { HelpDesk } from '../admin/helpdesk/helpdesk.tsx';
import { Process } from '../admin/process/process.tsx';
import { Publication } from '../admin/publication/publication.tsx';
import { AgendaModule } from '../admin/agenda/index.tsx'; 
import { Documents } from '../admin/documents/documents.tsx';
import { CMSBlogs } from '../admin/blog/cmsblogs.tsx';
import { Config } from '../admin/config/config.tsx';
import { Contract } from '../admin/contract/contract.tsx';
import { AiAgentsPage } from '../admin/ai-agents.tsx';
import { BalcaoVirtualAdmin } from '../admin/balcao-virtual/index.tsx';
import { BlankPageV12 } from '../pages/BlankPageV12.tsx';
import { CMS_Solutions } from '../admin/solutions/solutions.tsx';
import { CMS_Newsletter } from '../admin/newsletter/newsletter.tsx';
import { VoidPage } from '../pages/VoidPage.tsx';
import { BlankCanvas } from '../pages/BlankCanvas.tsx';
import { V12Blank } from '../pages/V12Blank.tsx';
import { PaginaVazia } from '../pages/PaginaVazia.tsx';
import { LabPage } from '../pages/LabPage.tsx';
import { WorkspaceV13 } from '../pages/WorkspaceV13.tsx';
import { AbsoluteBlank } from '../pages/AbsoluteBlank.tsx';

type ModuleID = 'dashboard' | 'crm' | 'tickets' | 'processos' | 'publicacoes' | 'agenda' | 'documentos' | 'blog' | 'configuracoes' | 'contratos' | 'ai-agents' | 'balcao-virtual' | 'blank-page' | 'solutions' | 'newsletter' | 'void-cell' | 'blank-canvas' | 'v12-blank' | 'pagina-vazia' | 'lab' | 'workspace-v13' | 'truly-blank';

export const PortalPage: React.FC<{ 
  isAdmin?: boolean; 
  onLogout: () => void;
  onNavigate?: (page: string) => void;
}> = ({ isAdmin = false, onLogout }) => {
  const [activeModule, setActiveModule] = useState<ModuleID>('truly-blank');
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    const syncRoute = () => {
      const hash = window.location.hash.replace('#/', '');
      if (hash && hash !== activeModule) {
        setActiveModule(hash as ModuleID);
      }
    };
    window.addEventListener('hashchange', syncRoute);
    syncRoute(); 
    return () => window.removeEventListener('hashchange', syncRoute);
  }, [activeModule]);

  useEffect(() => {
    const userRole = isAdmin ? 'admin' : 'cliente';
    const items = sidebarService.buildSidebar(userRole);
    setMenuItems(items);
  }, [isAdmin]);

  const changeModule = (route: string) => {
    setActiveModule(route as ModuleID);
    window.location.hash = `#/${route}`;
  };

  const renderModule = () => {
    const modules: Record<ModuleID, React.ReactNode> = {
      dashboard: <Dashboard />, 
      crm: <CRM />, 
      tickets: <HelpDesk />, 
      processos: <Process />,
      publicacoes: <Publication />, 
      agenda: <AgendaModule />, 
      documentos: <Documents />, 
      blog: <CMSBlogs />, 
      configuracoes: <Config />, 
      contratos: <Contract />, 
      'ai-agents': <AiAgentsPage />,
      'balcao-virtual': <BalcaoVirtualAdmin />,
      'blank-page': <BlankPageV12 onBack={() => changeModule('dashboard')} />,
      solutions: <CMS_Solutions />,
      newsletter: <CMS_Newsletter />,
      'void-cell': <VoidPage onBack={() => changeModule('dashboard')} />,
      'blank-canvas': <BlankCanvas onBack={() => changeModule('dashboard')} />,
      'v12-blank': <V12Blank onBack={() => changeModule('dashboard')} />,
      'pagina-vazia': <PaginaVazia onBack={() => changeModule('dashboard')} />,
      lab: <LabPage onBack={() => changeModule('dashboard')} />,
      'workspace-v13': <WorkspaceV13 onBack={() => changeModule('dashboard')} />,
      'truly-blank': <AbsoluteBlank />
    };
    return modules[activeModule] || <AbsoluteBlank />;
  };

  return (
    <div className="flex h-screen bg-[#F1F5F9] overflow-hidden select-none">
      <aside className={`${collapsed ? 'w-[100px]' : 'w-[300px]'} bg-[#0b1321] text-white flex flex-col border-r border-white/5 transition-all duration-500 shadow-2xl z-[100]`}>
        <div className="p-8 flex flex-col items-center border-b border-white/5 bg-black/20">
          <div onClick={() => setCollapsed(!collapsed)} className="w-12 h-12 bg-[#c5a059] rounded-[1.2rem] flex items-center justify-center font-serif font-black shadow-2xl text-[#0b1321] text-xl cursor-pointer hover:rotate-12 transition-transform">HM</div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-8 px-5 space-y-2 custom-scrollbar-dark">
          {menuItems.map((item) => (
            <div key={item.id} className="relative group">
              <button onClick={() => changeModule(item.route)} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${activeModule === item.route ? 'bg-[#c5a059] text-[#0b1321] shadow-lg' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
                <div className={`${activeModule === item.route ? 'text-[#0b1321]' : 'text-[#c5a059]/50'} flex items-center gap-3 shrink-0`}>
                  {item.icon}
                </div>
                {!collapsed && (
                  <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis">
                    {typeof item.label === 'string' ? item.label : ''}
                  </span>
                )}
              </button>
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 py-3 text-rose-400/50 hover:text-rose-400 font-black uppercase text-[8px] tracking-widest bg-white/5 rounded-xl transition-colors"><LogOut size={16} /> {!collapsed && 'Sair'}</button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 bg-white border-b border-slate-200 px-10 flex items-center justify-between shadow-sm">
          <Typography variant="h3" font="serif" className="text-[#0b1321] uppercase text-xs tracking-[0.3em]">
            Hermida Maia <span className="text-[#c5a059] italic">Digital</span>
          </Typography>
        </header>
        <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          {renderModule()}
        </div>
      </main>
    </div>
  );
};
