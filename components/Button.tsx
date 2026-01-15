
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
    primary: 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20',
    secondary: 'bg-brand-secondary text-white hover:bg-brand-secondary/90 shadow-lg shadow-brand-secondary/20',
    outline: 'border-2 border-brand-primary/20 bg-transparent text-brand-primary hover:bg-brand-accent',
    ghost: 'text-brand-primary hover:bg-brand-accent',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs rounded-lg',
    md: 'px-6 py-3 text-sm rounded-full',
    lg: 'px-10 py-5 text-lg rounded-2xl',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};
