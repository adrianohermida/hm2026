
import React from 'react';
import { AboutPage } from '../components/organisms/AboutPage.tsx';
import { Footer } from '../components/organisms/Footer.tsx';

export const SobrePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <AboutPage />
      <Footer />
    </div>
  );
};
