
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Container } from '../components/atoms/Container.tsx';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';
import { CanvasSkeleton } from '../modules/canvas/canvas-skeleton.tsx';
import { CanvasRouter } from '../modules/canvas/canvas-router.ts';

export const PaginaEmBranco: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <Container className="relative z-10 text-center max-w-2xl animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center mx-auto mb-10 border border-slate-100 relative group">
          {CanvasSkeleton.titleIcon}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-primary rounded-xl flex items-center justify-center border-2 border-white animate-bounce">
            {CanvasSkeleton.badgeIcon}
          </div>
        </div>
        
        <Typography variant="h1" font="serif" className="text-brand-primary mb-6 text-5xl">
          {CanvasSkeleton.pageTitle.split(' ')[0]} <span className="text-brand-secondary italic">{CanvasSkeleton.pageTitle.split(' ')[1]}</span>
        </Typography>
        
        <Typography variant="body" className="text-slate-400 mb-12 leading-relaxed">
          {CanvasSkeleton.description}
        </Typography>

        <div className="flex justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => CanvasRouter.navigateBack(onBack)}
            className="border-slate-200 text-brand-primary bg-white hover:bg-slate-50 h-14 px-8 rounded-2xl"
            icon={<ArrowLeft size={18} />}
          >
            {CanvasSkeleton.placeholders.backButton}
          </Button>
          <Button 
            variant="secondary"
            className="h-14 px-8 rounded-2xl shadow-xl shadow-brand-secondary/20 font-black uppercase text-[10px] tracking-widest"
            onClick={() => CanvasRouter.handleSynthesis({ module: CanvasSkeleton.name })}
          >
            {CanvasSkeleton.placeholders.actionButton}
          </Button>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center gap-2 opacity-20">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-primary">{CanvasSkeleton.metadata.arch}</span>
          <span className="text-[8px] font-bold text-slate-400 italic">Core Version {CanvasSkeleton.metadata.version}</span>
        </div>
      </Container>
    </div>
  );
};
