
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Menu, X, ChevronDown, User, Shield, LogOut, 
  LayoutDashboard, Phone, ExternalLink, Briefcase, Settings
} from 'lucide-react';
import { Container } from '../ui/Container.tsx';
import { Typography } from '../ui/Typography.tsx';
import { Button } from '../ui/Button.tsx';
import { Logo } from '../ui/Logo.tsx';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  isAuthenticated: boolean;
  user: any;
  userRole: 'admin' | 'cliente';
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  currentPage, 
  isAuthenticated, 
  user, 
  userRole, 
  onLogout 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Pages that have a dark hero section (White text is readable)
  const DARK_HERO_PAGES = ['home', 'escritorio', 'blog', 'blogspot', 'ajuda', 'agendamento'];
  const hasDarkHero = DARK_HERO_PAGES.includes(currentPage);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isAdmin = userRole === 'admin' || (user?.email && ["contato@hermidamaia.adv.br", "adrianohermida@gmail.com"].includes(user.email.toLowerCase()));

  const handleNavigation = useCallback((route: string, hash?: string) => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    setServicesOpen(false);
    if (hash) {
      window.location.hash = hash;
      onNavigate(route);
    } else {
      onNavigate(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [onNavigate]);

  // V12.2: Lógica de Contraste Inteligente
  // Se não for página com Hero Escuro, força o background branco e texto escuro imediatamente
  const forceSolidNav = isScrolled || mobileOpen || !hasDarkHero;

  const navBackground = forceSolidNav
    ? 'bg-white/95 backdrop-blur-xl border-slate-200 shadow-md' 
    : 'bg-transparent border-transparent';

  const textColor = forceSolidNav
    ? 'text-brand-primary'
    : 'text-white';

  const hoverColor = 'hover:text-brand-secondary';
  const logoVariant = forceSolidNav ? 'dark' : 'light';

  return (
    <nav className={`fixed top-0 left-0 w-full z-[150] transition-all duration-500 h-20 md:h-24 flex items-center border-b ${navBackground}`}>
      <Container className="flex justify-between items-center w-full">
        {/* LOGO & BRAND */}
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => handleNavigation('home')}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center p-2 shadow-xl transition-transform group-hover:scale-105 ${
            forceSolidNav
              ? 'bg-brand-primary border border-brand-primary' 
              : 'bg-white/10 backdrop-blur-md border border-white/20'
          }`}>
            <Logo variant={forceSolidNav ? 'light' : 'light'} />
          </div>
          <div className="flex flex-col">
            <span className={`${textColor} font-black text-sm md:text-lg leading-tight uppercase tracking-tighter transition-colors`}>Dr. Adriano Hermida Maia</span>
            <span className="text-brand-secondary text-[8px] font-black uppercase tracking-[0.3em]">Defesa do Superendividamento</span>
          </div>
        </div>
        
        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => handleNavigation('home')}
              className={`${textColor} ${hoverColor} transition-colors text-[10px] font-black uppercase tracking-widest`}
            >
              Início
            </button>

            <button 
              onClick={() => handleNavigation('escritorio')}
              className={`${textColor} ${hoverColor} transition-colors text-[10px] font-black uppercase tracking-widest`}
            >
              Sobre
            </button>

            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button 
                className={`flex items-center gap-1 ${textColor} ${hoverColor} transition-colors text-[10px] font-black uppercase tracking-widest`}
              >
                Serviços <ChevronDown size={12} className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="absolute top-full -left-4 pt-4">
                  <div className="w-64 bg-white border border-slate-100 rounded-2xl p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5">
                    <button onClick={() => handleNavigation('superendividamento')} className="block w-full text-left px-4 py-3 text-slate-600 hover:text-brand-primary hover:bg-slate-50 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">Superendividamento</button>
                    <button onClick={() => handleNavigation('direito-bancario')} className="block w-full text-left px-4 py-3 text-slate-600 hover:text-brand-primary hover:bg-slate-50 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">Direito Bancário</button>
                    <button onClick={() => handleNavigation('recuperacao-falencia')} className="block w-full text-left px-4 py-3 text-slate-600 hover:text-brand-primary hover:bg-slate-50 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">Recuperação</button>
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => handleNavigation('blog')}
              className={`${textColor} ${hoverColor} transition-colors text-[10px] font-black uppercase tracking-widest`}
            >
              Blog
            </button>

            <button 
              onClick={() => handleNavigation('contato')}
              className={`${textColor} ${hoverColor} transition-colors text-[10px] font-black uppercase tracking-widest`}
            >
              Contato
            </button>
          </div>

          <div className={`h-8 w-px mx-2 ${forceSolidNav ? 'bg-slate-200' : 'bg-white/10'}`} />

          {isAuthenticated ? (
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`flex items-center gap-3 rounded-full pl-2 pr-4 py-1.5 transition-all group ${
                  forceSolidNav
                    ? 'bg-slate-100 hover:bg-slate-200 border border-slate-200' 
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-brand-secondary flex items-center justify-center text-brand-primary font-black text-xs shadow-lg">
                  {user?.name?.[0] || user?.email?.[0].toUpperCase()}
                </div>
                <span className={`${forceSolidNav ? 'text-brand-primary' : 'text-white/80'} text-[10px] font-black uppercase tracking-widest hidden xl:inline`}>
                  {user?.name?.split(' ')[0] || 'Painel'}
                </span>
                <ChevronDown size={14} className={`${forceSolidNav ? 'text-slate-400' : 'text-white/40'} transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-4 w-72 bg-white border border-slate-100 rounded-[2rem] shadow-2xl py-4 animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5">
                  <div className="px-6 py-4 border-b border-slate-50 mb-2">
                    <p className="text-brand-primary font-bold text-sm truncate">{user?.name || 'Usuário'}</p>
                    <p className="text-slate-400 text-[10px] truncate font-medium">{user?.email}</p>
                  </div>
                  
                  {isAdmin && (
                    <button 
                      onClick={() => handleNavigation('portal', '#/portal/dashboard')}
                      className="w-full flex items-center gap-3 px-6 py-3.5 text-[10px] text-brand-secondary font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                    >
                      <Shield size={16} /> Painel Administrativo
                    </button>
                  )}

                  <button 
                    onClick={() => handleNavigation('perfil', '#/perfil')}
                    className="w-full flex items-center gap-3 px-6 py-3.5 text-[10px] text-slate-600 font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                  >
                    <User size={16} /> Meu Perfil
                  </button>
                  
                  <button 
                    onClick={() => handleNavigation('portal', '#/portal/overview')}
                    className="w-full flex items-center gap-3 px-6 py-3.5 text-[10px] text-slate-600 font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                  >
                    <LayoutDashboard size={16} /> Meu Painel Cliente
                  </button>

                  <div className="h-px bg-slate-50 my-2 mx-6" />
                  
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-6 py-3.5 text-[10px] text-rose-500 font-black uppercase tracking-widest hover:bg-rose-50 transition-all"
                  >
                    <LogOut size={16} /> Sair do Sistema
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => onNavigate('login')}
              className={`${
                forceSolidNav ? 'bg-slate-100 hover:bg-slate-200 text-brand-primary border-slate-200' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
              } border px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2`}
            >
              <User size={16} /> Login
            </button>
          )}

          <a 
            href="https://wa.me/5551996032004" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-brand-secondary hover:bg-brand-secondaryLight text-brand-primary px-8 py-3.5 rounded-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-xl shadow-brand-secondary/20"
          >
            Monte Seu Plano
          </a>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          className={`lg:hidden p-3 rounded-xl border active:scale-90 transition-all ${
            forceSolidNav
              ? 'bg-slate-50 text-brand-primary border-slate-200' 
              : 'bg-white/10 text-white border-white/10'
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[80px] bg-white z-[140] p-8 flex flex-col gap-6 animate-in slide-in-from-top-10 shadow-2xl border-t border-slate-100 overflow-y-auto">
          <button onClick={() => handleNavigation('home')} className="text-left font-black uppercase text-brand-primary hover:text-brand-secondary tracking-widest border-b pb-4 border-slate-100">Início</button>
          <button onClick={() => handleNavigation('escritorio')} className="text-left font-black uppercase text-brand-primary hover:text-brand-secondary tracking-widest border-b pb-4 border-slate-100">Sobre</button>
          
          <div className="space-y-4 py-2 border-b border-slate-100">
            <span className="text-[10px] font-black uppercase text-brand-secondary tracking-widest">Serviços</span>
            <button onClick={() => handleNavigation('superendividamento')} className="block w-full text-left pl-4 text-slate-500 hover:text-brand-primary text-xs font-bold uppercase tracking-wide">Superendividamento</button>
            <button onClick={() => handleNavigation('direito-bancario')} className="block w-full text-left pl-4 text-slate-500 hover:text-brand-primary text-xs font-bold uppercase tracking-wide">Direito Bancário</button>
            <button onClick={() => handleNavigation('recuperacao-falencia')} className="block w-full text-left pl-4 text-slate-500 hover:text-brand-primary text-xs font-bold uppercase tracking-wide">Recuperação</button>
          </div>

          <button onClick={() => handleNavigation('blog')} className="text-left font-black uppercase text-brand-primary hover:text-brand-secondary tracking-widest border-b pb-4 border-slate-100">Blog</button>
          <button onClick={() => handleNavigation('contato')} className="text-left font-black uppercase text-brand-primary hover:text-brand-secondary tracking-widest border-b pb-4 border-slate-100">Contato</button>
          
          {!isAuthenticated && (
             <Button variant="secondary" fullWidth onClick={() => handleNavigation('login')} className="h-16 rounded-2xl shadow-xl mt-4">Login Portal</Button>
          )}
        </div>
      )}
    </nav>
  );
};
