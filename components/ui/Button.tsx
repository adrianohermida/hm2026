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
  const baseStyles = 'inline-flex items-center justify-center font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-2xl select-none';
  
  const variants = {
    primary: 'bg-brand-primary text-white hover:bg-brand-primaryLight shadow-xl shadow-brand-primary/20',
    secondary: 'bg-brand-secondary text-brand-primary hover:bg-brand-secondaryLight shadow-2xl shadow-brand-secondary/30',
    outline: 'border-2 border-brand-primary/20 bg-transparent text-brand-primary hover:bg-brand-accent hover:border-brand-primary/40',
    ghost: 'text-brand-primary hover:bg-brand-accent',
  };

  const sizes = {
    sm: 'px-6 py-3 text-[10px]',
    md: 'px-8 py-4 text-[11px]',
    lg: 'px-12 py-6 text-[12px]',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-3">{icon}</span>}
    </button>
  );
};