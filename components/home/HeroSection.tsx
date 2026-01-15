
import React from 'react';
import { MessageSquare, ChevronDown, Sparkles } from 'lucide-react';
import { Typography } from '../ui/Typography.tsx';
import { Button } from '../ui/Button.tsx';
import { Container } from '../ui/Container.tsx';
import { HomeSkeleton } from '../../modules/home/home-skeleton.tsx';

export const HeroSection: React.FC<{ onCTAClick: () => void }> = ({ onCTAClick }) => {
  const { hero } = HomeSkeleton;

  return (
    <section className="relative min-h-[90vh] md:h-[110vh] flex items-center justify-center overflow-hidden bg-[#05080F]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-[#c5a059]/10 blur-[180px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#1a2b4b]/20 blur-[150px] rounded-full animate-pulse-slow delay-700" />
      </div>
      
      <Container className="relative z-10 text-center px-4 md:px-12">
        <div className="flex flex-col items-center max-w-5xl mx-auto">
          
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 mb-8">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl px-8 py-2.5 rounded-full border border-white/10 shadow-2xl">
              <Sparkles className="w-4 h-4 text-[#c5a059] animate-pulse" />
              <Typography variant="caption" className="text-[#c5a059] text-[10px] md:text-[11px] font-black tracking-[0.3em]">
                {hero.badge}
              </Typography>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 mb-10">
            <Typography variant="h1" font="serif" className="text-white text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter">
              Defesa da sua <br />
              <span className="text-[#c5a059] italic relative inline-block">
                dignidade financeira.
                <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#c5a059]/20" />
              </span>
            </Typography>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-400 mb-16">
            <Typography variant="body" className="text-white/40 max-w-2xl mx-auto text-lg md:text-2xl font-light leading-relaxed">
              {hero.subtitle}
            </Typography>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-500">
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={onCTAClick}
              className="h-20 md:h-24 px-16 md:px-24 shadow-[0_20px_50px_rgba(197,160,89,0.3)] hover:scale-105 transition-all text-sm md:text-base group"
              icon={<MessageSquare size={24} className="ml-4 group-hover:translate-x-1 transition-transform" />}
            >
              {hero.cta}
            </Button>
          </div>
        </div>
      </Container>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20 animate-bounce cursor-pointer">
        <ChevronDown size={32} className="text-white" />
      </div>
    </section>
  );
};
