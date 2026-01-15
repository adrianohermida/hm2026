
import React from 'react';
import { Container } from './Container.tsx';
import { Typography } from './Typography.tsx';
import { Button } from './Button.tsx';
import { Sparkles } from 'lucide-react';

interface ServiceHeroProps {
  badge: string;
  title: React.ReactNode;
  description: string;
  ctaText: string;
  onCTAClick: () => void;
  image?: string;
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({ badge, title, description, ctaText, onCTAClick, image }) => (
  <section className="relative pt-32 pb-20 bg-brand-accent overflow-hidden">
    <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="z-10 animate-in fade-in slide-in-from-left-10 duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary/20 rounded-full mb-6 border border-brand-secondary/10">
          <Sparkles className="w-4 h-4 text-brand-secondary" />
          <Typography variant="caption" className="text-brand-secondary">{badge}</Typography>
        </div>
        <Typography variant="h1" font="serif" className="text-brand-primary mb-8 leading-tight">
          {title}
        </Typography>
        <Typography variant="body" className="text-slate-600 mb-10 text-lg leading-relaxed">
          {description}
        </Typography>
        <Button variant="secondary" size="lg" onClick={onCTAClick} className="px-12 py-6">
          {ctaText}
        </Button>
      </div>
      <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-slate-100">
        <img src={image || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"} className="w-full h-full object-cover" alt="Service" />
      </div>
    </Container>
  </section>
);
