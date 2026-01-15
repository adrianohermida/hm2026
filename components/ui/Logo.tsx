import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // light = branco (para fundo escuro), dark = dourado/preto (para fundo claro)
}

/**
 * HM-V12: LOGO ENGINE - MINIMALIST 'HM' VERSION
 * Renderiza exclusivamente o monograma 'HM' em maiúsculo e sem itálico.
 * Utiliza a tipografia Libre Baskerville integrada para manter a autoridade da marca.
 */
export const Logo: React.FC<LogoProps> = ({ className = "w-full h-full", variant = 'light' }) => {
  const color = variant === 'light' ? '#FFFFFF' : '#c5a059';

  return (
    <div className={`${className} flex items-center justify-center select-none transition-all duration-500`}>
      <svg 
        viewBox="0 0 80 50" 
        className="w-full h-full" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <text 
          x="50%" 
          y="50%" 
          dominantBaseline="middle" 
          textAnchor="middle" 
          fill={color} 
          style={{ 
            fontFamily: "'Libre Baskerville', serif", 
            fontWeight: 800, 
            fontSize: '32px', // Ajustado levemente para acomodar maiúsculas no viewBox
            fontStyle: 'normal',
            letterSpacing: '-0.02em'
          }}
        >
          HM
        </text>
      </svg>
    </div>
  );
};