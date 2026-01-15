import React from 'react';
import { Footer } from '../components/organisms/Footer.tsx';

export const Blank: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Corpo vazio (Branco) */}
      <div className="flex-1 bg-white" />
      
      {/* Rodapé com fundo #1a2b4a e identidade do cabeçalho */}
      <Footer />
    </div>
  );
};