
import React from 'react';
import { ContactPage as ContactOrganism } from '../components/organisms/ContactPage.tsx';
import { Footer } from '../components/organisms/Footer.tsx';

export const ContatoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <ContactOrganism />
      <Footer />
    </div>
  );
};
