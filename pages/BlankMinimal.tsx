
import React from 'react';

/**
 * HM-V12: BLANK MINIMAL (STABILIZATION MODE)
 * Esta página não possui dependências, ícones ou chamadas de API.
 * Use-a para destravar a IDE de erros 429/PH1.
 */
export const BlankMinimal: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#F8FAFC',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ opacity: 0.1, fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.5em', marginBottom: '20px' }}>
        HM-KERNEL-STANDBY
      </div>
      
      <button 
        onClick={onBack}
        style={{
          padding: '12px 24px',
          backgroundColor: '#1a2b4b',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '12px'
        }}
      >
        VOLTAR AO SISTEMA
      </button>

      <div style={{ marginTop: '40px', color: '#94a3b8', fontSize: '10px' }}>
        Ambiente em modo de segurança. Sem consumo de rede ativo.
      </div>
    </div>
  );
};
