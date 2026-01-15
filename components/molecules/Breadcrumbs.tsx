
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Typography } from '../atoms/Typography.tsx';
// Corrigido: Importando a interface correta de contracts.ts
import { IModuleSkeleton } from '../../modules/contracts.ts';

/**
 * HM-V12 BREADCRUMBS
 * Navegação contextual baseada no manifesto do módulo ativo.
 */

interface BreadcrumbsProps {
  // Corrigido: Utilizando IModuleSkeleton ao invés de ModuleSkeleton que não era exportado
  module: IModuleSkeleton;
  onNavigate: (route: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ module, onNavigate }) => {
  return (
    <nav className="flex items-center gap-2 mb-6 text-slate-400">
      <button 
        onClick={() => onNavigate('dashboard')} 
        className="hover:text-brand-secondary transition-colors"
      >
        <Home size={14} />
      </button>
      
      {module.breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={12} className="opacity-30" />
          {crumb.isClickable ? (
            <button 
              onClick={() => onNavigate(crumb.route)}
              className="text-[10px] font-black uppercase tracking-widest hover:text-brand-primary transition-colors"
            >
              {crumb.label}
            </button>
          ) : (
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary/40">
              {crumb.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
