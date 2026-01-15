
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
    h1: 'text-4xl md:text-7xl font-bold leading-tight',
    h2: 'text-3xl md:text-5xl font-bold leading-tight',
    h3: 'text-2xl md:text-4xl font-bold',
    h4: 'text-xl md:text-2xl font-bold',
    body: 'text-base md:text-lg font-light leading-relaxed',
    small: 'text-sm font-medium',
    caption: 'text-xs font-bold uppercase tracking-widest',
  };

  const Component = ['h1', 'h2', 'h3', 'h4'].includes(variant) ? variant : 'p';

  return (
    <Component className={`${baseStyles} ${variants[variant as keyof typeof variants]} ${className}`}>
      {children}
    </Component>
  );
};
