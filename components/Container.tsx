
import React from 'react';

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

export const Container: React.FC<ContainerProps> = ({ 
  className = '', 
  children, 
  as: Component = 'div' 
}) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};
