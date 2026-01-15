
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
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    (window as any).triggerHMChat = () => setIsChatOpen(true);
  }, []);

  const handleLogin = (role: any) => {
    setIsAuthenticated(true);
    setUserRole(role === 'admin' ? 'admin' : 'cliente');
    setCurrentPage('portal');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const navigateToPost = (post: ArtigoBlog) => {
    setSelectedPost(post);
    setCurrentPage('blogspot');
    window.scrollTo(0, 0);
  };

  if (isAuthenticated) {
    return <PortalPage isAdmin={userRole === 'admin'} onLogout={handleLogout} onNavigate={setCurrentPage} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans">
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
