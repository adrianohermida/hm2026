
import React, { useState, useEffect } from 'react';
import { Scale, LogIn, ChevronDown, Menu, X, FileText } from 'lucide-react';
import { Container } from './Container.tsx';
import { Typography } from './Typography.tsx';
import { Button } from './Button.tsx';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setShowServices(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white shadow-xl py-3 border-b border-slate-100' : 'bg-transparent py-8'}`}>
      <Container className="flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNav('home')}>
          <div className="w-10 h-10 bg-brand-primary flex items-center justify-center rounded-xl shadow-lg border border-brand-secondary/20 group-hover:scale-110 transition-transform">
            <Scale className="text-brand-secondary" size={20} />
          </div>
          <Typography variant="h4" font="serif" className={isScrolled ? 'text-brand-primary' : 'text-white'}>HM</Typography>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          <button onClick={() => handleNav('home')} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-brand-secondary ${isScrolled ? 'text-slate-600' : 'text-white/80'}`}>Início</button>
          
          <div className="relative" onMouseEnter={() => setShowServices(true)} onMouseLeave={() => setShowServices(false)}>
            <button className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all hover:text-brand-secondary ${isScrolled ? 'text-slate-600' : 'text-white/80'}`}>
              Serviços <ChevronDown size={12} className={`transition-transform duration-300 ${showServices ? 'rotate-180' : ''}`} />
            </button>
            {showServices && (
              <div className="absolute top-full -left-4 w-72 bg-white shadow-2xl rounded-[2rem] p-5 border border-slate-50">
                <div className="space-y-1">
                  <button onClick={() => handleNav('superendividamento')} className="w-full text-left p-4 text-[10px] font-black uppercase text-brand-primary hover:bg-brand-accent rounded-2xl transition-all">Superendividamento</button>
                  <button onClick={() => handleNav('direito-bancario')} className="w-full text-left p-4 text-[10px] font-black uppercase text-brand-primary hover:bg-brand-accent rounded-2xl transition-all">Direito Bancário</button>
                  <button onClick={() => handleNav('recuperacao-falencia')} className="w-full text-left p-4 text-[10px] font-black uppercase text-brand-primary hover:bg-brand-accent rounded-2xl transition-all">Recuperação e Falência</button>
                  <div className="h-[1px] bg-slate-100 my-3" />
                  <button onClick={() => handleNav('pagina-em-branco')} className="w-full text-left p-4 text-[10px] font-black uppercase text-slate-400 hover:bg-slate-50 rounded-2xl transition-all flex items-center gap-3">
                    <FileText size={14} /> Espaço em Branco
                  </button>
                </div>
              </div>
            )}
          </div>

          <button onClick={() => handleNav('sobre')} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-brand-secondary ${isScrolled ? 'text-slate-600' : 'text-white/80'}`}>Escritório</button>
          <button onClick={() => handleNav('blog')} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-brand-secondary ${isScrolled ? 'text-slate-600' : 'text-white/80'}`}>Conteúdo</button>
          <button onClick={() => handleNav('contato')} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-brand-secondary ${isScrolled ? 'text-slate-600' : 'text-white/80'}`}>Contato</button>
          
          <Button variant="secondary" size="sm" onClick={() => handleNav('login')} icon={<LogIn size={14}/>}>PORTAL</Button>
        </div>

        <button className="md:hidden p-2 text-brand-secondary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28}/> : <Menu size={28}/>}
        </button>
      </Container>
    </nav>
  );
};
