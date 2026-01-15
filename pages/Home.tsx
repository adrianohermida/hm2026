
import React from 'react';
import { tokens } from '../styles/tokens.ts';
import { HeroSection } from '../components/home/HeroSection.tsx';
import { ServicesGrid } from '../components/home/ServicesGrid.tsx';
import { AIHubSection } from '../components/home/AIHubSection.tsx';
import { FeaturedBlog } from '../components/home/FeaturedBlog.tsx';
import { Footer } from '../components/organisms/Footer.tsx';
import { AdminShield } from '../components/AdminShield.tsx';

/**
 * HM-V12: HOME PAGE ORCHESTRATOR
 * 
 * Ordem de renderização solicitada:
 * 1. HeroSection
 * 2. ServicesGrid
 * 3. AIHubSection
 * 4. FeaturedBlog
 * 5. Footer
 */
export const Home: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div 
      className="relative min-h-screen w-full overflow-x-hidden antialiased selection:bg-brand-secondary/30"
      style={{ backgroundColor: tokens.colors.brand.white }}
    >
      {/* 1. SEÇÃO HERO: IMPACTO E AUTORIDADE */}
      <HeroSection onCTAClick={(route) => onNavigate(route || 'contato')} />

      <main className="relative z-10">
        {/* 2. GRADE DE SERVIÇOS: SOLUÇÕES ESTRATÉGICAS */}
        <div style={{ paddingBottom: tokens.spacing.md }}>
          <ServicesGrid 
            onNavigateToSuper={() => onNavigate('superendividamento')} 
            onNavigateToBancario={() => onNavigate('direito-bancario')}
          />
        </div>

        {/* 3. HUB DE UTILIDADE PÚBLICA / CONCILIAÇÃO */}
        <div className="border-y border-slate-100">
          <AIHubSection />
        </div>

        {/* 4. CONTEÚDO EDUCACIONAL: BLOG EM DESTAQUE */}
        <div style={{ paddingTop: tokens.spacing.md }}>
          <FeaturedBlog onSeeAll={() => onNavigate('blog')} />
        </div>
      </main>

      {/* 5. RODAPÉ INSTITUCIONAL E COMPLIANCE - Master Organism */}
      <Footer />

      {/* GOVERNANÇA: ADMIN SHIELD SEMPRE ATIVO EM BACKGROUND */}
      <AdminShield />
    </div>
  );
};

export default Home;
