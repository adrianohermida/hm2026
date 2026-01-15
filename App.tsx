
import React, { useState, useEffect } from 'react';
import Home from './pages/Home.tsx';
import { BancarioPage } from './pages/Bancario.tsx';
import { SuperendividamentoPage } from './pages/Superendividamento.tsx';
import { RecuperacaoPage } from './pages/Recuperacao.tsx';
import { BlogPage } from './pages/Blog.tsx';
import { PostViewPage } from './pages/BlogPost.tsx';
import { SobrePage } from './pages/Sobre.tsx';
import { ContatoPage } from './pages/Contato.tsx';
import { AuthPage } from './auth/login.tsx';
import { PortalPage } from './components/PortalPage.tsx';
import { ClientPortal } from './components/organisms/Portal/ClientPortal.tsx';
import { Navbar } from './components/layout/Navbar.tsx';
import { LegalChatWidget } from './components/LegalChatWidget.tsx';
import { BalcaoVirtual } from './pages/BalcaoVirtual.tsx';
import { HelpCenter } from './pages/HelpCenter.tsx';
import { AppointmentsPage } from './pages/AppointmentsPage.tsx';
import { ArtigoBlog } from './types.ts';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPost, setSelectedPost] = useState<ArtigoBlog | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'cliente'>('cliente');
  const [user, setUser] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    (window as any).triggerHMChat = () => setIsChatOpen(true);
    
    // Sincronia de rota via Hash para Deep Linking no Portal
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '');
      if (hash && isAuthenticated) {
        setCurrentPage('portal');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [isAuthenticated]);

  const handleLogin = (role: 'admin' | 'cliente', userData?: any) => {
    setUserRole(role);
    setUser(userData || { email: 'user@hermidamaia.adv.br', name: 'Usuário' });
    setIsAuthenticated(true);
    setCurrentPage('portal');
    // Força o dashboard como rota inicial se for admin
    if (role === 'admin') window.location.hash = '#/dashboard';
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('home');
    window.location.hash = '';
  };

  const navigateToPost = (post: ArtigoBlog) => {
    setSelectedPost(post);
    setCurrentPage('blogspot');
    window.scrollTo(0, 0);
  };

  // RENDERIZAÇÃO CONDICIONAL DO PORTAL (Modo Root)
  if (isAuthenticated) {
    if (userRole === 'admin') {
      return (
        <PortalPage 
          isAdmin={true} 
          onLogout={handleLogout} 
          onNavigate={(p) => setCurrentPage(p)} 
          user={user} 
        />
      );
    }
    return <ClientPortal user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-secondary/30">
      {!['login', 'portal', 'balcao-virtual'].includes(currentPage) && (
        <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      )}

      {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
      {currentPage === 'direito-bancario' && <BancarioPage />}
      {currentPage === 'superendividamento' && <SuperendividamentoPage />}
      {currentPage === 'recuperacao-falencia' && <RecuperacaoPage />}
      {currentPage === 'blog' && <BlogPage onPostClick={navigateToPost} />}
      {currentPage === 'blogspot' && selectedPost && <PostViewPage post={selectedPost} />}
      {currentPage === 'escritorio' && <SobrePage />}
      {currentPage === 'contato' && <ContatoPage />}
      {currentPage === 'ajuda' && <HelpCenter onNavigate={setCurrentPage} />}
      {currentPage === 'balcao-virtual' && <BalcaoVirtual onBack={() => setCurrentPage('home')} />}
      {currentPage === 'login' && <AuthPage onLogin={handleLogin} onBack={() => setCurrentPage('home')} />}
      {currentPage === 'agendamento' && <AppointmentsPage onBack={() => setCurrentPage('home')} />}

      {!['portal', 'login', 'balcao-virtual'].includes(currentPage) && (
        <LegalChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      )}
    </div>
  );
};

export default App;
