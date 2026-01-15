import React from 'react';
import { HeroSection } from '../components/home/HeroSection.tsx';
import { ServicesGrid } from '../components/home/ServicesGrid.tsx';
import { AIHubSection } from '../components/home/AIHubSection.tsx';
import { FeaturedBlog } from '../components/home/FeaturedBlog.tsx';
import { Footer } from '../components/layout/Footer.tsx';

/**
 * HM-V12: PÁGINA INICIAL RESTAURADA
 * Orquestração completa de seções públicas para advocacia digital.
 */
export const Inicio: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen w-full bg-white selection:bg-brand-secondary/30 antialiased">
      <div className="animate-in fade-in duration-1000 ease-out fill-mode-both">
        
        {/* Seção Hero: Impacto Inicial */}
        <HeroSection onCTAClick={() => onNavigate('contato')} />
        
        <main className="relative z-10 bg-white">
          {/* Grade de Serviços Estratégicos */}
          <ServicesGrid 
            onNavigateToSuper={() => onNavigate('superendividamento')} 
            onNavigateToBancario={() => onNavigate('direito-bancario')}
          />
          
          {/* Hub de Utilidade Pública: Onde Conciliar */}
          <AIHubSection />
          
          {/* Artigos em Destaque: Autoridade Jurídica */}
          <FeaturedBlog onSeeAll={() => onNavigate('blog')} />
        </main>

        {/* Rodapé Institucional */}
        <Footer />
      </div>
    </div>
  );
};