
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Typography } from './Typography.tsx';

export interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface FeaturesGridProps {
  features: Feature[];
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ features }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
    {features.map((f, i) => (
      <div key={i} className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 hover:shadow-xl transition-all group">
        <div className="w-16 h-16 bg-brand-primary text-brand-secondary rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
          {/* Fixed React.cloneElement overload mismatch */}
          {React.cloneElement(f.icon as React.ReactElement<any>, { size: 32 })}
        </div>
        <Typography variant="h4" font="serif" className="text-brand-primary mb-4">{f.title}</Typography>
        <Typography variant="body" className="text-slate-500 mb-6">{f.desc}</Typography>
        <button className="text-brand-secondary font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
          Saber Mais <ArrowRight size={14}/>
        </button>
      </div>
    ))}
  </div>
);
