
import React from 'react';
import { SuperendividamentoPage as SuperOrganism } from '../components/organisms/SuperendividamentoPage.tsx';
import { Footer } from '../components/organisms/Footer.tsx';

export const SuperendividamentoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SuperOrganism />
      <Footer />
    </div>
  );
};
