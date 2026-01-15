
import React, { useState, useEffect } from 'react';
import { LogOut, ChevronRight, Home, LayoutDashboard, Users, Gavel, MessageSquare, Settings, Menu, X, Calendar, FileText } from 'lucide-react';
import { Typography } from '../atoms/Typography.tsx';
import { Logo } from '../ui/Logo.tsx';
import { breadcrumbService } from '../../services/breadcrumb.service.ts';

// Views Admin
import { Dashboard } from '../../admin/dashboard/dashboard.tsx';
import { CRM } from '../../admin/crm/crm.tsx';
import { HelpDesk } from '../../admin/helpdesk/helpdesk.tsx';
import { Process } from '../../admin/process/process.tsx';
import { Publication } from '../../admin/publication/publication.tsx';
import { AgendaModule } from '../../admin/agenda/index.tsx';
import { Config } from '../../admin/config/config.tsx';
import { Documents } from '../../admin/documents/documents.tsx';
import { ProcessoDetails360 } from './ProcessoDetails360.tsx';
import { PaginaEmBranco } from '../../pages/PaginaEmBranco.tsx';

// Navegação Superior
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Visão Geral', icon: <LayoutDashboard size={16} /> },
  { id: 'crm', label: 'CRM', icon: <Users size={16} /> },
  { id: 'tickets', label: 'Atendimento', icon: <MessageSquare size={16} /> },
  { id: 'processos', label: 'Processos', icon: <Gavel size={16} /> },
  { id: 'agenda', label: 'Agenda', icon: <Calendar size={16} /> },
  { id: 'documentos', label: 'GED', icon: <FileText size={16} /> },
  { id: 'configuracoes', label: 'Config', icon: <Settings size={16} /> },
];

export const PortalPage: React.FC<{ 
  isAdmin?: boolean; 
  onLogout: () => void; 
  onNavigate: (page: string) => void;
  children?: React.ReactNode;
  user?: any;
}> = ({ isAdmin = false, onLogout, onNavigate, children, user }) => {
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const [processoId, setProcessoId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      const cleanHash = hash.replace('portal/', '');
      
      if (cleanHash.startsWith('processo/')) {
        setActiveRoute('processo-view');
        setProcessoId(cleanHash.split('/')[1]);
      } else if (cleanHash && cleanHash !== 'portal') {
        setActiveRoute(cleanHash);
      } else {
        setActiveRoute('dashboard');
      }
    };
    window.addEventListener('hashchange', sync);
    sync();
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const handleNavClick = (route: string) => {
    window.location.hash = `#/portal/${route}`;
    setActiveRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderModule = () => {
    if (children) return children;
    switch (activeRoute) {
      case 'dashboard': return <Dashboard />;
      case 'crm': return <CRM />;
      case 'tickets': return <HelpDesk />;
      case 'processos': return <Process />;
      case 'publicacoes': return <Publication />;
      case 'agenda': return <AgendaModule />;
      case 'documentos': return <Documents />;
      case 'configuracoes': return <Config />;
      case 'processo-view': return <ProcessoDetails360 id={processoId!} userRole="admin" onBack={() => handleNavClick('processos')} />;
      case 'canvas': return <PaginaEmBranco onBack={() => handleNavClick('dashboard')} />;
      default: return <Dashboard />;
    }
  };

  // Cores dinâmicas para o Header
  const headerClass = isScrolled 
    ? 'bg-white shadow-lg border-b border-slate-100 py-3' 
    : 'bg-[#1a2b4a] py-6'; // Azul escuro sólido quando no topo para contraste perfeito com texto branco

  const textClass = isScrolled ? 'text-brand-primary' : 'text-white';
  const logoVariant = isScrolled ? 'dark' : 'light';
  const buttonClass = isScrolled 
    ? 'text-slate-500 hover:text-brand-primary hover:bg-slate-50' 
    : 'text-white/70 hover:text-white hover:bg-white/10';
  const activeClass = isScrolled
    ? 'text-brand-secondary bg-brand-accent font-bold'
    : 'text-brand-secondary bg-white/10 font-bold';

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col w-full selection:bg-brand-secondary/30">
      
      {/* SMART HEADER (FIXED TOP) */}
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${headerClass}`}>
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => handleNavClick('dashboard')}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center p-1.5 transition-transform group-hover:scale-105 ${isScrolled ? 'bg-brand-primary' : 'bg-white/10 border border-white/20'}`}>
              <Logo variant={isScrolled ? 'light' : 'light'} /> 
            </div>
            <div className="hidden md:block">
              <Typography variant="h4" font="serif" className={`${textClass} text-lg leading-none transition-colors`}>Kernel Admin</Typography>
              <Typography variant="caption" className="text-brand-secondary text-[8px] font-black tracking-[0.3em] uppercase block mt-1">Hermida Maia</Typography>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeRoute === item.id ? activeClass : buttonClass}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* User & Actions */}
          <div className="flex items-center gap-4">
            <div className={`hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full border ${isScrolled ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'}`}>
               <div className="w-6 h-6 rounded-full bg-brand-secondary flex items-center justify-center text-[10px] font-black text-brand-primary">
                 {user?.email?.[0].toUpperCase() || 'A'}
               </div>
               <span className={`text-[10px] font-bold ${textClass} opacity-80`}>{user?.email?.split('@')[0] || 'Admin'}</span>
            </div>

            <button 
              onClick={onLogout} 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-rose-500 hover:text-white ${isScrolled ? 'text-rose-500 bg-rose-50' : 'text-white/60 bg-white/5'}`}
            >
               <LogOut size={16} /> <span className="hidden sm:inline">Sair</span>
            </button>

            {/* Mobile Toggle */}
            <button 
              className={`lg:hidden p-2 rounded-lg ${textClass}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-brand-primary pt-24 px-6 pb-6 lg:hidden animate-in slide-in-from-top-10">
          <div className="grid gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-4 p-4 rounded-2xl text-left transition-all ${activeRoute === item.id ? 'bg-brand-secondary text-brand-primary font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
              >
                {item.icon}
                <span className="text-sm font-black uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content (Offset for fixed header) */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto p-6 lg:p-12 pt-28 lg:pt-32 animate-in fade-in duration-500">
        {renderModule()}
      </main>
    </div>
  );
};
