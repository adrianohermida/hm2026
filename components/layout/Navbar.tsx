import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ChevronRight, LayoutGrid, MessageSquare, BookOpen, User, ShieldCheck, HelpCircle } from 'lucide-react';
import { Container } from '../ui/Container.tsx';
import { Typography } from '../ui/Typography.tsx';
import { Button } from '../ui/Button.tsx';
import { Logo } from '../ui/Logo.tsx';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLightPage = ['escritorio', 'blog', 'contato', 'superendividamento', 'direito-bancario', 'recuperacao-falencia', 'blogspot', 'ajuda'].includes(currentPage);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = useCallback((route: string, sectionId?: string) => {
    setMobileOpen(false);
    if (route === 'home') {
      if (currentPage === 'home' && sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
          const navHeight = 70;
          const targetPos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      } else {
        onNavigate('home');
        if (sectionId) {
          setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 70, behavior: 'smooth' });
          }, 400);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    } else {
      onNavigate(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, onNavigate]);

  const navItems = [
    { label: 'Início', route: 'home', icon: <LayoutGrid size={20}/> },
    { label: 'O Sócio', route: 'escritorio', icon: <User size={20}/> },
    { label: 'Soluções', route: 'home', section: 'servicos', icon: <Logo className="w-5 h-5" variant="light" /> },
    { label: 'Educação', route: 'blog', icon: <BookOpen size={20}/> },
    { label: 'Ajuda', route: 'ajuda', icon: <HelpCircle size={20}/> },
    { label: 'Contato', route: 'contato', icon: <MessageSquare size={20}/> }
  ];

  const hasBackground = isScrolled || isLightPage || mobileOpen;

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 h-[75px] md:h-[90px] flex items-center ${
        hasBackground ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm' : 'bg-transparent'
      }`}>
        <Container className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3 cursor-pointer group z-[160]" onClick={() => handleNavigation('home')}>
            <div className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl transition-all duration-500 p-2 shadow-lg border border-transparent ${
              hasBackground ? 'bg-brand-primary border-white/10' : 'bg-white'
            }`}>
              <Logo variant={hasBackground ? 'light' : 'dark'} />
            </div>
            <div className="flex flex-col">
              <Typography variant="h4" font="serif" className={`text-sm md:text-xl tracking-tighter transition-colors ${hasBackground ? 'text-brand-primary' : 'text-white'}`}>
                Hermida <span className="text-brand-secondary italic font-normal">Maia</span>
              </Typography>
              <span className={`text-[6px] md:text-[8px] font-black uppercase tracking-[0.2em] transition-colors ${hasBackground ? 'text-brand-secondary' : 'text-brand-secondary/80'}`}>
                Advocacia Especializada
              </span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button 
                key={item.label} 
                onClick={() => handleNavigation(item.route, item.section)}
                className={`text-[9px] font-black uppercase tracking-widest hover:text-brand-secondary transition-all py-2 border-b-2 border-transparent ${
                  hasBackground ? 'text-slate-600' : 'text-white/90'
                } ${currentPage === item.route ? 'border-brand-secondary text-brand-secondary' : ''}`}
              >
                {item.label}
              </button>
            ))}
            <Button variant={hasBackground ? "primary" : "secondary"} size="sm" onClick={() => onNavigate('login')} className="h-11 px-8 rounded-xl text-[9px]">PORTAL</Button>
          </div>

          <button 
            className={`lg:hidden p-3 rounded-xl active:scale-90 transition-all z-[160] ${
              hasBackground ? 'bg-brand-primary text-brand-secondary shadow-lg' : 'bg-white/10 text-white backdrop-blur-md border border-white/10'
            }`} 
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </Container>
      </nav>

      <div className={`fixed inset-0 z-[150] lg:hidden transition-all duration-500 ease-in-out ${
        mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-[#05080F]" />
        <Container className="relative h-full flex flex-col pt-24 pb-8">
          <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar-dark">
            {navItems.map((item, i) => (
              <button 
                key={item.label}
                onClick={() => handleNavigation(item.route, item.section)}
                className="w-full flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 active:bg-brand-secondary active:text-brand-primary transition-all group"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-brand-primary border border-white/10 flex items-center justify-center p-2">
                    {item.label === 'Soluções' ? <Logo variant="light" /> : item.icon}
                  </div>
                  <Typography variant="h4" font="serif" className="text-white group-active:text-brand-primary text-2xl">
                    {item.label}
                  </Typography>
                </div>
                <ChevronRight size={20} className="text-brand-secondary group-active:text-brand-primary" />
              </button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
            <Button variant="secondary" fullWidth onClick={() => { setMobileOpen(false); onNavigate('login'); }} className="h-16 rounded-2xl text-[10px] shadow-2xl">
              ACESSAR PORTAL DO CLIENTE
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};