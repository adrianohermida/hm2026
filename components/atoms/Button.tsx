import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  icon, 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    // HM-V12: Botão Primário agora utiliza #1a2b4a (brand-button)
    primary: 'bg-brand-button text-white hover:bg-[#233a64] shadow-lg shadow-brand-button/20',
    secondary: 'bg-brand-secondary text-white hover:bg-brand-secondaryLight shadow-lg shadow-brand-secondary/20',
    outline: 'border-2 border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20',
    ghost: 'text-brand-primary hover:bg-brand-accent',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs rounded-lg',
    md: 'px-6 py-3 text-sm rounded-full',
    lg: 'px-10 py-5 text-lg rounded-2xl',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};