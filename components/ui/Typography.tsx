import React from 'react';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small' | 'caption';
  font?: 'sans' | 'serif';
  className?: string;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({ 
  variant = 'body', 
  font = 'sans', 
  className = '', 
  children 
}) => {
  const baseStyles = font === 'serif' ? 'font-serif' : 'font-sans';
  
  const variants = {
    // Escala Responsiva Otimizada
    h1: 'text-4xl md:text-6xl lg:text-8xl font-bold leading-[1.1] tracking-tight',
    h2: 'text-3xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight',
    h3: 'text-2xl md:text-3xl lg:text-4xl font-bold leading-tight',
    h4: 'text-xl md:text-2xl font-bold leading-snug',
    body: 'text-base md:text-lg lg:text-xl font-light leading-relaxed',
    small: 'text-sm font-medium tracking-tight',
    caption: 'text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]',
  };

  const Component = ['h1', 'h2', 'h3', 'h4'].includes(variant) ? variant : 'p';

  return (
    <Component className={`${baseStyles} ${variants[variant as keyof typeof variants]} ${className} antialiased`}>
      {children}
    </Component>
  );
};