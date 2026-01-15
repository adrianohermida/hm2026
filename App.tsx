
import React, { useState, useEffect, useCallback } from 'react';
import Home from './pages/Home.tsx';
import { BancarioPage } from './pages/Bancario.tsx';
import { SuperendividamentoPage } from './pages/Superendividamento.tsx';
import { RecuperacaoPage } from './pages/Recuperacao.tsx';
import { BlogPage } from './pages/Blog.tsx';
import { PostViewPage } from './pages/BlogPost.tsx';
import { SobrePage } from './pages/Sobre.tsx';
import { ContatoPage } from './pages/Contato.tsx';
import { AuthPage } from './auth/login.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { AuthCallback } from './pages/AuthCallback.tsx';
import { PortalPage } from './components/organisms/PortalPage.tsx';
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

  // HM-V12: Router de Sincronia para GitHub Pages (Hash Navigation)
  const syncRoute = useCallback(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    
    if (!hash) {
      if (currentPage !== 'home') setCurrentPage('home');
      return;
    }

    // Rotas protegidas ou especiais
    if (hash.startsWith('portal')) {
      if (isAuthenticated) setCurrentPage('portal');
      else {
        window.location.hash = '#/login';
        setCurrentPage('login');
      }
      return;
    }

    if (hash === 'perfil') {
      if (isAuthenticated) setCurrentPage('perfil');
      else setCurrentPage('login');
      return;
    }

    // Mapeamento direto de rotas públicas
    const validRoutes = [
      'home', 
      'direito-bancario', 
      'superendividamento', 
      'recuperacao-falencia', 
      'blog', 
      'escritorio', 
      'contato', 
      'ajuda', 
      'login', 
      'balcao-virtual', 
      'agendamento',
      'auth-callback'
    ];

    if (validRoutes.includes(hash)) {
      setCurrentPage(hash);
    }
  }, [isAuthenticated, currentPage]);

  useEffect(() => {
    // 1. Expor trigger do Chat
    (window as any).triggerHMChat = () => setIsChatOpen(true);
    
    // 2. Sincronia Inicial (Mount)
    syncRoute();

    // 3. Listener de Mudança de Hash
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, [syncRoute]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo(0, 0);
  };

  const handleLogin = (role: 'admin' | 'cliente', userData?: any) => {
    setUserRole(role);
    setUser(userData || { email: 'user@hermidamaia.adv.br', name: 'Usuário' });
    setIsAuthenticated(true);
    setCurrentPage('portal');
    
    if (role === 'admin') {
      window.location.hash = '#/portal/dashboard';
    } else {
      window.location.hash = '#/portal/overview';
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('home');
    window.location.hash = '#/home';
  };

  const navigateToPost = (post: ArtigoBlog) => {
    setSelectedPost(post);
    setCurrentPage('blogspot');
    window.scrollTo(0, 0);
  };

  const showNavbar = !['balcao-virtual', 'auth-callback'].includes(currentPage);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-secondary/30">
      {showNavbar && (
        <Navbar 
          onNavigate={handleNavigate} 
          currentPage={currentPage}
          isAuthenticated={isAuthenticated}
          user={user}
          userRole={userRole}
          onLogout={handleLogout}
        />
      )}

      <main className={showNavbar ? "pt-20 md:pt-24" : ""}>
        {isAuthenticated && currentPage === 'portal' ? (
          userRole === 'admin' ? (
            <PortalPage 
              isAdmin={true} 
              onLogout={handleLogout} 
              onNavigate={handleNavigate} 
              user={user} 
            />
          ) : (
            <ClientPortal user={user} onLogout={handleLogout} />
          )
        ) : (
          <>
            {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
            {currentPage === 'direito-bancario' && <BancarioPage />}
            {currentPage === 'superendividamento' && <SuperendividamentoPage />}
            {currentPage === 'recuperacao-falencia' && <RecuperacaoPage />}
            {currentPage === 'blog' && <BlogPage onPostClick={navigateToPost} />}
            {currentPage === 'blogspot' && selectedPost && <PostViewPage post={selectedPost} />}
            {currentPage === 'escritorio' && <SobrePage />}
            {currentPage === 'contato' && <ContatoPage />}
            {currentPage === 'ajuda' && <HelpCenter onNavigate={handleNavigate} />}
            {currentPage === 'perfil' && <ProfilePage onBack={() => handleNavigate('portal')} />}
            {currentPage === 'auth-callback' && <AuthCallback onComplete={() => handleNavigate('portal')} />}
            {currentPage === 'balcao-virtual' && <BalcaoVirtual onBack={() => handleNavigate('home')} />}
            {currentPage === 'login' && <AuthPage onLogin={handleLogin} onBack={() => handleNavigate('home')} />}
            {currentPage === 'agendamento' && <AppointmentsPage onBack={() => handleNavigate('home')} />}
          </>
        )}
      </main>

      {!['portal', 'login', 'balcao-virtual', 'auth-callback'].includes(currentPage) && (
        <LegalChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      )}
    </div>
  );
};

export default App;
