import React from 'react';

export const BlankPageGeneric: React.FC = () => {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ fontFamily: 'sans-serif', color: '#ccc' }}>Página em Branco</h1>
    </div>
  );
};